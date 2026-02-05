/**
 * Server-side layout load function
 * Loads dashboard configuration and prepares client-safe data
 */

import type { LayoutServerLoad } from './$types';
import { loadConfig, getClientConfig } from '$lib/server/config';

export const load: LayoutServerLoad = async () => {
  const fullConfig = loadConfig();
  const clientConfig = getClientConfig(fullConfig);

  return {
    config: clientConfig
  };
};
