<script lang="ts">
  /**
   * Info display variant
   * Simple text/value display for widgets
   */

  interface Props {
    label: string;
    value: string | number;
    unit?: string;
    prefix?: string;
    sublabel?: string;
    change?: number;
    size?: 'sm' | 'md' | 'lg';
  }

  let { label, value, unit, prefix, sublabel, change, size = 'md' }: Props = $props();

  let sizeClasses = $derived({
    sm: { value: 'text-lg', label: 'text-xs' },
    md: { value: 'text-2xl', label: 'text-sm' },
    lg: { value: 'text-4xl', label: 'text-base' }
  }[size]);

  let changeColor = $derived(
    change === undefined ? '' : change > 0 ? 'text-green-500' : change < 0 ? 'text-red-500' : 'text-muted-foreground'
  );

  let changePrefix = $derived(change !== undefined && change > 0 ? '+' : '');
</script>

<div class="flex flex-col gap-1">
  <span class="{sizeClasses.label} text-muted-foreground uppercase tracking-wide">
    {label}
  </span>

  <div class="flex items-baseline gap-1">
    {#if prefix}
      <span class="{sizeClasses.value} font-bold text-foreground">{prefix}</span>
    {/if}

    <span class="{sizeClasses.value} font-bold text-foreground">
      {typeof value === 'number' ? value.toLocaleString() : value}
    </span>

    {#if unit}
      <span class="text-sm text-muted-foreground">{unit}</span>
    {/if}

    {#if change !== undefined}
      <span class="text-sm {changeColor}">
        {changePrefix}{change.toFixed(1)}%
      </span>
    {/if}
  </div>

  {#if sublabel}
    <span class="text-xs text-muted-foreground">{sublabel}</span>
  {/if}
</div>
