import type { SourceItem } from '../types';

const velocity: [number, number, number] = [3, -2, -3];
const color = '#17829b';

const data: Array<{
  title: string;
  subtitle?: string;
  link?: string;
  size: SourceItem['size'];
}> = [
  {
    title: '3D Computer Graphics Programming',
    subtitle: 'pikuma.com',
    link: 'https://pikuma.com/courses/learn-3d-computer-graphics-programming',
    size: 'm',
  },
  {
    title: 'GLSL Shaders from scratch',
    link: 'https://simondev.teachable.com/p/glsl-shaders-from-scratch',
    size: 'm',
  },
  {
    title: 'three.js journey',
    subtitle: 'Bruno Simon',
    link: 'https://threejs-journey.com/',
    size: 'm',
  },
  {
    title: 'Blender and Substance Painter: Architectural Visualization',
    subtitle: 'Darrin Lile',
    link: 'https://www.linkedin.com/learning/blender-and-substance-painter-architectural-visualization',
    size: 'm',
  },
  {
    title: 'Blender Environment Artist',
    subtitle: 'Grant Abbitt, gamedev.tv',
    size: 's',
  },
  {
    title: 'Complete Blender Creator 2.8',
    subtitle: 'Rick Davidson, gamedev.tv',
    link: 'https://www.linkedin.com/learning/blender-and-substance-painter-architectural-visualization',
    size: 's',
  },
  {
    title: 'Blender Character Creator v2.0',
    subtitle: 'Grant Abbitt, gamedev.tv',
    size: 's',
  },
  {
    title: 'Creating 3D enviroments in Blender',
    subtitle: 'Rob Tuytel, Erik Selin, udemy',
    size: 's',
  },
  {
    title: 'Advanced React and GraphQL',
    subtitle: 'Wes Bos',
    size: 'm',
  },
  {
    title: 'ES6 for Everyone',
    subtitle: 'Wes Bos',
    size: 'm',
  },
  {
    title: 'Learn Node',
    subtitle: 'Wes Bos',
    size: 'm',
  },
  {
    title: 'Epic React',
    subtitle: 'Kent C. Dodds',
    link: 'https://epicreact.dev/',
    size: 'm',
  },
  {
    title: 'Testing Javascript',
    subtitle: 'Kent C. Dodds',
    link: 'https://testingjavascript.com/',
    size: 'm',
  },
  {
    title: 'React Query Essentials',
    link: 'https://learn.tanstack.com/p/react-query-essentials',
    size: 'm',
  },
  {
    title: 'math - weekly private lessons',
    size: 'm',
  },
];

export const courses: SourceItem[] = data.map((item) => ({
  ...item,
  family: 'career',
  categories: ['career'],
  projects: [],
  sortingVelocity: velocity,
  customColor: color,
}));
