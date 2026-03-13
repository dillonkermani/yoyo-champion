import { describe, it, expect } from 'vitest';
import {
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  categories,
} from '../categories';

describe('categories', () => {
  it('getAllCategories returns 8 categories sorted by order', () => {
    const all = getAllCategories();
    expect(all).toHaveLength(8);
    for (let i = 1; i < all.length; i++) {
      expect(all[i]!.order).toBeGreaterThanOrEqual(all[i - 1]!.order);
    }
  });

  it('getCategoryById returns the correct category', () => {
    const cat = getCategoryById('cat-foundations');
    expect(cat).toBeDefined();
    expect(cat!.name).toBe('Foundations');
    expect(cat!.slug).toBe('foundations');
  });

  it('getCategoryById returns undefined for unknown id', () => {
    expect(getCategoryById('cat-nonexistent')).toBeUndefined();
  });

  it('getCategoryBySlug returns the correct category', () => {
    const cat = getCategoryBySlug('string-tricks');
    expect(cat).toBeDefined();
    expect(cat!.id).toBe('cat-string-tricks');
    expect(cat!.name).toBe('String Tricks');
  });

  it('getCategoryBySlug returns undefined for unknown slug', () => {
    expect(getCategoryBySlug('nonexistent-slug')).toBeUndefined();
  });

  it('each category has required fields', () => {
    for (const cat of categories) {
      expect(cat.id).toBeTruthy();
      expect(cat.name).toBeTruthy();
      expect(cat.slug).toBeTruthy();
      expect(cat.genres).toBeDefined();
      expect(Array.isArray(cat.genres)).toBe(true);
      expect(cat.genres.length).toBeGreaterThan(0);
      expect(cat.color).toBeTruthy();
      expect(cat.icon).toBeTruthy();
      expect(typeof cat.order).toBe('number');
      expect(typeof cat.bonusXP).toBe('number');
      expect(cat.completionBadge).toBeTruthy();
      expect(cat.description).toBeTruthy();
    }
  });

  it('all categories have unique ids and slugs', () => {
    const ids = categories.map((c) => c.id);
    const slugs = categories.map((c) => c.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
