import type { CurrencyConfig, CurrencyCode } from '@/types';

// Conversion rates relative to USD (approximate, fixed for demo)
export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', locale: 'en-US', rate: 1 },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', locale: 'de-DE', rate: 0.92 },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', locale: 'en-GB', rate: 0.79 },
  INR: { code: 'INR', name: 'Indian Rupee', symbol: '₹', locale: 'en-IN', rate: 83.5 },
  JPY: { code: 'JPY', name: 'Japanese Yen', symbol: '¥', locale: 'ja-JP', rate: 154.8 },
};

export const CURRENCY_LIST = Object.values(CURRENCIES);
