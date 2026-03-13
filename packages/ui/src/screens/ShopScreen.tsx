import React from 'react';
import { YStack, XStack } from 'tamagui';
import { Text } from '../Text';
import { ScreenContainer } from '../primitives/ScreenContainer';
import { SectionHeader } from '../primitives/SectionHeader';

export interface ShopProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  emoji?: string;
}

export interface ShopScreenProps {
  yoyos: ShopProduct[];
  featured: ShopProduct[];
  onProductPress?: (id: string) => void;
  paddingTop?: number;
}

export function ShopScreen({ yoyos, featured, onProductPress, paddingTop = 0 }: ShopScreenProps) {
  return (
    <ScreenContainer scrollable paddingTop={paddingTop}>
      {/* Header */}
      <YStack backgroundColor="$brandAqua" padding={24} paddingTop={16} paddingBottom={28}>
        <Text fontSize={28} fontWeight="900" color="white" letterSpacing={-0.5}>Shop</Text>
        <Text fontSize={15} color="rgba(255,255,255,0.85)" marginTop={4}>Gear up for your yo-yo journey</Text>
      </YStack>

      {/* Yo-Yos */}
      <YStack padding={16}>
        <SectionHeader title="Yo-Yos" />
        {yoyos.map((product) => (
          <XStack
            key={product.id}
            backgroundColor="$background"
            borderRadius={12}
            padding={14}
            marginBottom={8}
            alignItems="center"
            borderWidth={1}
            borderColor="$borderColor"
            onPress={onProductPress ? () => onProductPress(product.id) : undefined}
            pressStyle={{ opacity: 0.85 }}
            cursor="pointer"
          >
            <Text fontSize={28} marginRight={12}>{product.emoji ?? '🪀'}</Text>
            <YStack flex={1}>
              <Text fontSize={15} fontWeight="700" color="$color">{product.name}</Text>
              <Text fontSize={13} color="$colorSubtitle" marginTop={2}>{product.brand}</Text>
            </YStack>
            <Text fontSize={16} fontWeight="800" color="$brandAqua">${product.price.toFixed(2)}</Text>
          </XStack>
        ))}
      </YStack>

      {/* Featured */}
      {featured.length > 0 && (
        <YStack padding={16} paddingTop={0}>
          <SectionHeader title="Featured Items" />
          {featured.map((product) => (
            <XStack
              key={product.id}
              backgroundColor="$background"
              borderRadius={12}
              padding={14}
              marginBottom={8}
              alignItems="center"
              borderWidth={1}
              borderColor="$borderColor"
              onPress={onProductPress ? () => onProductPress(product.id) : undefined}
              pressStyle={{ opacity: 0.85 }}
              cursor="pointer"
            >
              <YStack flex={1}>
                <Text fontSize={15} fontWeight="700" color="$color">{product.name}</Text>
                <Text fontSize={13} color="$colorSubtitle" marginTop={2}>{product.brand}</Text>
              </YStack>
              <Text fontSize={16} fontWeight="800" color="$brandAqua">${product.price.toFixed(2)}</Text>
            </XStack>
          ))}
        </YStack>
      )}

      <YStack height={100} />
    </ScreenContainer>
  );
}
