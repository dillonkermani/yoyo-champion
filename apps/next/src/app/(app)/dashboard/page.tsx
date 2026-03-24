"use client";
import { HomeScreen } from '@yoyo/ui';
import { useUserStore, useGamificationStore, useProgressStore } from '@yoyo/store';
import { selectXp, selectLevel, selectLevelProgress, selectCurrentStreak } from '@yoyo/store';
import { mockTricks, mockPaths } from '@yoyo/data';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const displayName = useUserStore((s) => s.user?.displayName ?? 'Champion');
  const streak = useProgressStore(selectCurrentStreak);
  const xp = useGamificationStore(selectXp);
  const level = useGamificationStore(selectLevel);
  const xpProgressPercent = useGamificationStore(selectLevelProgress);

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
      displayName={displayName}
      xp={xp}
      level={level}
      streak={streak}
      xpProgressPercent={xpProgressPercent}
      featuredTricks={featuredTricks}
      activePaths={activePaths}
      onTrickPress={(id) => {
        const trick = mockTricks.find((t) => t.id === id);
        if (trick) router.push(`/trick/${trick.slug}`);
      }}
      onSeeAllTricks={() => router.push('/library')}
    />
  );
}
