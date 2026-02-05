/**
 * Catppuccin Theme Preset
 * Based on the Catppuccin color palette: https://catppuccin.com/
 * Uses Latte (light) and Mocha (dark) variants
 */

import type { ThemePreset } from '../index';

export const catppuccinTheme: ThemePreset = {
  name: 'catppuccin',
  displayName: 'Catppuccin',
  light: {
    // Catppuccin Latte
    background: 'oklch(0.96 0.01 240)',
    foreground: 'oklch(0.30 0.04 270)',
    card: 'oklch(0.94 0.01 240)',
    cardForeground: 'oklch(0.30 0.04 270)',
    popover: 'oklch(0.96 0.01 240)',
    popoverForeground: 'oklch(0.30 0.04 270)',
    primary: 'oklch(0.55 0.18 280)',
    primaryForeground: 'oklch(0.96 0.01 240)',
    secondary: 'oklch(0.90 0.02 260)',
    secondaryForeground: 'oklch(0.30 0.04 270)',
    muted: 'oklch(0.92 0.01 260)',
    mutedForeground: 'oklch(0.50 0.03 270)',
    accent: 'oklch(0.70 0.14 200)',
    accentForeground: 'oklch(0.20 0.03 270)',
    destructive: 'oklch(0.60 0.20 25)',
    destructiveForeground: 'oklch(0.96 0.01 240)',
    border: 'oklch(0.85 0.02 260)',
    input: 'oklch(0.85 0.02 260)',
    ring: 'oklch(0.55 0.18 280)'
  },
  dark: {
    // Catppuccin Mocha
    background: 'oklch(0.24 0.02 270)',
    foreground: 'oklch(0.90 0.01 270)',
    card: 'oklch(0.27 0.02 270)',
    cardForeground: 'oklch(0.90 0.01 270)',
    popover: 'oklch(0.24 0.02 270)',
    popoverForeground: 'oklch(0.90 0.01 270)',
    primary: 'oklch(0.75 0.14 280)',
    primaryForeground: 'oklch(0.24 0.02 270)',
    secondary: 'oklch(0.32 0.03 270)',
    secondaryForeground: 'oklch(0.90 0.01 270)',
    muted: 'oklch(0.32 0.02 270)',
    mutedForeground: 'oklch(0.65 0.02 270)',
    accent: 'oklch(0.75 0.12 200)',
    accentForeground: 'oklch(0.90 0.01 270)',
    destructive: 'oklch(0.65 0.20 25)',
    destructiveForeground: 'oklch(0.90 0.01 270)',
    border: 'oklch(0.38 0.03 270)',
    input: 'oklch(0.38 0.03 270)',
    ring: 'oklch(0.75 0.14 280)'
  }
};
