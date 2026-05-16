import type { SourceItem } from '../types';

const velocity: [number, number, number] = [4, -2, 4];
const color = '#d89ea6';

export const technologies: SourceItem[] = [
  {
    title: 'React ecosystem',
    cardFields: {
      Tools: 'React, TypeScript, Zustand, React Query',
    },
    family: 'stack',
    size: 'l',
    categories: ['dev'],
    projects: ['kitchen', 'portfolio', 'tpp'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: '3D web ecosystem',
    cardFields: {
      Tools: 'Three.js, React Three Fiber, Rapier, basic shaders',
    },
    family: 'stack',
    size: 'l',
    categories: ['dev', 'creative'],
    projects: ['kitchen', 'portfolio', 'tpp'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'Terminal-first workflow',
    cardFields: {
      Tools: 'Neovim, tmux, Ghostty',
    },
    family: 'stack',
    size: 'm',
    categories: ['dev'],
    projects: [],
    sortingVelocity: velocity,
    customColor: color,
  },
];
