<script lang="ts">
  /**
   * Sections grid component
   * Displays all sections in a responsive grid layout with optional health checking
   */
  import type { Section, HealthCheckResult, HealthCheckConfig } from '$lib/types/config';
  import SectionComponent from './section.svelte';
  import { onMount } from 'svelte';

  interface Props {
    sections: Section[];
    columns?: number;
    healthCheckConfig?: HealthCheckConfig;
  }

  let { sections, columns = 4, healthCheckConfig }: Props = $props();

  let healthResults = $state<Record<string, HealthCheckResult>>({});
  let isChecking = $state(false);

  // Generate grid column class based on config
  let gridClass = $derived(getGridClass(columns));

  function getGridClass(cols: number): string {
    const columnClasses: Record<number, string> = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
      6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
    };
    return columnClasses[cols] || columnClasses[4];
  }

  // Fetch health check results
  async function fetchHealthStatus() {
    if (!healthCheckConfig?.enabled) return;

    isChecking = true;
    try {
      const response = await fetch('/api/health-check');
      if (response.ok) {
        const data = await response.json();
        if (data.results) {
          healthResults = data.results;
        }
      }
    } catch (e) {
      console.error('Failed to fetch health status:', e);
    }
    isChecking = false;
  }

  // Setup health check polling
  onMount(() => {
    if (!healthCheckConfig?.enabled) return;

    // Initial fetch
    fetchHealthStatus();

    // Setup interval for periodic checks
    const interval = setInterval(fetchHealthStatus, healthCheckConfig.interval * 1000);

    return () => clearInterval(interval);
  });

  let showHealthIndicator = $derived(healthCheckConfig?.enabled && healthCheckConfig?.showStatus);
</script>

<div class="grid {gridClass} gap-8 lg:gap-12">
  {#each sections as section (section.name)}
    <SectionComponent
      {section}
      {healthResults}
      showHealthIndicator={showHealthIndicator || false}
    />
  {/each}
</div>
