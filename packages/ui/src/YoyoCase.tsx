import { XStack, YStack, Text } from 'tamagui';
// Clean shadow design - NEU removed

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
          backgroundColor={yoyo.owned ? 'white' : '#F0F2F5'}
          alignItems="center"
          justifyContent="center"
          padding={8}
          animation="quick"
          pressStyle={{ opacity: 0.9, scale: 0.97 }}
          cursor="pointer"
          position="relative"
          borderWidth={1}
          borderColor={yoyo.owned ? '#E1E8ED' : '#D5D9DD'}
          {...(yoyo.owned
            ? { shadowColor: yoyo.color ?? '#9bedff', shadowOffset: { width: 0, height: 2 }, shadowRadius: 10, shadowOpacity: 0.3, elevation: 3 }
            : {}
          )}
        >
          <Text fontSize={28} opacity={yoyo.owned ? 1 : 0.4}>{yoyo.owned ? '🪀' : '🔒'}</Text>
          <Text
            fontSize={10}
            textAlign="center"
            numberOfLines={1}
            color={yoyo.owned ? '#0F1419' : '#8899A6'}
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
