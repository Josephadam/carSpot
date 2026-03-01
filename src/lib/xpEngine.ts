/**
 * level = floor(sqrt(xp / 100)) + 1
 * Matches the server-side award_xp function logic.
 */
export function xpToLevel(xp: number): number {
  return Math.max(1, Math.floor(Math.sqrt(xp / 100)) + 1);
}

export function xpForNextLevel(currentLevel: number): number {
  return Math.pow(currentLevel, 2) * 100;
}

export function xpForCurrentLevel(currentLevel: number): number {
  return Math.pow(currentLevel - 1, 2) * 100;
}

export function levelProgress(xp: number): number {
  const level = xpToLevel(xp);
  const currentLevelXp = xpForCurrentLevel(level);
  const nextLevelXp = xpForNextLevel(level);
  return (xp - currentLevelXp) / (nextLevelXp - currentLevelXp);
}
