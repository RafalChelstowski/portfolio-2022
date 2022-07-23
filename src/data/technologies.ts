import { Sets, TechnologyItem, ExperienceType } from '../types';

const data = [
  {
    name: 'react',
    size: 'xl',
    set: [Sets.FRONTEND_DEV, Sets.CREATIVE_DEV],
  },
  {
    name: 'angular.js',
    size: 'sm',
    set: [Sets.FRONTEND_DEV],
  },
  {
    name: 'IBM carbon design system',
    size: 'sm',
    set: [Sets.FRONTEND_DEV],
  },
  {
    name: 'storybook',
    size: 'sm',
    set: [Sets.FRONTEND_DEV],
  },
  {
    name: 'draft-js',
    size: 'sm',
    set: [Sets.FRONTEND_DEV],
  },
  {
    name: 'typescript',
    size: 'lg',
    set: [Sets.FRONTEND_DEV, Sets.CREATIVE_DEV],
  },
  {
    name: 'react-query',
    size: 'lg',
    set: [Sets.FRONTEND_DEV, Sets.CREATIVE_DEV],
  },
  {
    name: 'three.js',
    size: 'md',
    set: [Sets.CREATIVE_DEV],
  },
  {
    name: 'react-three-fiber',
    size: 'lg',
    set: [Sets.CREATIVE_DEV],
  },
  {
    name: 'redux',
    size: 'md',
    set: [Sets.FRONTEND_DEV],
  },
  {
    name: 'zustand',
    size: 'lg',
    set: [Sets.FRONTEND_DEV, Sets.CREATIVE_DEV],
  },
  {
    name: 'firebase',
    size: 'md',
    set: [Sets.CREATIVE_DEV],
  },
  {
    name: 'jest',
    size: 'lg',
    set: [Sets.FRONTEND_DEV, Sets.CREATIVE_DEV],
  },
  {
    name: 'react-testing-library',
    size: 'lg',
    set: [Sets.FRONTEND_DEV, Sets.CREATIVE_DEV],
  },
  {
    name: 'cypress',
    size: 'md',
    set: [Sets.FRONTEND_DEV, Sets.CREATIVE_DEV],
  },
  {
    name: 'tailwindcss',
    size: 'md',
    set: [Sets.FRONTEND_DEV, Sets.CREATIVE_DEV],
  },
  {
    name: 'react-transition-group',
    size: 'md',
    set: [Sets.CREATIVE_DEV],
  },
  {
    name: 'react-spring',
    size: 'md',
    set: [Sets.CREATIVE_DEV],
  },
  {
    name: 'es-lint/config-airbnb/prettier',
    size: 'md',
    set: [Sets.FRONTEND_DEV, Sets.CREATIVE_DEV],
  },
  {
    name: 'scss',
    size: 'md',
    set: [Sets.FRONTEND_DEV],
  },
  {
    name: 'git',
    size: 'md',
    set: [Sets.FRONTEND_DEV],
  },
  {
    name: 'agile - team member',
    size: 'lg',
    set: [Sets.FRONTEND_DEV],
  },
  {
    name: 'macos',
    size: 'sm',
    set: [Sets.FRONTEND_DEV, Sets.CREATIVE_DEV],
  },
  {
    name: 'vscode',
    size: 'md',
    set: [Sets.FRONTEND_DEV, Sets.CREATIVE_DEV],
  },
  {
    name: 'blender',
    size: 'lg',
    set: [Sets.CREATIVE_DEV],
  },
  {
    name: 'adobe substance painter',
    size: 'md',
    set: [Sets.CREATIVE_DEV],
  },
  {
    name: 'trello',
    size: 'sm',
    set: [Sets.CREATIVE_DEV],
  },
  {
    name: 'adobe photoshop, illustrator, inDesign',
    size: 'md',
    set: [Sets.MARKETING, Sets.FREELANCE],
  },
  {
    name: 'affinity photo, designer, publisher',
    size: 'md',
    set: [Sets.MARKETING, Sets.FREELANCE],
  },
  {
    name: 'marketing team lead',
    size: 'md',
    set: [Sets.MARKETING],
  },
  {
    name: 'ui design',
    size: 'md',
    set: [Sets.FRONTEND_DEV],
  },
  {
    name: 'branding / corporate branding',
    size: 'md',
    set: [Sets.MARKETING, Sets.FREELANCE, Sets.FRONTEND_DEV],
  },
  {
    name: 'desktop publishing',
    size: 'md',
    set: [Sets.MARKETING],
  },
  {
    name: 'creative copywriting',
    size: 'lg',
    set: [Sets.MARKETING, Sets.FREELANCE],
  },
  {
    name: 'wordpress administration',
    size: 'sm',
    set: [Sets.MARKETING, Sets.FREELANCE],
  },
];

const vel = [4, -2, 4];
const col = '#d89ea6';

export const technologies: TechnologyItem[] = data.map((el) => ({
  ...el,
  type: ExperienceType.Technology,
  sortingVelocity: vel,
  customColor: col,
}));
