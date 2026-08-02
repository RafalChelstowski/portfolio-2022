import type { PresentationTarget } from './store';
import { useStore } from './store';

const resetStore = (): void => {
  useStore.setState({
    displayUi: false,
    presentation: { type: 'none' },
    sortOption: null,
    selectedGroup: null,
    activeGather: null,
  });
};

describe('presentation store', () => {
  beforeEach(resetStore);
  afterEach(resetStore);

  it('presents an item with its index and target while clearing gather state', () => {
    const targetPosition: PresentationTarget = [1, 2, 3];

    useStore.setState({
      displayUi: true,
      selectedGroup: 'portfolio',
      sortOption: 'sort',
      activeGather: { option: 'focus', startedAt: 100 },
    });

    useStore.getState().presentItem(7, targetPosition);

    expect(useStore.getState()).toMatchObject({
      displayUi: true,
      presentation: { type: 'item', itemIndex: 7, targetPosition },
      selectedGroup: 'portfolio',
      sortOption: null,
      activeGather: null,
    });
  });

  it('presents a group while clearing gather state', () => {
    useStore.setState({
      displayUi: true,
      selectedGroup: 'ai',
      sortOption: 'sort',
      activeGather: { option: 'dev', startedAt: 200 },
    });

    useStore.getState().presentGroup('focus');

    expect(useStore.getState()).toMatchObject({
      displayUi: true,
      presentation: { type: 'group', sortOption: 'focus' },
      selectedGroup: 'ai',
      sortOption: null,
      activeGather: null,
    });
  });

  it('sets the selected group without changing other state', () => {
    const presentation = {
      type: 'item' as const,
      itemIndex: 3,
      targetPosition: [4, 5, 6] as [number, number, number],
    };
    const activeGather = { option: 'portfolio' as const, startedAt: 300 };

    useStore.setState({
      displayUi: true,
      presentation,
      sortOption: 'sort',
      activeGather,
    });

    useStore.getState().setSelectedGroup('kitchen');

    expect(useStore.getState()).toMatchObject({
      displayUi: true,
      presentation,
      sortOption: 'sort',
      selectedGroup: 'kitchen',
      activeGather,
    });
  });

  it('clears the selected group without changing other state', () => {
    const presentation = {
      type: 'group' as const,
      sortOption: 'career' as const,
    };
    const activeGather = { option: 'sort' as const, startedAt: 400 };

    useStore.setState({
      displayUi: true,
      presentation,
      sortOption: 'sort',
      selectedGroup: 'career',
      activeGather,
    });

    useStore.getState().clearSelectedGroup();

    expect(useStore.getState()).toMatchObject({
      displayUi: true,
      presentation,
      sortOption: 'sort',
      selectedGroup: null,
      activeGather,
    });
  });

  it('closes a group presentation and clears its selected group', () => {
    useStore.setState({
      displayUi: true,
      presentation: { type: 'group', sortOption: 'learning' },
      sortOption: 'sort',
      selectedGroup: 'learning',
      activeGather: { option: 'sort', startedAt: 500 },
    });

    useStore.getState().closePresentation();

    expect(useStore.getState()).toMatchObject({
      displayUi: true,
      presentation: { type: 'none' },
      sortOption: 'sort',
      selectedGroup: null,
      activeGather: { option: 'sort', startedAt: 500 },
    });
  });

  it('closes an item presentation without clearing the selected group', () => {
    useStore.setState({
      displayUi: true,
      presentation: {
        type: 'item',
        itemIndex: 2,
        targetPosition: [0, 1, 2],
      },
      sortOption: 'sort',
      selectedGroup: 'creative',
      activeGather: { option: 'focus', startedAt: 600 },
    });

    useStore.getState().closePresentation();

    expect(useStore.getState()).toMatchObject({
      displayUi: true,
      presentation: { type: 'none' },
      sortOption: 'sort',
      selectedGroup: 'creative',
      activeGather: { option: 'focus', startedAt: 600 },
    });
  });

  it('closes an empty presentation without clearing the selected group', () => {
    useStore.setState({
      displayUi: true,
      presentation: { type: 'none' },
      sortOption: 'sort',
      selectedGroup: 'creative',
      activeGather: { option: 'focus', startedAt: 600 },
    });

    useStore.getState().closePresentation();

    expect(useStore.getState()).toMatchObject({
      displayUi: true,
      presentation: { type: 'none' },
      sortOption: 'sort',
      selectedGroup: 'creative',
      activeGather: { option: 'focus', startedAt: 600 },
    });
  });
});
