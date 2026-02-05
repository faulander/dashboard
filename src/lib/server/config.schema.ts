/**
 * Zod schema for dashboard configuration validation
 */

import { z } from 'zod';

/**
 * Theme configuration schema
 */
const themeConfigSchema = z
  .object({
    preset: z.string().default('nord'),
    mode: z.enum(['light', 'dark', 'system']).default('system')
  })
  .default({ preset: 'nord', mode: 'system' });

/**
 * Greeting configuration schema
 */
const greetingConfigSchema = z
  .object({
    enabled: z.boolean().default(true),
    locale: z.string().default('en')
  })
  .default({ enabled: true, locale: 'en' });

/**
 * Datetime configuration schema
 */
const datetimeConfigSchema = z
  .object({
    enabled: z.boolean().default(true),
    locale: z.string().default('en-US'),
    hour12: z.boolean().default(false),
    showSeconds: z.boolean().default(false),
    dateFormat: z.enum(['full', 'long', 'medium', 'short']).default('full')
  })
  .default({
    enabled: true,
    locale: 'en-US',
    hour12: false,
    showSeconds: false,
    dateFormat: 'full'
  });

/**
 * Health check configuration schema
 */
const healthCheckConfigSchema = z
  .object({
    enabled: z.boolean().default(false),
    interval: z.number().min(30).default(300), // Minimum 30 seconds, default 5 minutes
    timeout: z.number().min(1000).max(30000).default(5000), // 1-30 seconds, default 5s
    showStatus: z.boolean().default(true)
  })
  .default({
    enabled: false,
    interval: 300,
    timeout: 5000,
    showStatus: true
  });

/**
 * Display configuration schema
 */
const displayConfigSchema = z
  .object({
    columns: z.number().min(1).max(6).default(4),
    greeting: greetingConfigSchema,
    datetime: datetimeConfigSchema,
    healthCheck: healthCheckConfigSchema
  })
  .default({
    columns: 4,
    greeting: { enabled: true, locale: 'en' },
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
  });

/**
 * Section item schema
 */
const sectionItemSchema = z.object({
  name: z.string().min(1),
  url: z.string(),
  icon: z.string().optional(),
  description: z.string().optional()
});

/**
 * Section schema
 */
const sectionSchema = z.object({
  name: z.string().min(1),
  icon: z.string().optional(),
  items: z.array(sectionItemSchema).default([])
});

/**
 * Widget position enum
 */
const widgetPositionSchema = z.enum([
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right'
]);

/**
 * Widget display variant enum
 */
const widgetVariantSchema = z.enum(['info', 'icon-info', 'chart']).optional();

/**
 * Widget configuration schema
 */
const widgetConfigSchema = z.object({
  type: z.string().min(1),
  position: widgetPositionSchema,
  variant: widgetVariantSchema,
  refreshInterval: z.number().positive().optional(),
  config: z.record(z.string(), z.unknown()).default({})
});

/**
 * Complete dashboard configuration schema
 */
export const dashboardConfigSchema = z.object({
  theme: themeConfigSchema,
  display: displayConfigSchema,
  sections: z.array(sectionSchema).default([]),
  widgets: z.array(widgetConfigSchema).default([])
});

/**
 * Inferred TypeScript type from schema
 */
export type DashboardConfigSchema = z.infer<typeof dashboardConfigSchema>;

/**
 * Validates and parses dashboard configuration
 *
 * @param data - Raw configuration data
 * @returns Validated configuration or null if invalid
 */
export function validateConfig(data: unknown): DashboardConfigSchema | null {
  const result = dashboardConfigSchema.safeParse(data);

  if (!result.success) {
    console.error('Configuration validation failed:');
    for (const issue of result.error.issues) {
      console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
    }
    return null;
  }

  return result.data;
}
