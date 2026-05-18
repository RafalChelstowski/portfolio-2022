import { mainCategoryOrder, projectConstellationOrder } from '../data/items';
import { useStore } from '../store/store';
import type { SelectedGroupOption, SortOption } from '../types';

type FilterControl =
  | { type: 'button'; value: SortOption }
  | { type: 'divider'; key: string };

const filterControls: FilterControl[] = [
  ...mainCategoryOrder.map((value) => ({ type: 'button' as const, value })),
  { type: 'divider', key: 'focus-divider' },
  { type: 'button', value: 'focus' },
  { type: 'divider', key: 'projects-divider' },
  ...projectConstellationOrder.map((value) => ({ type: 'button' as const, value })),
  { type: 'divider', key: 'sort-divider' },
  { type: 'button', value: 'sort' },
];

export function UI() {
  const displayUi = useStore((state) => state.displayUi);
  const isPresenting = useStore((state) => state.presentation.type !== 'none');
  const chromeInteractivityClass = isPresenting ? 'pointer-events-none' : '';
  const isSelectedGroupOption = (sortOption: SortOption): sortOption is SelectedGroupOption =>
    sortOption !== 'sort';
  const startGather = (sortOption: SortOption): void => {
    useStore.setState({
      sortOption,
      selectedGroup: isSelectedGroupOption(sortOption) ? sortOption : null,
      activeGather: {
        option: sortOption,
        startedAt: Date.now(),
      },
    });
  };

  return (
    <div className={`absolute inset-x-0 top-0 z-10 ${chromeInteractivityClass}`}>
      <header className="m-4 max-w-[calc(100vw-2rem)] sm:max-w-md">
        <h1 className="mb-1 text-base sm:text-lg">Rafal Chelstowski</h1>
        <h2 className="mb-1 whitespace-nowrap text-xs sm:text-base">
          Senior Software Engineer | Creative Front-End Dev
        </h2>
        <h2 className="mb-1 text-sm sm:text-base">Frankfurt am Main</h2>
        <h3 className="text-sm sm:text-base">
          <a
            href="https://www.linkedin.com/in/chelstowskirafal/?locale=en_US"
            target="blank"
          >
            LinkedIn
          </a>
          <span className="mx-4">|</span>
          <a href="https://github.com/RafalChelstowski" target="blank">
            GitHub
          </a>
        </h3>
      </header>

      {displayUi && !isPresenting && (
        <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 text-xs sm:text-sm">
          {filterControls.map((control) => {
            if (control.type === 'divider') {
              return (
                <span
                  key={control.key}
                  aria-hidden="true"
                  className="pointer-events-none select-none text-white"
                >
                  |
                </span>
              );
            }

            return (
              <button
                key={control.value}
                className="px-1 py-0.5 sm:px-0 sm:py-0"
                onClick={() => {
                  startGather(control.value);
                }}
                type="button"
              >
                {control.value}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
