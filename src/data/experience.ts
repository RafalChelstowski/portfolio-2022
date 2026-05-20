import type { SourceItem } from '../types';

const dataSetup: Pick<
  SourceItem,
  'family' | 'sortingVelocity' | 'customColor'
> = {
  family: 'career',
  sortingVelocity: [0, -2, 0],
  customColor: '#426271',
};

const learningDataSetup: Pick<
  SourceItem,
  'family' | 'sortingVelocity' | 'customColor'
> = {
  family: 'learning',
  sortingVelocity: [3, -2, 1],
  customColor: '#7fc7d9',
};

export const experience: SourceItem[] = [
  {
    title: 'Professional profile',
    description:
      '8+ years of experience delivering enterprise web applications in regulated and international environments. Experienced in translating stakeholder needs into technical requirements, contributing across the full product lifecycle, and building complex React and 2D/3D browser-based systems. Currently leading team-level AI adoption through workshops, workflow integration and practical GenAI use cases. Interested in scalable, governed AI adoption, reusable solution patterns and the impact of AI on business processes.',
    focus: true,
    size: 'l',
    categories: ['career'],
    projects: [],
    ...dataSetup,
  },
  {
    title: 'Align Technology, Senior Software Engineer',
    date: 'Nov 2022',
    location: 'Frankfurt am Main',
    current: true,
    focus: true,
    size: 'l',
    categories: ['dev', 'career'],
    projects: ['tpp'],
    listItems: [
      'Placeholder ownership and delivery highlight for enterprise orthodontic workflows.',
      'Placeholder collaboration highlight across product, design, QA, and engineering.',
      'Placeholder AI adoption highlight through workshops and practical team workflows.',
    ],
    ...dataSetup,
  },
  {
    title: 'TouK, Front-end Developer',
    date: 'Jul 2020 -> Nov 2022',
    location: 'Warsaw',
    size: 'm',
    categories: ['career'],
    projects: ['kitchen'],
    ...dataSetup,
  },
  {
    title: 'Credit Suisse, Multimedia Designer -> Senior Front-end Developer',
    date: 'May 2016 - Dec 2019',
    location: 'Wroclaw',
    size: 's',
    categories: ['career'],
    projects: [],
    ...dataSetup,
  },
  {
    title: 'Creative and marketing background',
    subtitle:
      'Marketing, web, print, and creative work before focusing on software engineering.',
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
    ...dataSetup,
  },
  {
    title: 'Dev/AI learning path',
    subtitle: 'Front-end and AI engineering study from community experts.',
    learningCourses: [
      {
        provider: 'Frontend Masters',
        course: 'Front-end and AI engineering courses',
      },
      {
        provider: 'Kent C. Dodds',
        course: 'Epic React, Epic Web, TanStack Query, Epic MCP',
      },
    ],
    size: 's',
    categories: ['career', 'dev', 'ai', 'learning'],
    projects: [],
    ...learningDataSetup,
  },
  {
    title: '3D/Design learning path',
    subtitle:
      'Learning 3D programming, shaders, and browser graphics from leading industry sources.',
    learningCourses: [
      {
        provider: 'SimonDev',
        course: 'Math, 3D game programming, and shaders',
      },
      {
        provider: 'Bruno Simon',
        course: 'Three.js',
      },
      {
        provider: 'Pikuma',
        course: '3D graphics workflows',
      },
      {
        provider: 'LinkedIn Learning/Lynda, Teachable',
        course: 'Blender asset creation with a focus on hard-surface modeling',
      },
    ],
    size: 'm',
    categories: ['career', 'dev', 'creative', 'learning'],
    projects: [],
    ...learningDataSetup,
  },
];
