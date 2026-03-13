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

  const categoryItems = useMemo(() => {
    return allCategories.map((cat) => {
      const trickCount = mockTricks.filter((t) =>
        cat.genres.includes(t.genre as typeof cat.genres[number]),
      ).length;
      return {
        id: cat.id,
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        color: cat.color,
        trickCount,
        bonusXP: cat.bonusXP,
      };
    });
  }, [allCategories]);

  const selectedCategory = selectedCategoryId
    ? getCategoryById(selectedCategoryId)
    : null;

  const tricks = useMemo(() => {
    let list = mockTricks;

    // Filter by category genres when a category is selected
    if (selectedCategory) {
      list = list.filter((t) =>
        selectedCategory.genres.includes(t.genre as typeof selectedCategory.genres[number]),
      );
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.genre.toLowerCase().includes(q),
      );
    }
    if (activeFilter !== 'All') {
      const difficultyMap: Record<string, number> = {
        Beginner: 1,
        Easy: 2,
        Intermediate: 3,
        Advanced: 4,
        Master: 5,
      };
      const diff = difficultyMap[activeFilter];
      if (diff !== undefined) list = list.filter((t) => t.difficulty === diff);
    }
    return list.map((t) => ({
      id: t.id,
      name: t.name,
      difficulty: t.difficulty,
      genre: t.genre,
      xpReward: t.xpReward,
    }));
  }, [searchQuery, activeFilter, selectedCategory]);

  // Category browse view
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

  // Trick list view filtered by category
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
