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
    <div className="bg-gradient-to-br from-card/80 to-card/30 backdrop-blur-xl border border-border/50 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
      {/* Subtle orb effect similar to pro card */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-income/5 rounded-full blur-3xl group-hover:bg-income/10 transition-colors duration-500 pointer-events-none" />
      <div className="relative z-10 flex items-center justify-between mb-4">
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
