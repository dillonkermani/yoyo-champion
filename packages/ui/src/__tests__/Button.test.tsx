import { describe, it, expect } from 'vitest';
import { Button } from '../Button';
import { Text } from '../Text';

describe('UI package exports', () => {
  it('exports Button component', () => {
    expect(Button).toBeDefined();
  });

  it('exports Text component', () => {
    expect(Text).toBeDefined();
  });
});
