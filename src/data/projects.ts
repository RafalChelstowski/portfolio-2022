import type { SourceItem } from '../types';

const velocity: [number, number, number] = [-4, -2, -4];
const color = '#956062';

export const projects: SourceItem[] = [
  {
    title: 'Kitchen',
    subtitle: '3D interactive cafeteria',
    link: 'https://kitchen.vercel.app/',
    family: 'project',
    size: 'l',
    categories: ['creative'],
    projects: ['kitchen'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'Tactics',
    subtitle: '"Final Fantasy Tactics-like" 3D game engine concept / wip',
    link: 'https://project-tactics.web.app/',
    family: 'project',
    size: 'm',
    categories: ['creative', 'dev'],
    projects: ['portfolio'],
    sortingVelocity: velocity,
    customColor: color,
  },
];
