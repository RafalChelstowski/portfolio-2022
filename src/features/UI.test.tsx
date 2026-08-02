import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Store } from '../store/store';
import { useStore } from '../store/store';
import { UI } from './UI';

const gatherTimestamp = 1_739_000_000_000;
const filterOptions = [
  'focus',
  'dev',
  'creative',
  'ai',
  'career',
  'learning',
  'tpp',
  'kitchen',
  'portfolio',
  'sort',
] as const;

function resetStore(): void {
  useStore.setState({
    displayUi: false,
    presentation: { type: 'none' },
    sortOption: null,
    selectedGroup: null,
    activeGather: null,
  });
}

function renderUi(state: Partial<Store> = {}) {
  resetStore();
  useStore.setState(state);

  return render(<UI />);
}

beforeEach(() => {
  resetStore();
  vi.spyOn(Date, 'now').mockReturnValue(gatherTimestamp);
});

afterEach(() => {
  resetStore();
  vi.restoreAllMocks();
});

describe('portfolio filter UI', () => {
  it('renders the profile chrome when filters are hidden', () => {
    renderUi();

    expect(
      screen.getByRole('heading', { level: 1, name: 'Rafal Chelstowski' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Senior Software Engineer | Creative Front-End Dev',
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Frankfurt am Main' })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/chelstowskirafal/?locale=en_US'
    );
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/RafalChelstowski'
    );
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('hides filters while a presentation is active', () => {
    renderUi({
      displayUi: true,
      presentation: { type: 'group', sortOption: 'dev' },
    });

    expect(screen.queryAllByRole('button')).toHaveLength(0);
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
  });

  it('exposes every filter as a button without exposing dividers as controls', () => {
    renderUi({ displayUi: true });

    expect(screen.getAllByRole('button')).toHaveLength(filterOptions.length);
    filterOptions.forEach((option) => {
      expect(screen.getByRole('button', { name: option })).toBeInTheDocument();
    });
    expect(screen.queryByRole('button', { name: '|' })).not.toBeInTheDocument();
  });

  it('starts a group gather and presents the selected group', async () => {
    renderUi({ displayUi: true });
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'creative' }));

    expect(useStore.getState()).toMatchObject({
      sortOption: 'creative',
      selectedGroup: 'creative',
      presentation: { type: 'group', sortOption: 'creative' },
      activeGather: {
        option: 'creative',
        startedAt: gatherTimestamp,
      },
    });
  });

  it('starts a sort gather without selecting or presenting a group', async () => {
    renderUi({
      displayUi: true,
      selectedGroup: 'dev',
      sortOption: 'dev',
    });
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'sort' }));

    expect(useStore.getState()).toMatchObject({
      sortOption: 'sort',
      selectedGroup: null,
      presentation: { type: 'none' },
      activeGather: {
        option: 'sort',
        startedAt: gatherTimestamp,
      },
    });
  });
});
