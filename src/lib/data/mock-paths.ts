import type { LearningPath } from './types';

export const mockPaths: LearningPath[] = [
  {
    id: 'path-001',
    slug: 'beginner-to-intermediate',
    title: 'Complete Beginner to Intermediate',
    description: 'Start your yo-yo journey from zero and build a solid foundation. By the end of this path, you will be landing string tricks and impressing your friends. Perfect for brand new throwers.',
    thumbnailUrl: 'https://example.com/thumbnails/paths/beginner-intermediate.jpg',
    difficulty: 2,
    estimatedDays: 30,
    totalXp: 2100,
    isFeatured: true,
    instructor: {
      name: 'Brandon Vu',
      avatar: 'https://example.com/avatars/brandon-vu.jpg',
      title: 'YoYo Champion 2019',
    },
    modules: [
      {
        id: 'mod-001-1',
        title: 'Getting Started',
        description: 'Learn the absolute basics - how to hold, throw, and catch your yo-yo. Master the sleeper, the foundation of everything.',
        tricks: ['trick-001', 'trick-002'],
        unlockRequirements: undefined,
      },
      {
        id: 'mod-001-2',
        title: 'Basic Throws',
        description: 'Expand your throw repertoire with forward passes and the breakaway - essential for side-style tricks.',
        tricks: ['trick-003', 'trick-004'],
        unlockRequirements: {
          previousModuleId: 'mod-001-1',
        },
      },
      {
        id: 'mod-001-3',
        title: 'Your First String Trick',
        description: 'Land the trapeze! This is where modern yo-yoing really begins. Plus learn the bind to return unresponsive yo-yos.',
        tricks: ['trick-006', 'trick-005'],
        unlockRequirements: {
          previousModuleId: 'mod-001-2',
        },
      },
      {
        id: 'mod-001-4',
        title: 'Classic Picture Tricks',
        description: 'Learn crowd-pleasing tricks like Rock the Baby and Brain Twister that never go out of style.',
        tricks: ['trick-008', 'trick-007'],
        unlockRequirements: {
          previousModuleId: 'mod-001-3',
        },
      },
      {
        id: 'mod-001-5',
        title: 'Advancing Your String Work',
        description: 'Take your string tricks to the next level with Double or Nothing and Trapeze and His Brother.',
        tricks: ['trick-009', 'trick-013'],
        unlockRequirements: {
          previousModuleId: 'mod-001-4',
          xpRequired: 800,
        },
      },
      {
        id: 'mod-001-6',
        title: 'Intermediate Foundations',
        description: 'Congratulations! Complete your journey with these flowing intermediate tricks.',
        tricks: ['trick-010', 'trick-014'],
        unlockRequirements: {
          previousModuleId: 'mod-001-5',
          xpRequired: 1200,
        },
      },
    ],
  },
  {
    id: 'path-002',
    slug: 'master-fundamentals',
    title: 'Master the Fundamentals',
    description: 'Already know the basics? This intensive 2-week program ensures your fundamentals are rock-solid. Focus on form, consistency, and building muscle memory for perfect execution.',
    thumbnailUrl: 'https://example.com/thumbnails/paths/fundamentals.jpg',
    difficulty: 2,
    estimatedDays: 14,
    totalXp: 1450,
    isFeatured: false,
    instructor: {
      name: 'Sarah Kim',
      avatar: 'https://example.com/avatars/sarah-kim.jpg',
      title: 'Trick Tutorial Specialist',
    },
    modules: [
      {
        id: 'mod-002-1',
        title: 'Perfect Your Throw',
        description: 'Refine your sleeper and breakaway. A strong, straight throw is the secret weapon of every champion.',
        tricks: ['trick-001', 'trick-004'],
        unlockRequirements: undefined,
      },
      {
        id: 'mod-002-2',
        title: 'Bind Mastery',
        description: 'Learn multiple bind variations and make them second nature. Never fumble a return again.',
        tricks: ['trick-005'],
        unlockRequirements: {
          previousModuleId: 'mod-002-1',
        },
      },
      {
        id: 'mod-002-3',
        title: 'Mount Consistency',
        description: 'Hit trapeze and double or nothing every single time. Consistency is key to progressing.',
        tricks: ['trick-006', 'trick-009'],
        unlockRequirements: {
          previousModuleId: 'mod-002-2',
        },
      },
      {
        id: 'mod-002-4',
        title: 'Flow and Transitions',
        description: 'Connect your tricks smoothly. Learn Split the Atom and practice transitioning between mounts.',
        tricks: ['trick-010', 'trick-013'],
        unlockRequirements: {
          previousModuleId: 'mod-002-3',
        },
      },
    ],
  },
  {
    id: 'path-003',
    slug: 'slack-tricks-mastery',
    title: 'Slack Tricks Mastery',
    description: 'Dive deep into the art of slack yo-yoing. Learn to control loose string with precision and land some of the most visually impressive tricks in the game.',
    thumbnailUrl: 'https://example.com/thumbnails/paths/slack-mastery.jpg',
    difficulty: 4,
    estimatedDays: 21,
    totalXp: 2200,
    isFeatured: true,
    instructor: {
      name: 'Marcus Chen',
      avatar: 'https://example.com/avatars/marcus-chen.jpg',
      title: 'Slack Style Pioneer',
    },
    modules: [
      {
        id: 'mod-003-1',
        title: 'Slack Foundations',
        description: 'Understanding slack - how it moves, how to control it, and the physics behind it.',
        tricks: ['trick-006', 'trick-013'],
        unlockRequirements: {
          tricksRequired: ['trick-005', 'trick-006'],
        },
      },
      {
        id: 'mod-003-2',
        title: 'Your First Slack Trick',
        description: 'Learn basic slack whips and laceration catches. Feel the string fly!',
        tricks: ['trick-012'],
        unlockRequirements: {
          previousModuleId: 'mod-003-1',
        },
      },
      {
        id: 'mod-003-3',
        title: 'The Iconic Spirit Bomb',
        description: 'Master the legendary Spirit Bomb. This trick alone is worth the journey.',
        tricks: ['trick-015'],
        unlockRequirements: {
          previousModuleId: 'mod-003-2',
          xpRequired: 500,
        },
      },
      {
        id: 'mod-003-4',
        title: 'Yuuki Spencer Style',
        description: 'Learn the signature Yuuki Slack and understand what makes competition-level slack so impressive.',
        tricks: ['trick-021'],
        unlockRequirements: {
          previousModuleId: 'mod-003-3',
          xpRequired: 1000,
        },
      },
      {
        id: 'mod-003-5',
        title: 'Advanced Slack Elements',
        description: 'Push your limits with Rancid Milk - one of the hardest slack tricks ever created.',
        tricks: ['trick-019'],
        unlockRequirements: {
          previousModuleId: 'mod-003-4',
          xpRequired: 1500,
        },
      },
    ],
  },
  {
    id: 'path-004',
    slug: 'competition-prep-gentry',
    title: 'Competition Prep with Gentry',
    description: 'Train like a World Champion. This comprehensive 45-day program covers everything you need to compete - trick difficulty, presentation, consistency under pressure, and routine building.',
    thumbnailUrl: 'https://example.com/thumbnails/paths/competition-prep.jpg',
    difficulty: 5,
    estimatedDays: 45,
    totalXp: 4500,
    isFeatured: true,
    instructor: {
      name: 'Gentry Stein',
      avatar: 'https://example.com/avatars/gentry-stein.jpg',
      title: 'World YoYo Champion',
    },
    modules: [
      {
        id: 'mod-004-1',
        title: 'Assessment & Foundation',
        description: 'Evaluate your current level and shore up any fundamental weaknesses. Champions have no gaps.',
        tricks: ['trick-001', 'trick-004', 'trick-006', 'trick-009'],
        unlockRequirements: {
          tricksRequired: ['trick-005', 'trick-006', 'trick-009'],
        },
      },
      {
        id: 'mod-004-2',
        title: 'Speed & Consistency',
        description: 'Build speed without sacrificing accuracy. Mach 5 and Boingy Boing at competition pace.',
        tricks: ['trick-011', 'trick-022'],
        unlockRequirements: {
          previousModuleId: 'mod-004-1',
        },
      },
      {
        id: 'mod-004-3',
        title: 'Technical Difficulty',
        description: 'Add high-scoring technical elements. Kamikaze and Cold Fusion are judge favorites.',
        tricks: ['trick-016', 'trick-012'],
        unlockRequirements: {
          previousModuleId: 'mod-004-2',
          xpRequired: 1000,
        },
      },
      {
        id: 'mod-004-4',
        title: 'Crowd Pleasers',
        description: 'Learn tricks that wow both judges and audience. Eli Hops and Kwijibo bring the energy.',
        tricks: ['trick-014', 'trick-020'],
        unlockRequirements: {
          previousModuleId: 'mod-004-3',
        },
      },
      {
        id: 'mod-004-5',
        title: 'Slack & Style Points',
        description: 'Add slack elements for style points. Spirit Bomb is a competition staple.',
        tricks: ['trick-015', 'trick-021'],
        unlockRequirements: {
          previousModuleId: 'mod-004-4',
          xpRequired: 2000,
        },
      },
      {
        id: 'mod-004-6',
        title: 'Advanced Techniques',
        description: 'The final level - master Rancid Milk and prepare your competition routine.',
        tricks: ['trick-019', 'trick-018'],
        unlockRequirements: {
          previousModuleId: 'mod-004-5',
          xpRequired: 3000,
        },
      },
    ],
  },
  {
    id: 'path-005',
    slug: 'horizontal-essentials',
    title: 'Horizontal YoYo Essentials',
    description: 'Turn your yo-yo sideways and enter a whole new world. Horizontal play looks incredible and is a major part of modern competition freestyle. Learn to fight precession and control a spinning disc.',
    thumbnailUrl: 'https://example.com/thumbnails/paths/horizontal.jpg',
    difficulty: 4,
    estimatedDays: 21,
    totalXp: 1800,
    isFeatured: false,
    instructor: {
      name: 'Tyler Severance',
      avatar: 'https://example.com/avatars/tyler-severance.jpg',
      title: 'Horizontal Style Master',
    },
    modules: [
      {
        id: 'mod-005-1',
        title: 'Understanding Horizontal',
        description: 'Learn why horizontal is different - precession, plane maintenance, and the physics of sideways spinning.',
        tricks: ['trick-004', 'trick-006'],
        unlockRequirements: {
          tricksRequired: ['trick-006', 'trick-014'],
        },
      },
      {
        id: 'mod-005-2',
        title: 'Your First Horizontal Throw',
        description: 'Master the horizontal breakaway and landing your first horizontal trapeze.',
        tricks: ['trick-017'],
        unlockRequirements: {
          previousModuleId: 'mod-005-1',
        },
      },
      {
        id: 'mod-005-3',
        title: 'Black Hops',
        description: 'The signature horizontal trick. Learn to hop while fighting gravity and precession.',
        tricks: ['trick-017'],
        unlockRequirements: {
          previousModuleId: 'mod-005-2',
          xpRequired: 400,
        },
      },
      {
        id: 'mod-005-4',
        title: 'Horizontal Combos',
        description: 'String together horizontal elements into flowing combinations. Apply your vertical skills horizontally.',
        tricks: ['trick-018', 'trick-014'],
        unlockRequirements: {
          previousModuleId: 'mod-005-3',
          xpRequired: 800,
        },
      },
    ],
  },
];

