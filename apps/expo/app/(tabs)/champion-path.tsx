import { useState, useMemo } from 'react';
import { LearnScreen, CategoryBrowseScreen } from '@yoyo/ui';
import { mockTricks, getAllCategories, getCategoryById } from '@yoyo/data';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ChampionPathTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const allCategories = useMemo(() => getAllCategories(), []);

  // Categories are scaffolding until manual genre tagging exists; trick counts
  // can't be computed against the YouTube-derived catalog, so show 0.
  const categoryItems = useMemo(
    () =>
      allCategories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        color: cat.color,
        trickCount: 0,
        bonusXP: cat.bonusXP,
      })),
    [allCategories],
  );

  const selectedCategory = selectedCategoryId ? getCategoryById(selectedCategoryId) : null;

  const tricks = useMemo(() => {
    let list = mockTricks;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((t) => t.name.toLowerCase().includes(q));
    }
    return list.map((t) => ({
      id: t.id,
      name: t.name,
      level: t.level,
      durationSec: t.durationSec,
      thumbnails: t.thumbnails,
    }));
  }, [searchQuery]);

  if (!selectedCategoryId) {
    return (
      <CategoryBrowseScreen
        categories={categoryItems}
        onCategoryPress={(id) => {
          setSelectedCategoryId(id);
          setSearchQuery('');
          setActiveFilter('All');
        }}
        paddingTop={insets.top}
      />
    );
  }

  return (
    <LearnScreen
      tricks={tricks}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
      paddingTop={insets.top}
      categoryId={selectedCategoryId}
      categoryName={selectedCategory?.name}
      onBack={() => {
        setSelectedCategoryId(null);
        setSearchQuery('');
        setActiveFilter('All');
      }}
      onTrickPress={(id) => {
        const trick = mockTricks.find((t) => t.id === id);
        if (trick) router.push(`/trick/${trick.slug}`);
      }}
    />
  );
}
