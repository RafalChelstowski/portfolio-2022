import type { SourceItem } from '../types';

const dataSetup: Pick<
  SourceItem,
  'family' | 'sortingVelocity' | 'customColor'
> = {
  family: 'stack',
  sortingVelocity: [4, -2, 4],
  customColor: '#d89ea6',
};

export const technologies: SourceItem[] = [
  {
    title: 'React ecosystem',
    cardFields: {
      Tools: 'React, TypeScript, Zustand, React Query',
    },
    size: 'l',
    categories: ['dev'],
    projects: ['kitchen', 'portfolio', 'tpp'],
    ...dataSetup,
  },
  {
    title: '3D web ecosystem',
    cardFields: {
      Tools: 'Three.js, React Three Fiber, Rapier, basic shaders',
    },
    size: 'l',
    categories: ['dev', 'creative'],
    projects: ['kitchen', 'portfolio', 'tpp'],
    ...dataSetup,
  },
  {
    title: 'Terminal-first workflow',
    cardFields: {
      Tools: 'Neovim, tmux, Ghostty',
    },
    size: 'm',
    categories: ['dev'],
    projects: [],
    ...dataSetup,
  },
];
