import type { Rarity } from '@/types/database';

const CATEGORY_RARITY_MAP: Record<string, Rarity> = {
  Hypercar: 'Legendary',
  Exotic: 'Legendary',
  Supercar: 'Legendary',
  JDM: 'Rare',
  Muscle: 'Rare',
  Sport: 'Rare',
  Truck: 'Common',
  Daily: 'Common',
};

export function getRarityForCategory(category: string): Rarity {
  return CATEGORY_RARITY_MAP[category] ?? 'Common';
}

export function getXPForRarity(rarity: Rarity, baseXp: number): number {
  const multipliers: Record<Rarity, number> = {
    Common: 1,
    Rare: 2,
    Legendary: 4,
  };
  return Math.round(baseXp * multipliers[rarity]);
}
