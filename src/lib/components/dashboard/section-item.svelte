<script lang="ts">
  /**
   * Section item component
   * Displays a single link item with optional icon and health status
   */
  import type { SectionItem } from '$lib/types/config';
  import type { HealthCheckResult } from '$lib/types/config';
  import { loadIcon, getInitial } from '$lib/utils/icons';
  import HealthIndicator from './health-indicator.svelte';
  import type { Component } from 'svelte';
  import { onMount } from 'svelte';

  interface Props {
    item: SectionItem;
    showIcons?: boolean;
    healthStatus?: HealthCheckResult | null;
    showHealthIndicator?: boolean;
  }

  let {
    item,
    showIcons = true,
    healthStatus = null,
    showHealthIndicator = false
  }: Props = $props();

  let IconComponent = $state<Component | null>(null);
  let iconLoaded = $state(false);

  onMount(async () => {
    if (item.icon) {
      IconComponent = await loadIcon(item.icon);
    }
    iconLoaded = true;
  });

  // Extract domain from URL for display
  function getDomain(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return url;
    }
  }

  let domain = $derived(getDomain(item.url));
  let initial = $derived(getInitial(item.name));

  // Determine health status for indicator
  let currentHealthStatus = $derived<'healthy' | 'unhealthy' | 'checking' | 'unknown'>(
    healthStatus?.status ?? 'unknown'
  );
</script>

<a
  href={item.url}
  target="_blank"
  rel="noopener noreferrer"
  class="group flex w-64 items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
  title={item.description || item.name}
>
  {#if showIcons}
    <div
      class="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted/30 text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary"
    >
      {#if iconLoaded && IconComponent}
        <IconComponent class="h-5 w-5" />
      {:else if iconLoaded}
        <span class="text-sm font-semibold">{initial}</span>
      {:else}
        <div class="h-5 w-5 animate-pulse rounded bg-muted"></div>
      {/if}
    </div>
  {/if}

  <!-- Health indicator positioned between icon and text -->
  {#if showHealthIndicator && showIcons}
    <HealthIndicator status={currentHealthStatus} responseTime={healthStatus?.responseTime} />
  {/if}

  <div class="flex flex-col min-w-0">
    <span class="font-medium text-foreground truncate">
      {item.name}
    </span>
    <span class="text-xs text-primary truncate uppercase tracking-wide">
      {domain}
    </span>
  </div>

  <!-- Health indicator for items without icons -->
  {#if !showIcons && showHealthIndicator}
    <span class="ml-auto">
      <HealthIndicator status={currentHealthStatus} responseTime={healthStatus?.responseTime} />
    </span>
  {/if}
</a>
