import create from 'zustand';
import { Sets } from '../types';

export type Store = {
  displayUi: boolean;
  isPresenting: number | null;
  sortOption: Sets | 'sort' | null;
};

const useStore = create<Store>((set) => ({
  displayUi: false,
  isPresenting: null,
  sortOption: null,
}));

export { useStore };
