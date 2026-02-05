/**
 * Widget-specific type definitions
 */

import type { WidgetPosition } from './config';

/**
 * Widget display variants
 * - info: Simple text/value display
 * - icon-info: Icon with text/value (for weather, status, etc.)
 * - chart: Data visualization with charts
 */
export type WidgetDisplayVariant = 'info' | 'icon-info' | 'chart';

/**
 * Base widget props that all widgets receive
 */
export interface BaseWidgetProps {
  config: Record<string, unknown>;
  data: unknown;
  variant?: WidgetDisplayVariant;
}

/**
 * Widget plugin definition
 */
export interface WidgetPlugin {
  type: string;
  name: string;
  description: string;
  supportedVariants: WidgetDisplayVariant[];
  defaultVariant: WidgetDisplayVariant;
  requiresApiKey: boolean;
  refreshable: boolean;
}

/**
 * Weather widget configuration
 */
export interface WeatherWidgetConfig {
  apiKey: string;
  location: string;
  units: 'metric' | 'imperial';
}

export interface WeatherWidgetData {
  temperature: number;
  condition: string;
  description: string;
  location: string;
  icon: string;
  humidity?: number;
  windSpeed?: number;
  feelsLike?: number;
}

/**
 * Search widget configuration
 */
export interface SearchWidgetConfig {
  engine: 'google' | 'duckduckgo' | 'brave' | 'custom';
  customUrl?: string;
  placeholder?: string;
}

/**
 * Clock widget configuration
 */
export interface ClockWidgetConfig {
  showAnalog: boolean;
  timezone?: string;
  showDate?: boolean;
}

/**
 * Custom API widget configuration
 */
export interface CustomWidgetConfig {
  apiEndpoint: string;
  apiKey?: string;
  template: 'compact' | 'detailed' | 'minimal';
  headers?: Record<string, string>;
}

/**
 * Info widget configuration (simple value display)
 */
export interface InfoWidgetConfig {
  apiEndpoint: string;
  apiKey?: string;
  headers?: Record<string, string>;
  label: string;
  valueKey: string;
  unit?: string;
  prefix?: string;
  decimals?: number;
  icon?: string;
}

export interface InfoWidgetData {
  value: number | string;
  previousValue?: number | string;
  change?: number;
  timestamp?: string;
}

/**
 * Chart widget configuration
 */
export interface ChartWidgetConfig {
  apiEndpoint: string;
  apiKey?: string;
  headers?: Record<string, string>;
  chartType: 'line' | 'bar' | 'area' | 'sparkline';
  dataKey: string;
  labelKey?: string;
  color?: string;
  showLegend?: boolean;
  maxDataPoints?: number;
}

export interface ChartWidgetData {
  labels: string[];
  values: number[];
  currentValue?: number;
  minValue?: number;
  maxValue?: number;
}

/**
 * RSS widget configuration
 */
export interface RssWidgetConfig {
  feeds: Array<{
    url: string;
    name: string;
  }>;
  maxItems: number;
}

export interface RssWidgetData {
  items: Array<{
    title: string;
    link: string;
    feedName: string;
    pubDate?: string;
  }>;
}

/**
 * Widget registry entry
 */
export interface WidgetRegistryEntry {
  type: string;
  position: WidgetPosition;
  refreshInterval?: number;
  config: Record<string, unknown>;
}

/**
 * Sensitive config keys that should be stripped for client
 */
export const SENSITIVE_CONFIG_KEYS = ['apiKey', 'apiSecret', 'token', 'password', 'secret'];

/**
 * Available widget plugins with metadata
 */
export const WIDGET_PLUGINS: Record<string, WidgetPlugin> = {
  search: {
    type: 'search',
    name: 'Search',
    description: 'Search bar with configurable engine',
    supportedVariants: ['info'],
    defaultVariant: 'info',
    requiresApiKey: false,
    refreshable: false
  },
  weather: {
    type: 'weather',
    name: 'Weather',
    description: 'Current weather conditions',
    supportedVariants: ['info', 'icon-info'],
    defaultVariant: 'icon-info',
    requiresApiKey: true,
    refreshable: true
  },
  clock: {
    type: 'clock',
    name: 'Clock',
    description: 'Analog/digital clock display',
    supportedVariants: ['info', 'icon-info'],
    defaultVariant: 'info',
    requiresApiKey: false,
    refreshable: false
  },
  info: {
    type: 'info',
    name: 'Info',
    description: 'Simple value display from API',
    supportedVariants: ['info', 'icon-info'],
    defaultVariant: 'info',
    requiresApiKey: false,
    refreshable: true
  },
  chart: {
    type: 'chart',
    name: 'Chart',
    description: 'Data visualization with charts',
    supportedVariants: ['chart'],
    defaultVariant: 'chart',
    requiresApiKey: false,
    refreshable: true
  },
  custom: {
    type: 'custom',
    name: 'Custom',
    description: 'Custom API data display',
    supportedVariants: ['info', 'icon-info', 'chart'],
    defaultVariant: 'info',
    requiresApiKey: false,
    refreshable: true
  }
};
