import React from 'react';
import { XStack, YStack } from 'tamagui';
import { Text } from '../Text';
import { NEU } from '../tamagui.config';

export interface NewsCardProps {
  title: string;
  body: string;
  type: 'update' | 'announcement' | 'new_video';
  createdAt: Date;
  onPress?: () => void;
}

const TYPE_COLORS: Record<string, string> = {
  update: '#1CB0F6',
  announcement: '#FF9600',
  new_video: '#CE82FF',
};

const TYPE_LABELS: Record<string, string> = {
  update: 'Update',
  announcement: 'News',
  new_video: 'New Video',
};

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

export function NewsCard({ title, body, type, createdAt, onPress }: NewsCardProps) {
  const dotColor = TYPE_COLORS[type] ?? '#1CB0F6';
  const label = TYPE_LABELS[type] ?? 'Update';

  return (
    <YStack
      backgroundColor="$neuSurface"
      borderRadius={14}
      padding={14}
      marginBottom={10}
      onPress={onPress}
      animation="quick"
      pressStyle={{ opacity: 0.92, ...NEU.pressed }}
      cursor={onPress ? 'pointer' : undefined}
      {...NEU.card}
    >
      <XStack alignItems="center" gap={8} marginBottom={6}>
        <YStack width={8} height={8} borderRadius={4} backgroundColor={dotColor} />
        <Text fontSize={11} fontWeight="700" color={dotColor} textTransform="uppercase" letterSpacing={0.5}>
          {label}
        </Text>
        <Text fontSize={11} color="#a0a8b0" marginLeft="auto">
          {timeAgo(createdAt)}
        </Text>
      </XStack>
      <Text fontSize={15} fontWeight="700" color="#2d3436" marginBottom={4}>
        {title}
      </Text>
      <Text fontSize={13} color="#636e72" numberOfLines={2}>
        {body}
      </Text>
    </YStack>
  );
}
