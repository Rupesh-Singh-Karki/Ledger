import { useState, useEffect, useCallback } from 'react';
import { useStore } from '@/store';
import { getDashboardSummary, getMonthlyTrend, getCategoryBreakdown } from '@/api/dashboard';
import type { DashboardSummary, MonthlyDataPoint, CategoryDataPoint } from '@/types';

export function useDashboardData() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [monthlyTrend, setMonthlyTrend] = useState<MonthlyDataPoint[]>([]);
  const [categoryBreakdown, setCategoryBreakdown] = useState<CategoryDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const transactions = useStore((s) => s.transactions);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [summaryData, trendData, breakdownData] = await Promise.all([
        getDashboardSummary(),
        getMonthlyTrend(),
        getCategoryBreakdown(),
      ]);
      setSummary(summaryData);
      setMonthlyTrend(trendData);
      setCategoryBreakdown(breakdownData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  }, [transactions]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { summary, monthlyTrend, categoryBreakdown, isLoading, error };
}
