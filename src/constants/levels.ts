export const LEVELS = [0, 100, 300, 700, 1500];

export const LEVEL_TITLES = [
  'Beginner',
  'Apprentice',
  'Strategist',
  'Master',
  'Grandmaster',
];

export function getLevel(xp: number): number {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i]) return i;
  }
  return 0;
}

export function getLevelTitle(level: number): string {
  return LEVEL_TITLES[level] || 'Unknown';
}

export function xpToNextLevel(xp: number): number {
  const level = getLevel(xp);
  const next = LEVELS[level + 1];
  return next ? next - xp : 0;
}
