import { describe, it, expect, beforeEach } from 'vitest';
import { useOnboardingStore } from '../onboarding-store';
import { setStorage } from '../storage';

beforeEach(() => {
  setStorage({
    getItem: () => null,
    setItem: () => undefined,
    removeItem: () => undefined,
  });
  useOnboardingStore.getState().resetOnboarding();
});

describe('setHandedness', () => {
  it('sets handedness to left', () => {
    useOnboardingStore.getState().setHandedness('left');
    expect(useOnboardingStore.getState().handedness).toBe('left');
  });

  it('sets handedness to right', () => {
    useOnboardingStore.getState().setHandedness('right');
    expect(useOnboardingStore.getState().handedness).toBe('right');
  });

  it('can overwrite handedness', () => {
    useOnboardingStore.getState().setHandedness('left');
    useOnboardingStore.getState().setHandedness('right');
    expect(useOnboardingStore.getState().handedness).toBe('right');
  });
});

describe('setCountry', () => {
  it('sets country string', () => {
    useOnboardingStore.getState().setCountry('US');
    expect(useOnboardingStore.getState().country).toBe('US');
  });

  it('can overwrite country', () => {
    useOnboardingStore.getState().setCountry('US');
    useOnboardingStore.getState().setCountry('CA');
    expect(useOnboardingStore.getState().country).toBe('CA');
  });
});

describe('setRegion', () => {
  it('sets region/state string', () => {
    useOnboardingStore.getState().setRegion('California');
    expect(useOnboardingStore.getState().region).toBe('California');
  });
});

describe('setFavoriteYoyo', () => {
  it('sets favorite yoyo', () => {
    useOnboardingStore.getState().setFavoriteYoyo('YoyoFactory Shutter');
    expect(useOnboardingStore.getState().favoriteYoyo).toBe('YoyoFactory Shutter');
  });

  it('can overwrite favorite yoyo', () => {
    useOnboardingStore.getState().setFavoriteYoyo('Shutter');
    useOnboardingStore.getState().setFavoriteYoyo('Draupnir');
    expect(useOnboardingStore.getState().favoriteYoyo).toBe('Draupnir');
  });
});

describe('resetOnboarding clears new fields', () => {
  it('resets country and region to null', () => {
    useOnboardingStore.getState().setCountry('US');
    useOnboardingStore.getState().setRegion('California');
    useOnboardingStore.getState().resetOnboarding();
    expect(useOnboardingStore.getState().country).toBeNull();
    expect(useOnboardingStore.getState().region).toBeNull();
  });
});
