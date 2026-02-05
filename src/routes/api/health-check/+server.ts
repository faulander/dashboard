/**
 * Health check API endpoint
 * Returns health status for all configured links
 */

import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { getServerConfig } from '$lib/server/config';
import {
  checkAllUrls,
  getAllCachedHealth,
  isHealthCheckNeeded
} from '$lib/server/health-checker';

export const GET: RequestHandler = async ({ url }) => {
  const config = getServerConfig();

  // Check if health checking is enabled
  if (!config.display.healthCheck.enabled) {
    return json({
      enabled: false,
      message: 'Health checking is disabled in configuration'
    });
  }

  // Check if force refresh is requested
  const forceRefresh = url.searchParams.get('refresh') === 'true';

  // Get health check config
  const healthConfig = config.display.healthCheck;

  // Check if we need to run a full check
  if (forceRefresh || isHealthCheckNeeded(healthConfig.interval)) {
    const results = await checkAllUrls(config.sections, healthConfig);

    return json({
      enabled: true,
      results,
      checkedAt: new Date().toISOString(),
      nextCheckIn: healthConfig.interval
    });
  }

  // Return cached results
  const cachedResults = getAllCachedHealth();

  return json({
    enabled: true,
    results: cachedResults,
    checkedAt: new Date().toISOString(),
    cached: true,
    nextCheckIn: healthConfig.interval
  });
};
