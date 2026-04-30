import type { SourceItem } from '../types';

const velocity: [number, number, number] = [4, -2, 4];
const color = '#d89ea6';

export const technologies: SourceItem[] = [
  {
    title: 'React',
    subtitle: 'production UI engineering foundation',
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
    subtitle: 'typed application development',
    family: 'stack',
    size: 's',
    categories: ['dev'],
    projects: ['kitchen', 'portfolio', 'tpp'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'Three.js / React Three Fiber',
    subtitle: 'interactive 3D web rendering',
    family: 'stack',
    size: 'l',
    categories: ['dev', 'creative'],
    projects: ['kitchen', 'portfolio', 'tpp'],
    sortingVelocity: velocity,
    customColor: color,
  },
  // TODO: confirm if React Query should connect to public/personal projects too
  {
    title: 'React Query',
    subtitle: 'server-state and data synchronization patterns',
    family: 'stack',
    size: 's',
    categories: ['dev'],
    projects: ['tpp'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'Zustand',
    subtitle: 'small state management for interactive UI and scenes',
    family: 'stack',
    size: 's',
    categories: ['dev'],
    projects: ['portfolio', 'tpp'],
    sortingVelocity: velocity,
    customColor: color,
  },
];
