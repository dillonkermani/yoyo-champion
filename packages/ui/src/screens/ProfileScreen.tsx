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

export interface ProfileScreenProps {
  displayName: string;
  handle?: string;
  level: number;
  avatarColor?: string;
  stats: ProfileStat[];
  badges: ProfileBadge[];
  yoyos: ProfileYoyo[];
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
  onEditProfile,
  onLogout,
  paddingTop = 0,
}: ProfileScreenProps) {
  return (
    <ScreenContainer scrollable paddingTop={paddingTop}>
      {/* Profile Header — raised neumorphic panel */}
      <YStack
        backgroundColor="$neuSurfaceLight"
        padding={20}
        alignItems="center"
        gap={12}
        borderBottomLeftRadius={24}
        borderBottomRightRadius={24}
        {...NEU.cardLifted}
      >
        <AvatarDisplay displayName={displayName} color={avatarColor} size={80} />
        <YStack alignItems="center" gap={2}>
          <Text fontSize={20} fontWeight="800" color="#2d3436">{displayName}</Text>
          {handle && <Text fontSize={14} color="#636e72">@{handle}</Text>}
          <XStack
            backgroundColor="$neuSurface"
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
          <Text fontSize={18} fontWeight="700" letterSpacing={-0.3} color="#2d3436">Badges</Text>
          <XStack flexWrap="wrap" gap={10}>
            {badges.map((badge) => (
              <YStack
                key={badge.id}
                backgroundColor="$neuSurface"
                borderRadius={16}
                padding={12}
                alignItems="center"
                gap={4}
                width={80}
                {...NEU.card}
              >
                <Text fontSize={24}>{badge.icon}</Text>
                <Text fontSize={10} fontWeight="600" color="#636e72" textAlign="center" numberOfLines={2}>{badge.name}</Text>
              </YStack>
            ))}
          </XStack>
        </YStack>
      )}

      {/* YoYo Collection */}
      {yoyos.length > 0 && (
        <YStack padding={20} paddingTop={0} gap={12}>
          <Text fontSize={18} fontWeight="700" letterSpacing={-0.3} color="#2d3436">My Yo-Yos</Text>
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

      {/* Logout */}
      {onLogout && (
        <YStack padding={20} paddingTop={0}>
          <Button onPress={onLogout} variant="outline" size="md">Log Out</Button>
        </YStack>
      )}

      <YStack height={100} />
    </ScreenContainer>
  );
}
