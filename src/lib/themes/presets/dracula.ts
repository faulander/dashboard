/**
 * Dracula Theme Preset
 * Based on the Dracula color palette: https://draculatheme.com/
 *
 * Official colors:
 * Background: #282a36
 * Current Line: #44475a
 * Foreground: #f8f8f2
 * Comment: #6272a4
 * Cyan: #8be9fd
 * Green: #50fa7b
 * Orange: #ffb86c
 * Pink: #ff79c6
 * Purple: #bd93f9
 * Red: #ff5555
 * Yellow: #f1fa8c
 */

import type { ThemePreset } from '../index';

export const draculaTheme: ThemePreset = {
  name: 'dracula',
  displayName: 'Dracula',
  light: {
    // Dracula light variant (inverted)
    background: '#f8f8f2',
    foreground: '#282a36',
    card: '#ffffff',
    cardForeground: '#282a36',
    popover: '#ffffff',
    popoverForeground: '#282a36',
    primary: '#bd93f9',
    primaryForeground: '#282a36',
    secondary: '#e2e2e2',
    secondaryForeground: '#282a36',
    muted: '#e8e8e8',
    mutedForeground: '#6272a4',
    accent: '#ff79c6',
    accentForeground: '#282a36',
    destructive: '#ff5555',
    destructiveForeground: '#f8f8f2',
    border: '#d0d0d0',
    input: '#d0d0d0',
    ring: '#bd93f9'
  },
  dark: {
    // Dracula standard dark
    background: '#282a36',
    foreground: '#f8f8f2',
    card: '#44475a',
    cardForeground: '#f8f8f2',
    popover: '#282a36',
    popoverForeground: '#f8f8f2',
    primary: '#bd93f9',
    primaryForeground: '#282a36',
    secondary: '#44475a',
    secondaryForeground: '#f8f8f2',
    muted: '#44475a',
    mutedForeground: '#6272a4',
    accent: '#ff79c6',
    accentForeground: '#f8f8f2',
    destructive: '#ff5555',
    destructiveForeground: '#f8f8f2',
    border: '#6272a4',
    input: '#6272a4',
    ring: '#bd93f9'
  }
};
