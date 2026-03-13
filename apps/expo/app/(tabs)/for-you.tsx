import React, { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ForYouScreen } from '@yoyo/ui';
import type { FeedVideo } from '@yoyo/ui';
import { getApprovedVideos, getTopVideos, getRecentVideos, getTrickById } from '@yoyo/data';
import { useVideoStore, useSocialStore } from '@yoyo/store';

/** Map a UserVideo to the FeedVideo shape the screen component expects. */
function toFeedVideo(
  v: ReturnType<typeof getApprovedVideos>[number],
  likedVideoIds: string[],
): FeedVideo {
  const trick = getTrickById(v.trickId);
  return {
    id: v.id,
    videoUrl: v.videoUrl,
    thumbnailUrl: v.thumbnailUrl,
    trickName: trick?.name ?? 'Unknown Trick',
    trickId: v.trickId,
    userId: v.userId,
    userName: v.userId.replace('user-', 'yoyoer_'),
    likes: v.likes,
    comments: v.comments,
    tags: v.tags,
    isLiked: likedVideoIds.includes(v.id),
    usesYoyoChampionYoyo: v.usesYoyoChampionYoyo,
  };
}

export default function ForYouTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const feedTab = useVideoStore((s) => s.feedTab);
  const setFeedTab = useVideoStore((s) => s.setFeedTab);
  const likedVideoIds = useSocialStore((s) => s.likedVideoIds);
  const likeVideo = useSocialStore((s) => s.likeVideo);
  const unlikeVideo = useSocialStore((s) => s.unlikeVideo);

  const videos = useMemo<FeedVideo[]>(() => {
    const raw = feedTab === 'new' ? getRecentVideos(20) : getTopVideos(20);
    return raw.map((v) => toFeedVideo(v, likedVideoIds));
  }, [feedTab, likedVideoIds]);

  const handleLike = (videoId: string) => {
    if (likedVideoIds.includes(videoId)) {
      unlikeVideo(videoId);
    } else {
      likeVideo(videoId);
    }
  };

  const handleLearn = (trickId: string) => {
    const trick = getTrickById(trickId);
    if (trick) {
      router.push(`/learn/${trick.slug}` as any);
    }
  };

  return (
    <ForYouScreen
      videos={videos}
      feedTab={feedTab}
      onTabChange={setFeedTab}
      onLike={handleLike}
      onLearn={handleLearn}
      paddingTop={insets.top}
    />
  );
}
