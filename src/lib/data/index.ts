// YoYo Champion Platform - Data Layer Exports

// Types
export * from './types';

// Mock Data
export {
  mockTricks,
  getTrickById,
  getTrickBySlug,
  getTricksByDifficulty,
  getTricksByStyle,
  getTricksByGenre,
  getPrerequisiteChain
} from './mock-tricks';

export {
  mockPaths,
  getPathById,
  getPathBySlug,
  getFeaturedPaths,
  getPathsByDifficulty,
  calculatePathProgress,
  getNextUnlockedModule
} from './mock-paths';

export {
  mockUser,
  mockUserProgress,
  mockCommunityUsers,
  getUserById,
  getUserProgress,
  getUserProgressForTricks,
  getLeaderboard,
  getStreakLeaderboard
} from './mock-user';

export {
  mockBadges,
  getBadgeById,
  getBadgesByRarity,
  getBadgesForUser,
  getNextUnlockableBadges,
  getRarityColor,
  getRarityLabel,
  badgeUnlockConditions
} from './mock-badges';

// Products Data
export {
  mockProducts,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsBySkillLevel,
  getFeaturedProducts,
  getSignatureProducts,
  getSaleProducts,
  getYoyos,
  getBeginnerProducts,
  getRecommendedProducts,
  getRecommendedYoyoForTrick,
  getEssentialAccessories,
  calculateSavings,
  formatPrice,
} from './mock-products';

export type {
  Product,
  ProductCategory,
  SkillLevel,
} from './mock-products';
