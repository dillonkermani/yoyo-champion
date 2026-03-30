export const DIFFICULTY_LABELS: Record<number, string> = {
  1: 'Beginner',
  2: 'Easy',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Master',
};

export const DIFFICULTY_COLORS: Record<number, string> = {
  1: '#1CB0F6',
  2: '#58CC02',
  3: '#FF9600',
  4: '#CE82FF',
  5: '#FF4B4B',
};

export function getDifficultyLabel(difficulty: number): string {
  return DIFFICULTY_LABELS[difficulty] ?? 'Unknown';
}

export function getDifficultyColor(difficulty: number): string {
  return DIFFICULTY_COLORS[difficulty] ?? '#999';
}

export function formatXP(xp: number): string {
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}k`;
  return String(xp);
}
