import React, { useCallback, useRef, useState } from 'react';
import { FlatList, Dimensions, ViewToken } from 'react-native';
import { YStack, XStack } from 'tamagui';
import { Text } from '../Text';
import { VideoPlayer } from '../VideoPlayer';
import { NEU } from '../tamagui.config';

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

/* ────────────────────── Types ────────────────────── */

export interface FeedVideo {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  trickName: string;
  trickId: string;
  userId: string;
  userName: string;
  likes: number;
  comments: number;
  tags: string[];
  isLiked: boolean;
  usesYoyoChampionYoyo: boolean;
}

export interface ForYouScreenProps {
  videos: FeedVideo[];
  feedTab: 'new' | 'for_you';
  onTabChange: (tab: 'new' | 'for_you') => void;
  onLike: (videoId: string) => void;
  onUpload?: () => void;
  onLearn?: (trickId: string) => void;
  onShare?: (videoId: string) => void;
  paddingTop?: number;
}

/* ────────────────────── Tab Pill ────────────────────── */

function TabPill({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <YStack
      paddingHorizontal={20}
      paddingVertical={8}
      borderRadius={20}
      backgroundColor={active ? 'rgba(255,255,255,0.25)' : 'transparent'}
      onPress={onPress}
      pressStyle={{ opacity: 0.7 }}
      cursor="pointer"
    >
      <Text
        color="white"
        fontSize={14}
        fontWeight={active ? '800' : '500'}
        letterSpacing={0.5}
      >
        {label}
      </Text>
    </YStack>
  );
}

/* ────────────────────── Action Button ────────────────────── */

function ActionButton({
  icon,
  label,
  count,
  onPress,
}: {
  icon: string;
  label?: string;
  count?: number;
  onPress?: () => void;
}) {
  return (
    <YStack alignItems="center" onPress={onPress} pressStyle={{ opacity: 0.7 }} cursor="pointer">
      <YStack
        width={54}
        height={54}
        borderRadius={27}
        backgroundColor="rgba(255,255,255,0.15)"
        alignItems="center"
        justifyContent="center"
        {...NEU.card}
        shadowColor="rgba(0,0,0,0.2)"
      >
        <Text fontSize={24}>{icon}</Text>
      </YStack>
      {count !== undefined && (
        <Text color="white" fontSize={12} fontWeight="700" marginTop={4}>
          {count.toLocaleString()}
        </Text>
      )}
      {label && !count && (
        <Text color="white" fontSize={12} fontWeight="700" marginTop={4}>
          {label}
        </Text>
      )}
    </YStack>
  );
}

/* ────────────────────── Tag Chip ────────────────────── */

function TagChip({ tag }: { tag: string }) {
  return (
    <YStack
      paddingHorizontal={10}
      paddingVertical={4}
      borderRadius={12}
      backgroundColor="rgba(255,255,255,0.15)"
    >
      <Text color="rgba(255,255,255,0.9)" fontSize={12} fontWeight="600">
        #{tag}
      </Text>
    </YStack>
  );
}

/* ────────────────────── Feed Card ────────────────────── */

const CARD_COLORS = ['#1CB0F6', '#CE82FF', '#FF9600', '#FF4B4B', '#58CC02', '#FFC800'];

