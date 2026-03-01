export type Rarity = 'Common' | 'Rare' | 'Legendary';
export type ChallengeType = 'spot_count' | 'spot_rarity' | 'spot_category' | 'streak';

export interface DbUser {
  id: string;
  username: string;
  avatar_url: string | null;
  xp: number;
  level: number;
  streak: number;
  last_spotted_at: string | null;
  created_at: string;
}

export interface DbCar {
  id: string;
  make: string;
  model: string;
  year: number | null;
  category: string;
  rarity: Rarity;
  image_url: string | null;
  base_xp: number;
  created_at: string;
}

export interface DbSighting {
  id: string;
  user_id: string;
  car_id: string;
  photo_url: string | null;
  lat: number | null;
  lng: number | null;
  confidence: number | null;
  created_at: string;
  car?: DbCar;
  user?: DbUser;
}

export interface DbGarageEntry {
  id: string;
  user_id: string;
  car_id: string;
  first_spotted_at: string;
  spot_count: number;
  car?: DbCar;
}

export interface DbChallenge {
  id: string;
  title: string;
  description: string | null;
  xp_reward: number;
  target_count: number;
  challenge_type: ChallengeType;
  target_value: string | null;
  expires_at: string;
  created_at: string;
}

export interface DbUserChallenge {
  id: string;
  user_id: string;
  challenge_id: string;
  progress: number;
  completed_at: string | null;
  created_at: string;
  challenge?: DbChallenge;
}
