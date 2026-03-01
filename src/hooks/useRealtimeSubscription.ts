import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Options {
  table: string;
  filter?: string;
  onInsert?: (payload: any) => void;
  onUpdate?: (payload: any) => void;
  onDelete?: (payload: any) => void;
}

export function useRealtimeSubscription({
  table,
  filter,
  onInsert,
  onUpdate,
  onDelete,
}: Options) {
  useEffect(() => {
    const channel = supabase
      .channel(`realtime:${table}${filter ? `:${filter}` : ''}`)
      .on(
        'postgres_changes' as any,
        {
          event: '*',
          schema: 'public',
          table,
          filter,
        },
        (payload: any) => {
          if (payload.eventType === 'INSERT' && onInsert) onInsert(payload.new);
          if (payload.eventType === 'UPDATE' && onUpdate) onUpdate(payload.new);
          if (payload.eventType === 'DELETE' && onDelete) onDelete(payload.old);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, filter]);
}
