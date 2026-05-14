import type { SourceItem } from '../types';

const velocity: [number, number, number] = [-4, -2, -4];
const color = '#956062';

export const projects: SourceItem[] = [
  {
    title: 'Kitchen',
    subtitle: 'Interactive 3D cafeteria recreated from LiDAR scans in Blender.',
    outcome:
      'Shows spatial thinking, 3D asset preparation, and playful web presentation in one small scene.',
    link: 'https://kitchen.vercel.app/',
    family: 'project',
    size: 'l',
    categories: ['creative'],
    projects: ['kitchen'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'Rafal Chelstowski 2026',
    subtitle:
      'An interactive portfolio where my engineering, 3D, creative, and AI workflow threads come together.',
    outcome:
      'Turns a portfolio page into a navigable constellation of projects, tools, learning paths, and career evidence.',
    family: 'project',
    size: 'm',
    categories: ['creative', 'dev', 'ai'],
    projects: ['portfolio'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'World-leading orthodontic software',
    subtitle:
      'Senior engineering work connected to ClinCheck and Invisalign treatment-planning experiences.',
    outcome:
      'Contributed to public product areas including Invisalign Smile Video and In-Face Visualization.',
    cardFields: {
      Products: 'ClinCheck, Invisalign Smile Video, In-Face Visualization',
    },
    family: 'project',
    size: 'l',
    categories: ['dev', 'career'],
    projects: ['tpp'],
    sortingVelocity: velocity,
    customColor: color,
  },
];
