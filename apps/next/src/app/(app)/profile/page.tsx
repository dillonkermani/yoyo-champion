"use client";
import { ProfileScreen } from '@yoyo/ui';
import { useUserStore, useGamificationStore } from '@yoyo/store';
import { selectLevel, selectXp, selectBadges } from '@yoyo/store';
import { getYoyos } from '@yoyo/data';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const logout = useUserStore((s) => s.logout);
  const displayName = useUserStore((s) => s.user?.displayName ?? 'Champion');
  const level = useGamificationStore(selectLevel);
  const xp = useGamificationStore(selectXp);
  const streak = useUserStore((s) => s.user?.currentStreak ?? 0);
  const storeBadges = useGamificationStore(selectBadges);

  const stats = [
    { label: 'Level', value: String(level) },
    { label: 'Total XP', value: String(xp) },
    { label: 'Streak', value: `${streak}d` },
  ];

  const badges = storeBadges.slice(0, 9).map((b) => ({
    id: b.id,
    name: b.name,
    icon: b.icon,
    rarity: b.rarity,
  }));

  const yoyos = getYoyos().slice(0, 6).map((y) => ({
    id: y.id,
    name: y.name,
    color: '#1CB0F6',
    isActive: false,
  }));

  return (
    <ProfileScreen
      displayName={displayName}
      level={level}
      stats={stats}
      badges={badges}
      yoyos={yoyos}
      onLogout={() => { logout(); router.replace('/login'); }}
    />
  );
}
