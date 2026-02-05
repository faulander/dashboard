/**
 * Time-based greeting utilities with internationalization support
 */

/**
 * Greeting messages for different times of day
 */
interface GreetingMessages {
  morning: string;
  afternoon: string;
  evening: string;
  night: string;
}

/**
 * Localized greeting messages
 */
const greetings: Record<string, GreetingMessages> = {
  en: {
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    night: 'Good Night'
  },
  de: {
    morning: 'Guten Morgen',
    afternoon: 'Guten Tag',
    evening: 'Guten Abend',
    night: 'Gute Nacht'
  },
  fr: {
    morning: 'Bonjour',
    afternoon: 'Bon après-midi',
    evening: 'Bonsoir',
    night: 'Bonne nuit'
  },
  es: {
    morning: 'Buenos días',
    afternoon: 'Buenas tardes',
    evening: 'Buenas noches',
    night: 'Buenas noches'
  },
  it: {
    morning: 'Buongiorno',
    afternoon: 'Buon pomeriggio',
    evening: 'Buonasera',
    night: 'Buonanotte'
  },
  pt: {
    morning: 'Bom dia',
    afternoon: 'Boa tarde',
    evening: 'Boa noite',
    night: 'Boa noite'
  },
  nl: {
    morning: 'Goedemorgen',
    afternoon: 'Goedemiddag',
    evening: 'Goedenavond',
    night: 'Goedenacht'
  },
  pl: {
    morning: 'Dzień dobry',
    afternoon: 'Dzień dobry',
    evening: 'Dobry wieczór',
    night: 'Dobranoc'
  },
  ru: {
    morning: 'Доброе утро',
    afternoon: 'Добрый день',
    evening: 'Добрый вечер',
    night: 'Доброй ночи'
  },
  ja: {
    morning: 'おはようございます',
    afternoon: 'こんにちは',
    evening: 'こんばんは',
    night: 'おやすみなさい'
  },
  zh: {
    morning: '早上好',
    afternoon: '下午好',
    evening: '晚上好',
    night: '晚安'
  },
  ko: {
    morning: '좋은 아침이에요',
    afternoon: '안녕하세요',
    evening: '좋은 저녁이에요',
    night: '안녕히 주무세요'
  }
};

/**
 * Time of day periods (24-hour format)
 */
const TIME_PERIODS = {
  MORNING_START: 5,
  AFTERNOON_START: 12,
  EVENING_START: 17,
  NIGHT_START: 21
} as const;

/**
 * Gets the current time period based on hour
 *
 * @param hour - Hour in 24-hour format (0-23)
 * @returns Time period key
 */
function getTimePeriod(hour: number): keyof GreetingMessages {
  if (hour >= TIME_PERIODS.MORNING_START && hour < TIME_PERIODS.AFTERNOON_START) {
    return 'morning';
  }
  if (hour >= TIME_PERIODS.AFTERNOON_START && hour < TIME_PERIODS.EVENING_START) {
    return 'afternoon';
  }
  if (hour >= TIME_PERIODS.EVENING_START && hour < TIME_PERIODS.NIGHT_START) {
    return 'evening';
  }
  return 'night';
}

/**
 * Gets a localized greeting based on current time
 *
 * @param locale - Locale code (e.g., 'en', 'de', 'fr')
 * @param date - Optional date to use (defaults to current time)
 * @returns Localized greeting string
 *
 * @example
 * getGreeting('en') // Returns "Good Morning" at 9am
 * getGreeting('de') // Returns "Guten Abend" at 7pm
 */
export function getGreeting(locale: string = 'en', date: Date = new Date()): string {
  const hour = date.getHours();
  const period = getTimePeriod(hour);

  // Get messages for locale, fallback to English
  const messages = greetings[locale] || greetings['en'];

  return messages[period];
}

/**
 * Gets all available greeting locales
 *
 * @returns Array of available locale codes
 */
export function getAvailableLocales(): string[] {
  return Object.keys(greetings);
}

/**
 * Checks if a locale is supported
 *
 * @param locale - Locale code to check
 * @returns True if locale is supported
 */
export function isLocaleSupported(locale: string): boolean {
  return locale in greetings;
}
