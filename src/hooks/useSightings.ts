import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useRealtimeSubscription } from './useRealtimeSubscription';
import type { DbSighting } from '@/types/database';

interface BoundingBox {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

export function useSightings(bounds?: BoundingBox) {
  const [sightings, setSightings] = useState<DbSighting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSightings = useCallback(async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('sightings')
        .select('*, car:cars(*), user:users(username, avatar_url)')
        .order('created_at', { ascending: false })
        .limit(200);

      if (bounds) {
        query = query
          .gte('lat', bounds.minLat)
          .lte('lat', bounds.maxLat)
          .gte('lng', bounds.minLng)
          .lte('lng', bounds.maxLng);
      }

      const { data } = await query;
      setSightings((data as DbSighting[]) ?? []);
    } finally {
      setIsLoading(false);
    }
  }, [bounds?.minLat, bounds?.maxLat, bounds?.minLng, bounds?.maxLng]);

  useEffect(() => {
    fetchSightings();
  }, [fetchSightings]);

  useRealtimeSubscription({
    table: 'sightings',
    onInsert: (newSighting) => {
      setSightings((prev) => [newSighting, ...prev]);
    },
  });

  return { sightings, isLoading, refetch: fetchSightings };
}
