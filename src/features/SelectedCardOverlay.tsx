import type { JSX } from 'react';
import { getGroupDisplayItemSections, getGroupDisplayLabel, items } from '../data/items';
import { useStore } from '../store/store';
import type { CardFieldValue, Item3d } from '../types';

const familyStyles: Record<Item3d['family'], string> = {
  project: 'text-vDarkPink border-vDarkPink',
  ai: 'text-vMediumBlue border-vMediumBlue',
  stack: 'text-vMediumPink border-vMediumPink',
  creative: 'text-vDarkPink border-vDarkPink',
  career: 'text-vDarkBlue border-vDarkBlue',
  learning: 'text-vLearningBlue border-vLearningBlue',
};

const cardTypographyClasses = {
  familyLabel: 'selected-card__family-label',
  sectionLabel: 'selected-card__section-label',
  title: 'selected-card__title',
  groupTitle: 'selected-card__group-title',
  subtitle: 'selected-card__subtitle',
  metadata: 'selected-card__metadata',
  fieldKey: 'selected-card__field-key font-semibold',
  fieldValue: 'selected-card__field-value',
  link: 'selected-card__link underline',
};

const overlayContainerClasses =
  'pointer-events-none absolute inset-0 z-[1100] overflow-hidden';
const overlayPlacementClasses =
  'ml-auto flex h-full w-full items-end justify-center px-0 pb-3 pt-0 sm:pb-4 md:w-1/2 md:items-center md:justify-end md:px-6 md:py-12 lg:py-16';
const cardShellClasses =
  'pointer-events-auto flex h-[30vh] max-h-[30vh] min-w-0 w-full max-w-none flex-col overflow-hidden rounded-t-lg border bg-white/95 text-black break-words [overflow-wrap:anywhere] md:h-auto md:max-h-[calc(100vh-6rem)] md:max-w-96 md:rounded-lg lg:max-h-[calc(100vh-8rem)]';
const cardBodyClasses =
  'min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6';
const groupCardBodyClasses =
  `${cardBodyClasses} selected-card__scrollable pr-3 sm:pr-5`;

function renderCardFieldValue(value: CardFieldValue): string {
  return Array.isArray(value) ? value.join(', ') : value;
}

function formatDisplayDate(value: string): string {
  return value.replace(
    /\b(january|jan|february|feb|march|mar|april|apr|may|june|jun|july|jul|august|aug|september|sep|sept|october|oct|november|nov|december|dec)\b/gi,
    (match) => match.toUpperCase(),
  );
}

function getDisplayDate(item: Item3d): string | null {
  if (!item.date) {
    return null;
  }

  const dateRange = item.current === true ? `${item.date} -> current` : item.date;

  return formatDisplayDate(dateRange);
}

interface ItemCardContentProps {
  item: Item3d;
  hideFamilyLabel: boolean;
}

export function ItemCardContent({ item, hideFamilyLabel }: ItemCardContentProps): JSX.Element {
  const familyLabel = item.family;
  const cardFields = item.cardFields ? Object.entries(item.cardFields) : [];
  const learningCourses = item.learningCourses ?? [];
  const listItems = item.listItems ?? [];
  const familyTitleClass = familyStyles[item.family].split(' ')[0];
  const displayDate = getDisplayDate(item);

  return (
    <>
      {!hideFamilyLabel && (
        <div className="mb-2">
          <p className={`uppercase ${cardTypographyClasses.familyLabel}`}>{familyLabel}</p>
        </div>
      )}
      {displayDate && (
        <p className={`mb-2 text-black ${cardTypographyClasses.metadata}`}>
          {displayDate}
        </p>
      )}
      <div className="mb-2 flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
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
      {listItems.length > 0 && (
        <ul className="mb-2 list-outside list-disc space-y-2 pl-5">
          {listItems.map((listItem) => (
            <li key={listItem} className="pl-1">
              {listItem}
            </li>
          ))}
        </ul>
      )}
      {cardFields.map(([key, value]) => (
        <p key={key} className="mb-2">
          <span className={cardTypographyClasses.fieldKey}>{key}</span>
          {': '}
          <span className={cardTypographyClasses.fieldValue}>{renderCardFieldValue(value)}</span>
        </p>
      ))}
      {learningCourses.length > 0 && (
        <div className="mb-2">
          <p className="font-semibold">Learning courses</p>
          <div className="mt-2">
            {learningCourses.map(({ provider, course }) => (
              <p key={`${provider}-${course}`} className="mb-1">
                <span className="font-semibold">{provider}</span>: {course}
              </p>
            ))}
          </div>
        </div>
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

interface StickyCloseControlProps {
  onClose: () => void;
}

function StickyCloseControl({ onClose }: StickyCloseControlProps): JSX.Element {
  return (
    <div className="shrink-0 border-t border-black/10 bg-white/95 px-4 py-3 sm:px-6 sm:py-4">
      <button
        className="rounded-sm border border-black/20 bg-white/90 px-2 py-1 text-sm text-black shadow-sm"
        type="button"
        onClick={onClose}
      >
        CLOSE
      </button>
    </div>
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
    const groupItemSections = getGroupDisplayItemSections(presentation.sortOption);

    return (
      <div className={overlayContainerClasses}>
        <div className={overlayPlacementClasses}>
          <div className={cardShellClasses}>
            <div className={groupCardBodyClasses}>
              <h2
                className={`mb-4 text-2xl uppercase text-black ${cardTypographyClasses.groupTitle}`}
              >
                {groupLabel}
              </h2>
              {groupItemSections.length > 0 ? (
                <div className="space-y-5">
                  {groupItemSections.map(({ family, itemIndexes }) => (
                    <section key={family} className="border-t border-black/15 pt-4 first:border-t-0 first:pt-0">
                      <div className="mb-2">
                        <p className={`uppercase ${cardTypographyClasses.sectionLabel}`}>{family}</p>
                      </div>
                      <div className="space-y-4">
                        {itemIndexes.map((itemIndex) => (
                          <article
                            key={items[itemIndex].id}
                            className="border-t border-black/10 pt-4 first:border-t-0 first:pt-0"
                          >
                            <ItemCardContent item={items[itemIndex]} hideFamilyLabel />
                          </article>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              ) : (
                <p className="mb-2">No items available.</p>
              )}
            </div>
            <StickyCloseControl onClose={closePresentation} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={overlayContainerClasses}>
      <div className={overlayPlacementClasses}>
        <div className={cardShellClasses}>
          <div className={cardBodyClasses}>
            <ItemCardContent item={items[presentation.itemIndex]} hideFamilyLabel={false} />
          </div>
          <StickyCloseControl onClose={closePresentation} />
        </div>
      </div>
    </div>
  );
}
