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
    title: 'Frontend systems',
    cardFields: {
      Tools: 'React, TypeScript, Zustand, TanStack Query',
    },
    size: 'l',
    categories: ['dev'],
    projects: ['kitchen', 'portfolio', 'tpp'],
    ...dataSetup,
  },
  {
    title: '3D & interactive web',
    cardFields: {
      Tools: 'Three.js, React Three Fiber, Rapier, GLSL',
    },
    size: 'l',
    categories: ['dev', 'creative'],
    projects: ['kitchen', 'portfolio', 'tpp'],
    ...dataSetup,
  },
  {
    title: 'Testing & delivery',
    cardFields: {
      Tools: 'Storybook, Playwright, Vitest, Testing Library',
    },
    size: 'm',
    categories: ['dev'],
    projects: [],
    ...dataSetup,
  },
  {
    title: 'Developer tooling',
    cardFields: {
      Tools: 'Node.js, Bun, Docker, MCP',
    },
    size: 'm',
    categories: ['dev'],
    projects: [],
    ...dataSetup,
  },
];
