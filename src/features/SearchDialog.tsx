import { useLayoutEffect, useMemo, useRef, useState, type JSX } from 'react';
import { items } from '../data/items';

interface SearchDialogProps {
  onClose: () => void;
  onSelect: (itemIndex: number) => void;
}

export function SearchDialog({
  onClose,
  onSelect,
}: SearchDialogProps): JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const matchingItems = useMemo(
    () =>
      items
        .map((item, index) => ({ item, index }))
        .filter(({ item }) =>
          item.title.toLowerCase().includes(normalizedQuery)
        ),
    [normalizedQuery]
  );

  useLayoutEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return undefined;
    }

    if (!dialog.open) {
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
    }
    inputRef.current?.focus();

    return () => {
      if (dialog.open) {
        if (typeof dialog.close === 'function') {
          dialog.close();
        } else {
          dialog.removeAttribute('open');
        }
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="search-portfolio-title"
      aria-modal="true"
      className="fixed left-1/2 top-1/2 m-0 max-h-[calc(100dvh-2rem)] w-[min(28rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-white p-0 text-black shadow-2xl backdrop:bg-black/60"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="flex max-h-[calc(100dvh-2rem)] flex-col p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2
            id="search-portfolio-title"
            className="text-lg font-semibold text-black"
          >
            Search portfolio
          </h2>
          <button
            aria-label="Close search"
            className="rounded border border-black/20 px-3 py-1 text-sm text-black"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>
        <label
          className="mb-4 block text-sm font-medium"
          htmlFor="portfolio-search"
        >
          Search by title
          <input
            ref={inputRef}
            autoComplete="off"
            className="mt-1 block w-full rounded border border-black/30 px-3 py-2 text-base outline-none focus:border-black focus:ring-2 focus:ring-black/20"
            id="portfolio-search"
            onChange={(event) => setQuery(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
              }
            }}
            type="search"
            value={query}
          />
        </label>
        <ul
          aria-label="Portfolio results"
          className="min-h-0 max-h-[min(56vh,24rem)] overflow-y-auto overscroll-contain touch-pan-y rounded border border-black/10"
        >
          {matchingItems.map(({ item, index }) => (
            <li key={item.id}>
              <button
                aria-label={`${item.title}, ${item.family}`}
                className="flex w-full items-center justify-between gap-4 px-3 py-2 text-left text-black hover:bg-black/5 focus:bg-black/5 focus:outline-none"
                onClick={() => onSelect(index)}
                type="button"
              >
                <span className="min-w-0 break-words">{item.title}</span>
                <span className="shrink-0 text-sm text-black/60">
                  {item.family}
                </span>
              </button>
            </li>
          ))}
          {matchingItems.length === 0 && (
            <li className="px-3 py-4 text-sm text-black/70" role="status">
              No results
            </li>
          )}
        </ul>
      </div>
    </dialog>
  );
}
