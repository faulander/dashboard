/**
 * Date and time formatting utilities
 */

import type { DatetimeConfig } from '$lib/types/config';

/**
 * Date format style options
 */
type DateFormatStyle = 'full' | 'long' | 'medium' | 'short';

/**
 * Formats the current date according to configuration
 *
 * @param config - Datetime configuration
 * @param date - Optional date to format (defaults to current time)
 * @returns Formatted date string
 *
 * @example
 * formatDate({ locale: 'en-US', dateFormat: 'full' })
 * // Returns "Wednesday, February 4, 2026"
 */
export function formatDate(config: DatetimeConfig, date: Date = new Date()): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: getWeekdayStyle(config.dateFormat),
    year: 'numeric',
    month: getMonthStyle(config.dateFormat),
    day: 'numeric'
  };

  try {
    return new Intl.DateTimeFormat(config.locale, options).format(date);
  } catch {
    // Fallback to default locale if invalid
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}

/**
 * Formats the current time according to configuration
 *
 * @param config - Datetime configuration
 * @param date - Optional date to format (defaults to current time)
 * @returns Formatted time string
 *
 * @example
 * formatTime({ locale: 'en-US', hour12: false, showSeconds: true })
 * // Returns "14:30:45"
 */
export function formatTime(config: DatetimeConfig, date: Date = new Date()): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: config.hour12
  };

  if (config.showSeconds) {
    options.second = '2-digit';
  }

  try {
    return new Intl.DateTimeFormat(config.locale, options).format(date);
  } catch {
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}

/**
 * Gets weekday style based on date format
 */
function getWeekdayStyle(format: DateFormatStyle): 'long' | 'short' | 'narrow' | undefined {
  switch (format) {
    case 'full':
      return 'long';
    case 'long':
      return 'long';
    case 'medium':
      return 'short';
    case 'short':
      return undefined;
  }
}

/**
 * Gets month style based on date format
 */
function getMonthStyle(format: DateFormatStyle): 'long' | 'short' | 'narrow' | '2-digit' | 'numeric' {
  switch (format) {
    case 'full':
      return 'long';
    case 'long':
      return 'long';
    case 'medium':
      return 'short';
    case 'short':
      return 'numeric';
  }
}

/**
 * Gets the current time as hours, minutes, seconds
 *
 * @param date - Optional date (defaults to current time)
 * @returns Object with hours, minutes, seconds
 */
export function getTimeParts(date: Date = new Date()): {
  hours: number;
  minutes: number;
  seconds: number;
} {
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  };
}

/**
 * Pads a number with leading zeros
 *
 * @param num - Number to pad
 * @param length - Desired length
 * @returns Zero-padded string
 */
export function padZero(num: number, length: number = 2): string {
  return num.toString().padStart(length, '0');
}
