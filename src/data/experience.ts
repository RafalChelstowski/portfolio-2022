import type { MainCategory, SourceItem } from '../types';

const velocity: [number, number, number] = [0, -2, 0];
const color = '#426271';

const data: Array<{
  title: string;
  subtitle?: string;
  description?: string;
  cardFields?: SourceItem['cardFields'];
  learningCourses?: SourceItem['learningCourses'];
  date?: string;
  location?: string;
  current?: boolean;
  size: SourceItem['size'];
  categories: MainCategory[];
  projects: SourceItem['projects'];
}> = [
  {
    title: 'Align Technology, Senior Software Engineer',
    date: 'Nov 2022',
    location: 'Frankfurt am Main',
    current: true,
    size: 'l',
    categories: ['dev', 'career'],
    projects: ['tpp'],
  },
  {
    title: 'TouK, Front-end Developer',
    date: 'Jul 2020 -> Nov 2022',
    location: 'Warsaw',
    size: 'm',
    categories: ['career'],
    projects: ['kitchen'],
  },
  {
    title: 'Credit Suisse, Multimedia Designer -> Senior Front-end Developer',
    date: 'May 2016 - Dec 2019',
    location: 'Wroclaw',
    size: 's',
    categories: ['career'],
    projects: [],
  },
  {
    title: 'Creative and marketing background',
    subtitle:
      'Marketing, web, print, and creative leadership work before focusing on software engineering.',
    cardFields: {
      'GetBack S.A.': '2014 - 2015, Creative Projects Lead, Marketing Lead',
      Freelancer: '2007 - 2016, marketing, web, and print projects',
      Education:
        '2004 - 2011, MA in History, University of Wroclaw, Universite libre de Bruxelles',
    },
    date: '2004 - 2016',
    location: 'Wroclaw, Brussels',
    size: 's',
    categories: ['career', 'creative'],
    projects: [],
  },
  {
    title: 'Dev/AI learning path',
    subtitle:
      'Front-end and AI engineering study from respected community experts.',
    cardFields: {
      Dev: 'Frontend Masters, Kent C. Dodds - Epic React, Epic Web, TanStack Query courses',
      AI: 'Kent C. Dodds - Epic MCP',
    },
    size: 's',
    categories: ['career', 'dev', 'ai'],
    projects: [],
  },
  {
    title: '3D/Design learning path',
    subtitle:
      'Mastering visual tooling and asset workflows. Learning 3D programming, shaders, and browser graphics from strong industry sources.',
    cardFields: {
      '3D': 'SimonDev - math, 3D game programming, and shaders; Bruno Simon - Three.js; Pikuma - 3D graphics workflows',
      Design:
        'LinkedIn Learning/Lynda, Teachable - Blender asset creation with a focus on hard-surface modeling',
    },
    size: 'm',
    categories: ['career', 'dev', 'creative'],
    projects: [],
  },
];

export const experience: SourceItem[] = data.map((item) => ({
  ...item,
  family: 'career',
  sortingVelocity: velocity,
  customColor: color,
}));
