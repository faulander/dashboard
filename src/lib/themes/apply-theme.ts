/**
 * Theme application utilities
 * Generates CSS variables from theme presets
 */

import type { ThemePreset, ThemeColors, ThemePresetName } from './index';
import {
  nordTheme,
  catppuccinTheme,
  draculaTheme,
  gruvboxTheme,
  tokyoNightTheme,
  rosePineTheme
} from './index';

/**
 * Map of available theme presets
 */
const themePresets: Record<ThemePresetName, ThemePreset> = {
  nord: nordTheme,
  catppuccin: catppuccinTheme,
  dracula: draculaTheme,
  gruvbox: gruvboxTheme,
  'tokyo-night': tokyoNightTheme,
  'rose-pine': rosePineTheme
};

/**
 * Gets a theme preset by name
 *
 * @param name - Theme preset name
 * @returns Theme preset or null if not found
 */
export function getThemePreset(name: string): ThemePreset | null {
  return themePresets[name as ThemePresetName] || null;
}

/**
 * Gets all available theme presets
 *
 * @returns Array of all theme presets
 */
export function getAllThemePresets(): ThemePreset[] {
  return Object.values(themePresets);
}

/**
 * Converts camelCase to kebab-case
 */
function toKebabCase(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * Generates CSS variable declarations from theme colors
 *
 * @param colors - Theme color values
 * @returns CSS string with variable declarations
 */
export function generateThemeCss(colors: ThemeColors): string {
  const lines: string[] = [];

  for (const [key, value] of Object.entries(colors)) {
    const cssVarName = `--${toKebabCase(key)}`;
    lines.push(`${cssVarName}: ${value};`);
  }

  return lines.join('\n    ');
}

/**
 * Generates complete CSS style block for a theme
 *
 * @param theme - Theme preset
 * @param mode - Color mode (light/dark)
 * @returns Complete CSS style string
 */
export function generateThemeStyleBlock(
  theme: ThemePreset,
  mode: 'light' | 'dark'
): string {
  const colors = mode === 'dark' ? theme.dark : theme.light;
  const cssVars = generateThemeCss(colors);

  return `
  :root {
    ${cssVars}
  }`;
}

/**
 * Determines the effective color mode based on config and system preference
 *
 * @param configMode - Mode from config (light/dark/system)
 * @param prefersDark - Whether system prefers dark mode
 * @returns Effective mode (light or dark)
 */
export function getEffectiveMode(
  configMode: 'light' | 'dark' | 'system',
  prefersDark: boolean
): 'light' | 'dark' {
  if (configMode === 'system') {
    return prefersDark ? 'dark' : 'light';
  }
  return configMode;
}
