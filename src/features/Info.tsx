import type { JSX } from 'react';
import { Html } from '@react-three/drei';
import { useStore } from '../store/store';
import { items } from '../data/items';
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
  fieldKey: 'selected-card__field-key',
  fieldValue: 'selected-card__field-value',
  link: 'selected-card__link',
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

export function Info(): JSX.Element | null {
  const isPresenting = useStore((state) => state.isPresenting);

  if (isPresenting === null) {
    return null;
  }

  const item = items[isPresenting];
  const familyLabel = item.family;
  const cardFields = item.cardFields ? Object.entries(item.cardFields) : [];
  const learningCourses = item.learningCourses ?? [];
  const familyTitleClass = familyStyles[item.family].split(' ')[0];

  return (
    <Html position={[4.5, 7, 1]}>
      <div
        className="max-h-[min(70vh,34rem)] w-[min(24rem,calc(100vw-2rem))] overflow-y-auto rounded-lg border bg-white/95 p-4 text-black sm:p-6"
      >
        <p className={`mb-2 ${cardTypographyClasses.familyLabel}`}>{familyLabel}</p>
        {item.date && (
          <p className={`mb-2 text-black ${cardTypographyClasses.metadata}`}>
            {formatDisplayDate(item.date)}
          </p>
        )}
        <p className={`mb-2 text-xl ${familyTitleClass} ${cardTypographyClasses.title}`}>
          {item.title}
        </p>
        {item.location && (
          <p className={`mb-2 ${cardTypographyClasses.metadata}`}>{item.location}</p>
        )}
        {item.subtitle && (
          <p className={`mb-2 ${cardTypographyClasses.subtitle}`}>{item.subtitle}</p>
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
              className={`text-black ${cardTypographyClasses.link}`}
              href={item.link}
              target="_blank"
              rel="noreferrer"
            >
              Link
            </a>
          </p>
        )}
        <div className="flex place-content-end ">
          <button
            className="text-black text-sm"
            type="button"
            onClick={() => useStore.setState({ isPresenting: null })}
          >
            CLOSE
          </button>
        </div>
      </div>
    </Html>
  );
}
