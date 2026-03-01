import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthContext } from '@/context/AuthContext';
import type { DbUserChallenge } from '@/types/database';

export function useChallenges() {
  const { session } = useAuthContext();
  const [challenges, setChallenges] = useState<DbUserChallenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchChallenges = useCallback(async () => {
    if (!session?.user) return;
    setIsLoading(true);
    try {
      // Get active challenges
      const { data: activeChallenges } = await supabase
        .from('challenges')
        .select('*')
        .gt('expires_at', new Date().toISOString());

      if (!activeChallenges) return;

      // Get user's progress for each
      const challengeIds = activeChallenges.map((c) => c.id);
      const { data: userProgress } = await supabase
        .from('user_challenges')
        .select('*')
        .eq('user_id', session.user.id)
        .in('challenge_id', challengeIds);

      // Merge
      const merged: DbUserChallenge[] = activeChallenges.map((challenge) => {
        const progress = userProgress?.find(
          (p) => p.challenge_id === challenge.id,
        );
        return {
          id: progress?.id ?? `pending-${challenge.id}`,
          user_id: session.user!.id,
          challenge_id: challenge.id,
          progress: progress?.progress ?? 0,
          completed_at: progress?.completed_at ?? null,
          created_at: progress?.created_at ?? new Date().toISOString(),
          challenge,
        };
      });

      setChallenges(merged);
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  return { challenges, isLoading, refetch: fetchChallenges };
}
