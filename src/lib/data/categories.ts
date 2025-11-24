// YoYo Champion Platform - Trick Categories

import type { TrickGenre } from './types';

export interface TrickCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: 'Target' | 'Sparkles' | 'Zap' | 'Cpu' | 'Wind' | 'RotateCcw' | 'Rocket' | 'Hand';
  color: 'teal' | 'blue' | 'purple' | 'cyan' | 'pink' | 'yellow' | 'orange' | 'red';
  order: number;
  genres: TrickGenre[];
  completionBadge: string;
  bonusXP: number;
}

export const categories: TrickCategory[] = [
  {
    id: 'cat-foundations',
    name: 'Foundations',
    slug: 'foundations',
    description: 'Master the essential basics that every yo-yo player needs. These fundamental skills form the foundation for all advanced tricks.',
    icon: 'Target',
    color: 'teal',
    order: 1,
    genres: ['basics'],
    completionBadge: 'Foundation Master',
    bonusXP: 200,
  },
  {
    id: 'cat-string-tricks',
    name: 'String Tricks',
    slug: 'string-tricks',
    description: 'Learn to land the yo-yo on the string and create intricate patterns. String tricks are the heart of modern 1A yo-yoing.',
    icon: 'Sparkles',
    color: 'blue',
    order: 2,
    genres: ['string'],
    completionBadge: 'String Slinger',
    bonusXP: 300,
  },
  {
    id: 'cat-slack-tricks',
    name: 'Slack Tricks',
    slug: 'slack-tricks',
    description: 'Release the string to create loops and whips that defy gravity. Slack tricks add flair and style to your play.',
    icon: 'Wind',
    color: 'purple',
    order: 3,
    genres: ['slack'],
    completionBadge: 'Slack Master',
    bonusXP: 400,
  },
  {
    id: 'cat-tech-tricks',
    name: 'Tech Tricks',
    slug: 'tech-tricks',
    description: 'Precision and complexity combine in technical tricks. Challenge your accuracy and coordination with intricate maneuvers.',
    icon: 'Cpu',
    color: 'cyan',
    order: 4,
    genres: ['tech'],
    completionBadge: 'Tech Wizard',
    bonusXP: 450,
  },
  {
    id: 'cat-flow-tricks',
    name: 'Flow Tricks',
    slug: 'flow-tricks',
    description: 'Smooth, continuous movements that look effortless. Flow tricks emphasize rhythm and grace over speed.',
    icon: 'Wind',
    color: 'pink',
    order: 5,
    genres: ['flow'],
    completionBadge: 'Flow Artist',
    bonusXP: 350,
  },
  {
    id: 'cat-horizontal',
    name: 'Horizontal',
    slug: 'horizontal',
    description: 'Turn your plane sideways and discover a whole new dimension of yo-yoing. Horizontal play requires unique skills.',
    icon: 'RotateCcw',
    color: 'yellow',
    order: 6,
    genres: ['horizontal'],
    completionBadge: 'Horizontal Hero',
    bonusXP: 500,
  },
  {
    id: 'cat-speed-tricks',
    name: 'Speed & Hops',
    slug: 'speed-tricks',
    description: 'Fast-paced and energetic tricks that test your speed and timing. Perfect for competition-style play.',
    icon: 'Zap',
    color: 'orange',
    order: 7,
    genres: ['speed', 'hops'],
    completionBadge: 'Speed Demon',
    bonusXP: 400,
  },
  {
    id: 'cat-5a-tricks',
    name: '5A Freehand',
    slug: '5a-tricks',
    description: 'Cut the string! 5A adds a counterweight for dynamic tricks where both ends of the string are free.',
    icon: 'Hand',
    color: 'red',
    order: 8,
    genres: ['basics'], // 5A uses style filter, not genre
    completionBadge: '5A Pioneer',
    bonusXP: 500,
  },
];

// Helper functions
export const getCategoryById = (id: string): TrickCategory | undefined => {
  return categories.find(cat => cat.id === id);
};

export const getCategoryBySlug = (slug: string): TrickCategory | undefined => {
  return categories.find(cat => cat.slug === slug);
};

export const getAllCategories = (): TrickCategory[] => {
  return [...categories].sort((a, b) => a.order - b.order);
};

// Color mappings for styling
export const categoryColorConfig: Record<TrickCategory['color'], {
  bg: string;
  bgLight: string;
  text: string;
  border: string;
  shadow: string;
  gradient: string;
  ring: string;
}> = {
  teal: {
    bg: 'bg-xp',
    bgLight: 'bg-xp/10',
    text: 'text-xp-dark',
    border: 'border-xp',
    shadow: 'shadow-fun-yellow',
    gradient: 'from-xp to-xp-light',
    ring: 'ring-xp/30',
  },
  blue: {
    bg: 'bg-fun-blue',
    bgLight: 'bg-fun-blue/10',
    text: 'text-fun-blue',
    border: 'border-fun-blue',
    shadow: 'shadow-fun-blue',
    gradient: 'from-fun-blue to-fun-blue-light',
    ring: 'ring-fun-blue/30',
  },
  purple: {
    bg: 'bg-fun-purple',
    bgLight: 'bg-fun-purple/10',
    text: 'text-fun-purple',
    border: 'border-fun-purple',
    shadow: 'shadow-fun-purple',
    gradient: 'from-fun-purple to-fun-purple-light',
    ring: 'ring-fun-purple/30',
  },
  cyan: {
    bg: 'bg-fun-cyan',
    bgLight: 'bg-fun-cyan/10',
    text: 'text-fun-cyan',
    border: 'border-fun-cyan',
    shadow: 'shadow-fun-blue',
    gradient: 'from-fun-cyan to-fun-cyan-light',
    ring: 'ring-fun-cyan/30',
  },
  pink: {
    bg: 'bg-fun-pink',
    bgLight: 'bg-fun-pink/10',
    text: 'text-fun-pink',
    border: 'border-fun-pink',
    shadow: 'shadow-fun-pink',
    gradient: 'from-fun-pink to-fun-pink-light',
    ring: 'ring-fun-pink/30',
  },
  yellow: {
    bg: 'bg-fun-yellow',
    bgLight: 'bg-fun-yellow/10',
    text: 'text-fun-yellow-dark',
    border: 'border-fun-yellow',
    shadow: 'shadow-fun-yellow',
    gradient: 'from-fun-yellow to-fun-yellow-light',
    ring: 'ring-fun-yellow/30',
  },
  orange: {
    bg: 'bg-fun-orange',
    bgLight: 'bg-fun-orange/10',
    text: 'text-fun-orange',
    border: 'border-fun-orange',
    shadow: 'shadow-fun-orange',
    gradient: 'from-fun-orange to-fun-orange-light',
    ring: 'ring-fun-orange/30',
  },
  red: {
    bg: 'bg-fun-red',
    bgLight: 'bg-fun-red/10',
    text: 'text-fun-red',
    border: 'border-fun-red',
    shadow: 'shadow-fun-red',
    gradient: 'from-fun-red to-fun-red-light',
    ring: 'ring-fun-red/30',
  },
};

// Icon mapping (returns string for dynamic import)
export const categoryIconMap: Record<TrickCategory['icon'], string> = {
  Target: 'Target',
  Sparkles: 'Sparkles',
  Zap: 'Zap',
  Cpu: 'Cpu',
  Wind: 'Wind',
  RotateCcw: 'RotateCcw',
  Rocket: 'Rocket',
  Hand: 'Hand',
};
