import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TrendIndicatorProps {
  trend: 'up' | 'down' | 'neutral';
  value: string;
  className?: string;
}

export function TrendIndicator({ trend, value, className = '' }: TrendIndicatorProps) {
  const Icon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const colorClass = trend === 'up' ? 'text-income' : trend === 'down' ? 'text-muted-foreground' : 'text-muted-foreground';

  return (
    <div className={`flex items-center gap-1 text-xs font-medium ${colorClass} ${className}`}>
      <Icon className="h-3 w-3" />
      <span>{value}</span>
    </div>
  );
}
