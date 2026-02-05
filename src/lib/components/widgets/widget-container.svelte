<script lang="ts">
  /**
   * Widget container component
   * Handles dynamic loading, data fetching, and auto-refresh for widgets
   */
  import { onMount } from 'svelte';
  import { widgetComponents, isValidWidgetType, getDefaultVariant } from './widget-registry';
  import type { ClientWidgetConfig } from '$lib/types/config';

  interface Props {
    widget: ClientWidgetConfig;
  }

  let { widget }: Props = $props();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let WidgetComponent = $state<any>(null);
  let widgetData = $state<unknown>(null);
  let loading = $state(true);
  let error = $state<string | null>(null);

  // Determine the display variant
  let variant = $derived(widget.variant || getDefaultVariant(widget.type));

  // Load widget component dynamically
  onMount(async () => {
    if (!isValidWidgetType(widget.type)) {
      error = `Unknown widget type: ${widget.type}`;
      loading = false;
      return;
    }

    try {
      const module = await widgetComponents[widget.type]();
      WidgetComponent = module.default;
    } catch (e) {
      error = `Failed to load widget: ${widget.type}`;
      console.error(e);
    }

    loading = false;
  });

  // Auto-refresh data fetching
  $effect(() => {
    if (!widget.refreshInterval) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/widget/${widget.type}`);
        if (response.ok) {
          widgetData = await response.json();
        }
      } catch (e) {
        console.error(`Widget ${widget.type} fetch failed:`, e);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, widget.refreshInterval * 1000);

    return () => clearInterval(interval);
  });
</script>

<div class="widget widget-{widget.position}">
  {#if loading}
    <div class="animate-pulse text-muted-foreground text-sm">Loading...</div>
  {:else if error}
    <div class="text-destructive text-sm">{error}</div>
  {:else if WidgetComponent}
    <WidgetComponent config={widget.config} data={widgetData} {variant} />
  {/if}
</div>
