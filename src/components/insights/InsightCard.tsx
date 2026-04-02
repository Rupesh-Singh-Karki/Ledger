import type { Insight } from '@/types';
import { TrendIndicator } from '@/components/ui/TrendIndicator';
import {
  PieChart,
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowUpRight,
} from 'lucide-react';

interface InsightCardProps {
  insight: Insight;
}

const iconMap: Record<string, React.ElementType> = {
  PieChart,
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowUpRight,
};

export function InsightCard({ insight }: InsightCardProps) {
  const Icon = iconMap[insight.icon] || PieChart;

  return (
    <div className="bg-card rounded-3xl p-6 shadow-[var(--shadow)] hover:bg-card-hover transition-colors duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="h-10 w-10 rounded-full bg-income/15 flex items-center justify-center">
          <Icon className="h-5 w-5 text-income" />
        </div>
        {insight.trend && insight.trendValue && (
          <TrendIndicator trend={insight.trend} value={insight.trendValue} />
        )}
      </div>

      <h4 className="text-base font-medium text-foreground mb-1">{insight.title}</h4>
      <p className="text-2xl font-semibold text-foreground mb-2">{insight.value}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
    </div>
  );
}
