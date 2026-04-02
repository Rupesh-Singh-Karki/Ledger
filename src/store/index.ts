import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppStore } from '@/types';
import { createTransactionSlice } from './transactionSlice';
import { createUISlice } from './uiSlice';

export const useStore = create<AppStore>()(
  persist(
    (...a) => ({
      ...createTransactionSlice(...a),
      ...createUISlice(...a),
    }),
    {
      name: 'ledger-storage',
    }
  )
);
