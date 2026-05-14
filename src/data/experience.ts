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
    subtitle: 'Current senior software engineering role in orthodontic treatment-planning software.',
    date: 'Nov 2022',
    location: 'Frankfurt am Main',
    current: true,
    size: 'l',
    categories: ['dev', 'career'],
    projects: ['tpp'],
  },
  {
    title: 'TouK, Front-end Developer',
    subtitle: 'Front-end development work that supports the Kitchen-era project constellation.',
    date: 'Jul 2020 -> Nov 2022',
    location: 'Warsaw',
    size: 'm',
    categories: ['career'],
    projects: ['kitchen'],
  },
  {
    title: 'Credit Suisse, Multimedia Designer -> Senior Front-end Developer',
    subtitle: 'The bridge from multimedia and design work into serious front-end engineering.',
    date: 'May 2016 - Dec 2019',
    location: 'Wroclaw',
    size: 'm',
    categories: ['career', 'creative'],
    projects: [],
  },
  {
    title: 'Creative and marketing background',
    subtitle:
      'Earlier marketing, web, print, and humanities background that still informs communication and creative direction.',
    cardFields: {
      Includes:
        'Getback, freelance marketing/web/print work, University of Wroclaw, Universite libre de Bruxelles',
    },
    date: '2004 - 2016',
    location: 'Wroclaw, Brussels',
    size: 'm',
    categories: ['career', 'creative'],
    projects: [],
  },
  {
    title: '3D learning path',
    subtitle: 'Learning 3D programming, shaders, and browser graphics from strong industry sources.',
    cardFields: {
      Sources: 'Pikuma, SimonDev, Bruno Simon',
    },
    size: 'm',
    categories: ['career', 'creative'],
    projects: [],
  },
  {
    title: 'Dev learning path',
    subtitle:
      'Continuous modern engineering study around React, testing, server-state, and application architecture.',
    cardFields: {
      Sources: 'Frontend Masters, Kent C. Dodds, TanStack',
    },
    size: 'm',
    categories: ['career', 'dev'],
    projects: [],
  },
  {
    title: 'AI learning path',
    subtitle: 'Focused study of AI-assisted development tooling and agent-facing context workflows.',
    cardFields: {
      Source: 'Epic MCP',
    },
    size: 'm',
    categories: ['career', 'ai'],
    projects: [],
  },
  {
    title: 'Design learning path',
    subtitle: 'Ongoing design and production learning connected to visual tooling and asset workflows.',
    cardFields: {
      Sources: 'LinkedIn Learning/Lynda',
      Tools: 'Adobe Creative Suite, Affinity Suite',
    },
    size: 'm',
    categories: ['career', 'creative'],
    projects: [],
  },
];

export const experience: SourceItem[] = data.map((item) => ({
  ...item,
  family: 'career',
  sortingVelocity: velocity,
  customColor: color,
}));
