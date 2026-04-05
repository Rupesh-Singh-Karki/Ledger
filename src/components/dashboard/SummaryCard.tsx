import { formatCurrency } from '@/utils/formatCurrency';
import { TrendIndicator } from '@/components/ui/TrendIndicator';

interface SummaryCardProps {
  label: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  valueColor?: string;
}

export function SummaryCard({ label, value, change, icon, valueColor = 'text-foreground' }: SummaryCardProps) {
  const trend = change >= 0 ? 'up' : 'down';
  const trendValue = `${change >= 0 ? '+' : ''}${Math.round(Math.abs(change))}% vs last month`;

  return (
    <div className="bg-card rounded-3xl p-6 shadow-[var(--shadow)] hover:bg-card-hover transition-colors duration-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
        <div className="h-10 w-10 rounded-full bg-income/15 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <p className={`text-3xl font-semibold ${value < 0 ? 'text-negative' : valueColor} mb-2`}>
        {formatCurrency(value)}
      </p>
      <TrendIndicator trend={trend} value={trendValue} />
    </div>
  );
}
