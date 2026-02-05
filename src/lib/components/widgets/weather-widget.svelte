<script lang="ts">
  /**
   * Weather widget component
   * Displays current weather data from configured API
   */
  import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind } from '@lucide/svelte';
  import type { WeatherWidgetConfig, WeatherWidgetData } from '$lib/types/widgets';
  import type { Component } from 'svelte';

  interface Props {
    config: WeatherWidgetConfig;
    data?: WeatherWidgetData | null;
  }

  let { config, data }: Props = $props();

  /**
   * Map weather conditions to icons
   */
  const weatherIcons: Record<string, Component> = {
    clear: Sun,
    sunny: Sun,
    cloudy: Cloud,
    clouds: Cloud,
    rain: CloudRain,
    drizzle: CloudRain,
    snow: CloudSnow,
    thunderstorm: CloudLightning,
    wind: Wind
  };

  /**
   * Gets the appropriate icon for weather condition
   */
  function getWeatherIcon(condition: string): Component {
    const normalizedCondition = condition.toLowerCase();
    for (const [key, icon] of Object.entries(weatherIcons)) {
      if (normalizedCondition.includes(key)) {
        return icon;
      }
    }
    return Cloud;
  }

  let WeatherIcon = $derived(data ? getWeatherIcon(data.condition) : Cloud);
  let temperatureUnit = $derived(config.units === 'imperial' ? '°F' : '°C');
</script>

{#if data}
  <div class="flex items-center gap-4 rounded-lg bg-card/50 p-4">
    <WeatherIcon class="h-10 w-10 text-primary" />
    <div>
      <p class="text-2xl font-bold">
        {Math.round(data.temperature)}{temperatureUnit}
      </p>
      <p class="text-sm text-muted-foreground">
        {data.description || data.condition}
      </p>
      <p class="text-xs text-muted-foreground">
        {data.location}
      </p>
    </div>
  </div>
{:else}
  <div class="flex items-center gap-4 rounded-lg bg-card/50 p-4">
    <Cloud class="h-10 w-10 text-muted-foreground" />
    <div>
      <p class="text-sm text-muted-foreground">Weather data unavailable</p>
      <p class="text-xs text-muted-foreground">Check API configuration</p>
    </div>
  </div>
{/if}
