import { ai } from './ai';
import { creative } from './creative';
import {
  getGroupDisplayItemIndexes,
  getGroupDisplayItemSections,
  getGroupDisplayLabel,
  getGroupItemIndexes,
  groupDisplayLabels,
  groupMembershipIndexes,
  items,
  mainCategoryOrder,
  projectConstellationOrder,
} from './items';
import { experience } from './experience';
import { projects } from './projects';
import { technologies } from './technologies';
import type { SelectedGroupOption } from '../types';

const sourceItems = [
  ...ai,
  ...creative,
  ...technologies,
  ...experience,
  ...projects,
];
const groupOptions: SelectedGroupOption[] = [
  ...mainCategoryOrder,
  ...projectConstellationOrder,
  'focus',
];

const unsupportedValues: unknown[] = [
  undefined,
  null,
  42,
  {},
  'sort',
  'unsupported',
  '__proto__',
  'constructor',
];

describe('generated portfolio items', () => {
  it('preserves source data and generates unique stable IDs', () => {
    expect(items).toHaveLength(sourceItems.length);

    const ids = items.map((item) => item.id);

    expect(new Set(ids).size).toBe(items.length);

    items.forEach((item, index) => {
      const { id, ...itemWithoutId } = item;

      expect(itemWithoutId).toEqual(sourceItems[index]);
      expect(id).toBe(`${item.family}-${index}`);
    });
  });

  it('keeps every group membership aligned with item metadata', () => {
    groupOptions.forEach((option) => {
      const indexes = groupMembershipIndexes[option];
      const uniqueIndexes = new Set(indexes);

      expect(uniqueIndexes.size).toBe(indexes.length);
      expect(indexes).toEqual([...indexes].sort((left, right) => left - right));
      expect(indexes.every((index) => index >= 0 && index < items.length)).toBe(
        true
      );
    });

    mainCategoryOrder.forEach((category) => {
      const membership = new Set(groupMembershipIndexes[category]);

      items.forEach((item, index) => {
        expect(membership.has(index)).toBe(item.categories.includes(category));
      });
    });

    projectConstellationOrder.forEach((constellation) => {
      const membership = new Set(groupMembershipIndexes[constellation]);

      items.forEach((item, index) => {
        expect(membership.has(index)).toBe(
          item.projects.includes(constellation)
        );
      });
    });

    const focusMembership = new Set(groupMembershipIndexes.focus);

    items.forEach((item, index) => {
      expect(focusMembership.has(index)).toBe(item.focus === true);
    });
  });
});

describe('group lookup and display helpers', () => {
  it('returns the generated membership and label for supported groups', () => {
    groupOptions.forEach((option) => {
      expect(getGroupItemIndexes(option)).toEqual(
        groupMembershipIndexes[option]
      );
      expect(getGroupDisplayLabel(option)).toBe(groupDisplayLabels[option]);
    });
  });

  it('returns empty or null results for unsupported values', () => {
    unsupportedValues.forEach((value) => {
      expect(getGroupItemIndexes(value)).toEqual([]);
      expect(getGroupDisplayLabel(value)).toBeNull();
      expect(getGroupDisplayItemIndexes(value)).toEqual([]);
      expect(getGroupDisplayItemSections(value)).toEqual([]);
    });
  });

  it('keeps the intentional focus item order', () => {
    const focusTitles = getGroupDisplayItemIndexes('focus').map(
      (index) => items[index].title
    );

    expect(focusTitles).toEqual([
      'Professional profile',
      'Align Technology, Senior Software Engineer',
      'AI-assisted development',
      'AI knowledge sharing',
      'Industry-leading orthodontic software',
    ]);
  });

  it('keeps focus cards in the intended family sections', () => {
    const sections = getGroupDisplayItemSections('focus');

    expect(sections.map((section) => section.family)).toEqual([
      'career',
      'project',
      'ai',
    ]);
    expect(
      sections.map((section) =>
        section.itemIndexes.map((index) => items[index].title)
      )
    ).toEqual([
      ['Professional profile', 'Align Technology, Senior Software Engineer'],
      ['Industry-leading orthodontic software'],
      ['AI-assisted development', 'AI knowledge sharing'],
    ]);

    const displayedIndexes = getGroupDisplayItemIndexes('focus');
    const sectionIndexes = sections.flatMap((section) => section.itemIndexes);

    expect(new Set(sectionIndexes)).toEqual(new Set(displayedIndexes));
  });
});
