import type { SourceItem } from '../types';

const velocity: [number, number, number] = [4, -2, 4];
const color = '#d89ea6';

export const technologies: SourceItem[] = [
  {
    title: 'React ecosystem',
    subtitle:
      'Production UI engineering with React, TypeScript, state, server-state, and testing patterns.',
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
    subtitle:
      'Interactive browser graphics, scene composition, physics-driven UI, and real-time rendering.',
    cardFields: {
      Tools: 'Three.js, React Three Fiber, Rapier',
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
    subtitle:
      'Keyboard-first development environment for focused code navigation, automation, and agent work.',
    cardFields: {
      Tools: 'Neovim, tmux, Ghostty',
    },
    family: 'stack',
    size: 'm',
    categories: ['dev'],
    projects: ['portfolio', 'tpp'],
    sortingVelocity: velocity,
    customColor: color,
  },
];
