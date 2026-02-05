/**
 * Link health checker service
 * Checks if configured URLs are reachable
 */

import type { Section, HealthCheckResult, HealthCheckConfig } from '$lib/types/config';

/**
 * In-memory cache for health check results
 */
const healthCache = new Map<string, HealthCheckResult>();
let lastFullCheck: Date | null = null;

/**
 * Checks if a single URL is reachable
 *
 * @param url - URL to check
 * @param timeout - Request timeout in milliseconds
 * @returns Health check result
 */
export async function checkUrlHealth(url: string, timeout: number = 5000): Promise<HealthCheckResult> {
  const startTime = Date.now();

  try {
    // Parse URL to get just the origin for checking
    const urlObj = new URL(url);
    const checkUrl = urlObj.origin;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(checkUrl, {
      method: 'HEAD', // Use HEAD to minimize data transfer
      signal: controller.signal,
      redirect: 'follow'
    });

    clearTimeout(timeoutId);

    const responseTime = Date.now() - startTime;

    return {
      url,
      status: response.ok ? 'healthy' : 'unhealthy',
      responseTime,
      statusCode: response.status,
      lastChecked: new Date().toISOString()
    };
  } catch (e) {
    const responseTime = Date.now() - startTime;
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';

    // Check if it was a timeout
    if (errorMessage.includes('abort')) {
      return {
        url,
        status: 'unhealthy',
        responseTime,
        lastChecked: new Date().toISOString(),
        error: 'Request timed out'
      };
    }

    return {
      url,
      status: 'unhealthy',
      responseTime,
      lastChecked: new Date().toISOString(),
      error: errorMessage
    };
  }
}

/**
 * Extracts all unique URLs from sections
 *
 * @param sections - Array of sections with items
 * @returns Array of unique URLs
 */
export function extractUrlsFromSections(sections: Section[]): string[] {
  const urls = new Set<string>();

  for (const section of sections) {
    for (const item of section.items) {
      if (item.url && item.url !== '#') {
        urls.add(item.url);
      }
    }
  }

  return Array.from(urls);
}

/**
 * Checks health of all URLs in sections
 *
 * @param sections - Array of sections with items
 * @param config - Health check configuration
 * @returns Map of URL to health check result
 */
export async function checkAllUrls(
  sections: Section[],
  config: HealthCheckConfig
): Promise<Record<string, HealthCheckResult>> {
  const urls = extractUrlsFromSections(sections);
  const results: Record<string, HealthCheckResult> = {};

  // Check URLs in parallel with concurrency limit
  const concurrencyLimit = 5;
  const chunks: string[][] = [];

  for (let i = 0; i < urls.length; i += concurrencyLimit) {
    chunks.push(urls.slice(i, i + concurrencyLimit));
  }

  for (const chunk of chunks) {
    const chunkResults = await Promise.all(
      chunk.map((url) => checkUrlHealth(url, config.timeout))
    );

    for (const result of chunkResults) {
      results[result.url] = result;
      healthCache.set(result.url, result);
    }
  }

  lastFullCheck = new Date();

  return results;
}

/**
 * Gets cached health check result for a URL
 *
 * @param url - URL to get result for
 * @returns Cached result or undefined
 */
export function getCachedHealth(url: string): HealthCheckResult | undefined {
  return healthCache.get(url);
}

/**
 * Gets all cached health check results
 *
 * @returns Map of all cached results
 */
export function getAllCachedHealth(): Record<string, HealthCheckResult> {
  const results: Record<string, HealthCheckResult> = {};
  for (const [url, result] of healthCache) {
    results[url] = result;
  }
  return results;
}

/**
 * Checks if a full health check is needed based on interval
 *
 * @param intervalSeconds - Check interval in seconds
 * @returns True if check is needed
 */
export function isHealthCheckNeeded(intervalSeconds: number): boolean {
  if (!lastFullCheck) return true;

  const now = new Date();
  const diffSeconds = (now.getTime() - lastFullCheck.getTime()) / 1000;

  return diffSeconds >= intervalSeconds;
}

/**
 * Clears the health check cache
 */
export function clearHealthCache(): void {
  healthCache.clear();
  lastFullCheck = null;
}
