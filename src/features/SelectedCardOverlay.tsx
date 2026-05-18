import type { JSX } from 'react';
import { getGroupDisplayItemIndexes, getGroupDisplayLabel, items } from '../data/items';
import { useStore } from '../store/store';
import type { CardFieldValue, Item3d } from '../types';

const familyStyles: Record<Item3d['family'], string> = {
  project: 'text-vDarkPink border-vDarkPink',
  ai: 'text-vMediumBlue border-vMediumBlue',
  stack: 'text-vMediumPink border-vMediumPink',
  creative: 'text-vDarkPink border-vDarkPink',
  career: 'text-vDarkBlue border-vDarkBlue',
};

const cardTypographyClasses = {
  familyLabel: 'selected-card__family-label',
  title: 'selected-card__title',
  groupTitle: 'selected-card__group-title',
  subtitle: 'selected-card__subtitle',
  metadata: 'selected-card__metadata',
  currentBadge: 'selected-card__current-badge',
  fieldKey: 'selected-card__field-key font-semibold',
  fieldValue: 'selected-card__field-value',
  link: 'selected-card__link underline',
};

const overlayContainerClasses =
  'pointer-events-none absolute inset-0 z-[1100] overflow-hidden';
const overlayPlacementClasses =
  'ml-auto flex h-full w-full items-end justify-center px-0 pb-3 pt-0 sm:pb-4 md:w-1/2 md:items-center md:justify-end md:px-6 md:py-12 lg:py-16';
const cardShellClasses =
  'pointer-events-auto h-[30vh] max-h-[30vh] min-w-0 w-full max-w-none overflow-y-auto overscroll-contain rounded-t-lg border bg-white/95 p-4 text-black break-words [overflow-wrap:anywhere] sm:p-6 md:h-auto md:max-h-[calc(100vh-6rem)] md:max-w-96 md:rounded-lg lg:max-h-[calc(100vh-8rem)]';

function renderCardFieldValue(value: CardFieldValue): string {
  return Array.isArray(value) ? value.join(', ') : value;
}

function formatDisplayDate(value: string): string {
  return value.replace(
    /\b(january|jan|february|feb|march|mar|april|apr|may|june|jun|july|jul|august|aug|september|sep|sept|october|oct|november|nov|december|dec)\b/gi,
    (match) => match.toUpperCase(),
  );
}

interface ItemCardContentProps {
  item: Item3d;
}

export function ItemCardContent({ item }: ItemCardContentProps): JSX.Element {
  const familyLabel = item.family;
  const cardFields = item.cardFields ? Object.entries(item.cardFields) : [];
  const learningCourses = item.learningCourses ?? [];
  const familyTitleClass = familyStyles[item.family].split(' ')[0];
  const showCurrentBadge = item.current === true;

  return (
    <>
      <div className="mb-2">
        <p className={`uppercase ${cardTypographyClasses.familyLabel}`}>{familyLabel}</p>
      </div>
      {item.date && (
        <p className={`mb-2 text-black ${cardTypographyClasses.metadata}`}>
          {formatDisplayDate(item.date)}
        </p>
      )}
      <div className="mb-2 flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
        {showCurrentBadge && (
          <span
            className={`inline-flex items-center rounded-sm border px-2.5 py-1 text-[0.625rem] font-semibold uppercase leading-none tracking-wide ${familyStyles[item.family]} ${cardTypographyClasses.currentBadge}`}
          >
            CURRENT
          </span>
        )}
        <p className={`min-w-0 flex-1 text-xl uppercase ${familyTitleClass} ${cardTypographyClasses.title}`}>
          {item.title}
        </p>
      </div>
      {item.location && (
        <p className={`mb-2 ${cardTypographyClasses.metadata}`}>{item.location}</p>
      )}
      {item.subtitle && <p className={`mb-2 ${cardTypographyClasses.subtitle}`}>{item.subtitle}</p>}
      {item.description && <p className="mb-2">{item.description}</p>}
      {item.outcome && <p className="mb-2">{item.outcome}</p>}
      {cardFields.map(([key, value]) => (
        <p key={key} className="mb-2">
          <span className={cardTypographyClasses.fieldKey}>{key}</span>
          {': '}
          <span className={cardTypographyClasses.fieldValue}>{renderCardFieldValue(value)}</span>
        </p>
      ))}
      {learningCourses.length > 0 && (
        <details className="mb-2">
          <summary className="cursor-pointer">Learning courses</summary>
          <div className="mt-2">
            {learningCourses.map(({ provider, course }) => (
              <p key={`${provider}-${course}`} className="mb-1">
                <span className="font-semibold">{provider}</span>: {course}
              </p>
            ))}
          </div>
        </details>
      )}
      {item.link && (
        <p className="mb-2">
          <a
            className={`text-black break-words ${cardTypographyClasses.link}`}
            href={item.link}
            target="_blank"
            rel="noreferrer"
          >
            Link
          </a>
        </p>
      )}
    </>
  );
}

export function SelectedCardOverlay(): JSX.Element | null {
  const presentation = useStore((state) => state.presentation);
  const closePresentation = useStore((state) => state.closePresentation);

  if (presentation.type === 'none') {
    return null;
  }

  if (presentation.type === 'group') {
    const groupLabel = getGroupDisplayLabel(presentation.sortOption) ?? 'Group';
    const groupItems = getGroupDisplayItemIndexes(presentation.sortOption).map(
      (itemIndex) => items[itemIndex],
    );

    return (
      <div className={overlayContainerClasses}>
        <div className={overlayPlacementClasses}>
          <div className={cardShellClasses}>
            <h2
              className={`mb-4 text-2xl uppercase text-black ${cardTypographyClasses.groupTitle}`}
            >
              {groupLabel}
            </h2>
            {groupItems.length > 0 ? (
              <div className="space-y-4">
                {groupItems.map((item) => (
                  <section
                    key={item.id}
                    className="border-t border-black/15 pt-4 first:border-t-0 first:pt-0"
                  >
                    <ItemCardContent item={item} />
                  </section>
                ))}
              </div>
            ) : (
              <p className="mb-2">No items available.</p>
            )}
            <div className="mt-4 flex justify-start">
              <button
                className="rounded-sm border border-black/20 bg-white/90 px-2 py-1 text-black text-sm shadow-sm"
                type="button"
                onClick={closePresentation}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={overlayContainerClasses}>
      <div className={overlayPlacementClasses}>
        <div className={cardShellClasses}>
          <ItemCardContent item={items[presentation.itemIndex]} />
          <div className="mt-4 flex justify-start">
            <button
              className="rounded-sm border border-black/20 bg-white/90 px-2 py-1 text-black text-sm shadow-sm"
              type="button"
              onClick={closePresentation}
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
