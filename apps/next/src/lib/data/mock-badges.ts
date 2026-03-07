import type { Badge, BadgeRarity } from './types';

export const mockBadges: Badge[] = [
  // Common badges - Easy to earn
  {
    id: 'badge-001',
    name: 'First Bind',
    description: 'Successfully performed your first bind return. Welcome to modern yo-yoing!',
    icon: 'bind',
    rarity: 'common',
  },
  {
    id: 'badge-002',
    name: 'First Combo',
    description: 'Landed your first trick combination without dropping.',
    icon: 'combo',
    rarity: 'common',
  },
  {
    id: 'badge-003',
    name: 'Week Warrior',
    description: 'Practiced for 7 consecutive days. Consistency is key!',
    icon: 'calendar-week',
    rarity: 'common',
  },
  {
    id: 'badge-004',
    name: 'String Slinger',
    description: 'Completed 5 string tricks.',
    icon: 'string',
    rarity: 'common',
  },
  {
    id: 'badge-005',
    name: 'Trapeze Master',
    description: 'Mastered the Trapeze - the foundation of 1A play.',
    icon: 'trapeze',
    rarity: 'common',
  },

  // Rare badges - Require dedication
  {
    id: 'badge-006',
    name: 'Intermediate Achiever',
    description: 'Completed all beginner tricks and entered intermediate territory.',
    icon: 'level-up',
    rarity: 'rare',
  },
  {
    id: 'badge-007',
    name: 'Streak Master',
    description: 'Maintained a 30-day practice streak. Your dedication is inspiring!',
    icon: 'fire',
    rarity: 'rare',
  },
  {
    id: 'badge-008',
    name: 'Dedicated Thrower',
    description: 'Accumulated 10 hours of total watch time. Knowledge is power!',
    icon: 'clock',
    rarity: 'rare',
  },
  {
    id: 'badge-009',
    name: 'Multi-Style',
    description: 'Learned tricks from at least 3 different genres.',
    icon: 'diversity',
    rarity: 'rare',
  },
  {
    id: 'badge-010',
    name: 'Speed Demon',
    description: 'Mastered 3 speed tricks. Your hands are a blur!',
    icon: 'lightning',
    rarity: 'rare',
  },
  {
    id: 'badge-011',
    name: 'Flow State',
    description: 'Mastered 3 flow tricks. Smooth like butter.',
    icon: 'wave',
    rarity: 'rare',
  },
  {
    id: 'badge-012',
    name: 'Rising Star',
    description: 'Reached Level 5. You are on your way!',
    icon: 'star-rising',
    rarity: 'rare',
  },

  // Epic badges - Significant achievements
  {
    id: 'badge-013',
    name: 'Slack Specialist',
    description: 'Mastered 5 slack tricks. The string obeys your command.',
    icon: 'slack',
    rarity: 'epic',
  },
  {
    id: 'badge-014',
    name: 'Horizontal Hero',
    description: 'Mastered horizontal play. Defying gravity with style.',
    icon: 'horizontal',
    rarity: 'epic',
  },
  {
    id: 'badge-015',
    name: '5A Pioneer',
    description: 'Completed your first 5A (counterweight) trick. Bold choice!',
    icon: 'counterweight',
    rarity: 'epic',
  },
  {
    id: 'badge-016',
    name: 'Path Completer',
    description: 'Completed your first full learning path. Achievement unlocked!',
    icon: 'path-complete',
    rarity: 'epic',
  },
  {
    id: 'badge-017',
    name: 'Century Club',
    description: 'Maintained a 100-day practice streak. You are unstoppable!',
    icon: 'fire-100',
    rarity: 'epic',
  },
  {
    id: 'badge-018',
    name: 'Advanced Practitioner',
    description: 'Mastered 5 difficulty-4 tricks. You are in the big leagues now.',
    icon: 'medal-gold',
    rarity: 'epic',
  },

  // Legendary badges - Elite status
  {
    id: 'badge-019',
    name: 'Spirit Bomb Master',
    description: 'Mastered the legendary Spirit Bomb. A true milestone.',
    icon: 'spirit-bomb',
    rarity: 'legendary',
  },
  {
    id: 'badge-020',
    name: 'Competition Ready',
    description: 'Completed the Competition Prep path. You are ready for the stage!',
    icon: 'trophy',
    rarity: 'legendary',
  },
  {
    id: 'badge-021',
    name: 'Master Thrower',
    description: 'Mastered a difficulty-5 trick. Elite status achieved.',
    icon: 'crown',
    rarity: 'legendary',
  },
  {
    id: 'badge-022',
    name: 'Trick Collector',
    description: 'Mastered 50 different tricks. Your repertoire is legendary.',
    icon: 'collection',
    rarity: 'legendary',
  },
  {
    id: 'badge-023',
    name: 'Year of Dedication',
    description: 'Practiced for 365 consecutive days. A full year of commitment!',
    icon: 'calendar-year',
    rarity: 'legendary',
  },
  {
    id: 'badge-024',
    name: 'Total Mastery',
    description: 'Completed all learning paths. You have mastered the art.',
    icon: 'master-all',
    rarity: 'legendary',
  },
];

