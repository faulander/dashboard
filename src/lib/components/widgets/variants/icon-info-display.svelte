<script lang="ts">
  /**
   * Icon-info display variant
   * Icon with text/value display (for weather, status, etc.)
   */
  import type { Component } from 'svelte';

  interface Props {
    label: string;
    value: string | number;
    unit?: string;
    sublabel?: string;
    icon?: Component | null;
    iconColor?: string;
    size?: 'sm' | 'md' | 'lg';
  }

  let { label, value, unit, sublabel, icon: IconComponent, iconColor = 'text-primary', size = 'md' }: Props = $props();

  let sizeClasses = $derived({
    sm: { icon: 'h-8 w-8', value: 'text-lg', label: 'text-xs', container: 'gap-2 p-2' },
    md: { icon: 'h-10 w-10', value: 'text-2xl', label: 'text-sm', container: 'gap-3 p-3' },
    lg: { icon: 'h-14 w-14', value: 'text-4xl', label: 'text-base', container: 'gap-4 p-4' }
  }[size]);
</script>

<div class="flex items-center {sizeClasses.container} rounded-lg bg-card/50">
  {#if IconComponent}
    <div class="shrink-0 {iconColor}">
      <IconComponent class={sizeClasses.icon} />
    </div>
  {/if}

  <div class="flex flex-col">
    <div class="flex items-baseline gap-1">
      <span class="{sizeClasses.value} font-bold text-foreground">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </span>
      {#if unit}
        <span class="text-sm text-muted-foreground">{unit}</span>
      {/if}
    </div>

    <span class="{sizeClasses.label} text-muted-foreground">
      {label}
    </span>

    {#if sublabel}
      <span class="text-xs text-muted-foreground">{sublabel}</span>
    {/if}
  </div>
</div>
