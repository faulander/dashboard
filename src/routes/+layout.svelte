<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import { Toaster } from '$lib/components/ui/sonner';
  import { getThemePreset, getEffectiveMode } from '$lib/themes/apply-theme';
  import type { LayoutData } from './$types';
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';

  let { children, data }: { children: Snippet; data: LayoutData } = $props();

  // Determine color mode
  let prefersDark = $state(false);
  let mounted = $state(false);

  onMount(() => {
    mounted = true;
    prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      prefersDark = e.matches;
    };
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  });

  // Calculate effective mode
  let theme = $derived(getThemePreset(data.config.theme.preset));
  let effectiveMode = $derived(getEffectiveMode(data.config.theme.mode, prefersDark));
  let isDark = $derived(effectiveMode === 'dark');

  // Generate CSS string for style tag
  // Use both :root and .dark selectors for higher specificity
  let themeStyleContent = $derived.by(() => {
    if (!theme) return '';
    const colors = isDark ? theme.dark : theme.light;
    const vars = Object.entries(colors)
      .map(([key, value]) => {
        const cssVar = '--' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `${cssVar}: ${value} !important;`;
      })
      .join('\n  ');
    return `:root, .dark {\n  ${vars}\n}`;
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  {#if themeStyleContent}
    {@html `<style>${themeStyleContent}</style>`}
  {/if}
</svelte:head>

<div class:dark={isDark} class="min-h-screen bg-background text-foreground">
  {@render children()}
</div>
<Toaster />
