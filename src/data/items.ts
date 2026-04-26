import type { Item3d, MainCategory, SourceItem } from '../types';
import { ai } from './ai';
import { creative } from './creative';
import { courses } from './courses';
import { experience } from './experience';
import { projects } from './projects';
import { technologies } from './technologies';

const sourceItems: SourceItem[] = [
  ...courses,
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
