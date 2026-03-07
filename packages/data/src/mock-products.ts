// YoYo Champion Platform - Product Data from GentryStein.com

export type ProductCategory = 'yoyo' | 'string' | 'accessory' | 'apparel' | 'bundle';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'all';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For sale items
  category: ProductCategory;
  skillLevel?: SkillLevel;
  imageUrl: string;
  shopUrl: string;
  isFeatured?: boolean;
  isSignature?: boolean; // Gentry's signature products
  isSale?: boolean;
  isSoldOut?: boolean;
  tags?: string[];
}

// Product data based on gentrystein.com inventory
export const mockProducts: Product[] = [
  // ============= BUNDLES / SETS =============
  {
    id: 'bundle-holiday-superset-2026',
    name: 'Holiday Yoyo Superset 2026',
    description: 'The ultimate yoyo collection for any skill level. Includes premium yo-yos, strings, and accessories.',
    price: 199.99,
    originalPrice: 300.00,
    category: 'bundle',
    skillLevel: 'all',
    imageUrl: '/images/products/holiday-superset.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/holiday-yoyo-superset-2026',
    isFeatured: true,
    isSale: true,
    tags: ['holiday', 'gift', 'value'],
  },
  {
    id: 'bundle-future-champion',
    name: 'Future Champion Yoyo Set',
    description: 'Everything you need to start your yoyo journey and become a champion. Perfect starter kit with quality gear.',
    price: 99.99,
    originalPrice: 135.00,
    category: 'bundle',
    skillLevel: 'beginner',
    imageUrl: '/images/products/future-champion-set.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/future-champion-yoyo-set',
    isFeatured: true,
    isSale: true,
    tags: ['starter', 'beginner', 'gift'],
  },
  {
    id: 'bundle-play-like-g',
    name: 'Play Like A G Set',
    description: 'Train with the same gear Gentry uses. Signature collection including his favorite yo-yos and accessories.',
    price: 214.99,
    originalPrice: 300.00,
    category: 'bundle',
    skillLevel: 'intermediate',
    imageUrl: '/images/products/play-like-g-set.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/play-like-a-g-set',
    isFeatured: true,
    isSignature: true,
    isSale: true,
    tags: ['signature', 'pro', 'value'],
  },

  // ============= BEGINNER YO-YOS =============
  {
    id: 'yoyo-master-pack',
    name: 'Yoyo Master Pack',
    description: 'Complete beginner package with a responsive yoyo, extra strings, and basic accessories to get you started.',
    price: 37.99,
    category: 'yoyo',
    skillLevel: 'beginner',
    imageUrl: '/images/products/master-pack.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/yoyo-master-pack',
    isFeatured: true,
    tags: ['starter', 'responsive', 'beginner'],
  },
  {
    id: 'yoyo-arrow',
    name: 'Arrow Yoyo',
    description: 'The perfect first yoyo. Responsive design makes learning basic tricks easy. Converts to unresponsive for progression.',
    price: 14.99,
    category: 'yoyo',
    skillLevel: 'beginner',
    imageUrl: '/images/products/arrow.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/arrow-yoyo',
    tags: ['responsive', 'starter', 'convertible'],
  },
  {
    id: 'yoyo-replay-pro',
    name: 'Replay Pro Yoyo',
    description: 'Affordable unresponsive yoyo perfect for learning string tricks. Competition-worthy performance at a budget price.',
    price: 15.99,
    category: 'yoyo',
    skillLevel: 'beginner',
    imageUrl: '/images/products/replay-pro.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/replay-pro-yoyo',
    tags: ['unresponsive', 'budget', 'competition'],
  },
  {
    id: 'yoyo-starter-pack',
    name: 'Yoyo Starter Pack',
    description: 'Basic starter kit with everything a beginner needs. Great entry point into the world of yoyoing.',
    price: 9.99,
    category: 'yoyo',
    skillLevel: 'beginner',
    imageUrl: '/images/products/starter-pack.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/yoyo-starter-pack',
    isSoldOut: true,
    tags: ['starter', 'budget'],
  },

  // ============= INTERMEDIATE YO-YOS =============
  {
    id: 'yoyo-shutter',
    name: 'Shutter Yoyo',
    description: 'World Champion yo-yo. The Shutter has won more competitions than any other yoyo. Stable, fast, and versatile.',
    price: 44.99,
    category: 'yoyo',
    skillLevel: 'intermediate',
    imageUrl: '/images/products/shutter.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/shutter-yoyo',
    isFeatured: true,
    isSignature: true,
    tags: ['competition', 'signature', 'world-champion'],
  },
  {
    id: 'yoyo-shutter-replay-combo',
    name: 'Shutter + FREE Replay Pro',
    description: 'Get the world champion Shutter and a free Replay Pro to practice on. Best value for intermediate players.',
    price: 44.99,
    originalPrice: 68.00,
    category: 'yoyo',
    skillLevel: 'intermediate',
    imageUrl: '/images/products/shutter-combo.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/shutter-free-replay-pro',
    isSale: true,
    isSignature: true,
    tags: ['combo', 'value', 'competition'],
  },
  {
    id: 'yoyo-g-speed',
    name: 'G Speed Yoyo',
    description: 'Designed for speed combos and competition play. Lightweight and nimble for fast-paced tricks.',
    price: 44.99,
    category: 'yoyo',
    skillLevel: 'intermediate',
    imageUrl: '/images/products/g-speed.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/g-speed-yoyo',
    isSignature: true,
    tags: ['speed', 'competition', 'signature'],
  },
  {
    id: 'yoyo-dna',
    name: 'DNA Yoyo',
    description: 'Versatile all-around performer. Great for learning new tricks with exceptional spin time and stability.',
    price: 39.99,
    category: 'yoyo',
    skillLevel: 'intermediate',
    imageUrl: '/images/products/dna.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/dna-yoyo',
    tags: ['versatile', 'stable', 'all-around'],
  },
  {
    id: 'yoyo-dna-king',
    name: 'DNA King Yoyo + FREE DNA String',
    description: 'Premium version of the DNA with enhanced performance. Includes a free pack of DNA strings.',
    price: 53.99,
    category: 'yoyo',
    skillLevel: 'intermediate',
    imageUrl: '/images/products/dna-king.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/dna-king-yoyo-free-dna-string',
    isFeatured: true,
    tags: ['premium', 'combo', 'value'],
  },

  // ============= ADVANCED/PRO YO-YOS =============
  {
    id: 'yoyo-super-g',
    name: 'Super G Yoyo',
    description: 'Gentry\'s signature competition yoyo. Exceptional stability and spin time for advanced tricks.',
    price: 65.00,
    category: 'yoyo',
    skillLevel: 'advanced',
    imageUrl: '/images/products/super-g.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/super-g-yoyo',
    isFeatured: true,
    isSignature: true,
    tags: ['signature', 'competition', 'pro'],
  },
  {
    id: 'yoyo-g-force',
    name: 'G Force Yoyo',
    description: 'Professional competition yoyo with maximum stability and power. Built for championship-level performance.',
    price: 110.00,
    category: 'yoyo',
    skillLevel: 'advanced',
    imageUrl: '/images/products/g-force.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/g-force-yoyo',
    isFeatured: true,
    isSignature: true,
    tags: ['pro', 'competition', 'signature'],
  },
  {
    id: 'yoyo-shutter-elite',
    name: 'Shutter Elite Bimetal Yoyo',
    description: 'Premium bimetal version of the legendary Shutter. Stainless steel weight rings for maximum rim weight and spin.',
    price: 99.00,
    category: 'yoyo',
    skillLevel: 'advanced',
    imageUrl: '/images/products/shutter-elite.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/shutter-elite-bimetal-yoyo',
    isSignature: true,
    tags: ['bimetal', 'premium', 'competition'],
  },
  {
    id: 'yoyo-shutter-mini',
    name: 'Shutter Mini Yoyo',
    description: 'Compact version of the Shutter. Perfect for tight spaces and unique trick angles.',
    price: 59.99,
    category: 'yoyo',
    skillLevel: 'advanced',
    imageUrl: '/images/products/shutter-mini.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/shutter-mini-yoyo',
    isSignature: true,
    tags: ['mini', 'compact', 'unique'],
  },
  {
    id: 'yoyo-nine-dragons',
    name: 'Nine Dragons Yoyo',
    description: 'Revolutionary hubstack design allows for unique fingerspin and pull-start tricks. A true innovation.',
    price: 74.99,
    category: 'yoyo',
    skillLevel: 'advanced',
    imageUrl: '/images/products/nine-dragons.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/nine-dragons-yoyo',
    tags: ['hubstack', 'fingerspin', 'innovative'],
  },
  {
    id: 'yoyo-99-dragons',
    name: '99 Dragons Yoyo + FREE DNA String',
    description: 'Enhanced version with improved hubstack performance. Includes free DNA strings.',
    price: 99.99,
    category: 'yoyo',
    skillLevel: 'advanced',
    imageUrl: '/images/products/99-dragons.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/99-dragons-yoyo-free-dna-string',
    tags: ['hubstack', 'premium', 'combo'],
  },
  {
    id: 'yoyo-titanium-shutter-elite',
    name: 'Titanium Shutter Elite Yoyo',
    description: 'The ultimate Shutter. Full titanium construction for unmatched durability and performance. Collector\'s piece.',
    price: 400.00,
    category: 'yoyo',
    skillLevel: 'advanced',
    imageUrl: '/images/products/titanium-shutter.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/titanium-shutter-elite-yoyo',
    isSignature: true,
    tags: ['titanium', 'premium', 'collector'],
  },

  // ============= STRINGS =============
  {
    id: 'string-dna',
    name: 'DNA Yoyo String',
    description: 'Premium polyester string designed for optimal play. Holds tension well and provides excellent whip performance.',
    price: 8.99,
    category: 'string',
    skillLevel: 'all',
    imageUrl: '/images/products/dna-string.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/dna-yoyo-string',
    isFeatured: true,
    tags: ['premium', 'polyester', 'performance'],
  },
  {
    id: 'string-basic',
    name: 'Yoyo String',
    description: 'Quality replacement strings. Essential for keeping your yoyo performing at its best.',
    price: 4.99,
    category: 'string',
    skillLevel: 'all',
    imageUrl: '/images/products/basic-string.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/yoyo-string',
    tags: ['basic', 'replacement', 'value'],
  },

  // ============= ACCESSORIES =============
  {
    id: 'accessory-response-pads',
    name: 'Response Pads (2 Pack)',
    description: 'Replacement response pads. Keep your yoyo playing like new with fresh response.',
    price: 2.99,
    category: 'accessory',
    skillLevel: 'all',
    imageUrl: '/images/products/response-pads.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/response-pads-2-pack',
    tags: ['replacement', 'maintenance'],
  },
  {
    id: 'accessory-center-track-bearing',
    name: 'Center Track Yoyo Bearing',
    description: 'Premium bearing that keeps string centered. Improves performance and reduces string friction.',
    price: 9.99,
    category: 'accessory',
    skillLevel: 'all',
    imageUrl: '/images/products/center-track.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/center-track-yoyo-bearing',
    tags: ['bearing', 'upgrade', 'performance'],
  },
  {
    id: 'accessory-bearing-lube',
    name: 'Long Spin Bearing Lube',
    description: 'Specialized bearing lubricant for maximum spin time. A few drops keeps your bearing running smooth.',
    price: 7.99,
    category: 'accessory',
    skillLevel: 'all',
    imageUrl: '/images/products/bearing-lube.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/long-spin-bearing-lube',
    tags: ['maintenance', 'lube', 'spin'],
  },
  {
    id: 'accessory-multitool',
    name: 'Yoyofactory Multitool',
    description: 'Essential tool for yoyo maintenance. Remove bearings, adjust strings, and more.',
    price: 4.99,
    category: 'accessory',
    skillLevel: 'all',
    imageUrl: '/images/products/multitool.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/yoyofactory-multitool',
    tags: ['tool', 'maintenance', 'essential'],
  },
  {
    id: 'accessory-axle',
    name: 'Yoyo Axle',
    description: 'Replacement axle for most yoyos. Keep a spare in case of emergencies.',
    price: 1.99,
    category: 'accessory',
    skillLevel: 'all',
    imageUrl: '/images/products/axle.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/yoyo-axle',
    tags: ['replacement', 'spare'],
  },

  // ============= APPAREL =============
  {
    id: 'apparel-jersey',
    name: 'Hoop Dream Basketball Jersey',
    description: 'Stylish basketball jersey from the Gentry Stein collection. Show your yoyo pride!',
    price: 100.00,
    category: 'apparel',
    imageUrl: '/images/products/jersey.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/hoop-dream-basketball-jersey',
    tags: ['jersey', 'fashion', 'collector'],
  },

  // ============= GIFT CARDS =============
  {
    id: 'gift-card',
    name: 'Gift Card',
    description: 'Give the gift of yoyo! Let them choose their perfect gear from $25 to $500.',
    price: 25.00,
    category: 'accessory',
    skillLevel: 'all',
    imageUrl: '/images/products/gift-card.jpg',
    shopUrl: 'https://gentrystein.com/collections/shop-all/products/gift-card',
    tags: ['gift', 'flexible'],
  },
];

