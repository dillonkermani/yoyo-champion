import React from 'react';
import { YStack, XStack } from 'tamagui';
import { Text } from '../Text';
import { ScreenContainer } from '../primitives/ScreenContainer';
import { SectionHeader } from '../primitives/SectionHeader';
import { NEU } from '../tamagui.config';

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
      {/* Header — branded raised panel */}
      <YStack
        backgroundColor="$brandAqua"
        padding={24}
        paddingTop={16}
        paddingBottom={28}
        borderBottomLeftRadius={24}
        borderBottomRightRadius={24}
        {...NEU.glowAqua}
        shadowRadius={20}
        shadowOpacity={0.5}
      >
        <Text fontSize={28} fontWeight="800" color="white" letterSpacing={-0.5}>Shop</Text>
        <Text fontSize={15} color="rgba(255,255,255,0.85)" marginTop={4}>Gear up for your yo-yo journey</Text>
      </YStack>

      {/* Yo-Yos */}
      <YStack padding={20}>
        <SectionHeader title="Yo-Yos" />
        {yoyos.map((product) => (
          <XStack
            key={product.id}
            backgroundColor="$neuSurface"
            borderRadius={16}
            padding={16}
            marginBottom={12}
            alignItems="center"
            onPress={onProductPress ? () => onProductPress(product.id) : undefined}
            animation="quick"
            pressStyle={{ scaleY: 0.97, scaleX: 1.005, opacity: 0.92, backgroundColor: '$neuSurfacePressed', ...NEU.pressed }}
            cursor="pointer"
            {...NEU.card}
          >
            <Text fontSize={28} marginRight={12}>{product.emoji ?? '🪀'}</Text>
            <YStack flex={1}>
              <Text fontSize={15} fontWeight="600" color="#2d3436">{product.name}</Text>
              <Text fontSize={13} color="#636e72" marginTop={2}>{product.brand}</Text>
            </YStack>
            <Text fontSize={16} fontWeight="700" color="$brandAqua">${product.price.toFixed(2)}</Text>
          </XStack>
        ))}
      </YStack>

      {/* Featured */}
      {featured.length > 0 && (
        <YStack padding={20} paddingTop={0}>
          <SectionHeader title="Featured Items" />
          {featured.map((product) => (
            <XStack
              key={product.id}
              backgroundColor="$neuSurface"
              borderRadius={16}
              padding={16}
              marginBottom={12}
              alignItems="center"
              onPress={onProductPress ? () => onProductPress(product.id) : undefined}
              animation="quick"
              pressStyle={{ scaleY: 0.97, scaleX: 1.005, opacity: 0.92, backgroundColor: '$neuSurfacePressed', ...NEU.pressed }}
              cursor="pointer"
              {...NEU.card}
            >
              <YStack flex={1}>
                <Text fontSize={15} fontWeight="600" color="#2d3436">{product.name}</Text>
                <Text fontSize={13} color="#636e72" marginTop={2}>{product.brand}</Text>
              </YStack>
              <Text fontSize={16} fontWeight="700" color="$brandAqua">${product.price.toFixed(2)}</Text>
            </XStack>
          ))}
        </YStack>
      )}

      <YStack height={100} />
    </ScreenContainer>
  );
}
