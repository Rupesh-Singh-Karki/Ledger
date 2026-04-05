import { useDashboardData } from '@/hooks/useDashboardData';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { CardWallet } from '@/components/dashboard/CardWallet';
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

      {/* Charts + Cards & Wallet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 grid grid-cols-1 xl:grid-cols-2 gap-4">
          <BalanceTrendChart data={monthlyTrend} isLoading={isLoading} />
          <CategoryBreakdown data={categoryBreakdown} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-1 h-full">
          <CardWallet isLoading={isLoading} />
        </div>
      </div>

      <RecentTransactions isLoading={isLoading} />
    </div>
  );
}
