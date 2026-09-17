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
import type { ItemFamily, SelectedGroupOption } from '../types';

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
const presentationFamilyOrder: ItemFamily[] = [
  'career',
  'project',
  'ai',
  'stack',
  'creative',
  'learning',
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

  it.each(groupOptions)(
    'generates lossless non-empty sections in presentation order for %s',
    (option) => {
      const displayedIndexes = getGroupDisplayItemIndexes(option);
      const sections = getGroupDisplayItemSections(option);
      const sectionIndexes = sections.flatMap((section) => section.itemIndexes);
      const sectionFamilies = sections.map((section) => section.family);
      const expectedFamilyOrder: ItemFamily[] =
        option === 'kitchen'
          ? [
              'project',
              ...presentationFamilyOrder.filter(
                (family) => family !== 'project'
              ),
            ]
          : presentationFamilyOrder;
      const expectedFamilies = expectedFamilyOrder.filter((family) =>
        displayedIndexes.some((index) => items[index].family === family)
      );

      expect(sectionIndexes).toHaveLength(displayedIndexes.length);
      expect(new Set(sectionIndexes).size).toBe(sectionIndexes.length);
      expect(new Set(sectionIndexes)).toEqual(new Set(displayedIndexes));
      expect(sectionFamilies).toEqual(expectedFamilies);

      sections.forEach((section) => {
        expect(section.itemIndexes.length).toBeGreaterThan(0);

        section.itemIndexes.forEach((index) => {
          expect(items[index].family).toBe(section.family);
        });
      });
    }
  );

  it('prioritizes Kitchen project cards while keeping focus career-first', () => {
    const kitchenFamilies = getGroupDisplayItemSections('kitchen').map(
      (section) => section.family
    );

    expect(kitchenFamilies.slice(0, 2)).toEqual(['project', 'career']);

    const focusFamilies = getGroupDisplayItemSections('focus').map(
      (section) => section.family
    );

    expect(focusFamilies.indexOf('career')).toBeLessThan(
      focusFamilies.indexOf('project')
    );
  });

  it('keeps the intentional focus item order', () => {
    const focusTitles = getGroupDisplayItemIndexes('focus').map(
      (index) => items[index].title
    );

    expect(focusTitles).toEqual([
      'Professional profile',
      'Align Technology, Senior Software Engineer',
      'Agent orchestration',
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
      ['Agent orchestration', 'AI knowledge sharing'],
    ]);

    const displayedIndexes = getGroupDisplayItemIndexes('focus');
    const sectionIndexes = sections.flatMap((section) => section.itemIndexes);

    expect(new Set(sectionIndexes)).toEqual(new Set(displayedIndexes));
  });
});
