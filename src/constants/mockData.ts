import type { CarIdentification } from '@/types/api';

export const MOCK_IDENTIFICATIONS: CarIdentification[] = [
  {
    make: 'Porsche',
    model: '911 GT3',
    year: 2023,
    category: 'Supercar',
    rarity: 'Legendary',
    confidence: 0.92,
    baseXp: 200,
  },
  {
    make: 'Ferrari',
    model: '488 Pista',
    year: 2020,
    category: 'Exotic',
    rarity: 'Legendary',
    confidence: 0.88,
    baseXp: 250,
  },
  {
    make: 'Lamborghini',
    model: 'Huracan',
    year: 2022,
    category: 'Exotic',
    rarity: 'Legendary',
    confidence: 0.95,
    baseXp: 300,
  },
  {
    make: 'Nissan',
    model: 'GT-R',
    year: 2020,
    category: 'JDM',
    rarity: 'Rare',
    confidence: 0.87,
    baseXp: 90,
  },
  {
    make: 'Subaru',
    model: 'WRX STI',
    year: 2021,
    category: 'JDM',
    rarity: 'Rare',
    confidence: 0.91,
    baseXp: 80,
  },
  {
    make: 'Ford',
    model: 'Mustang GT',
    year: 2023,
    category: 'Muscle',
    rarity: 'Rare',
    confidence: 0.89,
    baseXp: 75,
  },
  {
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    category: 'Daily',
    rarity: 'Common',
    confidence: 0.96,
    baseXp: 25,
  },
  {
    make: 'Honda',
    model: 'Civic',
    year: 2023,
    category: 'Daily',
    rarity: 'Common',
    confidence: 0.94,
    baseXp: 25,
  },
];

export function getRandomMockIdentification(): CarIdentification {
  // Weighted towards common/rare for realism
  const weights = [3, 1, 1, 2, 2, 2, 5, 5];
  const total = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * total;
  for (let i = 0; i < weights.length; i++) {
    random -= weights[i];
    if (random <= 0) return MOCK_IDENTIFICATIONS[i];
  }
  return MOCK_IDENTIFICATIONS[MOCK_IDENTIFICATIONS.length - 1];
}
