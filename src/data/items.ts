import type {
  Item3d,
  ItemFamily,
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

export const mainCategoryOrder: MainCategory[] = ['dev', 'creative', 'ai', 'career', 'learning'];
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
      learning: [],
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

export const groupDisplayLabels: Record<SelectedGroupOption, string> = {
  dev: 'Development',
  creative: 'Creative',
  ai: 'AI',
  career: 'Career',
  learning: 'Learning',
  kitchen: 'Kitchen',
  portfolio: 'Portfolio 2026',
  tpp: 'Orthodontic software',
  focus: 'Current focus',
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

const groupCardFamilyOrder: ItemFamily[] = ['career', 'project', 'ai', 'stack', 'creative', 'learning'];
const professionalProfileTitle = 'Professional profile';

export interface GroupDisplayItemSection {
  family: ItemFamily;
  itemIndexes: number[];
}

export function getGroupItemIndexes(sortOption: unknown): number[] {
  if (typeof sortOption !== 'string' || sortOption === 'sort') {
    return [];
  }

  if (sortOption in groupMembershipIndexes) {
    return groupMembershipIndexes[sortOption as SelectedGroupOption];
  }

  return [];
}

export function getGroupDisplayLabel(sortOption: unknown): string | null {
  if (typeof sortOption !== 'string' || sortOption === 'sort') {
    return null;
  }

  if (sortOption in groupDisplayLabels) {
    return groupDisplayLabels[sortOption as SelectedGroupOption];
  }

  return null;
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

export function getGroupDisplayItemSections(sortOption: unknown): GroupDisplayItemSection[] {
  const groupedIndexes = getGroupDisplayItemIndexes(sortOption);
  const indexesByFamily = new Map<ItemFamily, number[]>();

  groupedIndexes.forEach((itemIndex) => {
    const { family } = items[itemIndex];
    const familyIndexes = indexesByFamily.get(family) ?? [];

    familyIndexes.push(itemIndex);
    indexesByFamily.set(family, familyIndexes);
  });

  return groupCardFamilyOrder.reduce<GroupDisplayItemSection[]>((sections, family) => {
    const familyIndexes = indexesByFamily.get(family);

    if (!familyIndexes || familyIndexes.length === 0) {
      return sections;
    }

    const orderedFamilyIndexes =
      family === 'career'
        ? [...familyIndexes].sort((leftIndex, rightIndex) => {
            const leftIsProfile = items[leftIndex].title === professionalProfileTitle;
            const rightIsProfile = items[rightIndex].title === professionalProfileTitle;

            if (leftIsProfile === rightIsProfile) {
              return 0;
            }

            return leftIsProfile ? -1 : 1;
          })
        : familyIndexes;

    sections.push({
      family,
      itemIndexes: orderedFamilyIndexes,
    });

    return sections;
  }, []);
}
