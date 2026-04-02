import { useState, useEffect, useCallback } from 'react';
import { useStore } from '@/store';
import { getInsights } from '@/api/dashboard';
import type { Insight } from '@/types';

export function useInsights() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const transactions = useStore((s) => s.transactions);

  const fetchInsights = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getInsights();
      setInsights(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load insights');
    } finally {
      setIsLoading(false);
    }
  }, [transactions]);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  return { insights, isLoading, error };
}