export const getPathById = (id: string): LearningPath | undefined => {
  return mockPaths.find(path => path.id === id);
};

export const getPathBySlug = (slug: string): LearningPath | undefined => {
  return mockPaths.find(path => path.slug === slug);
};

export const getFeaturedPaths = (): LearningPath[] => {
  return mockPaths.filter(path => path.isFeatured);
};

export const getPathsByDifficulty = (difficulty: number): LearningPath[] => {
  return mockPaths.filter(path => path.difficulty === difficulty);
};

export const calculatePathProgress = (
  pathId: string,
  completedTricks: string[]
): { completed: number; total: number; percentage: number } => {
  const path = getPathById(pathId);
  if (!path) return { completed: 0, total: 0, percentage: 0 };

  const allTricks = path.modules.flatMap(m => m.tricks);
  const uniqueTricks = Array.from(new Set(allTricks));
  const completedInPath = uniqueTricks.filter(t => completedTricks.includes(t));

  return {
    completed: completedInPath.length,
    total: uniqueTricks.length,
    percentage: Math.round((completedInPath.length / uniqueTricks.length) * 100),
  };
};

export const getNextUnlockedModule = (
  pathId: string,
  completedTricks: string[],
  userXp: number
): string | null => {
  const path = getPathById(pathId);
  if (!path) return null;

  for (const pathModule of path.modules) {
    const moduleTricksCompleted = pathModule.tricks.every(t => completedTricks.includes(t));
    if (moduleTricksCompleted) continue;

    // Check unlock requirements
    const reqs = pathModule.unlockRequirements;
    if (!reqs) return pathModule.id;

    const prevModuleComplete = !reqs.previousModuleId ||
      path.modules
        .find(m => m.id === reqs.previousModuleId)
        ?.tricks.every(t => completedTricks.includes(t));

    const hasRequiredTricks = !reqs.tricksRequired ||
      reqs.tricksRequired.every(t => completedTricks.includes(t));

    const hasRequiredXp = !reqs.xpRequired || userXp >= reqs.xpRequired;

    if (prevModuleComplete && hasRequiredTricks && hasRequiredXp) {
      return pathModule.id;
    }
  }

  return null;
};
