import type { Rarity } from './database';

export interface CarIdentification {
  make: string;
  model: string;
  year: number | null;
  category: string;
  rarity: Rarity;
  confidence: number;
  baseXp: number;
  carId?: string; // Set after DB lookup
}

export interface VisionLabel {
  description: string;
  score: number;
  topicality: number;
}

export interface VisionWebEntity {
  entityId: string;
  score: number;
  description: string;
}

export interface VisionWebImage {
  url: string;
  score: number;
}

export interface VisionResponse {
  labelAnnotations?: VisionLabel[];
  webDetection?: {
    webEntities?: VisionWebEntity[];
    fullMatchingImages?: VisionWebImage[];
    partialMatchingImages?: VisionWebImage[];
  };
}
