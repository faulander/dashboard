<script lang="ts">
  /**
   * Greeting component
   * Displays time-based greeting with localization support
   */
  import { getGreeting } from '$lib/utils/greeting';
  import { onMount } from 'svelte';

  interface Props {
    locale?: string;
  }

  let { locale = 'en' }: Props = $props();

  // Track current time to trigger re-computation
  let currentTime = $state(new Date());

  // Derive greeting from locale and current time
  let greeting = $derived(getGreeting(locale, currentTime));

  // Update time every minute to handle time period changes
  onMount(() => {
    const interval = setInterval(() => {
      currentTime = new Date();
    }, 60000);

    return () => clearInterval(interval);
  });
</script>

<h1 class="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
  {greeting}!
</h1>
