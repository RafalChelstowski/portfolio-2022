import type { SourceItem } from '../types';

const velocity: [number, number, number] = [-4, -2, -4];
const color = '#956062';

export const projects: SourceItem[] = [
  {
    title: 'Kitchen',
    subtitle: '3D interactive cafeteria, recreated from lidar scans in Blender',
    link: 'https://kitchen.vercel.app/',
    family: 'project',
    size: 'l',
    categories: ['creative'],
    projects: ['kitchen'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'Portfolio 2026',
    family: 'project',
    size: 'm',
    categories: ['creative', 'dev', 'ai'],
    projects: ['portfolio'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'Treatment Planning Platform',
    subtitle: 'leading dentistry treatment planning app',
    family: 'project',
    size: 'l',
    categories: ['dev', 'career'],
    projects: ['tpp'],
    sortingVelocity: velocity,
    customColor: color,
  },
];
