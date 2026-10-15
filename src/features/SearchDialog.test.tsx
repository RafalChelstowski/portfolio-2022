import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { items } from '../data/items';
import { useStore } from '../store/store';
import { SelectedCardOverlay } from './SelectedCardOverlay';
import { UI } from './UI';

function resetStore(): void {
  useStore.setState({
    displayUi: true,
    presentation: { type: 'none' },
    sortOption: null,
    selectedGroup: null,
    activeGather: null,
    pendingSelection: null,
  });
}

function renderPortfolioIndex() {
  resetStore();
  return render(
    <>
      <SelectedCardOverlay />
      <UI />
    </>
  );
}

function resultLabels(): string[] {
  return within(screen.getByRole('list', { name: 'Portfolio results' }))
    .getAllByRole('button')
    .map((button) => button.getAttribute('aria-label') ?? '');
}

function expectedLabels(query = ''): string[] {
  const normalizedQuery = query.trim().toLowerCase();

  return items
    .filter((item) => item.title.toLowerCase().includes(normalizedQuery))
    .map((item) => `${item.title}, ${item.family}`);
}

beforeEach(resetStore);
afterEach(resetStore);

describe('search portfolio dialog', () => {
  it('starts focused, lists source order and normalizes whitespace/case queries', async () => {
    renderPortfolioIndex();
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'Search portfolio' }));

    const input = screen.getByRole('searchbox', { name: 'Search by title' });
    expect(input).toHaveFocus();
    expect(resultLabels()).toEqual(expectedLabels());

    await user.type(input, '   ');
    expect(resultLabels()).toEqual(expectedLabels());

    await user.clear(input);
    await user.type(input, '  kItCh  ');
    expect(resultLabels()).toEqual(expectedLabels('  kItCh  '));
    expect(resultLabels()).toContain('Kitchen, project');

    await user.clear(input);
    await user.type(input, 'zzq-no-item');
    expect(screen.getByRole('status')).toHaveTextContent('No results');
    expect(within(screen.getByRole('list')).queryByRole('button')).toBeNull();

    await user.clear(input);
    expect(resultLabels()).toEqual(expectedLabels());
  });

  it('selects a pointer result and focuses the live-body detail card then restores the trigger', async () => {
    const itemIndex = items.findIndex((item) => item.title === 'Kitchen');
    const item = items[itemIndex];
    const targetPosition: [number, number, number] = [9, -2, 4];
    useStore.setState({
      selectedGroup: 'dev',
      sortOption: 'sort',
      activeGather: { option: 'sort', startedAt: 10 },
    });
    renderPortfolioIndex();
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'Search portfolio' }));
    await user.click(
      screen.getByRole('button', {
        name: `${item.title}, ${item.family}`,
      })
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(useStore.getState()).toMatchObject({
      pendingSelection: itemIndex,
      presentation: { type: 'none' },
      selectedGroup: null,
      sortOption: null,
      activeGather: null,
    });

    act(() => {
      useStore.getState().presentPendingSelection(itemIndex, targetPosition);
    });

    const selectedCard = screen.getByRole('region', {
      name: `${item.title} details`,
    });
    expect(selectedCard).toHaveFocus();
    expect(screen.getByText(item.title)).toBeInTheDocument();
    expect(useStore.getState().presentation).toMatchObject({
      type: 'item',
      itemIndex,
      targetPosition,
    });

    await user.click(screen.getByRole('button', { name: 'CLOSE' }));
    expect(
      screen.getByRole('button', { name: 'Search portfolio' })
    ).toHaveFocus();
    await user.click(screen.getByRole('button', { name: 'dev' }));
    expect(useStore.getState().presentation).toEqual({
      type: 'group',
      sortOption: 'dev',
    });
  });

  it.each(['{Enter}', ' '])(
    'supports keyboard result activation with %s',
    async (key) => {
      renderPortfolioIndex();
      const user = userEvent.setup();

      await user.click(
        screen.getByRole('button', { name: 'Search portfolio' })
      );
      const input = screen.getByRole('searchbox', { name: 'Search by title' });
      expect(input).toHaveFocus();
      await user.tab();

      const firstResult = within(
        screen.getByRole('list', { name: 'Portfolio results' })
      ).getAllByRole('button')[0];
      expect(firstResult).toHaveFocus();
      await user.keyboard(key);

      expect(useStore.getState().pendingSelection).toBe(0);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    }
  );

  it('closes on Escape or its close button and resets the query on reopen', async () => {
    renderPortfolioIndex();
    const user = userEvent.setup();
    const trigger = screen.getByRole('button', { name: 'Search portfolio' });

    await user.click(trigger);
    const input = screen.getByRole('searchbox', { name: 'Search by title' });
    await user.type(input, 'Kitchen');
    await user.click(screen.getByRole('button', { name: 'Close search' }));
    expect(trigger).toHaveFocus();

    await user.click(trigger);
    const reopenedInput = screen.getByRole('searchbox', {
      name: 'Search by title',
    });
    expect(reopenedInput).toHaveValue('');
    expect(reopenedInput).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
