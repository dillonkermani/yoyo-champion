import React from 'react';
import { YStack, ScrollView } from 'tamagui';
import { HeroHeader } from './home/HeroHeader';
import { IntroVideo } from './home/IntroVideo';
import { BrowseTricksSection } from './home/BrowseTricksSection';
import { AdvancedComingSoon } from './home/AdvancedComingSoon';
import { NewsSection } from './home/NewsSection';
import type { BrowseCategory, BrowseTrick } from './home/BrowseTricksSection';
import type { AdvancedCategory } from './home/AdvancedComingSoon';
import type { NewsDisplayItem } from './home/NewsSection';

export type { BrowseCategory, BrowseTrick, AdvancedCategory, NewsDisplayItem };

export interface HomeScreenProps {
  displayName: string;
  level: number;
  streak: number;
  introVideoUri: string;
  introVideoPosterUri?: string;
  categories: BrowseCategory[];
  tricks: BrowseTrick[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategoryId: string | null;
  onCategoryPress: (categoryId: string) => void;
  onTrickPress: (trickId: string) => void;
  onViewAllTricks?: () => void;
  advancedCategories: AdvancedCategory[];
  newsItems: NewsDisplayItem[];
  onNewsPress?: (newsId: string) => void;
  paddingTop?: number;
}

export function HomeScreen({
  displayName,
  level,
  streak,
  introVideoUri,
  introVideoPosterUri,
  categories,
  tricks,
  searchQuery,
  onSearchChange,
  selectedCategoryId,
  onCategoryPress,
  onTrickPress,
  onViewAllTricks,
  advancedCategories,
  newsItems,
  onNewsPress,
  paddingTop = 0,
}: HomeScreenProps) {
  return (
    <ScrollView
      flex={1}
      backgroundColor="#FFFFFF"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <YStack
        maxWidth={640}
        alignSelf="center"
        width="100%"
        paddingTop={paddingTop + 8}
        gap={24}
      >
        <HeroHeader displayName={displayName} level={level} streak={streak} />

        <IntroVideo uri={introVideoUri} {...(introVideoPosterUri ? { posterUri: introVideoPosterUri } : {})} />

        <BrowseTricksSection
          categories={categories}
          tricks={tricks}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          selectedCategoryId={selectedCategoryId}
          onCategoryPress={onCategoryPress}
          onTrickPress={onTrickPress}
          {...(onViewAllTricks ? { onViewAllTricks } : {})}
        />

        <AdvancedComingSoon categories={advancedCategories} />

        <NewsSection items={newsItems} {...(onNewsPress ? { onNewsPress } : {})} />
      </YStack>
    </ScrollView>
  );
}
