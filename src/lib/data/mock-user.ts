import type { User, UserProgress } from './types';

export const mockUser: User = {
  id: 'user-001',
  email: 'thrower@example.com',
  displayName: 'StringMaster_23',
  avatar: 'https://example.com/avatars/user-001.jpg',
  level: 8,
  xp: 3750,
  currentStreak: 12,
  longestStreak: 28,
  completedTricks: [
    'trick-001', // Sleeper
    'trick-002', // Gravity Pull
    'trick-003', // Forward Pass
    'trick-004', // Breakaway
    'trick-005', // Bind Return
    'trick-006', // Trapeze
    'trick-007', // Brain Twister
    'trick-008', // Rock the Baby
    'trick-009', // Double or Nothing
    'trick-010', // Split the Atom
    'trick-013', // Trapeze and His Brother
    'trick-014', // Eli Hops
    'trick-022', // Boingy Boing
  ],
  activePaths: ['path-001', 'path-003'],
  badges: [
    'badge-001', // First Bind
    'badge-002', // First Combo
    'badge-003', // Week Warrior
    'badge-005', // Trapeze Master
    'badge-008', // Dedicated Thrower
    'badge-012', // Rising Star
  ],
  createdAt: new Date('2024-06-15'),
};

export const mockUserProgress: UserProgress[] = [
  // Completed tricks
  {
    userId: 'user-001',
    trickId: 'trick-001',
    status: 'mastered',
    watchedAt: new Date('2024-06-15'),
    masteredAt: new Date('2024-06-16'),
    watchTime: 450,
    notes: 'Started with a responsive yo-yo. Need to work on keeping throw straight.',
  },
  {
    userId: 'user-001',
    trickId: 'trick-002',
    status: 'mastered',
    watchedAt: new Date('2024-06-16'),
    masteredAt: new Date('2024-06-17'),
    watchTime: 180,
  },
  {
    userId: 'user-001',
    trickId: 'trick-003',
    status: 'mastered',
    watchedAt: new Date('2024-06-17'),
    masteredAt: new Date('2024-06-19'),
    watchTime: 320,
    notes: 'Palm direction was tricky at first.',
  },
  {
    userId: 'user-001',
    trickId: 'trick-004',
    status: 'mastered',
    watchedAt: new Date('2024-06-18'),
    masteredAt: new Date('2024-06-22'),
    watchTime: 580,
    notes: 'This unlocked so many tricks! Key to 1A play.',
  },
  {
    userId: 'user-001',
    trickId: 'trick-005',
    status: 'mastered',
    watchedAt: new Date('2024-06-20'),
    masteredAt: new Date('2024-06-28'),
    watchTime: 1200,
    notes: 'Switched to unresponsive yo-yo. Bind took a while but so worth it.',
  },
  {
    userId: 'user-001',
    trickId: 'trick-006',
    status: 'mastered',
    watchedAt: new Date('2024-06-25'),
    masteredAt: new Date('2024-07-05'),
    watchTime: 1500,
    notes: 'The foundation of everything! Can now hit it 9/10 times.',
  },
  {
    userId: 'user-001',
    trickId: 'trick-007',
    status: 'mastered',
    watchedAt: new Date('2024-07-01'),
    masteredAt: new Date('2024-07-10'),
    watchTime: 800,
  },
  {
    userId: 'user-001',
    trickId: 'trick-008',
    status: 'mastered',
    watchedAt: new Date('2024-07-02'),
    masteredAt: new Date('2024-07-08'),
    watchTime: 450,
    notes: 'Fun party trick!',
  },
  {
    userId: 'user-001',
    trickId: 'trick-009',
    status: 'mastered',
    watchedAt: new Date('2024-07-10'),
    masteredAt: new Date('2024-07-20'),
    watchTime: 950,
    notes: 'Landing on the right string was the challenge.',
  },
  {
    userId: 'user-001',
    trickId: 'trick-010',
    status: 'mastered',
    watchedAt: new Date('2024-07-18'),
    masteredAt: new Date('2024-08-01'),
    watchTime: 1100,
    notes: 'Beautiful flowing trick. Love this one.',
  },
  {
    userId: 'user-001',
    trickId: 'trick-013',
    status: 'mastered',
    watchedAt: new Date('2024-08-05'),
    masteredAt: new Date('2024-08-15'),
    watchTime: 720,
  },
  {
    userId: 'user-001',
    trickId: 'trick-014',
    status: 'mastered',
    watchedAt: new Date('2024-08-10'),
    masteredAt: new Date('2024-08-25'),
    watchTime: 1350,
    notes: 'Can do 5 hops consistently now. Working on height.',
  },
  {
    userId: 'user-001',
    trickId: 'trick-022',
    status: 'mastered',
    watchedAt: new Date('2024-09-01'),
    masteredAt: new Date('2024-09-15'),
    watchTime: 1600,
    notes: 'Finally got the rhythm! Non-throw hand is the key.',
  },

  // In progress tricks
  {
    userId: 'user-001',
    trickId: 'trick-011',
    status: 'practicing',
    watchedAt: new Date('2024-09-20'),
    watchTime: 650,
    notes: 'Getting better. Need to work on speed.',
  },
  {
    userId: 'user-001',
    trickId: 'trick-012',
    status: 'practicing',
    watchedAt: new Date('2024-10-01'),
    watchTime: 420,
    notes: 'Cold Fusion is tough. Working on the underpass.',
  },
  {
    userId: 'user-001',
    trickId: 'trick-015',
    status: 'watching',
    watchedAt: new Date('2024-10-15'),
    watchTime: 180,
    notes: 'Spirit Bomb looks amazing. Starting to learn the wrist mount.',
  },
  {
    userId: 'user-001',
    trickId: 'trick-020',
    status: 'practicing',
    watchedAt: new Date('2024-10-10'),
    watchTime: 550,
    notes: 'Kwijibo crosses are coming along.',
  },
];

