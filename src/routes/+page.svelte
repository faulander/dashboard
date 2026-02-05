<script lang="ts">
  /**
   * Main dashboard page
   * Displays greeting, datetime, sections, and widgets
   */
  import type { PageData } from './$types';
  import Greeting from '$lib/components/dashboard/greeting.svelte';
  import DatetimeDisplay from '$lib/components/dashboard/datetime-display.svelte';
  import SectionsGrid from '$lib/components/dashboard/sections-grid.svelte';
  import WidgetContainer from '$lib/components/widgets/widget-container.svelte';

  let { data }: { data: PageData } = $props();

  // Filter widgets by position
  let topLeftWidgets = $derived(data.config.widgets.filter((w) => w.position === 'top-left'));
  let topCenterWidgets = $derived(data.config.widgets.filter((w) => w.position === 'top-center'));
  let topRightWidgets = $derived(data.config.widgets.filter((w) => w.position === 'top-right'));
  let bottomLeftWidgets = $derived(data.config.widgets.filter((w) => w.position === 'bottom-left'));
  let bottomCenterWidgets = $derived(
    data.config.widgets.filter((w) => w.position === 'bottom-center')
  );
  let bottomRightWidgets = $derived(
    data.config.widgets.filter((w) => w.position === 'bottom-right')
  );

  let hasTopWidgets = $derived(
    topLeftWidgets.length > 0 || topCenterWidgets.length > 0 || topRightWidgets.length > 0
  );
  let hasBottomWidgets = $derived(
    bottomLeftWidgets.length > 0 || bottomCenterWidgets.length > 0 || bottomRightWidgets.length > 0
  );
</script>

<main class="min-h-screen p-6 md:p-8 lg:p-12 flex flex-col">
  <!-- Top widgets row -->
  {#if hasTopWidgets}
    <div class="flex items-start justify-between gap-4 mb-8">
      <div class="flex gap-4">
        {#each topLeftWidgets as widget (widget.type + widget.position)}
          <WidgetContainer {widget} />
        {/each}
      </div>

      <div class="flex gap-4 flex-1 justify-center">
        {#each topCenterWidgets as widget (widget.type + widget.position)}
          <WidgetContainer {widget} />
        {/each}
      </div>

      <div class="flex gap-4">
        {#each topRightWidgets as widget (widget.type + widget.position)}
          <WidgetContainer {widget} />
        {/each}
      </div>
    </div>
  {/if}

  <!-- Header with datetime and greeting -->
  <header class="mb-12 space-y-4">
    {#if data.config.display.datetime.enabled}
      <DatetimeDisplay config={data.config.display.datetime} />
    {/if}

    {#if data.config.display.greeting.enabled}
      <Greeting locale={data.config.display.greeting.locale} />
    {/if}
  </header>

  <!-- Main content area -->
  <div class="flex-1 space-y-12">
    <!-- Sections grid -->
    {#if data.config.sections.length > 0}
      <SectionsGrid
        sections={data.config.sections}
        columns={data.config.display.columns}
        healthCheckConfig={data.config.display.healthCheck}
      />
    {:else}
      <div class="text-center text-muted-foreground">
        <p>No sections configured.</p>
        <p class="text-sm mt-2">Edit config/dashboard.yaml to add sections.</p>
      </div>
    {/if}
  </div>

  <!-- Bottom widgets row -->
  {#if hasBottomWidgets}
    <div class="flex items-end justify-between gap-4 mt-12">
      <div class="flex gap-4">
        {#each bottomLeftWidgets as widget (widget.type + widget.position)}
          <WidgetContainer {widget} />
        {/each}
      </div>

      <div class="flex gap-4 flex-1 justify-center">
        {#each bottomCenterWidgets as widget (widget.type + widget.position)}
          <WidgetContainer {widget} />
        {/each}
      </div>

      <div class="flex gap-4">
        {#each bottomRightWidgets as widget (widget.type + widget.position)}
          <WidgetContainer {widget} />
        {/each}
      </div>
    </div>
  {/if}
</main>
