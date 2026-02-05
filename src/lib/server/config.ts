/**
 * Server-side configuration loader
 * Loads and validates YAML configuration from /config directory
 */

import { parse } from 'yaml';
import { readFileSync, existsSync } from 'fs';
import { dashboardConfigSchema, type DashboardConfigSchema } from './config.schema';
import { substituteEnvVars } from './env-substitution';
import type { ClientConfig, ClientWidgetConfig } from '$lib/types/config';
import { SENSITIVE_CONFIG_KEYS } from '$lib/types/widgets';

/**
 * Path to configuration file
 * Can be overridden via CONFIG_PATH environment variable
 */
const CONFIG_PATH = process.env.CONFIG_PATH || './config/dashboard.yaml';

/**
 * Default configuration when no file exists or validation fails
 */
function getDefaultConfig(): DashboardConfigSchema {
  return {
    theme: {
      preset: 'nord',
      mode: 'system'
    },
    display: {
      columns: 4,
      greeting: {
        enabled: true,
        locale: 'en'
      },
      datetime: {
        enabled: true,
        locale: 'en-US',
        hour12: false,
        showSeconds: false,
        dateFormat: 'full'
      },
      healthCheck: {
        enabled: false,
        interval: 300,
        timeout: 5000,
        showStatus: true
      }
    },
    sections: [
      {
        name: 'Getting Started',
        items: [
          {
            name: 'Edit Configuration',
            url: 'https://github.com',
            icon: 'settings',
            description: 'Edit config/dashboard.yaml to customize'
          }
        ]
      }
    ],
    widgets: []
  };
}

/**
 * Loads configuration from YAML file
 *
 * @returns Validated dashboard configuration
 */
export function loadConfig(): DashboardConfigSchema {
  if (!existsSync(CONFIG_PATH)) {
    console.warn(`Configuration file not found at ${CONFIG_PATH}, using defaults`);
    return getDefaultConfig();
  }

  try {
    const rawYaml = readFileSync(CONFIG_PATH, 'utf-8');
    const substitutedYaml = substituteEnvVars(rawYaml);
    const parsed = parse(substitutedYaml);

    const result = dashboardConfigSchema.safeParse(parsed);

    if (!result.success) {
      console.error('Configuration validation failed:');
      for (const issue of result.error.issues) {
        console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
      }
      console.warn('Falling back to default configuration');
      return getDefaultConfig();
    }

    return result.data;
  } catch (error) {
    console.error('Failed to load configuration:', error);
    return getDefaultConfig();
  }
}

/**
 * Strips sensitive configuration keys from widget config
 *
 * @param config - Widget configuration object
 * @returns Config with sensitive keys removed
 */
function stripSensitiveConfig(config: Record<string, unknown>): Record<string, unknown> {
  const stripped: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(config)) {
    const isSecret = SENSITIVE_CONFIG_KEYS.some((sensitiveKey) =>
      key.toLowerCase().includes(sensitiveKey.toLowerCase())
    );

    if (!isSecret) {
      stripped[key] = value;
    }
  }

  return stripped;
}

/**
 * Creates client-safe configuration
 * Removes sensitive data like API keys from widget configs
 *
 * @param config - Full server configuration
 * @returns Client-safe configuration
 */
export function getClientConfig(config: DashboardConfigSchema): ClientConfig {
  const clientWidgets: ClientWidgetConfig[] = config.widgets.map((widget) => ({
    type: widget.type,
    position: widget.position,
    refreshInterval: widget.refreshInterval,
    config: stripSensitiveConfig(widget.config)
  }));

  return {
    theme: config.theme,
    display: config.display,
    sections: config.sections,
    widgets: clientWidgets
  };
}

/**
 * Gets the full configuration including sensitive data
 * Only use on server-side for widget API calls
 *
 * @returns Full configuration with all data
 */
export function getServerConfig(): DashboardConfigSchema {
  return loadConfig();
}
