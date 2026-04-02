import { useDashboardData } from '@/hooks/useDashboardData';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { BalanceTrendChart } from '@/components/dashboard/BalanceTrendChart';
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';

export default function DashboardPage() {
  const { summary, monthlyTrend, categoryBreakdown, isLoading } = useDashboardData();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground mt-1">Overview of your financial activity</p>
      </div>

      <SummaryCards summary={summary} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BalanceTrendChart data={monthlyTrend} isLoading={isLoading} />
        <CategoryBreakdown data={categoryBreakdown} isLoading={isLoading} />
      </div>

      <RecentTransactions isLoading={isLoading} />
    </div>
  );
}