// Additional sample users for leaderboard/community features
export const mockCommunityUsers: User[] = [
  {
    id: 'user-002',
    email: 'yoyopro@example.com',
    displayName: 'SlackQueen',
    avatar: 'https://example.com/avatars/user-002.jpg',
    level: 15,
    xp: 7500,
    currentStreak: 45,
    longestStreak: 120,
    completedTricks: [
      'trick-001', 'trick-002', 'trick-003', 'trick-004', 'trick-005',
      'trick-006', 'trick-007', 'trick-008', 'trick-009', 'trick-010',
      'trick-011', 'trick-012', 'trick-013', 'trick-014', 'trick-015',
      'trick-016', 'trick-018', 'trick-020', 'trick-021',
    ],
    activePaths: ['path-003', 'path-004'],
    badges: [
      'badge-001', 'badge-002', 'badge-003', 'badge-004', 'badge-005',
      'badge-006', 'badge-007', 'badge-008', 'badge-009', 'badge-010',
      'badge-011', 'badge-012', 'badge-013',
    ],
    createdAt: new Date('2023-01-10'),
  },
  {
    id: 'user-003',
    email: 'newbie@example.com',
    displayName: 'FreshThrower',
    avatar: null,
    level: 3,
    xp: 1200,
    currentStreak: 5,
    longestStreak: 7,
    completedTricks: [
      'trick-001', 'trick-002', 'trick-003', 'trick-004', 'trick-005', 'trick-006',
    ],
    activePaths: ['path-001'],
    badges: ['badge-001', 'badge-003'],
    createdAt: new Date('2024-10-01'),
  },
  {
    id: 'user-004',
    email: 'horizontal@example.com',
    displayName: 'SidewaysSteve',
    avatar: 'https://example.com/avatars/user-004.jpg',
    level: 12,
    xp: 5800,
    currentStreak: 22,
    longestStreak: 60,
    completedTricks: [
      'trick-001', 'trick-002', 'trick-003', 'trick-004', 'trick-005',
      'trick-006', 'trick-007', 'trick-009', 'trick-010', 'trick-011',
      'trick-014', 'trick-017', 'trick-018', 'trick-022',
    ],
    activePaths: ['path-005'],
    badges: [
      'badge-001', 'badge-002', 'badge-003', 'badge-005', 'badge-006',
      'badge-008', 'badge-010', 'badge-014',
    ],
    createdAt: new Date('2024-02-20'),
  },
  {
    id: 'user-005',
    email: '5a-master@example.com',
    displayName: 'CounterweightKing',
    avatar: 'https://example.com/avatars/user-005.jpg',
    level: 10,
    xp: 4900,
    currentStreak: 8,
    longestStreak: 35,
    completedTricks: [
      'trick-001', 'trick-002', 'trick-003', 'trick-004', 'trick-005',
      'trick-006', 'trick-009', 'trick-010', 'trick-013', 'trick-014',
      'trick-023', 'trick-024',
    ],
    activePaths: ['path-002'],
    badges: [
      'badge-001', 'badge-002', 'badge-003', 'badge-005', 'badge-008',
      'badge-009', 'badge-015',
    ],
    createdAt: new Date('2024-04-05'),
  },
];

export const getUserById = (id: string): User | undefined => {
  if (id === mockUser.id) return mockUser;
  return mockCommunityUsers.find(u => u.id === id);
};

export const getUserProgress = (userId: string, trickId: string): UserProgress | undefined => {
  return mockUserProgress.find(p => p.userId === userId && p.trickId === trickId);
};

export const getUserProgressForTricks = (userId: string): UserProgress[] => {
  return mockUserProgress.filter(p => p.userId === userId);
};

export const getLeaderboard = (limit: number = 10): User[] => {
  const allUsers = [mockUser, ...mockCommunityUsers];
  return allUsers.sort((a, b) => b.xp - a.xp).slice(0, limit);
};

export const getStreakLeaderboard = (limit: number = 10): User[] => {
  const allUsers = [mockUser, ...mockCommunityUsers];
  return allUsers.sort((a, b) => b.currentStreak - a.currentStreak).slice(0, limit);
};
