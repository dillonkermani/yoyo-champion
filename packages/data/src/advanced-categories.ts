// Advanced trick categories shown as "Coming Soon" on Home tab

export interface AdvancedCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export const advancedCategories: AdvancedCategory[] = [
  {
    id: 'adv-competition',
    name: 'Competition Combos',
    icon: '🏆',
    color: '#FF9600',
    description: 'Contest-winning combo sequences',
  },
  {
    id: 'adv-2a',
    name: '2A Looping',
    icon: '🔄',
    color: '#1CB0F6',
    description: 'Two-handed looping mastery',
  },
  {
    id: 'adv-3a',
    name: '3A Two-Hand String',
    icon: '✨',
    color: '#CE82FF',
    description: 'Two yo-yos, one player',
  },
  {
    id: 'adv-4a',
    name: '4A Offstring',
    icon: '🌀',
    color: '#00D9FF',
    description: 'The yo-yo leaves the string entirely',
  },
  {
    id: 'adv-grinds',
    name: 'Grinds & Regens',
    icon: '⚡',
    color: '#FFC800',
    description: 'Surface grinds and regeneration tricks',
  },
  {
    id: 'adv-rejection',
    name: 'Rejection Tricks',
    icon: '🎯',
    color: '#FF4B4B',
    description: 'String rejection and laceration combos',
  },
];
