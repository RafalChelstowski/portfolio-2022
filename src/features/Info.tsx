import type { JSX } from 'react';
import { Html } from '@react-three/drei';
import isNumber from 'lodash/isNumber.js';
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

  if (!isNumber(isPresenting)) {
    return null;
  }

  const item = items[isPresenting];
  const familyLabel = `${item.family} / ${item.categories.join(', ')}`;
  const cardFields = item.cardFields ? Object.entries(item.cardFields) : [];

  return (
    <Html position={[4.5, 7, 1]}>
      <div
        className={`max-h-[min(70vh,34rem)] w-[min(24rem,calc(100vw-2rem))] overflow-y-auto rounded-lg bg-white/95 p-4 sm:p-6 ${familyStyles[item.family]}`}
      >
        <p className="mb-2">{familyLabel}</p>
        {item.date && <p className="mb-2">{formatDisplayDate(item.date)}</p>}
        <p className="text-xl mb-2">{item.title}</p>
        {item.location && <p className="mb-2">{item.location}</p>}
        {item.subtitle && <p className="mb-2">{item.subtitle}</p>}
        {item.description && <p className="mb-2">{item.description}</p>}
        {item.outcome && <p className="mb-2">{item.outcome}</p>}
        {cardFields.map(([key, value]) => (
          <p key={key} className="mb-2">
            {key}: {renderCardFieldValue(value)}
          </p>
        ))}
        {item.link && (
          <p className="mb-2">
            <a href={item.link} target="_blank" rel="noreferrer">
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
