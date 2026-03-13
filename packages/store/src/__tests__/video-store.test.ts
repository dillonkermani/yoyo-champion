import { describe, it, expect, beforeEach } from 'vitest';
import { useVideoStore } from '../video-store';

describe('video-store', () => {
  beforeEach(() => {
    useVideoStore.setState({
      feedTab: 'for_you',
      myUploads: [],
      isFeedLoading: false,
    });
  });

  describe('setFeedTab', () => {
    it('switches to new tab', () => {
      useVideoStore.getState().setFeedTab('new');
      expect(useVideoStore.getState().feedTab).toBe('new');
    });

    it('switches back to for_you', () => {
      useVideoStore.getState().setFeedTab('new');
      useVideoStore.getState().setFeedTab('for_you');
      expect(useVideoStore.getState().feedTab).toBe('for_you');
    });
  });

  describe('addUpload', () => {
    it('adds an upload with pending status', () => {
      useVideoStore.getState().addUpload({
        trickId: 'trick-006',
        videoUri: 'file:///video.mp4',
        tags: ['trapeze'],
        usesYoyoChampionYoyo: true,
      });
      const uploads = useVideoStore.getState().myUploads;
      expect(uploads.length).toBe(1);
      expect(uploads[0]!.status).toBe('pending');
      expect(uploads[0]!.trickId).toBe('trick-006');
      expect(uploads[0]!.usesYoyoChampionYoyo).toBe(true);
    });

    it('prepends new uploads', () => {
      useVideoStore.getState().addUpload({
        trickId: 'trick-001',
        videoUri: 'file:///v1.mp4',
        tags: ['first'],
        usesYoyoChampionYoyo: false,
      });
      useVideoStore.getState().addUpload({
        trickId: 'trick-002',
        videoUri: 'file:///v2.mp4',
        tags: ['second'],
        usesYoyoChampionYoyo: false,
      });
      const uploads = useVideoStore.getState().myUploads;
      expect(uploads.length).toBe(2);
      expect(uploads[0]!.trickId).toBe('trick-002');
    });
  });

  describe('removeUpload', () => {
    it('removes an upload by id', () => {
      useVideoStore.getState().addUpload({
        trickId: 'trick-001',
        videoUri: 'file:///v.mp4',
        tags: [],
        usesYoyoChampionYoyo: false,
      });
      const id = useVideoStore.getState().myUploads[0]!.id;
      useVideoStore.getState().removeUpload(id);
      expect(useVideoStore.getState().myUploads.length).toBe(0);
    });
  });

  describe('approveUpload / rejectUpload', () => {
    it('approves an upload', () => {
      useVideoStore.getState().addUpload({
        trickId: 'trick-001',
        videoUri: 'file:///v.mp4',
        tags: [],
        usesYoyoChampionYoyo: false,
      });
      const id = useVideoStore.getState().myUploads[0]!.id;
      useVideoStore.getState().approveUpload(id);
      expect(useVideoStore.getState().myUploads[0]!.status).toBe('approved');
    });

    it('rejects an upload', () => {
      useVideoStore.getState().addUpload({
        trickId: 'trick-001',
        videoUri: 'file:///v.mp4',
        tags: [],
        usesYoyoChampionYoyo: false,
      });
      const id = useVideoStore.getState().myUploads[0]!.id;
      useVideoStore.getState().rejectUpload(id);
      expect(useVideoStore.getState().myUploads[0]!.status).toBe('rejected');
    });
  });

  describe('setFeedLoading', () => {
    it('sets loading state', () => {
      useVideoStore.getState().setFeedLoading(true);
      expect(useVideoStore.getState().isFeedLoading).toBe(true);
    });
  });

  describe('reset', () => {
    it('resets to initial state', () => {
      useVideoStore.getState().setFeedTab('new');
      useVideoStore.getState().addUpload({
        trickId: 'trick-001',
        videoUri: 'file:///v.mp4',
        tags: [],
        usesYoyoChampionYoyo: false,
      });
      useVideoStore.getState().reset();
      expect(useVideoStore.getState().feedTab).toBe('for_you');
      expect(useVideoStore.getState().myUploads.length).toBe(0);
    });
  });
});
