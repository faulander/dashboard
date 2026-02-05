/**
 * Environment variable substitution for YAML config
 * Replaces ${VAR_NAME} patterns with actual environment values
 */

/**
 * Pattern to match environment variable references
 * Matches: ${VAR_NAME} or ${VAR_NAME:-default}
 */
const ENV_VAR_PATTERN = /\$\{([^}:]+)(?::-([^}]*))?\}/g;

/**
 * Substitutes environment variable references in a string
 *
 * @param content - String containing ${VAR} patterns
 * @returns String with environment variables replaced
 *
 * @example
 * // With WEATHER_API_KEY=abc123 in environment
 * substituteEnvVars('key: ${WEATHER_API_KEY}')
 * // Returns: 'key: abc123'
 *
 * @example
 * // With default value fallback
 * substituteEnvVars('port: ${PORT:-3000}')
 * // Returns: 'port: 3000' if PORT is not set
 */
export function substituteEnvVars(content: string): string {
  return content.replace(ENV_VAR_PATTERN, (match, varName, defaultValue) => {
    const value = process.env[varName];

    if (value !== undefined) {
      return value;
    }

    if (defaultValue !== undefined) {
      return defaultValue;
    }

    console.warn(`Environment variable ${varName} not found and no default provided`);
    return match;
  });
}

/**
 * Recursively substitutes environment variables in an object
 * Useful for processing parsed YAML objects
 *
 * @param obj - Object with potential ${VAR} string values
 * @returns Object with environment variables replaced
 */
export function substituteEnvVarsInObject<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'string') {
    return substituteEnvVars(obj) as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => substituteEnvVarsInObject(item)) as T;
  }

  if (typeof obj === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = substituteEnvVarsInObject(value);
    }
    return result as T;
  }

  return obj;
}
