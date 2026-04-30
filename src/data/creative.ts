import type { SourceItem } from '../types';

const velocity: [number, number, number] = [2, -2, -4];
const color = '#5e7785';

export const creative: SourceItem[] = [
  {
    title: 'Creative copywriting',
    subtitle: 'language, concept, and narrative direction for interactive work',
    family: 'creative',
    size: 'm',
    categories: ['creative'],
    projects: ['portfolio', 'kitchen'],
    sortingVelocity: velocity,
    customColor: color,
  },
  // TODO: confirm whether this should connect to older career/freelance evidence only, or stay unassigned to project constellations
  {
    title: 'Adobe Creative Suite',
    family: 'creative',
    size: 'm',
    categories: ['creative'],
    projects: ['kitchen'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'Affinity Suite',
    family: 'creative',
    size: 'm',
    categories: ['creative'],
    projects: ['kitchen'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'Blender',
    family: 'creative',
    size: 'l',
    categories: ['creative'],
    projects: ['kitchen', 'portfolio'],
    sortingVelocity: velocity,
    customColor: color,
  },
];
