import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { CategoryDataPoint } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/utils/formatCurrency';

interface CategoryBreakdownProps {
  data: CategoryDataPoint[];
  isLoading: boolean;
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: CategoryDataPoint }> }) {
  if (!active || !payload || !payload[0]) return null;
  const item = payload[0].payload;

  return (
    <div className="bg-card rounded-xl p-3 shadow-lg border border-border">
      <p className="text-sm font-medium text-foreground">{item.category}</p>
      <p className="text-xs text-muted-foreground">
        {formatCurrency(item.amount)} ({item.percentage}%)
      </p>
    </div>
  );
}

export function CategoryBreakdown({ data, isLoading }: CategoryBreakdownProps) {
  if (isLoading) {
    return <Skeleton className="h-80 rounded-3xl" />;
  }

  const totalExpenses = data.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="bg-card rounded-3xl p-6 shadow-[var(--shadow)]">
      <h3 className="text-base font-medium text-foreground mb-6">Category Breakdown</h3>
      <div className="flex flex-col items-center">
        <div className="relative w-full" style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={2}
                dataKey="amount"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center total */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-muted-foreground">Total</span>
            <span className="text-lg font-semibold text-foreground">{formatCurrency(totalExpenses)}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-4 w-full">
          {data.slice(0, 6).map((item) => (
            <div key={item.category} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-muted-foreground truncate">{item.category}</span>
              <span className="text-xs font-medium text-foreground ml-auto">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
