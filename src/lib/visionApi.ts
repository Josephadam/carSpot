/**
 * Week 2: Google Cloud Vision API integration.
 * Currently stubbed — use mock data in Week 1.
 */
import type { CarIdentification } from '@/types/api';
import type { VisionResponse } from '@/types/api';
import { getRarityForCategory } from './rarityEngine';
import { supabase } from './supabase';

const VISION_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_VISION_API_KEY ?? '';
const VISION_API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${VISION_API_KEY}`;

export async function identifyCarFromBase64(
  base64Image: string,
): Promise<CarIdentification | null> {
  if (!VISION_API_KEY) {
    console.warn('Vision API key not set — use mock data');
    return null;
  }

  const body = {
    requests: [
      {
        image: { content: base64Image },
        features: [
          { type: 'LABEL_DETECTION', maxResults: 10 },
          { type: 'WEB_DETECTION', maxResults: 10 },
        ],
      },
    ],
  };

  const res = await fetch(VISION_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) return null;

  const json = await res.json();
  const response: VisionResponse = json.responses?.[0];
  if (!response) return null;

  const webEntities = response.webDetection?.webEntities ?? [];
  const carQuery = webEntities
    .filter((e) => e.score > 0.5)
    .map((e) => e.description)
    .join(' ');

  if (!carQuery) return null;

  // Fuzzy-match against cars table
  const { data: cars } = await supabase
    .from('cars')
    .select('*')
    .textSearch('make', carQuery, { type: 'websearch' })
    .limit(1);

  if (!cars || cars.length === 0) return null;
  const car = cars[0];

  return {
    make: car.make,
    model: car.model,
    year: car.year,
    category: car.category,
    rarity: car.rarity,
    confidence: webEntities[0]?.score ?? 0.7,
    baseXp: car.base_xp,
    carId: car.id,
  };
}
