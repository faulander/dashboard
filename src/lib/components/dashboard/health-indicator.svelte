<script lang="ts">
  /**
   * Health indicator component
   * Shows a small status dot for link health
   */

  interface Props {
    status: 'healthy' | 'unhealthy' | 'checking' | 'unknown';
    responseTime?: number;
    showTooltip?: boolean;
  }

  let { status, responseTime, showTooltip = true }: Props = $props();

  let statusColor = $derived(
    {
      healthy: 'bg-green-500',
      unhealthy: 'bg-red-500',
      checking: 'bg-yellow-500 animate-pulse',
      unknown: 'bg-gray-400'
    }[status]
  );

  let statusText = $derived(
    {
      healthy: 'Online',
      unhealthy: 'Offline',
      checking: 'Checking...',
      unknown: 'Unknown'
    }[status]
  );

  let tooltipText = $derived.by(() => {
    let text = statusText;
    if (responseTime !== undefined && status === 'healthy') {
      text += ` (${responseTime}ms)`;
    }
    return text;
  });
</script>

<span
  class="inline-block h-2 w-2 rounded-full {statusColor}"
  title={showTooltip ? tooltipText : undefined}
  role="status"
  aria-label={statusText}
></span>