// Helper functions for product filtering and recommendations

/**
 * Get all products
 */
export const getAllProducts = (): Product[] => mockProducts;

/**
 * Get product by ID
 */
export const getProductById = (id: string): Product | undefined =>
  mockProducts.find((p) => p.id === id);

/**
 * Get products by category
 */
export const getProductsByCategory = (category: ProductCategory): Product[] =>
  mockProducts.filter((p) => p.category === category);

/**
 * Get products by skill level
 */
export const getProductsBySkillLevel = (skillLevel: SkillLevel): Product[] =>
  mockProducts.filter((p) => p.skillLevel === skillLevel || p.skillLevel === 'all');

/**
 * Get featured products
 */
export const getFeaturedProducts = (): Product[] =>
  mockProducts.filter((p) => p.isFeatured && !p.isSoldOut);

/**
 * Get signature products (Gentry's line)
 */
export const getSignatureProducts = (): Product[] =>
  mockProducts.filter((p) => p.isSignature && !p.isSoldOut);

/**
 * Get products on sale
 */
export const getSaleProducts = (): Product[] =>
  mockProducts.filter((p) => p.isSale && !p.isSoldOut);

/**
 * Get yo-yos only
 */
export const getYoyos = (): Product[] =>
  mockProducts.filter((p) => p.category === 'yoyo' && !p.isSoldOut);

