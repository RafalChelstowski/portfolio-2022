import type { SourceItem } from '../types';

const dataSetup: Pick<
  SourceItem,
  'family' | 'sortingVelocity' | 'customColor'
> = {
  family: 'creative',
  sortingVelocity: [2, -2, -4],
  customColor: '#5e7785',
};

export const creative: SourceItem[] = [
  {
    title: 'Visual design and production',
    subtitle: 'Digital and printed media production for visual communication.',
    listItems: ['Adobe Creative Suite', 'Affinity Suite', 'Procreate'],
    size: 'm',
    categories: ['creative'],
    projects: ['kitchen'],
    ...dataSetup,
  },
  {
    title: '3D asset workflow',
    subtitle: 'Modeling, texturing, and asset preparation for interactive 3D web work.',
    listItems: ['Blender', 'Substance Painter', 'Nomad Sculpt'],
    size: 'm',
    categories: ['creative'],
    projects: ['kitchen', 'portfolio'],
    ...dataSetup,
  },
];
