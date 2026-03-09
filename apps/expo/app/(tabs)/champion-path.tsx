import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
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

const FILTERS = ['All', 'Beginner', 'Easy', 'Intermediate', 'Advanced', 'Master', '5A'];

const FILTER_TO_DIFFICULTY: Record<string, number | undefined> = {
  Beginner: 1, Easy: 2, Intermediate: 3, Advanced: 4, Master: 5,
};

export default function ChampionPathScreen() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = mockTricks.filter((trick) => {
    const matchSearch = trick.name.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (filter === 'All') return true;
    if (filter === '5A') return trick.style === '5A';
    const diff = FILTER_TO_DIFFICULTY[filter];
    return diff === undefined || trick.difficulty === diff;
  });

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search tricks..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#9CA3AF"
          accessibilityLabel="Search tricks"
        />
      </View>

      {/* Filter pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}
        contentContainerStyle={styles.filterContent}
      >
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.pill, filter === f && styles.pillActive]}
            accessibilityRole="button"
            accessibilityState={{ selected: filter === f }}
          >
            <Text style={[styles.pillText, filter === f && styles.pillTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Count */}
      <View style={styles.countRow}>
        <Text style={styles.countText}>{filtered.length} tricks</Text>
      </View>

      {/* Tricks list */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TrickCard
            name={item.name}
            difficulty={item.difficulty}
            genre={item.genre}
            xpReward={item.xpReward}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No tricks match your search.</Text>
        )}
        ListFooterComponent={() => (
          <View style={styles.comingSoon}>
            <Text style={styles.comingSoonTitle}>More Coming Soon</Text>
            <Text style={styles.comingSoonText}>2A, 3A, 4A categories and advanced combos</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  searchContainer: {
    backgroundColor: '#fff',
    padding: 12,
    paddingTop: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#111827',
  },
  filterRow: { backgroundColor: '#fff', flexGrow: 0, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  filterContent: { paddingHorizontal: 16, gap: 8, paddingVertical: 10 },
  pill: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: '#F3F4F6' },
  pillActive: { backgroundColor: '#1CB0F6' },
  pillText: { fontSize: 13, fontWeight: '600', color: '#6B7280' },
  pillTextActive: { color: 'white' },
  countRow: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 },
  countText: { fontSize: 12, color: '#9CA3AF', fontWeight: '600' },
  list: { padding: 16, paddingTop: 8 },
  emptyText: { textAlign: 'center', color: '#9CA3AF', marginTop: 40, fontSize: 15 },
  comingSoon: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 100,
  },
  comingSoonTitle: { fontSize: 16, fontWeight: '800', color: '#6B7280' },
  comingSoonText: { fontSize: 13, color: '#9CA3AF', marginTop: 4, textAlign: 'center' },
});
