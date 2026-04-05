import { useInsights } from '@/hooks/useInsights';
import { InsightsList } from '@/components/insights/InsightsList';
import { FinancialQueryEngine } from '@/components/insights/FinancialQueryEngine';

export default function InsightsPage() {
  const { insights, isLoading } = useInsights();

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Financial Insights</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Computed insights based on your transaction history
        </p>
      </div>

      <FinancialQueryEngine />

      <InsightsList insights={insights} isLoading={isLoading} />
    </div>
  );
}
