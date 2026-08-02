import type { ItemSize } from '../types';
import { getSize } from './getSize';

describe('getSize', () => {
  it('returns the scale for small items', () => {
    expect(getSize('s')).toEqual([0.42, 0.42, 0.42]);
  });

  it('returns the scale for medium items', () => {
    expect(getSize('m')).toEqual([0.62, 0.62, 0.62]);
  });

  it('returns the scale for large items', () => {
    expect(getSize('l')).toEqual([0.8, 0.8, 0.8]);
  });

  it('uses a safe default for an invalid runtime size', () => {
    const invalidSize = 'invalid' as unknown as ItemSize;

    expect(getSize(invalidSize)).toEqual([0.4, 0.4, 0.4]);
  });
});
