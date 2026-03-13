import React from 'react';
import { XStack, YStack, Text } from 'tamagui';
import { NEU } from './tamagui.config';

export interface YoyoSlot {
  id: string;
  name: string;
  color?: string;
  owned: boolean;
  isWishlisted?: boolean;
}

export interface YoyoCaseProps {
  yoyos: YoyoSlot[];
  onToggleWishlist?: (id: string) => void;
}

export function YoyoCase({ yoyos, onToggleWishlist }: YoyoCaseProps) {
  return (
    <XStack flexWrap="wrap" gap={10} paddingHorizontal={4}>
      {yoyos.map((yoyo) => (
        <YStack
          key={yoyo.id}
          width={90}
          height={90}
          borderRadius={16}
          backgroundColor={yoyo.owned ? '$neuSurface' : '$neuSurfacePressed'}
          alignItems="center"
          justifyContent="center"
          padding={8}
          animation="quick"
          pressStyle={{ scaleY: 0.97, scaleX: 1.005, opacity: 0.92, ...NEU.pressed }}
          cursor="pointer"
          position="relative"
          {...(yoyo.owned
            ? { shadowColor: yoyo.color ?? '#1CB0F6', shadowOffset: { width: 0, height: 2 }, shadowRadius: 10, shadowOpacity: 0.3, elevation: 3 }
            : NEU.inset
          )}
        >
          <Text fontSize={28} opacity={yoyo.owned ? 1 : 0.4}>{yoyo.owned ? '🪀' : '🔒'}</Text>
          <Text
            fontSize={10}
            textAlign="center"
            numberOfLines={1}
            color={yoyo.owned ? '#2d3436' : '#a0a8b0'}
          >
            {yoyo.name}
          </Text>

          {/* Wishlist heart overlay */}
          {yoyo.isWishlisted && (
            <YStack
              position="absolute"
              top={4}
              right={4}
              onPress={onToggleWishlist ? (e: any) => {
                e?.stopPropagation?.();
                onToggleWishlist(yoyo.id);
              } : undefined}
              hitSlop={8}
              cursor="pointer"
            >
              <Text fontSize={14}>❤️</Text>
            </YStack>
          )}
        </YStack>
      ))}
    </XStack>
  );
}
