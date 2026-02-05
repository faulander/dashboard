<script lang="ts">
  /**
   * DateTime display component
   * Shows current date and time with configurable formatting
   */
  import { formatDate, formatTime } from '$lib/utils/datetime';
  import type { DatetimeConfig } from '$lib/types/config';
  import { onMount } from 'svelte';

  interface Props {
    config: DatetimeConfig;
  }

  let { config }: Props = $props();

  let currentDate = $state(new Date());

  // Update time every second if showing seconds, otherwise every minute
  onMount(() => {
    const intervalMs = config.showSeconds ? 1000 : 60000;

    const interval = setInterval(() => {
      currentDate = new Date();
    }, intervalMs);

    return () => clearInterval(interval);
  });

  let formattedDate = $derived(formatDate(config, currentDate));
  let formattedTime = $derived(formatTime(config, currentDate));
</script>

<div class="flex flex-col gap-1 text-muted-foreground uppercase tracking-widest">
  <time class="text-sm font-medium">
    {formattedDate} - {formattedTime}
  </time>
</div>
