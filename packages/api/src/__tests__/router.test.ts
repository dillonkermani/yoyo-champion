import { describe, it, expect } from 'vitest';
import { appRouter } from '../server/router';

describe('appRouter', () => {
  it('hello query returns greeting without input', async () => {
    const caller = appRouter.createCaller({});
    const result = await caller.hello({});
    expect(result.greeting).toBe('Hello from YoYo Champion!');
  });

  it('hello query includes provided name', async () => {
    const caller = appRouter.createCaller({});
    const result = await caller.hello({ name: 'Tester' });
    expect(result.greeting).toBe('Hello Tester!');
  });
});
