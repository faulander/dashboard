/**
 * Rosé Pine Theme Preset
 * Based on the Rosé Pine color palette: https://rosepinetheme.com/
 */

import type { ThemePreset } from '../index';

export const rosePineTheme: ThemePreset = {
  name: 'rose-pine',
  displayName: 'Rosé Pine',
  light: {
    // Rosé Pine Dawn
    background: 'oklch(0.97 0.01 50)',
    foreground: 'oklch(0.35 0.04 300)',
    card: 'oklch(0.95 0.01 50)',
    cardForeground: 'oklch(0.35 0.04 300)',
    popover: 'oklch(0.97 0.01 50)',
    popoverForeground: 'oklch(0.35 0.04 300)',
    primary: 'oklch(0.55 0.18 340)',
    primaryForeground: 'oklch(0.97 0.01 50)',
    secondary: 'oklch(0.92 0.02 50)',
    secondaryForeground: 'oklch(0.35 0.04 300)',
    muted: 'oklch(0.93 0.01 50)',
    mutedForeground: 'oklch(0.50 0.03 300)',
    accent: 'oklch(0.65 0.12 30)',
    accentForeground: 'oklch(0.20 0.03 300)',
    destructive: 'oklch(0.60 0.20 15)',
    destructiveForeground: 'oklch(0.97 0.01 50)',
    border: 'oklch(0.88 0.02 50)',
    input: 'oklch(0.88 0.02 50)',
    ring: 'oklch(0.55 0.18 340)'
  },
  dark: {
    // Rosé Pine Main
    background: 'oklch(0.22 0.03 300)',
    foreground: 'oklch(0.90 0.02 50)',
    card: 'oklch(0.25 0.03 300)',
    cardForeground: 'oklch(0.90 0.02 50)',
    popover: 'oklch(0.22 0.03 300)',
    popoverForeground: 'oklch(0.90 0.02 50)',
    primary: 'oklch(0.72 0.15 340)',
    primaryForeground: 'oklch(0.22 0.03 300)',
    secondary: 'oklch(0.30 0.03 300)',
    secondaryForeground: 'oklch(0.90 0.02 50)',
    muted: 'oklch(0.30 0.02 300)',
    mutedForeground: 'oklch(0.65 0.02 50)',
    accent: 'oklch(0.70 0.12 30)',
    accentForeground: 'oklch(0.90 0.02 50)',
    destructive: 'oklch(0.65 0.20 15)',
    destructiveForeground: 'oklch(0.90 0.02 50)',
    border: 'oklch(0.35 0.03 300)',
    input: 'oklch(0.35 0.03 300)',
    ring: 'oklch(0.72 0.15 340)'
  }
};
