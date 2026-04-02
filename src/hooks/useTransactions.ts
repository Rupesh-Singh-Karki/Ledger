import { useState, useEffect, useCallback } from 'react';
import { useStore } from '@/store';
import { getTransactions } from '@/api/transactions';
import { useDebounce } from './useDebounce';
import type { Transaction } from '@/types';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filters = useStore((s) => s.filters);
  const allTransactions = useStore((s) => s.transactions);
  const debouncedSearch = useDebounce(filters.search, 300);

  const debouncedFilters = { ...filters, search: debouncedSearch };

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTransactions(debouncedFilters);
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load transactions');
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, filters.type, filters.category, filters.sortBy, filters.sortOrder, filters.dateRange, allTransactions]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    isLoading,
    error,
    totalCount: allTransactions.length,
    filteredCount: transactions.length,
    refetch: fetchTransactions,
  };
}
