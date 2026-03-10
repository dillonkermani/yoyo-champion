import { useState, useMemo } from 'react';
import { LearnScreen } from '@yoyo/ui';
import { mockTricks } from '@yoyo/data';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ChampionPathTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const tricks = useMemo(() => {
    let list = mockTricks;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((t) => t.name.toLowerCase().includes(q) || t.genre.toLowerCase().includes(q));
    }
    if (activeFilter !== 'All') {
      const difficultyMap: Record<string, number> = { Beginner: 1, Easy: 2, Intermediate: 3, Advanced: 4, Master: 5 };
      const diff = difficultyMap[activeFilter];
      if (diff !== undefined) list = list.filter((t) => t.difficulty === diff);
    }
    return list.map((t) => ({ id: t.id, name: t.name, difficulty: t.difficulty, genre: t.genre, xpReward: t.xpReward }));
  }, [searchQuery, activeFilter]);

  return (
    <LearnScreen
      tricks={tricks}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
      paddingTop={insets.top}
      onTrickPress={(id) => {
        const trick = mockTricks.find((t) => t.id === id);
        if (trick) router.push(`/trick/${trick.slug}`);
      }}
    />
  );
}
