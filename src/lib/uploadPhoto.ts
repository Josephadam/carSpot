import { decode } from 'base64-arraybuffer';
import { supabase } from './supabase';

export async function uploadPhoto(
  base64: string,
  userId: string,
): Promise<string | null> {
  const fileName = `${userId}/${Date.now()}.jpg`;
  const arrayBuffer = decode(base64);

  const { data, error } = await supabase.storage
    .from('sighting-photos')
    .upload(fileName, arrayBuffer, {
      contentType: 'image/jpeg',
      upsert: false,
    });

  if (error) {
    console.error('Photo upload error:', error);
    return null;
  }

  const { data: urlData } = supabase.storage
    .from('sighting-photos')
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}
