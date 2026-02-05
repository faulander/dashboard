<script lang="ts">
  /**
   * Chart widget component
   * Displays data visualization from an API
   */
  import type { ChartWidgetConfig, ChartWidgetData } from '$lib/types/widgets';
  import ChartDisplay from './variants/chart-display.svelte';

  interface Props {
    config: ChartWidgetConfig;
    data?: ChartWidgetData | null;
  }

  let { config, data }: Props = $props();

  let chartColor = $derived(config.color || 'var(--primary)');
</script>

{#if data && data.values.length > 0}
  <div class="rounded-lg bg-card/50 p-4">
    <ChartDisplay
      label={config.dataKey}
      values={data.values}
      labels={data.labels}
      chartType={config.chartType}
      color={chartColor}
      currentValue={data.currentValue ?? data.values[data.values.length - 1]}
      showLegend={config.showLegend}
    />
  </div>
{:else}
  <div class="rounded-lg bg-card/50 p-4 text-center text-sm text-muted-foreground">
    <p>No chart data available</p>
    {#if config.apiEndpoint}
      <p class="text-xs mt-1">Endpoint: {config.apiEndpoint}</p>
    {/if}
  </div>
{/if}
