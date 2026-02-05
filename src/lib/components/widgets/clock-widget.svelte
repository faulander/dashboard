<script lang="ts">
  /**
   * Clock widget component
   * Displays analog and/or digital clock
   */
  import { onMount } from 'svelte';
  import type { ClockWidgetConfig } from '$lib/types/widgets';

  interface Props {
    config: ClockWidgetConfig;
    data?: unknown;
  }

  let { config }: Props = $props();

  let currentTime = $state(new Date());

  onMount(() => {
    const interval = setInterval(() => {
      currentTime = new Date();
    }, 1000);

    return () => clearInterval(interval);
  });

  // Calculate clock hands rotation
  let hours = $derived(currentTime.getHours() % 12);
  let minutes = $derived(currentTime.getMinutes());
  let seconds = $derived(currentTime.getSeconds());

  let hourRotation = $derived((hours + minutes / 60) * 30);
  let minuteRotation = $derived((minutes + seconds / 60) * 6);
  let secondRotation = $derived(seconds * 6);

  // Digital time display
  let digitalTime = $derived(
    currentTime.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  );
</script>

<div class="flex flex-col items-center gap-2">
  {#if config.showAnalog}
    <div class="relative h-24 w-24">
      <!-- Clock face -->
      <svg viewBox="0 0 100 100" class="h-full w-full">
        <!-- Clock circle -->
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="text-border"
        />

        <!-- Hour markers -->
        {#each Array(12) as _, i}
          <line
            x1="50"
            y1="8"
            x2="50"
            y2="12"
            stroke="currentColor"
            stroke-width="2"
            transform="rotate({i * 30} 50 50)"
            class="text-muted-foreground"
          />
        {/each}

        <!-- Hour hand -->
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="26"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          transform="rotate({hourRotation} 50 50)"
          class="text-foreground"
        />

        <!-- Minute hand -->
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="16"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          transform="rotate({minuteRotation} 50 50)"
          class="text-foreground"
        />

        <!-- Second hand -->
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="14"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          transform="rotate({secondRotation} 50 50)"
          class="text-primary"
        />

        <!-- Center dot -->
        <circle cx="50" cy="50" r="3" fill="currentColor" class="text-primary" />
      </svg>
    </div>
  {/if}

  {#if config.showDate || !config.showAnalog}
    <p class="text-xl font-mono font-medium text-foreground">
      {digitalTime}
    </p>
  {/if}

  {#if config.showDate}
    <p class="text-sm text-muted-foreground">
      {currentTime.toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      })}
    </p>
  {/if}
</div>
