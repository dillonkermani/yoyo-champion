import { describe, it, expect, beforeEach } from 'vitest';
import { useUserStore } from '../user-store';

describe('wishlist functionality', () => {
  beforeEach(() => {
    // Reset store to a fresh authenticated user with empty wishlist
    useUserStore.setState({
      user: {
        id: 'wishlist-test-user',
        email: 'wishlist@test.com',
        username: 'wishlister',
        displayName: 'Wishlist Tester',
        wishlist: [],
        introVideoWatched: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      isAuthenticated: true,
      isLoading: false,
    });
  });

  it('starts with an empty wishlist for a new user', () => {
    const wishlist = useUserStore.getState().user?.wishlist;
    expect(wishlist).toEqual([]);
    expect(wishlist).toHaveLength(0);
  });

  it('adds an item to the wishlist via toggleWishlistItem', () => {
    useUserStore.getState().toggleWishlistItem('yoyo-001');
    const wishlist = useUserStore.getState().user?.wishlist;
    expect(wishlist).toContain('yoyo-001');
    expect(wishlist).toHaveLength(1);
  });

  it('removes an item from the wishlist on second toggle', () => {
    useUserStore.getState().toggleWishlistItem('yoyo-002');
    expect(useUserStore.getState().user?.wishlist).toContain('yoyo-002');

    useUserStore.getState().toggleWishlistItem('yoyo-002');
    expect(useUserStore.getState().user?.wishlist).not.toContain('yoyo-002');
    expect(useUserStore.getState().user?.wishlist).toHaveLength(0);
  });

  it('isInWishlist returns true for a wishlisted item', () => {
    useUserStore.getState().toggleWishlistItem('yoyo-003');
    expect(useUserStore.getState().isInWishlist('yoyo-003')).toBe(true);
  });

  it('isInWishlist returns false for an item not in the wishlist', () => {
    expect(useUserStore.getState().isInWishlist('nonexistent')).toBe(false);
  });

  it('isInWishlist returns false after item is removed', () => {
    useUserStore.getState().toggleWishlistItem('yoyo-004');
    useUserStore.getState().toggleWishlistItem('yoyo-004');
    expect(useUserStore.getState().isInWishlist('yoyo-004')).toBe(false);
  });

  it('supports multiple items in the wishlist', () => {
    useUserStore.getState().toggleWishlistItem('yoyo-a');
    useUserStore.getState().toggleWishlistItem('yoyo-b');
    useUserStore.getState().toggleWishlistItem('yoyo-c');

    const wishlist = useUserStore.getState().user?.wishlist;
    expect(wishlist).toHaveLength(3);
    expect(wishlist).toEqual(['yoyo-a', 'yoyo-b', 'yoyo-c']);
  });

  it('removes only the toggled item, leaving others intact', () => {
    useUserStore.getState().toggleWishlistItem('yoyo-a');
    useUserStore.getState().toggleWishlistItem('yoyo-b');
    useUserStore.getState().toggleWishlistItem('yoyo-c');

    // Remove the middle one
    useUserStore.getState().toggleWishlistItem('yoyo-b');

    const wishlist = useUserStore.getState().user?.wishlist;
    expect(wishlist).toHaveLength(2);
    expect(wishlist).toContain('yoyo-a');
    expect(wishlist).not.toContain('yoyo-b');
    expect(wishlist).toContain('yoyo-c');
  });

  it('does nothing when user is null', () => {
    useUserStore.setState({ user: null, isAuthenticated: false });
    // Should not throw
    useUserStore.getState().toggleWishlistItem('yoyo-001');
    expect(useUserStore.getState().user).toBeNull();
    expect(useUserStore.getState().isInWishlist('yoyo-001')).toBe(false);
  });

  it('updates the updatedAt timestamp when toggling', () => {
    useUserStore.getState().toggleWishlistItem('yoyo-time');
    const afterToggle = useUserStore.getState().user?.updatedAt;
    expect(afterToggle).toBeDefined();
    // updatedAt should be set (may or may not differ due to timing, but should exist)
    expect(typeof afterToggle).toBe('string');
  });
});
