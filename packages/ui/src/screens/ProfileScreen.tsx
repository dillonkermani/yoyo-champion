import React from 'react';
import { YStack, XStack } from 'tamagui';
import { Text } from '../Text';
import { AvatarDisplay } from '../AvatarDisplay';
import { StatsBar } from '../StatsBar';
import { YoyoCase } from '../YoyoCase';
import { ScreenContainer } from '../primitives/ScreenContainer';
import { Button } from '../Button';
import { NEU } from '../tamagui.config';

export interface ProfileBadge {
  id: string;
  name: string;
  icon: string;
  rarity: string;
}

export interface ProfileYoyo {
  id: string;
  name: string;
  color: string;
  isActive?: boolean;
}

export interface ProfileStat {
  label: string;
  value: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
}

export interface ProfileScreenProps {
  displayName: string;
  handle?: string;
  level: number;
  avatarColor?: string;
  stats: ProfileStat[];
  badges: ProfileBadge[];
  yoyos: ProfileYoyo[];
  wishlistItems?: WishlistItem[];
  onRemoveFromWishlist?: (id: string) => void;
  onEditProfile?: () => void;
  onLogout?: () => void;
  paddingTop?: number;
}

export function ProfileScreen({
  displayName,
  handle,
  level,
  avatarColor = '#1CB0F6',
  stats,
  badges,
  yoyos,
  wishlistItems,
  onRemoveFromWishlist,
  onEditProfile,
  onLogout,
  paddingTop = 0,
}: ProfileScreenProps) {
  return (
    <ScreenContainer scrollable paddingTop={paddingTop}>
      {/* Profile Header — raised neumorphic panel */}
      <YStack
        backgroundColor="#F7F8FA"
        padding={20}
        alignItems="center"
        gap={12}
        borderBottomLeftRadius={24}
        borderBottomRightRadius={24}
        {...NEU.cardLifted}
      >
        <AvatarDisplay displayName={displayName} color={avatarColor} size={80} />
        <YStack alignItems="center" gap={2}>
          <Text fontSize={20} fontWeight="800" color="#0F1419">{displayName}</Text>
          {handle && <Text fontSize={14} color="#536471">@{handle}</Text>}
          <XStack
            backgroundColor="white"
            borderRadius={100}
            paddingHorizontal={12}
            paddingVertical={4}
            marginTop={4}
            {...NEU.button}
          >
            <Text fontSize={12} fontWeight="600" color="$brandAqua">Level {level}</Text>
          </XStack>
        </YStack>
        {onEditProfile && (
          <Button onPress={onEditProfile} variant="outline" size="sm">Edit Profile</Button>
        )}
      </YStack>

      {/* Stats */}
      <YStack padding={20}>
        <StatsBar stats={stats} />
      </YStack>

      {/* Badges */}
      {badges.length > 0 && (
        <YStack padding={20} paddingTop={0} gap={12}>
          <Text fontSize={18} fontWeight="700" letterSpacing={-0.3} color="#0F1419">Badges</Text>
          <XStack flexWrap="wrap" gap={10}>
            {badges.map((badge) => (
              <YStack
                key={badge.id}
                backgroundColor="white"
                borderRadius={16}
                padding={12}
                alignItems="center"
                gap={4}
                width={80}
                {...NEU.card}
              >
                <Text fontSize={24}>{badge.icon}</Text>
                <Text fontSize={10} fontWeight="600" color="#536471" textAlign="center" numberOfLines={2}>{badge.name}</Text>
              </YStack>
            ))}
          </XStack>
        </YStack>
      )}

      {/* YoYo Collection */}
      {yoyos.length > 0 && (
        <YStack padding={20} paddingTop={0} gap={12}>
          <Text fontSize={18} fontWeight="700" letterSpacing={-0.3} color="#0F1419">My Yo-Yos</Text>
          <YoyoCase
            yoyos={yoyos.map((y) => ({
              id: y.id,
              name: y.name,
              color: y.color,
              owned: true,
            }))}
          />
        </YStack>
      )}

      {/* Wishlist */}
      {wishlistItems && wishlistItems.length > 0 && (
        <YStack padding={20} paddingTop={0} gap={12}>
          <Text fontSize={18} fontWeight="700" letterSpacing={-0.3} color="#0F1419">Wishlist</Text>
          {wishlistItems.map((item) => (
            <XStack
              key={item.id}
              backgroundColor="white"
              borderRadius={16}
              padding={14}
              alignItems="center"
              {...NEU.card}
            >
              <Text fontSize={18} marginRight={10}>❤️</Text>
              <YStack flex={1}>
                <Text fontSize={14} fontWeight="600" color="#0F1419">{item.name}</Text>
                <Text fontSize={13} color="$brandAqua" marginTop={2}>${item.price.toFixed(2)}</Text>
              </YStack>
              {onRemoveFromWishlist && (
                <XStack
                  onPress={() => onRemoveFromWishlist(item.id)}
                  padding={8}
                  cursor="pointer"
                  hitSlop={8}
                >
                  <Text fontSize={16} color="#536471">✕</Text>
                </XStack>
              )}
            </XStack>
          ))}
        </YStack>
      )}

      {/* Spacer pushes logout to bottom */}
      <YStack flex={1} minHeight={20} />

      {/* Logout */}
      {onLogout && (
        <YStack padding={20} paddingBottom={40}>
          <Button onPress={onLogout} variant="outline" size="md">Log Out</Button>
        </YStack>
      )}
    </ScreenContainer>
  );
}