/**
 * Get beginner starter products
 */
export const getBeginnerProducts = (): Product[] =>
  mockProducts.filter(
    (p) =>
      (p.skillLevel === 'beginner' || p.tags?.includes('starter')) &&
      !p.isSoldOut
  );

/**
 * Get recommended products based on user skill level
 */
export const getRecommendedProducts = (
  userSkillLevel: 'never' | 'beginner' | 'intermediate' | 'advanced' | 'expert'
): Product[] => {
  let products: Product[] = [];

  switch (userSkillLevel) {
    case 'never':
    case 'beginner':
      // Recommend starter kits and beginner yo-yos
      products = mockProducts.filter(
        (p) =>
          (p.skillLevel === 'beginner' ||
           p.tags?.includes('starter') ||
           p.id === 'bundle-future-champion' ||
           p.id === 'yoyo-master-pack') &&
          !p.isSoldOut
      );
      break;

    case 'intermediate':
      // Recommend intermediate yo-yos and upgrades
      products = mockProducts.filter(
        (p) =>
          (p.skillLevel === 'intermediate' ||
           p.id === 'yoyo-shutter' ||
           p.id === 'bundle-play-like-g') &&
          !p.isSoldOut
      );
      break;

    case 'advanced':
    case 'expert':
      // Recommend pro-level gear
      products = mockProducts.filter(
        (p) =>
          (p.skillLevel === 'advanced' ||
           p.isSignature ||
           p.tags?.includes('competition')) &&
          !p.isSoldOut
      );
      break;

    default:
      products = getFeaturedProducts();
  }

  return products.slice(0, 4); // Return max 4 recommendations
};

