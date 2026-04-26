import type { MainCategory, SourceItem } from '../types';

const velocity: [number, number, number] = [0, -2, 0];
const color = '#426271';

const data: Array<{
  title: string;
  date: string;
  location: string;
  current?: boolean;
  size: SourceItem['size'];
  categories: MainCategory[];
}> = [
  {
    title: 'Align Technology, Front-end Developer',
    date: 'Nov 2022 -> current',
    location: 'Frankfurt am Main',
    current: true,
    size: 'l',
    categories: ['dev', 'career'],
  },
  {
    title: 'TouK, Front-end Developer',
    date: 'Jul 2020 -> Nov 2022',
    location: 'Warsaw',
    size: 'l',
    categories: ['career'],
  },
  {
    title: 'Itransition Group, Front-end Developer',
    date: 'Jan 2020 - Apr 2020',
    location: 'Warsaw',
    size: 'm',
    categories: ['career'],
  },
  {
    title: 'Credit Suisse, Multimedia Designer -> Front-End Developer -> Senior Web Developer',
    date: 'May 2016 - Dec 2019',
    location: 'Wroclaw',
    size: 'l',
    categories: ['career', 'dev', 'creative'],
  },
  {
    title: 'Getback SA, Marketing Specialist -> Marketing Lead -> Creative Projects Lead',
    date: 'May 2014 - Dec 2015',
    location: 'Wroclaw',
    size: 'm',
    categories: ['career', 'creative'],
  },
  {
    title: 'Marketing / web / print freelancer',
    date: 'Sep 2007 - May 2016',
    location: 'Wroclaw',
    size: 'm',
    categories: ['career', 'creative'],
  },
  {
    title: 'University of Wroclaw, MA History',
    date: '2004 - 2011',
    location: 'Wroclaw',
    size: 'm',
    categories: ['career'],
  },
  {
    title: 'University of Wroclaw, Political Science',
    date: '2007 - 2012',
    location: 'Wroclaw',
    size: 'm',
    categories: ['career'],
  },
  {
    title: 'Université libre de Bruxelles, Political Science',
    date: '2011',
    location: 'Brussels',
    size: 'm',
    categories: ['career'],
  },
];

export const experience: SourceItem[] = data.map((item) => ({
  ...item,
  family: 'career',
  projects: [],
  sortingVelocity: velocity,
  customColor: color,
}));
