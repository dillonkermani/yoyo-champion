import { describe, it, expect, beforeEach } from 'vitest';
import { setStorage, getStorage } from '../storage';
import type { StateStorage } from 'zustand/middleware';

describe('storage abstraction', () => {
  beforeEach(() => {
    // Reset to noop storage before each test
    setStorage({
      getItem: () => null,
      setItem: () => undefined,
      removeItem: () => undefined,
    });
  });

  it('returns noop storage before setStorage is called', () => {
    const storage = getStorage();
    expect(storage.getItem('key')).toBeNull();
  });

  it('returns the storage set via setStorage', () => {
    const data: Record<string, string> = {};
    const mockStorage: StateStorage = {
      getItem: (key) => data[key] ?? null,
      setItem: (key, value) => { data[key] = String(value); },
      removeItem: (key) => { delete data[key]; },
    };

    setStorage(mockStorage);
    const storage = getStorage();

    storage.setItem('test', 'hello');
    expect(storage.getItem('test')).toBe('hello');

    storage.removeItem('test');
    expect(storage.getItem('test')).toBeNull();
  });

  it('allows replacing storage adapter', () => {
    const storage1: StateStorage = { getItem: () => 'first', setItem: () => undefined, removeItem: () => undefined };
    const storage2: StateStorage = { getItem: () => 'second', setItem: () => undefined, removeItem: () => undefined };

    setStorage(storage1);
    expect(getStorage().getItem('any')).toBe('first');

    setStorage(storage2);
    expect(getStorage().getItem('any')).toBe('second');
  });
});
