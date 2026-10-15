import { useEffect, useRef, useState } from 'react';
import { mainCategoryOrder, projectConstellationOrder } from '../data/items';
import { useStore } from '../store/store';
import type { SelectedGroupOption, SortOption } from '../types';
import { SearchDialog } from './SearchDialog';

type FilterControl =
  | { type: 'button'; value: SortOption }
  | { type: 'divider'; key: string };

const filterControls: FilterControl[] = [
  { type: 'button', value: 'focus' },
  { type: 'divider', key: 'categories-divider' },
  ...mainCategoryOrder.map((value) => ({ type: 'button' as const, value })),
  { type: 'divider', key: 'projects-divider' },
  ...projectConstellationOrder.map((value) => ({
    type: 'button' as const,
    value,
  })),
  { type: 'divider', key: 'sort-divider' },
  { type: 'button', value: 'sort' },
];

export function UI() {
  const displayUi = useStore((state) => state.displayUi);
  const isPresenting = useStore((state) => state.presentation.type !== 'none');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);
  const searchDialogWasOpenRef = useRef(false);
  const restoreSearchFocusRef = useRef(true);
  const chromeInteractivityClass = isPresenting ? 'pointer-events-none' : '';
  const isSelectedGroupOption = (
    sortOption: SortOption
  ): sortOption is SelectedGroupOption => sortOption !== 'sort';
  useEffect(() => {
    if (!isSearchOpen && searchDialogWasOpenRef.current) {
      if (restoreSearchFocusRef.current) {
        searchTriggerRef.current?.focus();
      }
      restoreSearchFocusRef.current = true;
    }

    searchDialogWasOpenRef.current = isSearchOpen;
  }, [isSearchOpen]);

  const startGather = (sortOption: SortOption): void => {
    const selectedGroup = isSelectedGroupOption(sortOption) ? sortOption : null;

    useStore.setState({
      sortOption,
      selectedGroup,
      presentation: selectedGroup
        ? {
            type: 'group',
            sortOption: selectedGroup,
          }
        : { type: 'none' },
      activeGather: {
        option: sortOption,
        startedAt: Date.now(),
      },
      pendingSelection: null,
    });
  };

  return (
    <div
      className={`absolute inset-x-0 top-0 z-10 ${chromeInteractivityClass}`}
    >
      <header className="m-4 max-w-[calc(100vw-2rem)] sm:max-w-md">
        <h1 className="mb-1 text-base sm:text-lg">Rafal Chelstowski</h1>
        <h2 className="mb-1 whitespace-nowrap text-xs sm:text-base">
          Senior Software Engineer | Creative Front-End Dev
        </h2>
        <h2 className="mb-1 text-sm sm:text-base">Frankfurt am Main</h2>
        <h3 className="text-sm sm:text-base">
          <a
            href="https://www.linkedin.com/in/chelstowskirafal/?locale=en_US"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <span className="mx-4">|</span>
          <a
            href="https://github.com/RafalChelstowski"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </h3>
      </header>

      {displayUi && !isPresenting && (
        <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 text-xs sm:text-sm">
          <button
            ref={searchTriggerRef}
            aria-expanded={isSearchOpen}
            aria-haspopup="dialog"
            className="px-1 py-0.5 sm:px-0 sm:py-0"
            data-search-trigger="true"
            onClick={() => {
              restoreSearchFocusRef.current = true;
              setIsSearchOpen(true);
            }}
            type="button"
          >
            Search portfolio
          </button>
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
      {isSearchOpen && displayUi && !isPresenting && (
        <SearchDialog
          onClose={() => setIsSearchOpen(false)}
          onSelect={(itemIndex) => {
            restoreSearchFocusRef.current = false;
            useStore.getState().requestItemSelection(itemIndex);
            setIsSearchOpen(false);
          }}
        />
      )}
    </div>
  );
}
