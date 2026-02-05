<script lang="ts">
  /**
   * Section component
   * Displays a group of items with a header
   */
  import type { Section, HealthCheckResult } from '$lib/types/config';
  import SectionItem from './section-item.svelte';
  import { loadIcon } from '$lib/utils/icons';
  import type { Component } from 'svelte';
  import { onMount } from 'svelte';

  interface Props {
    section: Section;
    showItemIcons?: boolean;
    healthResults?: Record<string, HealthCheckResult>;
    showHealthIndicator?: boolean;
  }

  let {
    section,
    showItemIcons = true,
    healthResults = {},
    showHealthIndicator = false
  }: Props = $props();

  let HeaderIcon = $state<Component | null>(null);

  onMount(async () => {
    if (section.icon) {
      HeaderIcon = await loadIcon(section.icon);
    }
  });

  // Always show icon area (with initials as fallback if no icon configured)
</script>

<div class="space-y-4">
  <header class="flex items-center gap-2">
    {#if HeaderIcon}
      <HeaderIcon class="h-4 w-4 text-muted-foreground" />
    {/if}
    <h2 class="text-sm font-bold uppercase tracking-widest text-muted-foreground">
      {section.name}
    </h2>
  </header>

  <div class="flex flex-wrap gap-1">
    {#each section.items as item (item.url)}
      <SectionItem
        {item}
        showIcons={showItemIcons}
        healthStatus={healthResults[item.url]}
        {showHealthIndicator}
      />
    {/each}
  </div>
</div>
