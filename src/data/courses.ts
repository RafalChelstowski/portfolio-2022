import { Sets, LearningItem, ExperienceType } from '../types';

const vel = [3, -2, -3];
const col = '#17829b';

const data = [
  {
    name: '3D Computer Graphics Programming',
    description: 'pikuma.com',
    link: 'https://pikuma.com/courses/learn-3d-computer-graphics-programming',
    size: 'md',
    set: [Sets.LEARNING],
  },
  {
    name: 'GLSL Shaders from scratch',
    link: 'https://simondev.teachable.com/p/glsl-shaders-from-scratch',
    size: 'md',
    set: [Sets.LEARNING],
  },
  {
    name: 'three.js journey',
    description: 'Bruno Simon',
    link: 'https://threejs-journey.com/',
    size: 'md',
    set: [Sets.LEARNING],
  },
  {
    name: 'Blender and Substance Painter: Architectural Visualization',
    description: 'Darrin Lile',
    link: 'https://www.linkedin.com/learning/blender-and-substance-painter-architectural-visualization',
    size: 'md',
    set: [Sets.LEARNING],
  },
  {
    name: 'Blender Environment Artist',
    description: 'Grant Abbitt, gamedev.tv',
    size: 'sm',
    set: [Sets.LEARNING],
  },
  {
    name: 'Complete Blender Creator 2.8',
    description: 'Rick Davidson, gamedev.tv',
    link: 'https://www.linkedin.com/learning/blender-and-substance-painter-architectural-visualization',
    size: 'sm',
    set: [Sets.LEARNING],
  },
  {
    name: 'Blender Character Creator v2.0',
    description: 'Grant Abbitt, gamedev.tv',
    size: 'sm',
    set: [Sets.LEARNING],
  },
  {
    name: 'Creating 3D enviroments in Blender',
    description: 'Rob Tuytel, Erik Selin, udemy',
    size: 'sm',
    set: [Sets.LEARNING],
  },
  {
    name: 'Advanced React and GraphQL',
    description: 'Wes Bos',
    size: 'md',
    set: [Sets.LEARNING],
  },
  {
    name: 'ES6 for Everyone',
    description: 'Wes Bos',
    size: 'md',
    set: [Sets.LEARNING],
  },
  {
    name: 'Learn Node',
    description: 'Wes Bos',
    size: 'md',
    set: [Sets.LEARNING],
  },
  {
    name: 'Epic React',
    description: 'Kent C. Dodds',
    link: 'https://epicreact.dev/',
    size: 'md',
    set: [Sets.LEARNING],
  },
  {
    name: 'Testing Javascript',
    description: 'Kent C. Dodds',
    link: 'https://testingjavascript.com/',
    size: 'md',
    set: [Sets.LEARNING],
  },
  {
    name: 'React Query Essentials',
    link: 'https://learn.tanstack.com/p/react-query-essentials',
    size: 'md',
    set: [Sets.LEARNING],
  },
  {
    name: 'math - weekly private lessons',
    size: 'md',
    set: [Sets.LEARNING],
  },
];

export const courses: LearningItem[] = data.map((el) => ({
  ...el,
  type: ExperienceType.Learning,
  sortingVelocity: vel,
  customColor: col,
}));
