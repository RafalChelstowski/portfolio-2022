import { Sets, ExperienceItem, ExperienceType } from '../types';

const vel = [0, -2, 0];
const col = '#426271';

const data = [
  {
    name: 'Align Technology, Front-end Developer',
    fromTo: 'Nov 2022 -> current',
    where: 'Frankfurt am Main',
    current: true,
    size: 'xl',
    set: [Sets.FRONTEND_DEV],
  },
  {
    name: 'TouK, Front-end Developer',
    fromTo: 'Jul 2020 -> Nov 2022',
    where: 'Warsaw',
    size: 'xl',
    set: [Sets.FRONTEND_DEV],
  },
  {
    name: 'Itransition Group, Front-end Developer',
    fromTo: 'Jan 2020 - Apr 2020',
    where: 'Warsaw',
    size: 'lg',
    set: [Sets.FRONTEND_DEV],
  },
  {
    name: 'Credit Suisse,  Multimedia Designer -> Front-End Developer -> Senior Web Developer',
    fromTo: 'May 2016 - Dec 2019',
    where: 'Wroclaw',
    size: 'xl',
    set: [Sets.FRONTEND_DEV],
  },
  {
    name: 'Getback SA, Marketing Specialist -> Marketing Lead -> Creative Projects Lead',
    fromTo: 'May 2014 - Dec 2015',
    where: 'Wroclaw',
    size: 'md',
    set: [Sets.MARKETING],
  },
  {
    name: 'Marketing / web / print freelancer',
    fromTo: 'Sep 2007 - May 2016',
    where: 'Wroclaw',
    size: 'md',
    set: [Sets.FREELANCE],
  },
  {
    name: 'University of Wroclaw, MA History',
    fromTo: '2004 - 2011',
    where: 'Wroclaw',
    size: 'md',
    set: [Sets.FREELANCE, Sets.LEARNING],
  },
  {
    name: 'University of Wroclaw, Political Science',
    fromTo: '2007 - 2012',
    where: 'Wroclaw',
    size: 'md',
    set: [Sets.FREELANCE, Sets.LEARNING],
  },
  {
    name: 'Université libre de Bruxelles, Political Science',
    fromTo: '2011',
    where: 'Brussels',
    size: 'md',
    set: [Sets.FREELANCE, Sets.LEARNING],
  },
];

export const experience: ExperienceItem[] = data.map((el) => ({
  ...el,
  type: ExperienceType.Experience,
  sortingVelocity: vel,
  customColor: col,
}));
