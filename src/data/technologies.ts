import type { MainCategory, SourceItem } from '../types';

const velocity: [number, number, number] = [4, -2, 4];
const color = '#d89ea6';

function categoriesFromLegacySets(legacySets: string[]): MainCategory[] {
  const values: MainCategory[] = [];

  if (legacySets.includes('frontend dev')) {
    values.push('dev');
  }

  if (legacySets.includes('creative dev')) {
    values.push('creative');
  }

  if (legacySets.includes('marketing lead') || legacySets.includes('freelancer')) {
    if (!values.includes('career')) {
      values.push('career');
    }
  }

  if (values.length === 0) {
    values.push('dev');
  }

  return values;
}

const data: Array<{
  title: string;
  size: SourceItem['size'];
  categories: MainCategory[];
}> = [
  {
    title: 'react',
    size: 'l',
    categories: categoriesFromLegacySets(['frontend dev', 'creative dev']),
  },
  {
    title: 'angular.js',
    size: 's',
    categories: categoriesFromLegacySets(['frontend dev']),
  },
  {
    title: 'IBM carbon design system',
    size: 's',
    categories: categoriesFromLegacySets(['frontend dev']),
  },
  {
    title: 'storybook',
    size: 's',
    categories: categoriesFromLegacySets(['frontend dev']),
  },
  {
    title: 'draft-js',
    size: 's',
    categories: categoriesFromLegacySets(['frontend dev']),
  },
  {
    title: 'typescript',
    size: 'm',
    categories: categoriesFromLegacySets(['frontend dev', 'creative dev']),
  },
  {
    title: 'react-query',
    size: 'm',
    categories: categoriesFromLegacySets(['frontend dev', 'creative dev']),
  },
  {
    title: 'three.js',
    size: 'm',
    categories: categoriesFromLegacySets(['creative dev']),
  },
  {
    title: 'react-three-fiber',
    size: 'm',
    categories: categoriesFromLegacySets(['creative dev']),
  },
  {
    title: 'redux',
    size: 'm',
    categories: categoriesFromLegacySets(['frontend dev']),
  },
  {
    title: 'zustand',
    size: 'm',
    categories: categoriesFromLegacySets(['frontend dev', 'creative dev']),
  },
  {
    title: 'firebase',
    size: 'm',
    categories: categoriesFromLegacySets(['creative dev']),
  },
  {
    title: 'jest',
    size: 'm',
    categories: categoriesFromLegacySets(['frontend dev', 'creative dev']),
  },
  {
    title: 'react-testing-library',
    size: 'm',
    categories: categoriesFromLegacySets(['frontend dev', 'creative dev']),
  },
  {
    title: 'cypress',
    size: 'm',
    categories: categoriesFromLegacySets(['frontend dev', 'creative dev']),
  },
  {
    title: 'tailwindcss',
    size: 'm',
    categories: categoriesFromLegacySets(['frontend dev', 'creative dev']),
  },
  {
    title: 'react-transition-group',
    size: 'm',
    categories: categoriesFromLegacySets(['creative dev']),
  },
  {
    title: 'react-spring',
    size: 'm',
    categories: categoriesFromLegacySets(['creative dev']),
  },
  {
    title: 'es-lint/config-airbnb/prettier',
    size: 'm',
    categories: categoriesFromLegacySets(['frontend dev', 'creative dev']),
  },
  {
    title: 'scss',
    size: 'm',
    categories: categoriesFromLegacySets(['frontend dev']),
  },
  {
    title: 'git',
    size: 'm',
    categories: categoriesFromLegacySets(['frontend dev']),
  },
  {
    title: 'agile - team member',
    size: 'm',
    categories: categoriesFromLegacySets(['frontend dev']),
  },
  {
    title: 'macos',
    size: 's',
    categories: categoriesFromLegacySets(['frontend dev', 'creative dev']),
  },
  {
    title: 'vscode',
    size: 'm',
    categories: categoriesFromLegacySets(['frontend dev', 'creative dev']),
  },
  {
    title: 'blender',
    size: 'm',
    categories: categoriesFromLegacySets(['creative dev']),
  },
  {
    title: 'adobe substance painter',
    size: 'm',
    categories: categoriesFromLegacySets(['creative dev']),
  },
  {
    title: 'trello',
    size: 's',
    categories: categoriesFromLegacySets(['creative dev']),
  },
  {
    title: 'adobe photoshop, illustrator, inDesign',
    size: 'm',
    categories: categoriesFromLegacySets(['marketing lead', 'freelancer']),
  },
  {
    title: 'affinity photo, designer, publisher',
    size: 'm',
    categories: categoriesFromLegacySets(['marketing lead', 'freelancer']),
  },
  {
    title: 'marketing team lead',
    size: 'm',
    categories: categoriesFromLegacySets(['marketing lead']),
  },
  {
    title: 'ui design',
    size: 'm',
    categories: categoriesFromLegacySets(['frontend dev']),
  },
  {
    title: 'branding / corporate branding',
    size: 'm',
    categories: categoriesFromLegacySets(['marketing lead', 'freelancer', 'frontend dev']),
  },
  {
    title: 'desktop publishing',
    size: 'm',
    categories: categoriesFromLegacySets(['marketing lead']),
  },
  {
    title: 'creative copywriting',
    size: 'm',
    categories: categoriesFromLegacySets(['marketing lead', 'freelancer']),
  },
  {
    title: 'wordpress administration',
    size: 's',
    categories: categoriesFromLegacySets(['marketing lead', 'freelancer']),
  },
];

export const technologies: SourceItem[] = data.map((item) => ({
  ...item,
  family: 'stack',
  projects: [],
  sortingVelocity: velocity,
  customColor: color,
}));
