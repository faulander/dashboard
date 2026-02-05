<script lang="ts">
  /**
   * Custom widget component
   * Displays data from a custom API endpoint
   */
  import { ExternalLink } from '@lucide/svelte';
  import type { CustomWidgetConfig } from '$lib/types/widgets';

  interface Props {
    config: CustomWidgetConfig;
    data?: Record<string, unknown> | null;
  }

  let { config, data }: Props = $props();

  /**
   * Formats a value for display
   */
  function formatValue(value: unknown): string {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return String(value);
  }

  /**
   * Gets entries to display based on template
   */
  function getDisplayEntries(
    dataObj: Record<string, unknown>
  ): Array<{ key: string; value: string }> {
    const entries = Object.entries(dataObj);

    switch (config.template) {
      case 'minimal':
        return entries.slice(0, 1).map(([key, value]) => ({
          key,
          value: formatValue(value)
        }));
      case 'compact':
        return entries.slice(0, 3).map(([key, value]) => ({
          key,
          value: formatValue(value)
        }));
      case 'detailed':
      default:
        return entries.slice(0, 6).map(([key, value]) => ({
          key,
          value: formatValue(value)
        }));
    }
  }

  let displayEntries = $derived(data ? getDisplayEntries(data) : []);
</script>

<div class="rounded-lg bg-card/50 p-4">
  {#if data && displayEntries.length > 0}
    <div class="space-y-2">
      {#each displayEntries as entry (entry.key)}
        <div class="flex justify-between items-center">
          <span class="text-sm text-muted-foreground capitalize">
            {entry.key.replace(/[_-]/g, ' ')}
          </span>
          <span class="font-medium text-foreground">
            {entry.value}
          </span>
        </div>
      {/each}
    </div>

    {#if config.apiEndpoint}
      <a
        href={config.apiEndpoint}
        target="_blank"
        rel="noopener noreferrer"
        class="mt-3 flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
      >
        <ExternalLink class="h-3 w-3" />
        <span>View source</span>
      </a>
    {/if}
  {:else}
    <div class="text-center text-sm text-muted-foreground">
      <p>No data available</p>
      {#if config.apiEndpoint}
        <p class="text-xs mt-1">Endpoint: {config.apiEndpoint}</p>
      {/if}
    </div>
  {/if}
</div>
