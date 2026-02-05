/**
 * Widget registry for dynamic widget loading
 */

import { WIDGET_PLUGINS, type WidgetPlugin, type WidgetDisplayVariant } from '$lib/types/widgets';

/**
 * Supported widget types
 */
export type WidgetType = 'search' | 'weather' | 'clock' | 'info' | 'chart' | 'custom';

/**
 * Map of widget types to their dynamic import functions
 * Using dynamic imports for code splitting
 */
export const widgetComponents: Record<WidgetType, () => Promise<{ default: unknown }>> = {
  search: () => import('./search-widget.svelte'),
  weather: () => import('./weather-widget.svelte'),
  clock: () => import('./clock-widget.svelte'),
  info: () => import('./info-widget.svelte'),
  chart: () => import('./chart-widget.svelte'),
  custom: () => import('./custom-widget.svelte')
};

/**
 * Checks if a widget type is valid/supported
 *
 * @param type - Widget type to check
 * @returns True if widget type is supported
 */
export function isValidWidgetType(type: string): type is WidgetType {
  return type in widgetComponents;
}

/**
 * Gets the list of all supported widget types
 *
 * @returns Array of widget type names
 */
export function getSupportedWidgetTypes(): WidgetType[] {
  return Object.keys(widgetComponents) as WidgetType[];
}

/**
 * Gets widget plugin metadata
 *
 * @param type - Widget type
 * @returns Widget plugin info or undefined
 */
export function getWidgetPlugin(type: string): WidgetPlugin | undefined {
  return WIDGET_PLUGINS[type];
}

/**
 * Checks if a variant is supported by a widget type
 *
 * @param type - Widget type
 * @param variant - Display variant to check
 * @returns True if variant is supported
 */
export function isVariantSupported(type: string, variant: WidgetDisplayVariant): boolean {
  const plugin = WIDGET_PLUGINS[type];
  if (!plugin) return false;
  return plugin.supportedVariants.includes(variant);
}

/**
 * Gets the default variant for a widget type
 *
 * @param type - Widget type
 * @returns Default variant or 'info' if not found
 */
export function getDefaultVariant(type: string): WidgetDisplayVariant {
  const plugin = WIDGET_PLUGINS[type];
  return plugin?.defaultVariant || 'info';
}
