import React from 'react';
import { YStack, XStack } from 'tamagui';
import { Text } from '../Text';
import { Button } from '../Button';
import { ScreenContainer } from '../primitives/ScreenContainer';
import { NEU } from '../tamagui.config';

export interface ShopProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  emoji?: string;
}

export interface ShopScreenProps {
  shopUrl: string;
  onOpenExternal?: () => void;
  renderWebView?: (url: string) => React.ReactNode;
  paddingTop?: number;
}

export function ShopScreen({ shopUrl, onOpenExternal, renderWebView, paddingTop = 0 }: ShopScreenProps) {
  return (
    <ScreenContainer paddingTop={paddingTop}>
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
        <Text fontSize={15} color="rgba(255,255,255,0.85)" marginTop={4}>Official YoYo Champion gear</Text>
      </YStack>

      {/* WebView area or fallback */}
      {renderWebView ? (
        <YStack flex={1}>
          {renderWebView(shopUrl)}
        </YStack>
      ) : (
        <YStack flex={1} alignItems="center" justifyContent="center" padding={40} gap={16}>
          <Text fontSize={48}>🛒</Text>
          <Text fontSize={18} fontWeight="700" color="#2d3436" textAlign="center">
            Browse the Shop
          </Text>
          <Text fontSize={14} color="#636e72" textAlign="center">
            Check out the latest yo-yos, strings, and accessories from top brands.
          </Text>
          {onOpenExternal && (
            <Button onPress={onOpenExternal} variant="primary" size="md">
              Open Shop
            </Button>
          )}
          <YStack
            backgroundColor="$neuSurface"
            borderRadius={12}
            padding={12}
            marginTop={8}
            {...NEU.card}
          >
            <Text fontSize={12} color="#636e72" textAlign="center" selectable>
              {shopUrl}
            </Text>
          </YStack>
        </YStack>
      )}
    </ScreenContainer>
  );
}
