import { create } from 'zustand';
import type { SortOption } from '../types';

export interface ActiveGatherState {
  option: SortOption;
  startedAt: number;
}

export type Store = {
  displayUi: boolean;
  isPresenting: number | null;
  sortOption: SortOption | null;
  activeGather: ActiveGatherState | null;
};

const useStore = create<Store>()(() => ({
  displayUi: false,
  isPresenting: null,
  sortOption: null,
  activeGather: null,
}));

export { useStore };
