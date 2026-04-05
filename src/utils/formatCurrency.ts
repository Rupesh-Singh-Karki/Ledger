import { CURRENCIES } from '@/data/currencies';
import { useStore } from '@/store';
import type { CurrencyCode } from '@/types';

/**
 * Format a USD amount into the user's selected currency with conversion.
 * All stored amounts are in USD — this function converts on display.
 */
export function formatCurrency(amountInUSD: number, overrideCurrency?: CurrencyCode): string {
  const currencyCode = overrideCurrency ?? useStore.getState().currency;
  const config = CURRENCIES[currencyCode];

  const convertedAmount = amountInUSD * config.rate;

  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: config.code === 'JPY' ? 0 : 2,
    maximumFractionDigits: config.code === 'JPY' ? 0 : 2,
  }).format(convertedAmount);
}

/**
 * Convert a USD amount to the selected currency (raw number).
 */
export function convertCurrency(amountInUSD: number, targetCurrency?: CurrencyCode): number {
  const currencyCode = targetCurrency ?? useStore.getState().currency;
  const config = CURRENCIES[currencyCode];
  return amountInUSD * config.rate;
}
