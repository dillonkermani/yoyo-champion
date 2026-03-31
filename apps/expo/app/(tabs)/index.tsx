import { useState, useMemo } from 'react';
import { HomeScreen } from '@yoyo/ui';
import { useProgressStore, useGamificationStore } from '@yoyo/store';
import { selectLevel, selectCurrentStreak } from '@yoyo/store';
import { mockTricks, getAllCategories, getRecentNews, advancedCategories } from '@yoyo/data';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const streak = useProgressStore(selectCurrentStreak);
  const level = useGamificationStore(selectLevel);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const browseCategories = useMemo(
    () =>
      getAllCategories().map((c) => ({
        id: c.id,
        name: c.name,
        icon: c.icon,
        color: c.color,
        trickCount: mockTricks.filter((t) => c.genres.includes(t.genre)).length,
      })),
    [],
  );

  const allCategories = useMemo(() => getAllCategories(), []);

  const filteredTricks = useMemo(() => {
    let result = mockTricks;
    if (selectedCategoryId) {
      const cat = allCategories.find((c) => c.id === selectedCategoryId);
      if (cat) result = result.filter((t) => cat.genres.includes(t.genre));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((t) => t.name.toLowerCase().includes(q));
    }
    return result.slice(0, 20).map((t) => ({
      id: t.id,
      name: t.name,
      difficulty: t.difficulty,
      genre: t.genre,
      xpReward: t.xpReward,
    }));
  }, [selectedCategoryId, searchQuery, allCategories]);

  const newsItems = useMemo(() => getRecentNews(5), []);

  return (
    <HomeScreen
      displayName="Champion"
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
      onViewAllTricks={() => router.push('/(tabs)/champion-path')}
      advancedCategories={advancedCategories}
      newsItems={newsItems}
      paddingTop={insets.top}
    />
  );
}
