import type { SourceItem } from '../types';

const velocity: [number, number, number] = [-4, -2, -4];
const color = '#956062';

export const projects: SourceItem[] = [
  {
    title: 'Kitchen',
    subtitle:
      'Interactive 3D cafeteria recreated from real location using LiDAR scans and Blender.',
    link: 'https://kitchen.vercel.app/',
    family: 'project',
    size: 'l',
    categories: ['creative'],
    projects: ['kitchen'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'Portfolio, Rafal Chelstowski 2026',
    subtitle: 'This is where my experience/skills/interests come together.',
    family: 'project',
    size: 'm',
    categories: ['creative'],
    projects: ['portfolio'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'Industry-leading orthodontic software',
    subtitle: 'Working with 3D/Video features in React ecosystem',
    cardFields: {
      Contributions:
        'Frontend part of Invisalign Smile Video, ClinCheck In-Face Visualization',
    },
    family: 'project',
    size: 'l',
    categories: ['dev', 'career'],
    projects: ['tpp'],
    sortingVelocity: velocity,
    customColor: color,
  },
];
