import 'react-native-url-polyfill/auto'; // MUST be first import
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const _url = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseUrl =
  _url.startsWith('https://') || _url.startsWith('http://')
    ? _url
    : 'https://placeholder.supabase.co';

const _key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';
const supabaseAnonKey = _key.length > 10 ? _key : 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // CRITICAL for native — no browser URL to parse
  },
});
