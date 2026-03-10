import { describe, it, expect } from 'vitest';

describe('primitives exports', () => {
  it('exports ScreenContainer', async () => {
    const mod = await import('../primitives/ScreenContainer');
    expect(mod.ScreenContainer).toBeDefined();
  });
  it('exports ProgressBar', async () => {
    const mod = await import('../primitives/ProgressBar');
    expect(mod.ProgressBar).toBeDefined();
  });
  it('exports DifficultyTag', async () => {
    const mod = await import('../primitives/DifficultyTag');
    expect(mod.DifficultyTag).toBeDefined();
  });
  it('exports FilterChip', async () => {
    const mod = await import('../primitives/FilterChip');
    expect(mod.FilterChip).toBeDefined();
  });
  it('exports SearchInput', async () => {
    const mod = await import('../primitives/SearchInput');
    expect(mod.SearchInput).toBeDefined();
  });
  it('exports SectionHeader', async () => {
    const mod = await import('../primitives/SectionHeader');
    expect(mod.SectionHeader).toBeDefined();
  });
});
