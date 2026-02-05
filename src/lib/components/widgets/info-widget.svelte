<script lang="ts">
  /**
   * Info widget component
   * Displays a single value from an API with optional change indicator
   */
  import type { InfoWidgetConfig, InfoWidgetData, WidgetDisplayVariant } from '$lib/types/widgets';
  import InfoDisplay from './variants/info-display.svelte';
  import IconInfoDisplay from './variants/icon-info-display.svelte';
  import { loadIcon } from '$lib/utils/icons';
  import { onMount } from 'svelte';
  import type { Component } from 'svelte';

  interface Props {
    config: InfoWidgetConfig;
    data?: InfoWidgetData | null;
    variant?: WidgetDisplayVariant;
  }

  let { config, data, variant = 'info' }: Props = $props();

  let IconComponent = $state<Component | null>(null);

  onMount(async () => {
    // Load icon if specified in config and using icon-info variant
    if (config.icon && variant === 'icon-info') {
      IconComponent = await loadIcon(config.icon);
    }
  });

  let displayValue = $derived.by(() => {
    if (!data?.value) return '-';
    const val = data.value;
    if (typeof val === 'number' && config.decimals !== undefined) {
      return val.toFixed(config.decimals);
    }
    return String(val);
  });

  let changePercent = $derived.by(() => {
    if (data?.change !== undefined) return data.change;
    if (data?.previousValue !== undefined && data?.value !== undefined) {
      const current = Number(data.value);
      const previous = Number(data.previousValue);
      if (previous !== 0) {
        return ((current - previous) / previous) * 100;
      }
    }
    return undefined;
  });
</script>

{#if variant === 'icon-info'}
  <IconInfoDisplay
    label={config.label}
    value={displayValue}
    unit={config.unit}
    sublabel={data?.timestamp}
    icon={IconComponent}
  />
{:else}
  <InfoDisplay
    label={config.label}
    value={displayValue}
    unit={config.unit}
    prefix={config.prefix}
    change={changePercent}
    sublabel={data?.timestamp}
  />
{/if}
