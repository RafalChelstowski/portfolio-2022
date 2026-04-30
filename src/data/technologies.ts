import type { SourceItem } from '../types';

const velocity: [number, number, number] = [4, -2, 4];
const color = '#d89ea6';

export const technologies: SourceItem[] = [
  {
    title: 'React',
    family: 'stack',
    size: 'm',
    categories: ['dev'],
    projects: ['kitchen', 'portfolio', 'tpp'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'Neovim / tmux / terminal / Ghostty',
    subtitle: 'keyboard-first development environment and workflow',
    family: 'stack',
    size: 'm',
    categories: ['dev'],
    projects: ['portfolio', 'tpp'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'TypeScript',
    family: 'stack',
    size: 's',
    categories: ['dev'],
    projects: ['kitchen', 'portfolio', 'tpp'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'Three.js / React Three Fiber',
    family: 'stack',
    size: 'l',
    categories: ['dev', 'creative'],
    projects: ['kitchen', 'portfolio', 'tpp'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'React Query',
    family: 'stack',
    size: 's',
    categories: ['dev'],
    projects: ['tpp'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'Zustand',
    family: 'stack',
    size: 's',
    categories: ['dev'],
    projects: ['portfolio', 'tpp'],
    sortingVelocity: velocity,
    customColor: color,
  },
];