export const getBadgeById = (id: string): Badge | undefined => {
  return mockBadges.find(badge => badge.id === id);
};

export const getBadgesByRarity = (rarity: BadgeRarity): Badge[] => {
  return mockBadges.filter(badge => badge.rarity === rarity);
};

export const getBadgesForUser = (badgeIds: string[]): Badge[] => {
  return badgeIds
    .map(id => getBadgeById(id))
    .filter((badge): badge is Badge => badge !== undefined);
};

export const getNextUnlockableBadges = (
  earnedBadgeIds: string[],
  completedTricks: string[],
  currentStreak: number,
  totalWatchTime: number
): Badge[] => {
  const unearnedBadges = mockBadges.filter(b => !earnedBadgeIds.includes(b.id));

  // Simple logic to suggest next badges (would be more sophisticated in production)
  return unearnedBadges.filter(badge => {
    switch (badge.id) {
      case 'badge-001':
        return completedTricks.includes('trick-005');
      case 'badge-003':
        return currentStreak >= 7;
      case 'badge-007':
        return currentStreak >= 30;
      case 'badge-008':
        return totalWatchTime >= 36000; // 10 hours in seconds
      case 'badge-012':
        return completedTricks.length >= 10;
      default:
        return false;
    }
  }).slice(0, 3);
};

export const getRarityColor = (rarity: BadgeRarity): string => {
  switch (rarity) {
    case 'common':
      return '#9CA3AF'; // gray
    case 'rare':
      return '#3B82F6'; // blue
    case 'epic':
      return '#8B5CF6'; // purple
    case 'legendary':
      return '#F59E0B'; // gold/amber
    default:
      return '#9CA3AF';
  }
};

export const getRarityLabel = (rarity: BadgeRarity): string => {
  switch (rarity) {
    case 'common':
      return 'Common';
    case 'rare':
      return 'Rare';
    case 'epic':
      return 'Epic';
    case 'legendary':
      return 'Legendary';
    default:
      return 'Unknown';
  }
};

// Badge unlock conditions (for reference)
export const badgeUnlockConditions: Record<string, string> = {
  'badge-001': 'Master the Bind Return trick',
  'badge-002': 'Complete any 2 tricks in sequence',
  'badge-003': 'Practice for 7 days in a row',
  'badge-004': 'Master 5 tricks in the "string" genre',
  'badge-005': 'Master the Trapeze trick',
  'badge-006': 'Master all difficulty 1-2 tricks',
  'badge-007': 'Maintain a 30-day streak',
  'badge-008': 'Accumulate 10 hours of tutorial watch time',
  'badge-009': 'Master tricks from 3+ different genres',
  'badge-010': 'Master 3 tricks in the "speed" genre',
  'badge-011': 'Master 3 tricks in the "flow" genre',
  'badge-012': 'Reach Level 5 (2000+ XP)',
  'badge-013': 'Master 5 tricks in the "slack" genre',
  'badge-014': 'Master 3 tricks in the "horizontal" genre',
  'badge-015': 'Master any 5A style trick',
  'badge-016': 'Complete any learning path',
  'badge-017': 'Maintain a 100-day streak',
  'badge-018': 'Master 5 difficulty-4 tricks',
  'badge-019': 'Master the Spirit Bomb trick',
  'badge-020': 'Complete the Competition Prep learning path',
  'badge-021': 'Master any difficulty-5 trick',
  'badge-022': 'Master 50 total tricks',
  'badge-023': 'Maintain a 365-day streak',
  'badge-024': 'Complete all available learning paths',
};
