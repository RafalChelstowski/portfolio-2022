import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { items } from '../data/items';
import { useStore } from '../store/store';
import type { Item3d } from '../types';
import { ItemCardContent, SelectedCardOverlay } from './SelectedCardOverlay';

const cardFixture: Item3d = {
  id: 'fixture-project',
  title: 'Fixture project',
  family: 'project',
  size: 'm',
  categories: ['dev', 'creative'],
  projects: ['portfolio'],
  sortingVelocity: [0, 0, 0],
  customColor: '#000000',
  subtitle: 'A representative project subtitle.',
  description: 'A representative project description.',
  listItems: ['First list item', 'Second list item'],
  link: 'https://example.com/project',
  githubUrl: 'https://github.com/example/project',
  date: 'Jan 2024',
  location: 'Frankfurt am Main',
  current: true,
  outcome: 'A representative project outcome.',
  cardFields: {
    Tools: 'React',
    Tags: ['Three.js', 'Zustand'],
  },
  learningCourses: [
    {
      provider: 'Frontend Masters',
      course: 'Testing React',
    },
  ],
};

const minimalCardFixture: Item3d = {
  id: 'minimal-project',
  title: 'Minimal project',
  family: 'project',
  size: 's',
  categories: ['dev'],
  projects: ['portfolio'],
  sortingVelocity: [0, 0, 0],
  customColor: '#ffffff',
};

function resetStore(): void {
  useStore.setState({
    displayUi: false,
    presentation: { type: 'none' },
    sortOption: null,
    selectedGroup: null,
    activeGather: null,
  });
}

beforeEach(resetStore);
afterEach(resetStore);

describe('ItemCardContent', () => {
  it('renders optional metadata, fields, courses, lists, dates, and safe links', () => {
    render(<ItemCardContent item={cardFixture} hideFamilyLabel={false} />);

    expect(screen.getByText('project')).toBeInTheDocument();
    expect(screen.getByText('Fixture project')).toBeInTheDocument();
    expect(
      screen.getByText('A representative project subtitle.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('A representative project description.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('A representative project outcome.')
    ).toBeInTheDocument();
    expect(screen.getByText('Frankfurt am Main')).toBeInTheDocument();
    expect(screen.getByText('JAN 2024 -> current')).toBeInTheDocument();

    expect(screen.getByText('First list item')).toBeInTheDocument();
    expect(screen.getByText('Second list item')).toBeInTheDocument();
    expect(screen.getByText('Tools')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Tags')).toBeInTheDocument();
    expect(screen.getByText('Three.js, Zustand')).toBeInTheDocument();
    const learningHeading = screen.getByText('Learning courses:');

    expect(learningHeading).toBeInTheDocument();
    expect(learningHeading).toHaveClass('font-semibold');
    expect(screen.getByText('Frontend Masters')).toBeInTheDocument();
    expect(screen.getByText(/Testing React/)).toBeInTheDocument();

    const projectLink = screen.getByRole('link', { name: 'Link' });
    const githubLink = screen.getByRole('link', { name: 'Github' });

    expect(projectLink).toHaveAttribute('href', cardFixture.link);
    expect(projectLink).toHaveAttribute('target', '_blank');
    expect(projectLink).toHaveAttribute('rel', 'noreferrer');
    expect(githubLink).toHaveAttribute('href', cardFixture.githubUrl);
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noreferrer');
  });

  it.each([
    { hideFamilyLabel: false, expectedText: 'projectMinimal project' },
    { hideFamilyLabel: true, expectedText: 'Minimal project' },
  ])(
    'renders a sparse card without inventing optional content (hideFamilyLabel: $hideFamilyLabel)',
    ({ hideFamilyLabel, expectedText }) => {
      const { container } = render(
        <ItemCardContent
          item={minimalCardFixture}
          hideFamilyLabel={hideFamilyLabel}
        />
      );

      expect(screen.getByText(minimalCardFixture.title)).toBeInTheDocument();
      expect(container.textContent).toBe(expectedText);
      expect(
        container.querySelector('.selected-card__metadata')
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('.selected-card__subtitle')
      ).not.toBeInTheDocument();
      expect(container.querySelector('ul')).not.toBeInTheDocument();
      expect(
        container.querySelector('.selected-card__field-key')
      ).not.toBeInTheDocument();
      expect(screen.queryByText('Learning courses:')).not.toBeInTheDocument();
      expect(screen.queryAllByRole('link')).toHaveLength(0);

      if (hideFamilyLabel) {
        expect(
          screen.queryByText(minimalCardFixture.family)
        ).not.toBeInTheDocument();
      } else {
        expect(screen.getByText(minimalCardFixture.family)).toBeInTheDocument();
      }
    }
  );
});

describe('SelectedCardOverlay', () => {
  it('renders nothing without an active presentation', () => {
    const { container } = render(<SelectedCardOverlay />);

    expect(container.firstChild).toBeNull();
  });

  it('renders the selected real item and closes its presentation', async () => {
    const realItem = items.find((item) => item.title === 'Kitchen');

    if (!realItem) {
      throw new Error('Expected the Kitchen portfolio item to exist.');
    }

    useStore.getState().presentItem(items.indexOf(realItem), [1, 2, 3]);
    const { container } = render(<SelectedCardOverlay />);

    expect(screen.getByText(realItem.title)).toBeInTheDocument();
    expect(screen.getByText(realItem.family)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'CLOSE' }));

    expect(useStore.getState().presentation).toEqual({ type: 'none' });
    expect(container.firstChild).toBeNull();
  });

  it('renders a human-readable group with representative content and clears selection on close', async () => {
    const groupOption = 'focus' as const;
    const representativeItem = items.find(
      (item) => item.title === 'Professional profile'
    );

    if (!representativeItem) {
      throw new Error(
        'Expected the professional profile portfolio item to exist.'
      );
    }

    useStore.getState().setSelectedGroup(groupOption);
    useStore.getState().presentGroup(groupOption);
    const { container } = render(<SelectedCardOverlay />);

    expect(
      screen.getByRole('heading', { name: 'Current focus' })
    ).toBeInTheDocument();
    expect(screen.getByText(representativeItem.family)).toBeInTheDocument();
    expect(screen.getByText(representativeItem.title)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'CLOSE' }));

    expect(useStore.getState()).toMatchObject({
      presentation: { type: 'none' },
      selectedGroup: null,
    });
    expect(container.firstChild).toBeNull();
  });
});
