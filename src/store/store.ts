import { create } from 'zustand';
import type { SelectedGroupOption, SortOption } from '../types';

export interface ActiveGatherState {
  option: SortOption;
  startedAt: number;
}

export type PresentationState =
  | { type: 'none' }
  | { type: 'item'; itemIndex: number }
  | { type: 'group'; sortOption: SelectedGroupOption };

export type Store = {
  displayUi: boolean;
  presentation: PresentationState;
  sortOption: SortOption | null;
  selectedGroup: SelectedGroupOption | null;
  activeGather: ActiveGatherState | null;
  presentItem: (itemIndex: number) => void;
  presentGroup: (sortOption: SelectedGroupOption) => void;
  setSelectedGroup: (selectedGroup: SelectedGroupOption) => void;
  clearSelectedGroup: () => void;
  closePresentation: () => void;
};

const useStore = create<Store>()((set) => ({
  displayUi: false,
  presentation: { type: 'none' },
  sortOption: null,
  selectedGroup: null,
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
  setSelectedGroup: (selectedGroup) => {
    set({ selectedGroup });
  },
  clearSelectedGroup: () => {
    set({ selectedGroup: null });
  },
  closePresentation: () => {
    set((state) => ({
      presentation: { type: 'none' },
      selectedGroup: state.presentation.type === 'group' ? null : state.selectedGroup,
    }));
  },
}));

export { useStore };
