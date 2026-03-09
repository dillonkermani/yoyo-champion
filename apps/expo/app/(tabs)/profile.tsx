import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { getYoyos } from '@yoyo/data';

// ── Inline types ──────────────────────────────────────────────────────────────
interface StatItem { label: string; value: string | number; color: string }
interface YoyoSlot { id: string; name: string; owned: boolean; color: string }

// ── Inline AvatarDisplay ──────────────────────────────────────────────────────
function AvatarDisplay({ displayName, level, color, size }: { displayName: string; level: number; color: string; size: number }) {
  const initials = displayName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <View style={[avatarStyles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: color }]}>
      <Text style={[avatarStyles.initials, { fontSize: size * 0.3 }]}>{initials}</Text>
      <View style={avatarStyles.levelBadge}>
        <Text style={avatarStyles.levelText}>{level}</Text>
      </View>
    </View>
  );
}

const avatarStyles = StyleSheet.create({
  circle: { justifyContent: 'center', alignItems: 'center' },
  initials: { color: '#fff', fontWeight: '800' },
  levelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#FFC800',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  levelText: { color: '#111827', fontSize: 10, fontWeight: '800' },
});

// ── Inline StatsBar ───────────────────────────────────────────────────────────
function StatsBar({ stats }: { stats: StatItem[] }) {
  return (
    <View style={statsStyles.row}>
      {stats.map((s) => (
        <View key={s.label} style={statsStyles.item}>
          <Text style={[statsStyles.value, { color: s.color }]}>{s.value}</Text>
          <Text style={statsStyles.label}>{s.label}</Text>
        </View>
      ))}
    </View>
  );
}

const statsStyles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  item: { alignItems: 'center', flex: 1 },
  value: { fontSize: 18, fontWeight: '800' },
  label: { fontSize: 11, color: '#6B7280', marginTop: 2, fontWeight: '600' },
});

// ── Inline YoyoCase ───────────────────────────────────────────────────────────
function YoyoCase({ yoyos }: { yoyos: YoyoSlot[] }) {
  return (
    <View style={caseStyles.grid}>
      {yoyos.map((y) => (
        <View key={y.id} style={[caseStyles.slot, !y.owned && caseStyles.slotLocked]}>
          <View style={[caseStyles.dot, { backgroundColor: y.owned ? y.color : '#D1D5DB' }]} />
          <Text style={[caseStyles.name, !y.owned && caseStyles.nameLocked]} numberOfLines={1}>{y.name}</Text>
        </View>
      ))}
    </View>
  );
}

const caseStyles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  slot: {
    width: '30%',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  slotLocked: { opacity: 0.45 },
  dot: { width: 28, height: 28, borderRadius: 14, marginBottom: 6 },
  name: { fontSize: 10, fontWeight: '600', color: '#374151', textAlign: 'center' },
  nameLocked: { color: '#9CA3AF' },
});

// ── Screen data ───────────────────────────────────────────────────────────────
const ALL_YOYOS = getYoyos().slice(0, 9);

const YOYO_SLOTS: YoyoSlot[] = ALL_YOYOS.map((p, i) => ({
  id: p.id,
  name: p.name,
  owned: i < 3,
  color: '#1CB0F6',
}));

const STATS: StatItem[] = [
  { label: 'Tricks', value: 13, color: '#1CB0F6' },
  { label: 'XP', value: '3.7k', color: '#FFC800' },
  { label: 'Streak', value: '12d', color: '#FF4B4B' },
  { label: 'Badges', value: 6, color: '#CE82FF' },
  { label: 'Level', value: 8, color: '#FF9600' },
];

// ── Screen ────────────────────────────────────────────────────────────────────
export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <AvatarDisplay displayName="StringMaster 23" level={8} color="#1CB0F6" size={90} />
        <Text style={styles.displayName}>StringMaster_23</Text>
        <Text style={styles.handle}>@stringmaster23</Text>
        <View style={styles.followRow}>
          <View style={styles.followItem}>
            <Text style={styles.followNum}>48</Text>
            <Text style={styles.followLabel}>Following</Text>
          </View>
          <View style={styles.followDivider} />
          <View style={styles.followItem}>
            <Text style={styles.followNum}>312</Text>
            <Text style={styles.followLabel}>Followers</Text>
          </View>
          <View style={styles.followDivider} />
          <View style={styles.followItem}>
            <Text style={styles.followNum}>7</Text>
            <Text style={styles.followLabel}>Uploads</Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Stats</Text>
        <StatsBar stats={STATS} />
      </View>

      {/* Yoyo Case */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Yo-Yo Case</Text>
        <YoyoCase yoyos={YOYO_SLOTS} />
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 32,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  displayName: { fontSize: 20, fontWeight: '800', color: '#111827', marginTop: 12 },
  handle: { fontSize: 14, color: '#6B7280', marginTop: 2 },
  followRow: { flexDirection: 'row', alignItems: 'center', marginTop: 20, paddingHorizontal: 24 },
  followItem: { flex: 1, alignItems: 'center' },
  followNum: { fontSize: 18, fontWeight: '800', color: '#111827' },
  followLabel: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  followDivider: { width: 1, height: 32, backgroundColor: '#E5E7EB' },
  card: { backgroundColor: '#fff', margin: 16, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  cardTitle: { fontSize: 16, fontWeight: '800', color: '#111827', marginBottom: 12 },
  bottomSpacer: { height: 100 },
});
