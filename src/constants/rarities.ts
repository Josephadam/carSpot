import { Colors } from './colors';

export type Rarity = 'Common' | 'Rare' | 'Legendary';

export const RarityConfig: Record<Rarity, {
  color: string;
  glowColor: string;
  label: string;
  emoji: string;
  baseXPMultiplier: number;
}> = {
  Common: {
    color: Colors.common,
    glowColor: 'rgba(156, 163, 175, 0.3)',
    label: 'Common',
    emoji: '•',
    baseXPMultiplier: 1,
  },
  Rare: {
    color: Colors.rare,
    glowColor: 'rgba(59, 130, 246, 0.4)',
    label: 'Rare',
    emoji: '◆',
    baseXPMultiplier: 2,
  },
  Legendary: {
    color: Colors.legendary,
    glowColor: 'rgba(255, 215, 0, 0.5)',
    label: 'Legendary',
    emoji: '★',
    baseXPMultiplier: 4,
  },
};
