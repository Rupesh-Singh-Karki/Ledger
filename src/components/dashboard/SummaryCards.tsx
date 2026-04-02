import type { DashboardSummary } from '@/types';
import { SummaryCard } from './SummaryCard';
import { Wallet, TrendingUp, CreditCard } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface SummaryCardsProps {
  summary: DashboardSummary | null;
  isLoading: boolean;
}

export function SummaryCards({ summary, isLoading }: SummaryCardsProps) {
  if (isLoading || !summary) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-36 rounded-3xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SummaryCard
        label="Total Balance"
        value={summary.totalBalance}
        change={summary.balanceChange}
        icon={<Wallet className="h-5 w-5 text-income" />}
        valueColor="text-foreground"
      />
      <SummaryCard
        label="Total Income"
        value={summary.totalIncome}
        change={summary.incomeChange}
        icon={<TrendingUp className="h-5 w-5 text-income" />}
        valueColor="text-income"
      />
      <SummaryCard
        label="Total Expenses"
        value={summary.totalExpenses}
        change={summary.expenseChange}
        icon={<CreditCard className="h-5 w-5 text-expense" />}
        valueColor="text-expense"
      />
    </div>
  );
}
