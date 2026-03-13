import { describe, it, expect, beforeEach } from 'vitest';
import { useSocialStore } from '../social-store';

describe('social-store', () => {
  beforeEach(() => {
    useSocialStore.setState({
      followedUserIds: [],
      likedVideoIds: [],
      uploadReputation: 0,
      trainerStatus: 'none',
      approvedVideoCount: 0,
    });
  });

  describe('followUser / unfollowUser', () => {
    it('follows a user', () => {
      useSocialStore.getState().followUser('user-002');
      expect(useSocialStore.getState().followedUserIds).toContain('user-002');
    });

    it('does not duplicate follow', () => {
      useSocialStore.getState().followUser('user-002');
      useSocialStore.getState().followUser('user-002');
      expect(useSocialStore.getState().followedUserIds.length).toBe(1);
    });

    it('unfollows a user', () => {
      useSocialStore.getState().followUser('user-002');
      useSocialStore.getState().unfollowUser('user-002');
      expect(useSocialStore.getState().followedUserIds).not.toContain('user-002');
    });
  });

  describe('isFollowing', () => {
    it('returns true for followed user', () => {
      useSocialStore.getState().followUser('user-003');
      expect(useSocialStore.getState().isFollowing('user-003')).toBe(true);
    });

    it('returns false for not-followed user', () => {
      expect(useSocialStore.getState().isFollowing('user-003')).toBe(false);
    });
  });

  describe('likeVideo / unlikeVideo', () => {
    it('likes a video', () => {
      useSocialStore.getState().likeVideo('video-001');
      expect(useSocialStore.getState().likedVideoIds).toContain('video-001');
    });

    it('does not duplicate like', () => {
      useSocialStore.getState().likeVideo('video-001');
      useSocialStore.getState().likeVideo('video-001');
      expect(useSocialStore.getState().likedVideoIds.length).toBe(1);
    });

    it('unlikes a video', () => {
      useSocialStore.getState().likeVideo('video-001');
      useSocialStore.getState().unlikeVideo('video-001');
      expect(useSocialStore.getState().likedVideoIds).not.toContain('video-001');
    });
  });

  describe('isVideoLiked', () => {
    it('returns true for liked video', () => {
      useSocialStore.getState().likeVideo('video-001');
      expect(useSocialStore.getState().isVideoLiked('video-001')).toBe(true);
    });
  });

  describe('addApprovedUpload', () => {
    it('adds +1 rep for non-YoyoChampion yoyo', () => {
      useSocialStore.getState().addApprovedUpload(false);
      expect(useSocialStore.getState().uploadReputation).toBe(1);
      expect(useSocialStore.getState().approvedVideoCount).toBe(1);
    });

    it('adds +5 rep for YoyoChampion yoyo', () => {
      useSocialStore.getState().addApprovedUpload(true);
      expect(useSocialStore.getState().uploadReputation).toBe(5);
    });

    it('upgrades trainer status at 3 uploads', () => {
      for (let i = 0; i < 3; i++) useSocialStore.getState().addApprovedUpload(false);
      expect(useSocialStore.getState().trainerStatus).toBe('beginner_trainer');
    });

    it('upgrades trainer status at 10 uploads', () => {
      for (let i = 0; i < 10; i++) useSocialStore.getState().addApprovedUpload(false);
      expect(useSocialStore.getState().trainerStatus).toBe('intermediate_trainer');
    });

    it('upgrades trainer status at 25 uploads', () => {
      for (let i = 0; i < 25; i++) useSocialStore.getState().addApprovedUpload(false);
      expect(useSocialStore.getState().trainerStatus).toBe('master_trainer');
    });
  });

  describe('reset', () => {
    it('resets to initial state', () => {
      useSocialStore.getState().followUser('user-002');
      useSocialStore.getState().likeVideo('video-001');
      useSocialStore.getState().reset();
      expect(useSocialStore.getState().followedUserIds).toEqual([]);
      expect(useSocialStore.getState().likedVideoIds).toEqual([]);
      expect(useSocialStore.getState().uploadReputation).toBe(0);
    });
  });
});
