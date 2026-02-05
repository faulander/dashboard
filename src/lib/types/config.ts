/**
 * Configuration type definitions for the dashboard
 */

import type { WidgetDisplayVariant } from './widgets';

export interface ThemeConfig {
  preset: string;
  mode: 'light' | 'dark' | 'system';
}

export interface GreetingConfig {
  enabled: boolean;
  locale: string;
}

export interface DatetimeConfig {
  enabled: boolean;
  locale: string;
  hour12: boolean;
  showSeconds: boolean;
  dateFormat: 'full' | 'long' | 'medium' | 'short';
}

/**
 * Link health check configuration
 */
export interface HealthCheckConfig {
  enabled: boolean;
  interval: number; // Check interval in seconds
  timeout: number; // Request timeout in milliseconds
  showStatus: boolean; // Show status indicator on items
}

export interface DisplayConfig {
  columns: number;
  greeting: GreetingConfig;
  datetime: DatetimeConfig;
  healthCheck: HealthCheckConfig;
}

export interface SectionItem {
  name: string;
  url: string;
  icon?: string;
  description?: string;
}

/**
 * Section item with health status (runtime)
 */
export interface SectionItemWithHealth extends SectionItem {
  healthStatus?: 'healthy' | 'unhealthy' | 'checking' | 'unknown';
  lastChecked?: string;
  responseTime?: number;
}

export interface Section {
  name: string;
  icon?: string;
  items: SectionItem[];
}

export interface WidgetConfig {
  type: string;
  position: WidgetPosition;
  variant?: WidgetDisplayVariant;
  refreshInterval?: number;
  config: Record<string, unknown>;
}

export type WidgetPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface DashboardConfig {
  theme: ThemeConfig;
  display: DisplayConfig;
  sections: Section[];
  widgets: WidgetConfig[];
}

/**
 * Client-safe config (sensitive data stripped)
 */
export interface ClientConfig {
  theme: ThemeConfig;
  display: DisplayConfig;
  sections: Section[];
  widgets: ClientWidgetConfig[];
}

export interface ClientWidgetConfig {
  type: string;
  position: WidgetPosition;
  variant?: WidgetDisplayVariant;
  refreshInterval?: number;
  config: Record<string, unknown>;
}

/**
 * Health check result for a single URL
 */
export interface HealthCheckResult {
  url: string;
  status: 'healthy' | 'unhealthy' | 'unknown';
  responseTime?: number;
  statusCode?: number;
  lastChecked: string;
  error?: string;
}

/**
 * Health check response from API
 */
export interface HealthCheckResponse {
  results: Record<string, HealthCheckResult>;
  checkedAt: string;
}
