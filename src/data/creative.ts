import type { SourceItem } from '../types';

const velocity: [number, number, number] = [2, -2, -4];
const color = '#5e7785';

export const creative: SourceItem[] = [
  {
    title: 'Design',
    subtitle: "I'm profficient in creating digital/prited media",
    cardFields: {
      Tools: 'Adobe Creative Suite, Affinity Suite, Procreate',
    },
    family: 'creative',
    size: 'm',
    categories: ['creative'],
    projects: ['kitchen'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: '3D asset workflow',
    cardFields: {
      Tools: 'Blender, Substance Painter, Nomad Sculpt',
    },
    family: 'creative',
    size: 'm',
    categories: ['creative'],
    projects: ['kitchen', 'portfolio'],
    sortingVelocity: velocity,
    customColor: color,
  },
];
