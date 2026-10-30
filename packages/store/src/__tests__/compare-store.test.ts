import { describe, it, expect, beforeEach } from 'vitest';
import {
  useCompareStore,
  MAX_COMPARE,
  selectCompareCount,
  selectIsCompared,
  selectCompareFull,
} from '../compare-store';

describe('compare store', () => {
  beforeEach(() => {
    useCompareStore.getState().clearCompare();
  });

  it('toggles a handle in and out', () => {
    useCompareStore.getState().toggleCompare('shutter');
    expect(selectIsCompared('shutter')(useCompareStore.getState())).toBe(true);
    useCompareStore.getState().toggleCompare('shutter');
    expect(selectIsCompared('shutter')(useCompareStore.getState())).toBe(false);
  });

  it('caps the list at MAX_COMPARE and keeps insertion order', () => {
    const handles = ['a', 'b', 'c', 'd', 'e'];
    handles.forEach((h) => useCompareStore.getState().toggleCompare(h));
    expect(useCompareStore.getState().handles).toEqual(handles.slice(0, MAX_COMPARE));
    expect(selectCompareFull(useCompareStore.getState())).toBe(true);
  });

  it('removes one and clears all', () => {
    useCompareStore.getState().toggleCompare('a');
    useCompareStore.getState().toggleCompare('b');
    useCompareStore.getState().removeFromCompare('a');
    expect(useCompareStore.getState().handles).toEqual(['b']);
    useCompareStore.getState().clearCompare();
    expect(selectCompareCount(useCompareStore.getState())).toBe(0);
  });
});