function FeedCard({
  video,
  index,
  isActive,
  cardHeight,
  onLike,
  onUpload,
  onLearn,
  onShare,
}: {
  video: FeedVideo;
  index: number;
  isActive: boolean;
  cardHeight: number;
  onLike: (videoId: string) => void;
  onUpload?: () => void;
  onLearn?: (trickId: string) => void;
  onShare?: (videoId: string) => void;
}) {
  const bgColor = CARD_COLORS[index % CARD_COLORS.length]!;

  return (
    <YStack width={WINDOW_WIDTH} height={cardHeight} backgroundColor={bgColor}>
      {/* Video player background */}
      <YStack position="absolute" top={0} left={0} right={0} bottom={0}>
        <VideoPlayer
          uri={video.videoUrl}
          posterUri={video.thumbnailUrl}
          isActive={isActive}
        />
      </YStack>

      {/* Gradient-like overlay at bottom */}
      <YStack
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        height={cardHeight * 0.5}
        style={{
          // @ts-ignore — RN supports this on both platforms
          background: undefined,
        }}
      />

      {/* Bottom content overlay */}
      <YStack
        position="absolute"
        left={0}
        right={72}
        bottom={100}
        paddingHorizontal={20}
        gap={8}
      >
        {/* Username */}
        <Text color="white" fontSize={15} fontWeight="700">
          @{video.userName}
        </Text>

        {/* Trick name */}
        <Text
          color="white"
          fontSize={28}
          fontWeight="800"
          letterSpacing={-0.5}
          style={{
            textShadowColor: 'rgba(0,0,0,0.3)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 4,
          }}
        >
          {video.trickName}
        </Text>

        {/* Tags */}
        <XStack gap={6} flexWrap="wrap">
          {video.tags.slice(0, 4).map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
          {video.usesYoyoChampionYoyo && (
            <YStack
              paddingHorizontal={10}
              paddingVertical={4}
              borderRadius={12}
              backgroundColor="rgba(255,200,0,0.25)"
            >
              <Text color="#FFC800" fontSize={12} fontWeight="800">
                YC Yoyo
              </Text>
            </YStack>
          )}
        </XStack>
      </YStack>

      {/* Right side actions */}
      <YStack
        position="absolute"
        right={16}
        bottom={120}
        gap={24}
      >
        <ActionButton
          icon={video.isLiked ? '❤️' : '🤍'}
          count={video.likes + (video.isLiked ? 1 : 0)}
          onPress={() => onLike(video.id)}
        />
        {onUpload && (
          <ActionButton
            icon="📤"
            label="Upload"
            onPress={onUpload}
          />
        )}
        {onLearn && (
          <ActionButton
            icon="📚"
            label="Learn"
            onPress={() => onLearn(video.trickId)}
          />
        )}
        {onShare && (
          <ActionButton
            icon="🔗"
            label="Share"
            onPress={() => onShare(video.id)}
          />
        )}
      </YStack>
    </YStack>
  );
}

/* ────────────────────── Main Screen ────────────────────── */

export function ForYouScreen({
  videos,
  feedTab,
  onTabChange,
  onLike,
  onUpload,
  onLearn,
  onShare,
  paddingTop = 0,
}: ForYouScreenProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<FeedVideo>>(null);

  const cardHeight = WINDOW_HEIGHT - paddingTop;

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0]?.index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
    [],
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderItem = useCallback(
    ({ item, index }: { item: FeedVideo; index: number }) => (
      <FeedCard
        video={item}
        index={index}
        isActive={index === activeIndex}
        cardHeight={cardHeight}
        onLike={onLike}
        {...(onUpload ? { onUpload } : {})}
        {...(onLearn ? { onLearn } : {})}
        {...(onShare ? { onShare } : {})}
      />
    ),
    [activeIndex, cardHeight, onLike, onUpload, onLearn, onShare],
  );

  const keyExtractor = useCallback((item: FeedVideo) => item.id, []);

  return (
    <YStack flex={1} backgroundColor="#000">
      {/* Feed list */}
      <FlatList
        ref={flatListRef}
        data={videos}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={cardHeight}
        snapToAlignment="start"
        contentContainerStyle={{ paddingTop }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_data, index) => ({
          length: cardHeight,
          offset: cardHeight * index,
          index,
        })}
        removeClippedSubviews
        maxToRenderPerBatch={3}
        windowSize={5}
      />

      {/* Top tab pills — positioned absolutely over the feed */}
      <XStack
        position="absolute"
        top={paddingTop + 12}
        left={0}
        right={0}
        justifyContent="center"
        alignItems="center"
        gap={8}
        zIndex={10}
      >
        <TabPill
          label="NEW"
          active={feedTab === 'new'}
          onPress={() => onTabChange('new')}
        />
        <TabPill
          label="FOR YOU"
          active={feedTab === 'for_you'}
          onPress={() => onTabChange('for_you')}
        />
      </XStack>

      {/* Empty state */}
      {videos.length === 0 && (
        <YStack
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          alignItems="center"
          justifyContent="center"
          paddingTop={paddingTop}
        >
          <Text color="rgba(255,255,255,0.5)" fontSize={18} fontWeight="600">
            No videos yet
          </Text>
          <Text color="rgba(255,255,255,0.35)" fontSize={14} marginTop={8}>
            Be the first to upload a trick!
          </Text>
        </YStack>
      )}
    </YStack>
  );
}
