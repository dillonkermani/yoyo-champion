import React from 'react';
import { YStack, XStack, ScrollView } from 'tamagui';
import { Text } from '../../Text';
import { SectionHeader } from '../../primitives/SectionHeader';
import { NEU } from '../../tamagui.config';

export interface AdvancedCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface AdvancedComingSoonProps {
  categories: AdvancedCategory[];
}

export function AdvancedComingSoon({ categories }: AdvancedComingSoonProps) {
  if (categories.length === 0) return null;

  return (
    <YStack paddingHorizontal={20}>
      <SectionHeader title="Advanced Tricks" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -20 }}>
        <XStack gap={12} paddingHorizontal={20}>
          {categories.map((cat) => (
            <YStack
              key={cat.id}
              width={150}
              height={170}
              borderRadius={16}
              backgroundColor="$neuSurface"
              padding={16}
              paddingBottom={40}
              opacity={0.65}
              position="relative"
              {...NEU.card}
            >
              <Text fontSize={28} marginBottom={8}>{cat.icon}</Text>
              <Text fontSize={14} fontWeight="700" color="#2d3436" numberOfLines={2}>
                {cat.name}
              </Text>
              <Text fontSize={11} color="#636e72" numberOfLines={2} marginTop={4}>
                {cat.description}
              </Text>
              <XStack
                position="absolute"
                bottom={14}
                left={16}
                backgroundColor={cat.color}
                paddingHorizontal={10}
                paddingVertical={4}
                borderRadius={10}
              >
                <Text fontSize={10} fontWeight="800" color="white" textTransform="uppercase" letterSpacing={0.5}>
                  Coming Soon
                </Text>
              </XStack>
            </YStack>
          ))}
        </XStack>
      </ScrollView>
    </YStack>
  );
}
