<script lang="ts">
  /**
   * Chart display variant
   * Data visualization with simple SVG charts
   */

  interface Props {
    label: string;
    values: number[];
    labels?: string[];
    chartType?: 'line' | 'bar' | 'area' | 'sparkline';
    color?: string;
    currentValue?: number;
    unit?: string;
    showLegend?: boolean;
    height?: number;
  }

  let {
    label,
    values,
    labels = [],
    chartType = 'sparkline',
    color = 'var(--primary)',
    currentValue,
    unit,
    showLegend = false,
    height = 60
  }: Props = $props();

  // Calculate chart dimensions
  const padding = 4;
  const width = 200;

  // Normalize values for SVG coordinates
  let minValue = $derived(Math.min(...values));
  let maxValue = $derived(Math.max(...values));
  let range = $derived(maxValue - minValue || 1);

  function normalizeY(value: number): number {
    return height - padding - ((value - minValue) / range) * (height - padding * 2);
  }

  function getX(index: number): number {
    return padding + (index / (values.length - 1 || 1)) * (width - padding * 2);
  }

  // Generate path for line/area charts
  let linePath = $derived(
    values.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${normalizeY(v)}`).join(' ')
  );

  let areaPath = $derived(
    linePath + ` L ${getX(values.length - 1)} ${height - padding} L ${padding} ${height - padding} Z`
  );

  // Bar chart calculations
  let barWidth = $derived((width - padding * 2) / values.length - 2);
</script>

<div class="flex flex-col gap-2">
  <!-- Header with label and current value -->
  <div class="flex items-baseline justify-between">
    <span class="text-sm text-muted-foreground uppercase tracking-wide">
      {label}
    </span>
    {#if currentValue !== undefined}
      <div class="flex items-baseline gap-1">
        <span class="text-xl font-bold text-foreground">
          {currentValue.toLocaleString()}
        </span>
        {#if unit}
          <span class="text-xs text-muted-foreground">{unit}</span>
        {/if}
      </div>
    {/if}
  </div>

  <!-- Chart SVG -->
  <svg {width} {height} class="w-full" viewBox="0 0 {width} {height}" preserveAspectRatio="none">
    {#if chartType === 'sparkline' || chartType === 'line'}
      <path d={linePath} fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Current value dot -->
      {#if values.length > 0}
        <circle cx={getX(values.length - 1)} cy={normalizeY(values[values.length - 1])} r="3" fill={color} />
      {/if}
    {:else if chartType === 'area'}
      <path d={areaPath} fill={color} fill-opacity="0.2" />
      <path d={linePath} fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    {:else if chartType === 'bar'}
      {#each values as value, i}
        <rect
          x={getX(i) - barWidth / 2}
          y={normalizeY(value)}
          width={barWidth}
          height={height - padding - normalizeY(value)}
          fill={color}
          fill-opacity="0.8"
          rx="2"
        />
      {/each}
    {/if}
  </svg>

  <!-- Legend -->
  {#if showLegend && labels.length > 0}
    <div class="flex justify-between text-xs text-muted-foreground">
      <span>{labels[0]}</span>
      <span>{labels[labels.length - 1]}</span>
    </div>
  {/if}
</div>