/**
 * Get recommended yo-yo for a specific trick difficulty
 */
export const getRecommendedYoyoForTrick = (
  difficulty: 1 | 2 | 3 | 4 | 5
): Product | undefined => {
  const difficultyToSkillMap: Record<number, SkillLevel> = {
    1: 'beginner',
    2: 'beginner',
    3: 'intermediate',
    4: 'advanced',
    5: 'advanced',
  };

  const skillLevel = difficultyToSkillMap[difficulty];
  const yoyos = mockProducts.filter(
    (p) =>
      p.category === 'yoyo' &&
      p.skillLevel === skillLevel &&
      !p.isSoldOut
  );

  // Prefer signature products
  const signature = yoyos.find((p) => p.isSignature);
  return signature || yoyos[0];
};

/**
 * Get essential accessories
 */
export const getEssentialAccessories = (): Product[] =>
  mockProducts.filter(
    (p) =>
      p.category === 'accessory' &&
      (p.tags?.includes('essential') || p.tags?.includes('maintenance')) &&
      !p.isSoldOut
  );

/**
 * Calculate savings on a product
 */
export const calculateSavings = (product: Product): number | null => {
  if (product.originalPrice && product.originalPrice > product.price) {
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  }
  return null;
};

/**
 * Format price for display
 */
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};
