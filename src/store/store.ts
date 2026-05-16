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
  presentItem: (itemIndex: number) => void;
  closePresentation: () => void;
};

const useStore = create<Store>()((set) => ({
  displayUi: false,
  isPresenting: null,
  sortOption: null,
  activeGather: null,
  presentItem: (itemIndex) => {
    set({
      isPresenting: itemIndex,
      sortOption: null,
      activeGather: null,
    });
  },
  closePresentation: () => {
    set({
      isPresenting: null,
      sortOption: null,
      activeGather: null,
    });
  },
}));

export { useStore };
