import type { JSX } from 'react';
import { items } from '../data/items';
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
  subtitle: 'selected-card__subtitle',
  metadata: 'selected-card__metadata',
  currentBadge: 'selected-card__current-badge',
  fieldKey: 'selected-card__field-key font-semibold',
  fieldValue: 'selected-card__field-value',
  link: 'selected-card__link underline',
};

function renderCardFieldValue(value: CardFieldValue): string {
  return Array.isArray(value) ? value.join(', ') : value;
}

function formatDisplayDate(value: string): string {
  return value.replace(
    /\b(january|jan|february|feb|march|mar|april|apr|may|june|jun|july|jul|august|aug|september|sep|sept|october|oct|november|nov|december|dec)\b/gi,
    (match) => match.toUpperCase(),
  );
}

export function SelectedCardOverlay(): JSX.Element | null {
  const isPresenting = useStore((state) => state.isPresenting);
  const closePresentation = useStore((state) => state.closePresentation);

  if (isPresenting === null) {
    return null;
  }

  const item = items[isPresenting];
  const familyLabel = item.family;
  const cardFields = item.cardFields ? Object.entries(item.cardFields) : [];
  const learningCourses = item.learningCourses ?? [];
  const familyTitleClass = familyStyles[item.family].split(' ')[0];
  const showCurrentBadge = item.current === true;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-stretch justify-center overflow-hidden p-3 sm:items-start sm:justify-end sm:p-6">
      <div className="pointer-events-auto max-h-full min-w-0 w-full max-w-96 overflow-y-auto overscroll-contain rounded-lg border bg-white/95 p-4 text-black break-words [overflow-wrap:anywhere] sm:p-6">
        <div className="sticky top-0 z-10 -mx-1 mb-2 flex place-content-end bg-white/95 py-1">
          <button
            className="text-black text-sm"
            type="button"
            onClick={closePresentation}
          >
            CLOSE
          </button>
        </div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <p className={`uppercase ${cardTypographyClasses.familyLabel}`}>{familyLabel}</p>
          {showCurrentBadge && (
            <span
              className={`rounded-sm border px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide ${familyStyles[item.family]} ${cardTypographyClasses.currentBadge}`}
            >
              CURRENT
            </span>
          )}
        </div>
        {item.date && (
          <p className={`mb-2 text-black ${cardTypographyClasses.metadata}`}>
            {formatDisplayDate(item.date)}
          </p>
        )}
        <p className={`mb-2 text-xl uppercase ${familyTitleClass} ${cardTypographyClasses.title}`}>
          {item.title}
        </p>
        {item.location && (
          <p className={`mb-2 ${cardTypographyClasses.metadata}`}>{item.location}</p>
        )}
        {item.subtitle && (
          <p className={`mb-2 uppercase ${cardTypographyClasses.subtitle}`}>{item.subtitle}</p>
        )}
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
      </div>
    </div>
  );
}
