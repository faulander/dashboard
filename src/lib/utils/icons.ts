/**
 * Dynamic Lucide icon loading utilities
 */

import type { Component } from 'svelte';

// Static imports for commonly used icons
// This ensures Vite bundles them properly
import Activity from '@lucide/svelte/icons/activity';
import BookOpen from '@lucide/svelte/icons/book-open';
import Box from '@lucide/svelte/icons/box';
import CheckCircle from '@lucide/svelte/icons/check-circle';
import ChefHat from '@lucide/svelte/icons/chef-hat';
import Clapperboard from '@lucide/svelte/icons/clapperboard';
import Cloud from '@lucide/svelte/icons/cloud';
import Container from '@lucide/svelte/icons/container';
import Download from '@lucide/svelte/icons/download';
import File from '@lucide/svelte/icons/file';
import Film from '@lucide/svelte/icons/film';
import Github from '@lucide/svelte/icons/github';
import Globe from '@lucide/svelte/icons/globe';
import Home from '@lucide/svelte/icons/home';
import LayoutGrid from '@lucide/svelte/icons/layout-grid';
import Link from '@lucide/svelte/icons/link';
import Mail from '@lucide/svelte/icons/mail';
import RefreshCw from '@lucide/svelte/icons/refresh-cw';
import Rss from '@lucide/svelte/icons/rss';
import Search from '@lucide/svelte/icons/search';
import Settings from '@lucide/svelte/icons/settings';
import Tv from '@lucide/svelte/icons/tv';
import User from '@lucide/svelte/icons/user';

/**
 * Static icon map for bundled icons
 */
const staticIcons: Record<string, Component> = {
  activity: Activity,
  'book-open': BookOpen,
  box: Box,
  'check-circle': CheckCircle,
  'chef-hat': ChefHat,
  clapperboard: Clapperboard,
  cloud: Cloud,
  container: Container,
  download: Download,
  file: File,
  film: Film,
  github: Github,
  globe: Globe,
  home: Home,
  'layout-grid': LayoutGrid,
  link: Link,
  mail: Mail,
  'refresh-cw': RefreshCw,
  rss: Rss,
  search: Search,
  settings: Settings,
  tv: Tv,
  user: User
};

/**
 * Cache for dynamically loaded icons
 */
const iconCache = new Map<string, Component>();

/**
 * Set of icon names that failed to load
 */
const failedIcons = new Set<string>();

/**
 * Converts icon name to proper module path format
 * Lucide uses kebab-case for icon file names
 *
 * @param name - Icon name (can be camelCase or kebab-case)
 * @returns Normalized kebab-case name
 */
function normalizeIconName(name: string): string {
  // Convert camelCase to kebab-case if needed
  return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Loads a Lucide icon by name
 * First checks static imports, then tries dynamic import
 *
 * @param name - Icon name (e.g., 'home', 'settings', 'cloud-download')
 * @returns Promise resolving to icon component or null if not found
 *
 * @example
 * const HomeIcon = await loadIcon('home');
 * const CloudIcon = await loadIcon('cloud-download');
 */
export async function loadIcon(name: string): Promise<Component | null> {
  const normalizedName = normalizeIconName(name);

  // Check static icons first
  if (staticIcons[normalizedName]) {
    return staticIcons[normalizedName];
  }

  // Return cached icon if available
  if (iconCache.has(normalizedName)) {
    return iconCache.get(normalizedName)!;
  }

  // Skip if previously failed
  if (failedIcons.has(normalizedName)) {
    return null;
  }

  try {
    // Try dynamic import for icons not in static map
    const importPath = `@lucide/svelte/icons/${normalizedName}`;
    const module = (await import(/* @vite-ignore */ importPath)) as {
      default: Component;
    };
    const icon = module.default;
    if (icon) {
      iconCache.set(normalizedName, icon);
      return icon;
    }
    console.warn(`Icon "${name}" loaded but default export is undefined`);
    failedIcons.add(normalizedName);
    return null;
  } catch (e) {
    console.warn(`Icon "${name}" (normalized: "${normalizedName}") not found in Lucide`);
    failedIcons.add(normalizedName);
    return null;
  }
}

/**
 * Preloads multiple icons at once
 * Useful for loading section icons in parallel
 *
 * @param names - Array of icon names to preload
 * @returns Promise resolving when all icons are loaded
 */
export async function preloadIcons(names: string[]): Promise<void> {
  await Promise.all(names.map((name) => loadIcon(name)));
}

/**
 * Gets an icon from cache synchronously
 * Returns null if icon not cached
 *
 * @param name - Icon name
 * @returns Cached icon component or null
 */
export function getIconFromCache(name: string): Component | null {
  const normalizedName = normalizeIconName(name);
  return iconCache.get(normalizedName) || null;
}

/**
 * Clears the icon cache
 * Useful for testing or memory management
 */
export function clearIconCache(): void {
  iconCache.clear();
  failedIcons.clear();
}

/**
 * Gets the first letter of a name for fallback display
 *
 * @param name - Name to get initial from
 * @returns Uppercase first letter
 */
export function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}
