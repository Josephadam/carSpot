import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthContext } from '@/context/AuthContext';
import type { DbGarageEntry } from '@/types/database';

export function useGarage() {
  const { session } = useAuthContext();
  const [entries, setEntries] = useState<DbGarageEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGarage = useCallback(async () => {
    if (!session?.user) return;
    setIsLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('garage')
        .select('*, car:cars(*)')
        .eq('user_id', session.user.id)
        .order('first_spotted_at', { ascending: false });

      if (fetchError) throw fetchError;
      setEntries((data as DbGarageEntry[]) ?? []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchGarage();
  }, [fetchGarage]);

  return { entries, isLoading, error, refetch: fetchGarage };
}
