import type { SourceItem } from '../types';

const dataSetup: Pick<
  SourceItem,
  'family' | 'sortingVelocity' | 'customColor'
> = {
  family: 'project',
  sortingVelocity: [-4, -2, -4],
  customColor: '#956062',
};

export const projects: SourceItem[] = [
  {
    title: 'Kitchen',
    subtitle:
      'Interactive 3D cafeteria recreated from a real location with LiDAR scans and Blender.',
    link: 'https://kitchen.vercel.app/',
    size: 'l',
    categories: ['creative', 'dev'],
    projects: ['kitchen'],
    ...dataSetup,
  },
  {
    title: 'Portfolio 2026',
    subtitle: 'Interactive portfolio where engineering, 3D, creative, and AI workflow threads come together.',
    size: 'm',
    categories: ['creative', 'dev'],
    projects: ['portfolio'],
    ...dataSetup,
  },
  {
    title: 'Industry-leading orthodontic software',
    subtitle: 'Senior front-end engineering for 3D and video features in the React ecosystem.',
    cardFields: {
      Contributions:
        'Frontend contributions to Invisalign Smile Video and ClinCheck In-Face Visualization',
    },
    size: 'l',
    categories: ['dev', 'career'],
    projects: ['tpp'],
    ...dataSetup,
  },
];
