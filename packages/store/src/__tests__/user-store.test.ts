import { describe, it, expect, beforeEach } from 'vitest';
import { useUserStore } from '../user-store';

describe('user-store (new fields)', () => {
  beforeEach(() => {
    useUserStore.setState({
      user: {
        id: 'test-user',
        email: 'test@example.com',
        username: 'tester',
        displayName: 'Tester',
        wishlist: [],
        introVideoWatched: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      isAuthenticated: true,
      isLoading: false,
    });
  });

  describe('setHandedness', () => {
    it('sets handedness to left', () => {
      useUserStore.getState().setHandedness('left');
      expect(useUserStore.getState().user?.handedness).toBe('left');
    });

    it('sets handedness to right', () => {
      useUserStore.getState().setHandedness('right');
      expect(useUserStore.getState().user?.handedness).toBe('right');
    });
  });

  describe('toggleWishlistItem', () => {
    it('adds item to wishlist', () => {
      useUserStore.getState().toggleWishlistItem('product-001');
      expect(useUserStore.getState().user?.wishlist).toContain('product-001');
    });

    it('removes item from wishlist when toggled again', () => {
      useUserStore.getState().toggleWishlistItem('product-001');
      useUserStore.getState().toggleWishlistItem('product-001');
      expect(useUserStore.getState().user?.wishlist).not.toContain('product-001');
    });
  });

  describe('isInWishlist', () => {
    it('returns true for wishlisted item', () => {
      useUserStore.getState().toggleWishlistItem('product-001');
      expect(useUserStore.getState().isInWishlist('product-001')).toBe(true);
    });

    it('returns false for non-wishlisted item', () => {
      expect(useUserStore.getState().isInWishlist('product-001')).toBe(false);
    });
  });

  describe('markIntroVideoWatched', () => {
    it('marks intro video as watched', () => {
      useUserStore.getState().markIntroVideoWatched();
      expect(useUserStore.getState().user?.introVideoWatched).toBe(true);
    });
  });
});
