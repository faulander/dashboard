/**
 * Theme system type definitions and exports
 */

/**
 * Color values for a theme (using OKLCH color space)
 */
export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

/**
 * Complete theme preset with light and dark variants
 */
export interface ThemePreset {
  name: string;
  displayName: string;
  light: ThemeColors;
  dark: ThemeColors;
}

/**
 * Available theme preset names
 */
export type ThemePresetName =
  | 'nord'
  | 'catppuccin'
  | 'dracula'
  | 'gruvbox'
  | 'tokyo-night'
  | 'rose-pine';

// Re-export presets
export { nordTheme } from './presets/nord';
export { catppuccinTheme } from './presets/catppuccin';
export { draculaTheme } from './presets/dracula';
export { gruvboxTheme } from './presets/gruvbox';
export { tokyoNightTheme } from './presets/tokyo-night';
export { rosePineTheme } from './presets/rose-pine';
