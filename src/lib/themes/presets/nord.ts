/**
 * Nord Theme Preset
 * Based on the Nord color palette: https://www.nordtheme.com/
 */

import type { ThemePreset } from '../index';

export const nordTheme: ThemePreset = {
  name: 'nord',
  displayName: 'Nord',
  light: {
    background: 'oklch(0.97 0.005 240)',
    foreground: 'oklch(0.30 0.02 240)',
    card: 'oklch(0.95 0.005 240)',
    cardForeground: 'oklch(0.30 0.02 240)',
    popover: 'oklch(0.97 0.005 240)',
    popoverForeground: 'oklch(0.30 0.02 240)',
    primary: 'oklch(0.60 0.12 240)',
    primaryForeground: 'oklch(0.97 0.005 240)',
    secondary: 'oklch(0.90 0.01 240)',
    secondaryForeground: 'oklch(0.30 0.02 240)',
    muted: 'oklch(0.92 0.005 240)',
    mutedForeground: 'oklch(0.50 0.02 240)',
    accent: 'oklch(0.70 0.10 180)',
    accentForeground: 'oklch(0.20 0.02 240)',
    destructive: 'oklch(0.60 0.18 25)',
    destructiveForeground: 'oklch(0.97 0.005 240)',
    border: 'oklch(0.88 0.01 240)',
    input: 'oklch(0.88 0.01 240)',
    ring: 'oklch(0.60 0.12 240)'
  },
  dark: {
    background: 'oklch(0.25 0.02 240)',
    foreground: 'oklch(0.92 0.01 240)',
    card: 'oklch(0.28 0.02 240)',
    cardForeground: 'oklch(0.92 0.01 240)',
    popover: 'oklch(0.25 0.02 240)',
    popoverForeground: 'oklch(0.92 0.01 240)',
    primary: 'oklch(0.72 0.10 240)',
    primaryForeground: 'oklch(0.25 0.02 240)',
    secondary: 'oklch(0.32 0.02 240)',
    secondaryForeground: 'oklch(0.92 0.01 240)',
    muted: 'oklch(0.32 0.02 240)',
    mutedForeground: 'oklch(0.65 0.02 240)',
    accent: 'oklch(0.70 0.12 180)',
    accentForeground: 'oklch(0.92 0.01 240)',
    destructive: 'oklch(0.60 0.18 25)',
    destructiveForeground: 'oklch(0.92 0.01 240)',
    border: 'oklch(0.35 0.02 240)',
    input: 'oklch(0.35 0.02 240)',
    ring: 'oklch(0.72 0.10 240)'
  }
};
