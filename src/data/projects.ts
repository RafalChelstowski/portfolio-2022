import { Sets, ProjectItem, ExperienceType } from '../types';

const vel = [-4, -2, -4];
const col = '#956062';

const data = [
  {
    name: 'Kitchen',
    description: '3D interactive cafeteria',
    link: 'https://kitchen.vercel.app/',
    size: 'xl',
    set: [Sets.CREATIVE_DEV],
  },
  {
    name: 'Tactics',
    description: '"Final Fantasy Tactics-like" 3D game engine concept /  wip',
    link: 'https://project-tactics.web.app/',
    size: 'xl',
    set: [Sets.CREATIVE_DEV],
  },
];

export const projects: ProjectItem[] = data.map((el) => ({
  ...el,
  type: ExperienceType.Project,
  sortingVelocity: vel,
  customColor: col,
}));
