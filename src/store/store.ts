import { create } from 'zustand';
import type { Sets } from '../types';

export type Store = {
  displayUi: boolean;
  isPresenting: number | null;
  sortOption: Sets | 'sort' | null;
};

const useStore = create<Store>()(() => ({
  displayUi: false,
  isPresenting: null,
  sortOption: null,
}));

export { useStore };
