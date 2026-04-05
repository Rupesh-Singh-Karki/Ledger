import { useState, useCallback } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { CategoryDataPoint } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/utils/formatCurrency';

interface CategoryBreakdownProps {
  data: CategoryDataPoint[];
  isLoading: boolean;
}

export function CategoryBreakdown({ data, isLoading }: CategoryBreakdownProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = useCallback((_: unknown, index: number) => {
    setActiveIndex(index);
  }, []);

  const onPieLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  if (isLoading) {
    return <Skeleton className="h-80 rounded-3xl" />;
  }

  const totalExpenses = data.reduce((sum, d) => sum + d.amount, 0);
  const activeItem = activeIndex !== null ? data[activeIndex] : null;

  return (
    <div className="bg-gradient-to-br from-card/80 to-card/30 backdrop-blur-xl border border-border/50 rounded-3xl p-6 shadow-sm transition-all duration-300 hover:shadow-md relative overflow-hidden group">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-income/5 rounded-full blur-3xl group-hover:bg-income/10 transition-colors duration-500 pointer-events-none" />
      <h3 className="relative z-10 text-base font-medium text-foreground mb-6">Category Breakdown</h3>
      <div className="flex flex-col items-center">
        <div className="relative w-full" style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={activeIndex !== null ? 63 : 65}
                outerRadius={activeIndex !== null ? 102 : 100}
                paddingAngle={2}
                dataKey="amount"
                stroke="none"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={activeIndex !== null && activeIndex !== index ? 0.4 : 1}
                    style={{
                      transition: 'opacity 0.2s ease',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center content — shows hovered category or total */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {activeItem ? (
              <>
                <span className="text-xs text-muted-foreground">{activeItem.category}</span>
                <span className="text-lg font-semibold text-foreground">{formatCurrency(activeItem.amount)}</span>
                <span className="text-xs text-muted-foreground">{activeItem.percentage}%</span>
              </>
            ) : (
              <>
                <span className="text-xs text-muted-foreground">Total</span>
                <span className="text-lg font-semibold text-foreground">{formatCurrency(totalExpenses)}</span>
              </>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-4 w-full">
          {data.slice(0, 6).map((item, index) => (
            <div
              key={item.category}
              className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-colors duration-150 cursor-default ${activeIndex === index ? 'bg-card-hover' : ''
                }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
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
