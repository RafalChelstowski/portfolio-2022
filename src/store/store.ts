import { create } from 'zustand';
import type { SortOption } from '../types';

export type Store = {
  displayUi: boolean;
  isPresenting: number | null;
  sortOption: SortOption | null;
};

const useStore = create<Store>()(() => ({
  displayUi: true,
  isPresenting: null,
  sortOption: null,
}));

export { useStore };
