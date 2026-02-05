/**
 * Widget data proxy API endpoint
 * Fetches data from external APIs on behalf of widgets
 * Keeps API keys server-side for security
 */

import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';
import { getServerConfig } from '$lib/server/config';
import type {
  WeatherWidgetConfig,
  CustomWidgetConfig,
  InfoWidgetConfig,
  ChartWidgetConfig
} from '$lib/types/widgets';

/**
 * Fetches weather data from OpenWeatherMap API
 */
async function fetchWeatherData(config: WeatherWidgetConfig) {
  const { apiKey, location, units } = config;

  if (!apiKey) {
    return { error: 'Weather API key not configured' };
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=${units}&appid=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather API returned ${response.status}`);
    }

    const data = await response.json();

    return {
      temperature: data.main.temp,
      condition: data.weather[0].main,
      description: data.weather[0].description,
      location: data.name,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      feelsLike: data.main.feels_like
    };
  } catch (e) {
    console.error('Weather fetch error:', e);
    return { error: 'Failed to fetch weather data' };
  }
}

/**
 * Fetches data from a custom API endpoint
 */
async function fetchCustomData(config: CustomWidgetConfig) {
  const { apiEndpoint, apiKey, headers } = config;

  if (!apiEndpoint) {
    return { error: 'Custom API endpoint not configured' };
  }

  try {
    const requestHeaders: Record<string, string> = {
      Accept: 'application/json',
      ...headers
    };

    if (apiKey) {
      requestHeaders['Authorization'] = `Bearer ${apiKey}`;
    }

    const response = await fetch(apiEndpoint, {
      headers: requestHeaders
    });

    if (!response.ok) {
      throw new Error(`Custom API returned ${response.status}`);
    }

    return await response.json();
  } catch (e) {
    console.error('Custom API fetch error:', e);
    return { error: 'Failed to fetch custom data' };
  }
}

/**
 * Fetches data for info widget
 */
async function fetchInfoData(config: InfoWidgetConfig) {
  const { apiEndpoint, apiKey, headers, valueKey } = config;

  if (!apiEndpoint) {
    return { error: 'Info API endpoint not configured' };
  }

  try {
    const requestHeaders: Record<string, string> = {
      Accept: 'application/json',
      ...headers
    };

    if (apiKey) {
      requestHeaders['Authorization'] = `Bearer ${apiKey}`;
    }

    const response = await fetch(apiEndpoint, {
      headers: requestHeaders
    });

    if (!response.ok) {
      throw new Error(`Info API returned ${response.status}`);
    }

    const data = await response.json();

    // Extract value using the configured key (supports nested paths like "data.price")
    const value = getNestedValue(data, valueKey);

    return {
      value,
      timestamp: new Date().toISOString()
    };
  } catch (e) {
    console.error('Info API fetch error:', e);
    return { error: 'Failed to fetch info data' };
  }
}

/**
 * Fetches data for chart widget
 */
async function fetchChartData(config: ChartWidgetConfig) {
  const { apiEndpoint, apiKey, headers, dataKey, labelKey, maxDataPoints } = config;

  if (!apiEndpoint) {
    return { error: 'Chart API endpoint not configured' };
  }

  try {
    const requestHeaders: Record<string, string> = {
      Accept: 'application/json',
      ...headers
    };

    if (apiKey) {
      requestHeaders['Authorization'] = `Bearer ${apiKey}`;
    }

    const response = await fetch(apiEndpoint, {
      headers: requestHeaders
    });

    if (!response.ok) {
      throw new Error(`Chart API returned ${response.status}`);
    }

    const data = await response.json();

    // Handle both array and object responses
    let dataArray: unknown[] = Array.isArray(data)
      ? data
      : (getNestedValue(data, dataKey) as unknown[]) || [];

    if (!Array.isArray(dataArray)) {
      dataArray = [dataArray];
    }

    // Limit data points if configured
    if (maxDataPoints && dataArray.length > maxDataPoints) {
      dataArray = dataArray.slice(-maxDataPoints);
    }

    // Extract values and labels
    const values: number[] = dataArray.map((item: unknown) => {
      if (typeof item === 'number') return item;
      if (typeof item === 'object' && item !== null) {
        const val = getNestedValue(item, dataKey);
        return typeof val === 'number' ? val : 0;
      }
      return 0;
    });

    const labels: string[] = labelKey
      ? dataArray.map((item: unknown) => {
          if (typeof item === 'object' && item !== null) {
            return String(getNestedValue(item, labelKey) ?? '');
          }
          return '';
        })
      : [];

    return {
      values,
      labels,
      currentValue: values[values.length - 1],
      minValue: Math.min(...values),
      maxValue: Math.max(...values)
    };
  } catch (e) {
    console.error('Chart API fetch error:', e);
    return { error: 'Failed to fetch chart data' };
  }
}

/**
 * Helper to get nested values from an object using dot notation
 * @example getNestedValue({ data: { price: 100 } }, 'data.price') => 100
 */
function getNestedValue(obj: unknown, path: string): unknown {
  if (!path || typeof obj !== 'object' || obj === null) return obj;

  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined) return undefined;
    if (typeof current === 'object') {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }

  return current;
}

export const GET: RequestHandler = async ({ params }) => {
  const { type } = params;
  const config = getServerConfig();

  // Find widget configuration
  const widget = config.widgets.find((w) => w.type === type);

  if (!widget) {
    throw error(404, `Widget type "${type}" not found in configuration`);
  }

  // Fetch data based on widget type
  switch (type) {
    case 'weather':
      return json(await fetchWeatherData(widget.config as unknown as WeatherWidgetConfig));

    case 'info':
      return json(await fetchInfoData(widget.config as unknown as InfoWidgetConfig));

    case 'chart':
      return json(await fetchChartData(widget.config as unknown as ChartWidgetConfig));

    case 'custom':
      return json(await fetchCustomData(widget.config as unknown as CustomWidgetConfig));

    case 'search':
    case 'clock':
      // These widgets don't need server-side data
      return json({ message: 'No server data needed for this widget type' });

    default:
      throw error(400, `Unsupported widget type: ${type}`);
  }
};
