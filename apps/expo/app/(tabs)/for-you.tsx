import React from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { mockTricks } from '@yoyo/data';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

const CARD_COLORS = ['#1CB0F6', '#CE82FF', '#FF9600', '#FF4B4B', '#58CC02', '#FFC800'];

function getLikes(id: string): number {
  const num = parseInt(id.replace('trick-', ''), 10) || 1;
  return (num * 137 + 500) % 4800 + 200;
}

const FEED_ITEMS = mockTricks.slice(0, 10).map((trick, i) => ({
  ...trick,
  likes: getLikes(trick.id),
  cardColor: CARD_COLORS[i % CARD_COLORS.length] as string,
}));

const DIFFICULTY_STARS = ['', '★', '★★', '★★★', '★★★★', '★★★★★'];

export default function ForYouScreen() {
  return (
    <FlatList
      data={FEED_ITEMS}
      keyExtractor={(item) => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={WINDOW_HEIGHT}
      snapToAlignment="start"
      renderItem={({ item }) => (
        <View style={[styles.card, { backgroundColor: item.cardColor, height: WINDOW_HEIGHT }]}>
          {/* Frosted content panel */}
          <View style={styles.content}>
            <View style={styles.frostedPanel}>
              <Text style={styles.trickName}>{item.name}</Text>
              <Text style={styles.stars}>{DIFFICULTY_STARS[item.difficulty]}</Text>
              <Text style={styles.description} numberOfLines={3}>
                {item.description}
              </Text>
              <View style={styles.meta}>
                <View style={styles.xpBadge}>
                  <Text style={styles.xpText}>+{item.xpReward} XP</Text>
                </View>
                <Text style={styles.genre}>#{item.genre}</Text>
              </View>
            </View>
          </View>

          {/* Side actions — neumorphic circles */}
          <View style={styles.sideActions}>
            <TouchableOpacity style={styles.action} accessibilityLabel="Like this trick">
              <View style={styles.actionCircle}>
                <Text style={styles.actionIcon}>❤️</Text>
              </View>
              <Text style={styles.actionCount}>{item.likes.toLocaleString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action} accessibilityLabel="Upload your attempt">
              <View style={styles.actionCircle}>
                <Text style={styles.actionIcon}>📤</Text>
              </View>
              <Text style={styles.actionLabel}>Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action} accessibilityLabel="Learn this trick">
              <View style={styles.actionCircle}>
                <Text style={styles.actionIcon}>📚</Text>
              </View>
              <Text style={styles.actionLabel}>Learn</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    justifyContent: 'flex-end',
    padding: 24,
    paddingBottom: 100,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 48,
    marginRight: 72,
  },
  frostedPanel: {
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderRadius: 22,
    padding: 20,
  },
  trickName: {
    fontSize: 32,
    fontWeight: '800',
    color: 'white',
    marginBottom: 6,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  stars: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
    marginBottom: 12,
  },
  meta: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  xpBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  xpText: {
    color: '#FFC800',
    fontSize: 13,
    fontWeight: '800',
  },
  genre: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    fontWeight: '600',
  },
  sideActions: {
    position: 'absolute',
    right: 20,
    bottom: 120,
    gap: 24,
  },
  action: { alignItems: 'center' },
  actionCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    // Soft shadow matching the card color
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 3,
  },
  actionIcon: { fontSize: 24 },
  actionCount: { fontSize: 12, color: 'white', fontWeight: '700', marginTop: 4 },
  actionLabel: { fontSize: 12, color: 'white', fontWeight: '700', marginTop: 4 },
});
