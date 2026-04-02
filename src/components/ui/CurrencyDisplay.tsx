import { formatCurrency } from '@/utils/formatCurrency';

interface CurrencyDisplayProps {
  amount: number;
  type?: 'income' | 'expense' | 'neutral';
  showSign?: boolean;
  className?: string;
}

export function CurrencyDisplay({ amount, type = 'neutral', showSign = false, className = '' }: CurrencyDisplayProps) {
  const colorClass =
    type === 'income'
      ? 'text-income'
      : type === 'expense'
        ? 'text-expense'
        : 'text-foreground';

  const prefix = showSign ? (type === 'income' ? '+' : type === 'expense' ? '-' : '') : '';

  return (
    <span className={`${colorClass} ${className}`}>
      {prefix}{formatCurrency(amount)}
    </span>
  );
}
