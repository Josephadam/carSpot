import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthContext } from '@/context/AuthContext';
import type { DbUser } from '@/types/database';

export function useProfile(userId?: string) {
  const { session } = useAuthContext();
  const targetId = userId ?? session?.user?.id;
  const [profile, setProfile] = useState<DbUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!targetId) return;
    setIsLoading(true);
    try {
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', targetId)
        .single();
      setProfile(data);
    } finally {
      setIsLoading(false);
    }
  }, [targetId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, isLoading, refetch: fetchProfile };
}
