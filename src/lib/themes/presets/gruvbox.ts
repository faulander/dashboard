/**
 * Gruvbox Theme Preset
 * Based on the Gruvbox color palette: https://github.com/morhetz/gruvbox
 */

import type { ThemePreset } from '../index';

export const gruvboxTheme: ThemePreset = {
  name: 'gruvbox',
  displayName: 'Gruvbox',
  light: {
    // Gruvbox Light
    background: 'oklch(0.94 0.02 85)',
    foreground: 'oklch(0.30 0.04 50)',
    card: 'oklch(0.91 0.02 85)',
    cardForeground: 'oklch(0.30 0.04 50)',
    popover: 'oklch(0.94 0.02 85)',
    popoverForeground: 'oklch(0.30 0.04 50)',
    primary: 'oklch(0.55 0.15 45)',
    primaryForeground: 'oklch(0.94 0.02 85)',
    secondary: 'oklch(0.85 0.03 85)',
    secondaryForeground: 'oklch(0.30 0.04 50)',
    muted: 'oklch(0.88 0.02 85)',
    mutedForeground: 'oklch(0.50 0.03 50)',
    accent: 'oklch(0.65 0.15 150)',
    accentForeground: 'oklch(0.20 0.03 50)',
    destructive: 'oklch(0.55 0.20 25)',
    destructiveForeground: 'oklch(0.94 0.02 85)',
    border: 'oklch(0.80 0.03 85)',
    input: 'oklch(0.80 0.03 85)',
    ring: 'oklch(0.55 0.15 45)'
  },
  dark: {
    // Gruvbox Dark
    background: 'oklch(0.27 0.03 50)',
    foreground: 'oklch(0.88 0.03 85)',
    card: 'oklch(0.30 0.03 50)',
    cardForeground: 'oklch(0.88 0.03 85)',
    popover: 'oklch(0.27 0.03 50)',
    popoverForeground: 'oklch(0.88 0.03 85)',
    primary: 'oklch(0.70 0.15 45)',
    primaryForeground: 'oklch(0.27 0.03 50)',
    secondary: 'oklch(0.35 0.03 50)',
    secondaryForeground: 'oklch(0.88 0.03 85)',
    muted: 'oklch(0.35 0.02 50)',
    mutedForeground: 'oklch(0.65 0.02 85)',
    accent: 'oklch(0.72 0.15 150)',
    accentForeground: 'oklch(0.88 0.03 85)',
    destructive: 'oklch(0.60 0.20 25)',
    destructiveForeground: 'oklch(0.88 0.03 85)',
    border: 'oklch(0.40 0.03 50)',
    input: 'oklch(0.40 0.03 50)',
    ring: 'oklch(0.70 0.15 45)'
  }
};
