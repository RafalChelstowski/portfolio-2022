import type {
  Item3d,
  MainCategory,
  ProjectConstellation,
  SelectedGroupOption,
  SourceItem,
} from '../types';
import { ai } from './ai';
import { creative } from './creative';
import { experience } from './experience';
import { projects } from './projects';
import { technologies } from './technologies';

const sourceItems: SourceItem[] = [
  ...ai,
  ...creative,
  ...technologies,
  ...experience,
  ...projects,
];

export const items: Item3d[] = sourceItems.map((item, index) => ({
  ...item,
  id: `${item.family}-${index}`,
}));

export const mainCategoryOrder: MainCategory[] = ['dev', 'creative', 'ai', 'career'];
export const projectConstellationOrder: ProjectConstellation[] = [
  'tpp',
  'kitchen',
  'portfolio',
];

function createMainCategoryGroups(): Record<MainCategory, number[]> {
  return mainCategoryOrder.reduce<Record<MainCategory, number[]>>(
    (groups, category) => ({
      ...groups,
      [category]: items.reduce<number[]>((matches, item, index) => {
        if (item.categories.includes(category)) {
          matches.push(index);
        }

        return matches;
      }, []),
    }),
    {
      dev: [],
      creative: [],
      ai: [],
      career: [],
    }
  );
}

export const mainCategoryGroups = createMainCategoryGroups();

function createProjectConstellationGroups(): Record<ProjectConstellation, number[]> {
  return projectConstellationOrder.reduce<Record<ProjectConstellation, number[]>>(
    (groups, constellation) => ({
      ...groups,
      [constellation]: items.reduce<number[]>((matches, item, index) => {
        if (item.projects.includes(constellation)) {
          matches.push(index);
        }

        return matches;
      }, []),
    }),
    {
      kitchen: [],
      portfolio: [],
      tpp: [],
    }
  );
}

export const projectConstellationGroups = createProjectConstellationGroups();

export const focusGroup = items.reduce<number[]>((matches, item, index) => {
  if (item.focus === true) {
    matches.push(index);
  }

  return matches;
}, []);

export const groupMembershipIndexes: Record<SelectedGroupOption, number[]> = {
  ...mainCategoryGroups,
  ...projectConstellationGroups,
  focus: focusGroup,
};

const customGroupDisplayTitleOrder: Partial<Record<SelectedGroupOption, string[]>> = {
  focus: [
    'Professional profile',
    'Align Technology, Senior Software Engineer',
    'AI-assisted development',
    'AI knowledge sharing',
    'Industry-leading orthodontic software',
  ],
};

export function getGroupItemIndexes(sortOption: unknown): number[] {
  if (typeof sortOption !== 'string' || sortOption === 'sort') {
    return [];
  }

  if (sortOption in groupMembershipIndexes) {
    return groupMembershipIndexes[sortOption as SelectedGroupOption];
  }

  return [];
}

export function getGroupDisplayItemIndexes(sortOption: unknown): number[] {
  const groupIndexes = getGroupItemIndexes(sortOption);

  if (typeof sortOption !== 'string' || !(sortOption in customGroupDisplayTitleOrder)) {
    return groupIndexes;
  }

  const titleOrder = customGroupDisplayTitleOrder[sortOption as SelectedGroupOption];

  if (!titleOrder) {
    return groupIndexes;
  }

  const itemIndexByTitle = new Map(
    groupIndexes.map((itemIndex) => [items[itemIndex].title, itemIndex])
  );
  const orderedIndexes = titleOrder.reduce<number[]>((matches, title) => {
    const itemIndex = itemIndexByTitle.get(title);

    if (itemIndex !== undefined) {
      matches.push(itemIndex);
      itemIndexByTitle.delete(title);
    }

    return matches;
  }, []);

  return [...orderedIndexes, ...itemIndexByTitle.values()];
}
