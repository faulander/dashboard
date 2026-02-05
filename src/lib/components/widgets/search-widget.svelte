<script lang="ts">
  /**
   * Search widget component
   * Provides a search bar with configurable search engine
   */
  import { Search } from '@lucide/svelte';
  import type { SearchWidgetConfig } from '$lib/types/widgets';

  interface Props {
    config: SearchWidgetConfig;
    data?: unknown;
  }

  let { config }: Props = $props();

  let query = $state('');

  /**
   * Search engine URL templates
   */
  const searchEngines: Record<string, string> = {
    google: 'https://www.google.com/search?q=',
    duckduckgo: 'https://duckduckgo.com/?q=',
    brave: 'https://search.brave.com/search?q=',
    bing: 'https://www.bing.com/search?q='
  };

  /**
   * Gets the search URL for the configured engine
   */
  function getSearchUrl(searchQuery: string): string {
    if (config.engine === 'custom' && config.customUrl) {
      return config.customUrl + encodeURIComponent(searchQuery);
    }
    const baseUrl = searchEngines[config.engine] || searchEngines.duckduckgo;
    return baseUrl + encodeURIComponent(searchQuery);
  }

  /**
   * Handles search form submission
   */
  function handleSubmit(event: Event) {
    event.preventDefault();
    if (query.trim()) {
      window.open(getSearchUrl(query.trim()), '_blank');
      query = '';
    }
  }
</script>

<form onsubmit={handleSubmit} class="w-full max-w-xl">
  <div class="relative">
    <Search
      class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
    />
    <input
      type="text"
      bind:value={query}
      placeholder={config.placeholder || 'Search...'}
      class="h-12 w-full rounded-lg border border-input bg-background pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
    />
  </div>
</form>
