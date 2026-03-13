import React from 'react';
import { YStack } from 'tamagui';
import { Text } from '../Text';
import { ScreenContainer } from '../primitives/ScreenContainer';
import { CategoryCard } from '../cards/CategoryCard';

export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  trickCount: number;
  bonusXP: number;
}

export interface CategoryBrowseScreenProps {
  categories: CategoryItem[];
  onCategoryPress: (categoryId: string) => void;
  paddingTop?: number;
}

export function CategoryBrowseScreen({
  categories,
  onCategoryPress,
  paddingTop = 0,
}: CategoryBrowseScreenProps) {
  return (
    <ScreenContainer scrollable paddingTop={paddingTop}>
      <YStack padding={20} gap={4}>
        <Text fontSize={24} fontWeight="800" letterSpacing={-0.5} color="#2d3436">
          Champion Path
        </Text>
        <Text fontSize={14} color="#636e72" marginBottom={12}>
          Choose a category to begin
        </Text>
      </YStack>
      <YStack padding={20} paddingTop={0} gap={0}>
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            name={cat.name}
            description={cat.description}
            icon={cat.icon}
            trickCount={cat.trickCount}
            color={cat.color}
            bonusXP={cat.bonusXP}
            onPress={() => onCategoryPress(cat.id)}
          />
        ))}
      </YStack>
      <YStack height={100} />
    </ScreenContainer>
  );
}
