import type { MainCategory, SourceItem } from '../types';

const velocity: [number, number, number] = [0, -2, 0];
const color = '#426271';

const data: Array<{
  title: string;
  subtitle?: string;
  description?: string;
  cardFields?: SourceItem['cardFields'];
  date: string;
  location: string;
  current?: boolean;
  size: SourceItem['size'];
  categories: MainCategory[];
  projects: SourceItem['projects'];
}> = [
  {
    title: 'Align Technology, Senior Software Engineer',
    subtitle: 'senior software engineering on various industry-leading projects',
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
    title: 'Itransition Group, Front-end Developer',
    date: 'Jan 2020 - Apr 2020',
    location: 'Warsaw',
    size: 's',
    categories: ['career'],
    projects: [],
  },
  {
    title: 'Credit Suisse, Multimedia Designer -> Senior Front-end Developer',
    date: 'May 2016 - Dec 2019',
    location: 'Wroclaw',
    size: 'm',
    categories: ['career', 'dev', 'creative'],
    projects: [],
  },
  {
    title: 'Getback SA, Marketing Specialist -> Creative Projects Lead',
    date: 'May 2014 - Dec 2015',
    location: 'Wroclaw',
    size: 'm',
    categories: ['career', 'creative'],
    projects: [],
  },
  {
    title: 'Marketing / web / print freelancer',
    date: 'Sep 2007 - May 2016',
    location: 'Wroclaw',
    size: 'm',
    categories: ['career', 'creative'],
    projects: [],
  },
  {
    title: 'University of Wroclaw, Universite libre de Bruxelles',
    date: '2004 - 2011',
    location: 'Wroclaw, Brussels',
    size: 'm',
    categories: ['career'],
    projects: [],
    description: 'History, Political Science',
  },
  {
    title: 'Continuous learning',
    subtitle: 'ongoing software, 3D, creative tooling, and AI learning',
    date: '2004 - now',
    location: 'Remote',
    size: 'l',
    categories: ['career', 'dev', 'creative'],
    projects: ['portfolio'],
    cardFields: {
      providers: [
        'Pikuma',
        'Frontend Masters',
        'SimonDev',
        'Bruno Simon',
        'LinkedIn Learning/Lynda',
        'Grant Abbitt',
        'Wes Bos',
        'Kent C. Dodds',
        'TanStack',
      ],
      courses: [
        '3D programming',
        'software engineering',
        'math and shaders for web/game dev',
        'three.js journey',
        'Blender and Substance Painter',
        'Blender courses',
        'web development',
        'Epic React / Epic Web / Epic MCP / Testing JavaScript',
        'React Query Essentials',
      ],
    },
  },
];

export const experience: SourceItem[] = data.map((item) => ({
  ...item,
  family: 'career',
  sortingVelocity: velocity,
  customColor: color,
}));
