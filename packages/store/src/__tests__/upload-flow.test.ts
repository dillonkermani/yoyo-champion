import { describe, it, expect, beforeEach } from 'vitest';
import { useVideoStore } from '../video-store';
import { useSocialStore } from '../social-store';

describe('Upload Flow', () => {
  beforeEach(() => {
    // Reset stores before each test
    useVideoStore.setState({
      feedTab: 'for_you',
      myUploads: [],
      isFeedLoading: false,
    });
    useSocialStore.setState({
      followedUserIds: [],
      likedVideoIds: [],
      uploadReputation: 0,
      trainerStatus: 'none',
      approvedVideoCount: 0,
    });
  });

  it('addUpload creates upload with pending status', () => {
    const { addUpload } = useVideoStore.getState();
    addUpload({
      trickId: 'trick-001',
      videoUri: 'file://video.mp4',
      tags: ['smooth'],
      usesYoyoChampionYoyo: false,
    });

    const uploads = useVideoStore.getState().myUploads;
    expect(uploads).toHaveLength(1);
    expect(uploads[0]!.status).toBe('pending');
    expect(uploads[0]!.trickId).toBe('trick-001');
    expect(uploads[0]!.videoUri).toBe('file://video.mp4');
  });

  it('addUpload generates unique ids', async () => {
    const { addUpload } = useVideoStore.getState();
    addUpload({
      trickId: 'trick-001',
      videoUri: 'file://a.mp4',
      tags: [],
      usesYoyoChampionYoyo: false,
    });
    // Wait 1ms to ensure Date.now() returns a different value
    await new Promise((r) => setTimeout(r, 2));
    useVideoStore.getState().addUpload({
      trickId: 'trick-002',
      videoUri: 'file://b.mp4',
      tags: [],
      usesYoyoChampionYoyo: true,
    });

    const uploads = useVideoStore.getState().myUploads;
    expect(uploads).toHaveLength(2);
    expect(uploads[0]!.id).not.toBe(uploads[1]!.id);
  });

  it('approveUpload changes status to approved', () => {
    const store = useVideoStore.getState();
    store.addUpload({
      trickId: 'trick-003',
      videoUri: 'file://c.mp4',
      tags: [],
      usesYoyoChampionYoyo: false,
    });

    const uploadId = useVideoStore.getState().myUploads[0]!.id;
    useVideoStore.getState().approveUpload(uploadId);

    const updated = useVideoStore.getState().myUploads[0]!;
    expect(updated.status).toBe('approved');
  });

  it('addApprovedUpload in social-store increments rep correctly', () => {
    const social = useSocialStore.getState();

    // Without YoYo Champion yoyo: +1 rep
    social.addApprovedUpload(false);
    expect(useSocialStore.getState().uploadReputation).toBe(1);
    expect(useSocialStore.getState().approvedVideoCount).toBe(1);

    // With YoYo Champion yoyo: +5 rep
    useSocialStore.getState().addApprovedUpload(true);
    expect(useSocialStore.getState().uploadReputation).toBe(6);
    expect(useSocialStore.getState().approvedVideoCount).toBe(2);
  });

  it('tags are preserved in upload', () => {
    const { addUpload } = useVideoStore.getState();
    const tags = ['tutorial', 'beginner', '1A'];
    addUpload({
      trickId: 'trick-005',
      videoUri: 'file://d.mp4',
      tags,
      usesYoyoChampionYoyo: true,
    });

    const upload = useVideoStore.getState().myUploads[0]!;
    expect(upload.tags).toEqual(tags);
    expect(upload.usesYoyoChampionYoyo).toBe(true);
  });
});
