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
  customColor: '#5fb8cc',
};

export const experience: SourceItem[] = [
  {
    title: 'Professional profile',
    description:
      '8+ years of experience delivering enterprise web applications in international environments. Experienced in translating stakeholder needs into technical requirements, contributing across the full product lifecycle, and building complex React and 2D/3D browser-based systems. Currently leading team-level AI adoption through workshops, workflow integration and practical use cases.',
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
      'Deliver features for an industry-leading orthodontic 3D software product, contributing across planning, design, implementation, testing and release preparation.',
      'Translate product and business needs into technical tasks in a vertical agile team, collaborating with product, design, QA and engineering stakeholders.',
      'Work with a modern React/TypeScript stack and 3D rendering libraries, focusing on maintainable, reusable frontend components for a complex domain product.',
      'Lead practical AI adoption within the team: organize AI workshops, introduce AI-supported workflows, collect feedback and support colleagues in day-to-day usage.',
      'Explore advanced AI topics such as context management, long-running agents and AI-assisted software delivery, with a focus on practical business value and responsible use.',
    ],
    ...dataSetup,
  },
  {
    title: 'TouK, Front-end Developer',
    date: 'Jul 2020 - Oct 2022',
    location: 'Warsaw',
    size: 'm',
    categories: ['dev', 'career'],
    projects: [],
    listItems: [
      'Developed an internal CMS for a major global media company, supporting complex editorial workflows.',
      'Worked in an international, cross-functional environment with product, engineering and business stakeholders.',
      'Collaborated with international stakeholders to understand content-management workflows and convert product requirements into maintainable frontend solutions.',
      'Translated functional needs into frontend features using React, TypeScript and testing frameworks.',
      'Delivered features in an agile environment with regular planning, reviews, daily stand-ups and iterative releases.',
    ],
    ...dataSetup,
  },
  {
    title: 'Itransition Group, Front-end Developer',
    date: 'Jan 2020 - May 2020',
    location: 'Warsaw',
    size: 's',
    categories: ['dev', 'career'],
    projects: ['kitchen'],
    listItems: [
      'Developed a browser-based 2D/3D kitchen planner for a major UK retailer using React, TypeScript and an in-house 2D/3D framework.',
    ],
    ...dataSetup,
  },
  {
    title: 'Credit Suisse, Senior Web Developer / Web Developer',
    date: 'May 2016 - Dec 2019',
    location: 'Wroclaw',
    size: 'm',
    categories: ['dev', 'career'],
    projects: [],
    listItems: [
      'Built internal SPA for global stakeholders in Switzerland, Poland, the USA and Singapore.',
      'Gathered requirements directly with business stakeholders, organized meetings, clarified scope and proposed delivery timelines.',
      'Delivered React, AngularJS and SharePoint-based solutions in a regulated financial-services environment.',
      'Combined UX, web design and implementation skills to deliver complete internal applications and web experiences.',
      'Collaborated with global branding teams; selected designs were included in global branding best practices.',
    ],
    ...dataSetup,
  },
  {
    title: 'GetBack S.A., Marketing / Creative Lead',
    date: 'May 2014 - Dec 2015',
    location: 'Wroclaw',
    size: 's',
    categories: ['career', 'creative'],
    projects: [],
    listItems: [
      'Led a five-person creative team, including recruitment, task planning and delivery coordination.',
      'Planned and executed customer/investor-facing campaigns in a fast-changing business environment.',
      'Managed websites, branding guidelines and digital content production.',
      'Built early experience in project coordination, stakeholder communication and business-oriented delivery.',
    ],
    ...dataSetup,
  },
  {
    title: 'Freelancer',
    date: 'Sep 2009 - May 2014',
    size: 's',
    categories: ['career', 'creative'],
    projects: [],
    listItems: [
      'Delivered small web, design and publishing projects for individual and business clients.',
      'Developed early experience in self-directed learning, digital content workflows and end-to-end delivery.',
    ],
    ...dataSetup,
  },
  {
    title: 'University of Wroclaw, MA History',
    date: '2004 - 2011',
    location: 'Wroclaw',
    size: 's',
    categories: ['career', 'learning'],
    projects: [],
    listItems: [
      'Studied archives and document management, with a focus on information organisation and institutional records.',
      'Built grounding in information governance, documentation practices, knowledge management and content/data lifecycle thinking.',
    ],
    ...learningDataSetup,
  },
  {
    title: 'Political Science studies',
    date: '2007 - 2012',
    location: 'Wroclaw, Brussels',
    size: 's',
    categories: ['career', 'learning'],
    projects: [],
    listItems: [
      'Studied political science at the University of Wroclaw and Universite Libre de Bruxelles.',
      'Completed an international study period in Brussels, Belgium.',
      'Covered political systems, public institutions and European context.',
    ],
    ...learningDataSetup,
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
