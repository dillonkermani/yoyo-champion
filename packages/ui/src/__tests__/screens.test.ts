import { describe, it, expect } from 'vitest';

describe('screens exports', () => {
  it('exports HomeScreen', async () => {
    const mod = await import('../screens/HomeScreen');
    expect(mod.HomeScreen).toBeDefined();
  });
  it('exports LearnScreen', async () => {
    const mod = await import('../screens/LearnScreen');
    expect(mod.LearnScreen).toBeDefined();
  });
  it('exports TrickDetailScreen', async () => {
    const mod = await import('../screens/TrickDetailScreen');
    expect(mod.TrickDetailScreen).toBeDefined();
  });
  it('exports ProfileScreen', async () => {
    const mod = await import('../screens/ProfileScreen');
    expect(mod.ProfileScreen).toBeDefined();
  });
  it('exports OnboardingScreen', async () => {
    const mod = await import('../screens/OnboardingScreen');
    expect(mod.OnboardingScreen).toBeDefined();
  });
});
