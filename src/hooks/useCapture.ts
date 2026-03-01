import { useCallback } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useCaptureContext } from '@/context/CaptureContext';
import { useCarIdentification } from './useCarIdentification';
import { useLocation } from './useLocation';
import { uploadPhoto } from '@/lib/uploadPhoto';
import { getXPForRarity } from '@/lib/rarityEngine';
import { supabase } from '@/lib/supabase';

export function useCapture() {
  const { session } = useAuthContext();
  const capture = useCaptureContext();
  const { identify } = useCarIdentification();
  const { coords } = useLocation();

  const processPhoto = useCallback(
    async (uri: string, base64: string) => {
      capture.setPhotoUri(uri);
      capture.setPhotoBase64(base64);
      capture.setState('identifying');

      try {
        const result = await identify(base64);
        capture.setIdentification(result);
        const xp = getXPForRarity(result.rarity, result.baseXp);
        capture.setXpEarned(xp);
        capture.setState('result');
      } catch (e) {
        console.error('Identification failed:', e);
        capture.setState('idle');
      }
    },
    [identify, capture],
  );

  const confirmCapture = useCallback(async () => {
    const { identification, photoBase64 } = capture;
    if (!identification || !session?.user) return;

    capture.setState('saving');
    const userId = session.user.id;

    try {
      let photoUrl: string | null = null;
      if (photoBase64) {
        photoUrl = await uploadPhoto(photoBase64, userId);
      }

      // Save sighting
      await supabase.from('sightings').insert({
        user_id: userId,
        car_id: identification.carId,
        photo_url: photoUrl,
        lat: coords?.lat ?? null,
        lng: coords?.lng ?? null,
        confidence: identification.confidence,
      });

      // Upsert garage
      if (identification.carId) {
        await supabase.rpc('upsert_garage', {
          p_user_id: userId,
          p_car_id: identification.carId,
        });
      }

      // Award XP
      await supabase.rpc('award_xp', {
        p_user_id: userId,
        p_xp_amount: capture.xpEarned,
      });

      capture.setState('idle');
      capture.reset();
    } catch (e) {
      console.error('Save capture error:', e);
      capture.setState('result'); // Fall back to result so user can retry
    }
  }, [capture, session, coords]);

  const dismissCapture = useCallback(() => {
    capture.reset();
  }, [capture]);

  return { processPhoto, confirmCapture, dismissCapture };
}
