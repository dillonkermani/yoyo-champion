import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { mockTricks } from '@yoyo/data';

const DIFFICULTY_LABELS: Record<number, string> = { 1: 'Beginner', 2: 'Easy', 3: 'Intermediate', 4: 'Advanced', 5: 'Master' };

function TrickCard({ name, difficulty, genre, xpReward }: { name: string; difficulty: number; genre: string; xpReward: number }) {
  return (
    <View style={cardStyles.card}>
      <View style={cardStyles.top}>
        <Text style={cardStyles.name}>{name}</Text>
        <Text style={cardStyles.xp}>+{xpReward} XP</Text>
      </View>
      <View style={cardStyles.bottom}>
        <Text style={cardStyles.tag}>{DIFFICULTY_LABELS[difficulty] ?? 'Unknown'}</Text>
        <Text style={cardStyles.tag}>{genre}</Text>
      </View>
    </View>
  );
}

const cardStyles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: '#E5E7EB' },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  name: { fontSize: 15, fontWeight: '700', color: '#111827', flex: 1 },
  xp: { fontSize: 13, fontWeight: '700', color: '#FFC800' },
  bottom: { flexDirection: 'row', gap: 8 },
  tag: { fontSize: 11, fontWeight: '600', color: '#6B7280', backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
});

const FEATURED_TRICKS = mockTricks.slice(0, 5);

const NEWS_ITEMS = [
  'World Yo-Yo Contest 2025 Registration Now Open',
  'New Trick Drop: Horizontal Flow Series — 8 new tricks added',
  'Community Spotlight: Watch SlackQueen\'s latest routine',
];

export default function HomeScreen() {
  const [tab, setTab] = useState<'NEW' | 'FOR_YOU'>('NEW');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>YoYo Champion</Text>
        <View style={styles.tabRow}>
          {(['NEW', 'FOR_YOU'] as const).map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTab(t)}
              style={[styles.tab, tab === t && styles.tabActive]}
              accessibilityRole="tab"
              accessibilityState={{ selected: tab === t }}
            >
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                {t === 'FOR_YOU' ? 'FOR YOU' : t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured Tricks */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Tricks</Text>
        {FEATURED_TRICKS.map((trick) => (
          <TrickCard
            key={trick.id}
            name={trick.name}
            difficulty={trick.difficulty}
            genre={trick.genre}
            xpReward={trick.xpReward}
          />
        ))}
      </View>

      {/* News */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest News</Text>
        {NEWS_ITEMS.map((news) => (
          <View key={news} style={styles.newsCard}>
            <Text style={styles.newsDot}>●</Text>
            <Text style={styles.newsText}>{news}</Text>
          </View>
        ))}
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logo: { fontSize: 22, fontWeight: '900', color: '#1CB0F6', marginBottom: 16, letterSpacing: -0.5 },
  tabRow: { flexDirection: 'row', gap: 8 },
  tab: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F3F4F6' },
  tabActive: { backgroundColor: '#1CB0F6' },
  tabText: { fontSize: 13, fontWeight: '700', color: '#6B7280' },
  tabTextActive: { color: 'white' },
  section: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 12 },
  newsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  newsDot: { color: '#1CB0F6', fontSize: 10, marginTop: 4 },
  newsText: { flex: 1, fontSize: 14, fontWeight: '600', color: '#374151', lineHeight: 20 },
  bottomSpacer: { height: 100 },
});
