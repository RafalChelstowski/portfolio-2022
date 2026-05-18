import { create } from 'zustand';
import type { SortOption } from '../types';

export interface ActiveGatherState {
  option: SortOption;
  startedAt: number;
}

export type PresentationState =
  | { type: 'none' }
  | { type: 'item'; itemIndex: number }
  | { type: 'group'; sortOption: SortOption };

export type Store = {
  displayUi: boolean;
  presentation: PresentationState;
  sortOption: SortOption | null;
  activeGather: ActiveGatherState | null;
  presentItem: (itemIndex: number) => void;
  presentGroup: (sortOption: SortOption) => void;
  closePresentation: () => void;
};

const useStore = create<Store>()((set) => ({
  displayUi: false,
  presentation: { type: 'none' },
  sortOption: null,
  activeGather: null,
  presentItem: (itemIndex) => {
    set({
      presentation: { type: 'item', itemIndex },
      sortOption: null,
      activeGather: null,
    });
  },
  presentGroup: (sortOption) => {
    set({
      presentation: { type: 'group', sortOption },
      sortOption: null,
      activeGather: null,
    });
  },
  closePresentation: () => {
    set({
      presentation: { type: 'none' },
      sortOption: null,
      activeGather: null,
    });
  },
}));

export { useStore };
