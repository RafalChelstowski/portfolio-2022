import type { SourceItem } from '../types';

const velocity: [number, number, number] = [2, -2, -4];
const color = '#5e7785';

export const creative: SourceItem[] = [
  {
    title: 'Visual production and design tooling',
    subtitle: 'Design and production workflow for visuals, layouts, and supporting portfolio assets.',
    cardFields: {
      Tools: 'Adobe Creative Suite, Affinity Suite',
    },
    family: 'creative',
    size: 'm',
    categories: ['creative'],
    projects: ['kitchen', 'portfolio'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: '3D asset workflow',
    subtitle: 'Modeling, scene thinking, and asset preparation for interactive 3D web work.',
    cardFields: {
      Tools: 'Blender',
    },
    family: 'creative',
    size: 'l',
    categories: ['creative', 'dev'],
    projects: ['kitchen', 'portfolio'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'Creative and narrative direction',
    subtitle:
      'Language, concept, and presentation choices that make technical work easier to understand and remember.',
    family: 'creative',
    size: 'l',
    categories: ['creative'],
    projects: ['portfolio', 'kitchen'],
    sortingVelocity: velocity,
    customColor: color,
  },
];
