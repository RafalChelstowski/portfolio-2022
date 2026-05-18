import type { SourceItem } from '../types';

const dataSetup: Pick<
  SourceItem,
  'family' | 'sortingVelocity' | 'customColor'
> = {
  family: 'career',
  sortingVelocity: [0, -2, 0],
  customColor: '#426271',
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
    size: 'l',
    categories: ['dev', 'career'],
    projects: ['tpp'],
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
    cardFields: {
      Dev: 'Frontend Masters, Kent C. Dodds - Epic React, Epic Web, TanStack Query courses',
      AI: 'Kent C. Dodds - Epic MCP, Frontend Masters',
    },
    size: 's',
    categories: ['career', 'dev', 'ai'],
    projects: [],
    ...dataSetup,
  },
  {
    title: '3D/Design learning path',
    subtitle:
      'Learning 3D programming, shaders, and browser graphics from leading industry sources.',
    cardFields: {
      '3D': 'SimonDev - math, 3D game programming, and shaders; Bruno Simon - Three.js; Pikuma - 3D graphics workflows',
      Design:
        'LinkedIn Learning/Lynda, Teachable - Blender asset creation with a focus on hard-surface modeling',
    },
    size: 'm',
    categories: ['career', 'dev', 'creative'],
    projects: [],
    ...dataSetup,
  },
];
