import without from 'lodash/without';
import { Item3d, Sets } from '../types';
import { courses } from './courses';
import { experience } from './experience';
import { projects } from './projects';
import { technologies } from './technologies';

export const items: Item3d[] = [
  ...courses,
  ...technologies,
  ...experience,
  ...projects,
].map((el, idx) => ({
  ...el,
  id: `${el.type}-${idx}`,
}));

function createSets(): Record<string, number[]> {
  let s = {};
  Object.entries(Sets).forEach(([key, value]) => {
    const values = without(
      items.map((item, idx) => (item.set?.includes(value) ? idx : undefined)),
      undefined
    );

    s = { ...s, [value]: values };
  });

  return s;
}

export const sets = createSets();
