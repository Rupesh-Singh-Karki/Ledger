import type { StateCreator } from 'zustand';
import type { AppStore, TransactionSlice, TransactionFormData } from '@/types';
import { mockTransactions } from '@/data/transactions';

export const createTransactionSlice: StateCreator<AppStore, [], [], TransactionSlice> = (set) => ({
  transactions: mockTransactions,

  addTransaction: (data: TransactionFormData) =>
    set((state) => ({
      transactions: [
        ...state.transactions,
        {
          ...data,
          id: `txn-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        },
      ],
    })),

  editTransaction: (id: string, updates: Partial<AppStore['transactions'][0]>) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    })),

  deleteTransaction: (id: string) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
});
