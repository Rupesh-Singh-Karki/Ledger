import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { MonthlyDataPoint } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/utils/formatCurrency';

interface BalanceTrendChartProps {
  data: MonthlyDataPoint[];
  isLoading: boolean;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) {
  if (!active || !payload) return null;

  return (
    <div className="bg-card rounded-xl p-3 shadow-lg border border-border">
      <p className="text-xs text-muted-foreground mb-2">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-sm font-medium" style={{ color: entry.color }}>
          {entry.dataKey === 'income' ? 'Income' : entry.dataKey === 'expenses' ? 'Expenses' : 'Balance'}:{' '}
          {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
}

export function BalanceTrendChart({ data, isLoading }: BalanceTrendChartProps) {
  if (isLoading) {
    return <Skeleton className="h-80 rounded-3xl" />;
  }

  return (
    <div className="bg-gradient-to-br from-card/80 to-card/30 backdrop-blur-xl border border-border/50 rounded-3xl p-6 shadow-sm transition-all duration-300 hover:shadow-md relative overflow-hidden group">
      <div className="absolute top-0 left-0 -ml-16 -mt-16 w-48 h-48 bg-income/5 rounded-full blur-3xl group-hover:bg-income/10 transition-colors duration-500 pointer-events-none" />
      <h3 className="relative z-10 text-base font-medium text-foreground mb-6">Balance Trend</h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: string) => value.split(' ')[0]}
          />
          <YAxis
            tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => `$${(value / 1000).toFixed(0)}k`}
            width={50}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#2DD4BF"
            strokeWidth={2}
            fill="url(#incomeGradient)"
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#60A5FA"
            strokeWidth={2}
            fill="url(#expenseGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
