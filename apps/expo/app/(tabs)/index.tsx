import { HomeScreen } from '@yoyo/ui';
import { useProgressStore, useSocialStore, useVideoStore, useGamificationStore } from '@yoyo/store';
import { selectTotalTricksMastered, selectUploadReputation, selectTrainerStatus, selectFollowerCount, selectMyUploads, selectXp, selectLevel, selectLevelProgress, selectCurrentStreak } from '@yoyo/store';
import { mockTricks, mockPaths } from '@yoyo/data';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Progress store
  const trickProgress = useProgressStore(selectTotalTricksMastered);
  const streak = useProgressStore(selectCurrentStreak);

  // Gamification store
  const xp = useGamificationStore(selectXp);
  const level = useGamificationStore(selectLevel);
  const levelProgress = useGamificationStore(selectLevelProgress);
  const xpProgressPercent = levelProgress.required > 0
    ? Math.round((levelProgress.current / levelProgress.required) * 100)
    : 100;

  // Social store
  const uploadReputation = useSocialStore(selectUploadReputation);
  const trainerStatus = useSocialStore(selectTrainerStatus);
  const followersCount = useSocialStore(selectFollowerCount);

  // Video store
  const myUploads = useVideoStore(selectMyUploads);
  const uploads = myUploads.map((u) => ({
    id: u.id,
    thumbnailUrl: u.videoUri,
  }));

  const featuredTricks = mockTricks.slice(0, 5).map((t) => ({
    id: t.id,
    name: t.name,
    difficulty: t.difficulty,
    genre: t.genre,
    xpReward: t.xpReward,
  }));

  const activePaths = mockPaths.slice(0, 3).map((p) => ({
    id: p.id,
    title: p.title,
    difficulty: p.difficulty,
    progressPercent: 0,
    totalXp: p.totalXp,
  }));

  return (
    <HomeScreen
      displayName="Champion"
      level={level}
      xp={xp}
      streak={streak}
      xpProgressPercent={xpProgressPercent}
      trickProgress={trickProgress}
      uploadReputation={uploadReputation}
      trainerStatus={trainerStatus}
      collectorLevel="Collector"
      followersCount={followersCount}
      uploads={uploads}
      featuredTricks={featuredTricks}
      activePaths={activePaths}
      paddingTop={insets.top}
      onTrickPress={(id) => {
        const trick = mockTricks.find((t) => t.id === id);
        if (trick) router.push(`/trick/${trick.slug}`);
      }}
      onSeeAllTricks={() => router.push('/(tabs)/champion-path')}
    />
  );
}
