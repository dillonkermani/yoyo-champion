import React from 'react';
import { YStack, XStack } from 'tamagui';
import { Text } from '../Text';
import { AvatarDisplay } from '../AvatarDisplay';
import { StatsBar } from '../StatsBar';
import { YoyoCase } from '../YoyoCase';
import { ScreenContainer } from '../primitives/ScreenContainer';
import { Button } from '../Button';

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
  paddingTop = 0,
}: ProfileScreenProps) {
  return (
    <ScreenContainer scrollable paddingTop={paddingTop}>
      {/* Profile Header */}
      <YStack backgroundColor="$background" padding={20} alignItems="center" gap={12} borderBottomWidth={1} borderBottomColor="$borderColor">
        <AvatarDisplay displayName={displayName} color={avatarColor} size={80} />
        <YStack alignItems="center" gap={2}>
          <Text fontSize={20} fontWeight="900" color="$color">{displayName}</Text>
          {handle && <Text fontSize={14} color="$colorSubtitle">@{handle}</Text>}
          <XStack
            backgroundColor="$brandAqua"
            borderRadius={100}
            paddingHorizontal={12}
            paddingVertical={4}
            marginTop={4}
          >
            <Text fontSize={12} fontWeight="700" color="white">Level {level}</Text>
          </XStack>
        </YStack>
        {onEditProfile && (
          <Button onPress={onEditProfile} variant="outline" size="sm">Edit Profile</Button>
        )}
      </YStack>

      {/* Stats */}
      <YStack padding={16}>
        <StatsBar stats={stats} />
      </YStack>

      {/* Badges */}
      {badges.length > 0 && (
        <YStack padding={16} paddingTop={0} gap={12}>
          <Text fontSize={18} fontWeight="800" color="$color">Badges</Text>
          <XStack flexWrap="wrap" gap={10}>
            {badges.map((badge) => (
              <YStack
                key={badge.id}
                backgroundColor="$background"
                borderRadius={12}
                padding={12}
                alignItems="center"
                gap={4}
                borderWidth={1}
                borderColor="$borderColor"
                width={80}
              >
                <Text fontSize={24}>{badge.icon}</Text>
                <Text fontSize={10} fontWeight="600" color="$colorSubtitle" textAlign="center" numberOfLines={2}>{badge.name}</Text>
              </YStack>
            ))}
          </XStack>
        </YStack>
      )}

      {/* YoYo Collection */}
      {yoyos.length > 0 && (
        <YStack padding={16} paddingTop={0} gap={12}>
          <Text fontSize={18} fontWeight="800" color="$color">My Yo-Yos</Text>
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

      <YStack height={100} />
    </ScreenContainer>
  );
}
