"use client";
import { useState, useMemo } from 'react';
import { HomeScreen } from '@yoyo/ui';
import { useUserStore, useGamificationStore, useProgressStore } from '@yoyo/store';
import { selectLevel, selectCurrentStreak } from '@yoyo/store';
import { mockTricks, getAllCategories, getRecentNews, advancedCategories } from '@yoyo/data';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const displayName = useUserStore((s) => s.user?.displayName ?? s.user?.username ?? 'Champion');
  const streak = useProgressStore(selectCurrentStreak);
  const level = useGamificationStore(selectLevel);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Categories are kept as scaffolding (greyed out) until manual tagging exists.
  const browseCategories = useMemo(
    () =>
      getAllCategories().map((c) => ({
        id: c.id,
        name: c.name,
        icon: c.icon,
        color: c.color,
        trickCount: 0,
      })),
    [],
  );

  const filteredTricks = useMemo(() => {
    let result = mockTricks;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((t) => t.name.toLowerCase().includes(q));
    }
    return result.slice(0, 20).map((t) => ({
      id: t.id,
      name: t.name,
      level: t.level,
      durationSec: t.durationSec,
      thumbnails: t.thumbnails,
    }));
  }, [searchQuery]);

  const newsItems = useMemo(() => getRecentNews(5), []);

  return (
    <HomeScreen
      displayName={displayName}
      level={level}
      streak={streak}
      introVideoUri="intro-video.mp4"
      categories={browseCategories}
      tricks={filteredTricks}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      selectedCategoryId={selectedCategoryId}
      onCategoryPress={(id) => setSelectedCategoryId((prev) => (prev === id ? null : id))}
      onTrickPress={(id) => {
        const trick = mockTricks.find((t) => t.id === id);
        if (trick) router.push(`/trick/${trick.slug}`);
      }}
      onViewAllTricks={() => router.push('/library')}
      advancedCategories={advancedCategories}
      newsItems={newsItems}
    />
  );
}
