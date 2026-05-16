import type { SourceItem } from '../types';

const velocity: [number, number, number] = [-4, -2, -4];
const color = '#956062';

export const projects: SourceItem[] = [
  {
    title: 'Kitchen',
    subtitle:
      'Interactive 3D cafeteria recreated from a real location with LiDAR scans and Blender.',
    link: 'https://kitchen.vercel.app/',
    family: 'project',
    size: 'l',
    categories: ['creative', 'dev'],
    projects: ['kitchen'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'Portfolio 2026',
    subtitle: 'Interactive portfolio where engineering, 3D, creative, and AI workflow threads come together.',
    family: 'project',
    size: 'm',
    categories: ['creative', 'dev'],
    projects: ['portfolio'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'Industry-leading orthodontic software',
    subtitle: 'Senior front-end engineering for 3D and video features in the React ecosystem.',
    cardFields: {
      Contributions:
        'Frontend contributions to Invisalign Smile Video and ClinCheck In-Face Visualization',
    },
    family: 'project',
    size: 'l',
    categories: ['dev', 'career'],
    projects: ['tpp'],
    sortingVelocity: velocity,
    customColor: color,
  },
];
