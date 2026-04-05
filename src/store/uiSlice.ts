import type { StateCreator } from 'zustand';
import type { AppStore, UISlice, TransactionFilters } from '@/types';

const DEFAULT_FILTERS: TransactionFilters = {
  search: '',
  type: 'all',
  category: 'all',
  dateRange: null,
  sortBy: 'date',
  sortOrder: 'desc',
};

export const createUISlice: StateCreator<AppStore, [], [], UISlice> = (set) => ({
  role: 'viewer',
  theme: 'dark',
  currency: 'USD',
  filters: DEFAULT_FILTERS,

  setRole: (role) => set({ role }),
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'dark' ? 'light' : 'dark',
    })),
  setCurrency: (currency) => set({ currency }),
  updateFilters: (updates) =>
    set((state) => ({
      filters: { ...state.filters, ...updates },
    })),
  resetFilters: () => set({ filters: DEFAULT_FILTERS }),
});

export { DEFAULT_FILTERS };
