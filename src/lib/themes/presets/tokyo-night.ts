/**
 * Tokyo Night Theme Preset
 * Based on the Tokyo Night color palette: https://github.com/enkia/tokyo-night-vscode-theme
 */

import type { ThemePreset } from '../index';

export const tokyoNightTheme: ThemePreset = {
  name: 'tokyo-night',
  displayName: 'Tokyo Night',
  light: {
    // Tokyo Night Light
    background: 'oklch(0.97 0.005 250)',
    foreground: 'oklch(0.30 0.03 250)',
    card: 'oklch(0.95 0.005 250)',
    cardForeground: 'oklch(0.30 0.03 250)',
    popover: 'oklch(0.97 0.005 250)',
    popoverForeground: 'oklch(0.30 0.03 250)',
    primary: 'oklch(0.55 0.18 260)',
    primaryForeground: 'oklch(0.97 0.005 250)',
    secondary: 'oklch(0.90 0.01 250)',
    secondaryForeground: 'oklch(0.30 0.03 250)',
    muted: 'oklch(0.92 0.005 250)',
    mutedForeground: 'oklch(0.50 0.02 250)',
    accent: 'oklch(0.70 0.15 200)',
    accentForeground: 'oklch(0.20 0.02 250)',
    destructive: 'oklch(0.60 0.20 15)',
    destructiveForeground: 'oklch(0.97 0.005 250)',
    border: 'oklch(0.85 0.01 250)',
    input: 'oklch(0.85 0.01 250)',
    ring: 'oklch(0.55 0.18 260)'
  },
  dark: {
    // Tokyo Night Storm
    background: 'oklch(0.22 0.03 260)',
    foreground: 'oklch(0.85 0.02 260)',
    card: 'oklch(0.25 0.03 260)',
    cardForeground: 'oklch(0.85 0.02 260)',
    popover: 'oklch(0.22 0.03 260)',
    popoverForeground: 'oklch(0.85 0.02 260)',
    primary: 'oklch(0.72 0.15 260)',
    primaryForeground: 'oklch(0.22 0.03 260)',
    secondary: 'oklch(0.30 0.03 260)',
    secondaryForeground: 'oklch(0.85 0.02 260)',
    muted: 'oklch(0.30 0.02 260)',
    mutedForeground: 'oklch(0.60 0.02 260)',
    accent: 'oklch(0.75 0.15 200)',
    accentForeground: 'oklch(0.85 0.02 260)',
    destructive: 'oklch(0.65 0.20 15)',
    destructiveForeground: 'oklch(0.85 0.02 260)',
    border: 'oklch(0.35 0.03 260)',
    input: 'oklch(0.35 0.03 260)',
    ring: 'oklch(0.72 0.15 260)'
  }
};
