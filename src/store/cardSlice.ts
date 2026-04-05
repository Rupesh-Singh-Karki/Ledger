import type { StateCreator } from 'zustand';
import type { AppStore, CardSlice } from '@/types';
import { mockCards } from '@/data/cards';

export const createCardSlice: StateCreator<AppStore, [], [], CardSlice> = (set) => ({
  cards: mockCards,
  activeCardIndex: 0,

  setActiveCardIndex: (index) => set({ activeCardIndex: index }),
});
