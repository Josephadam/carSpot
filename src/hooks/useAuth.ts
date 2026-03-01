import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import * as AppleAuthentication from 'expo-apple-authentication';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = async (email: string, password: string, username: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) throw signUpError;
      if (data.user) {
        await supabase.from('users').insert({
          id: data.user.id,
          username,
        });
      }
    } catch (e: any) {
      setError(e.message ?? 'Sign up failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;
    } catch (e: any) {
      setError(e.message ?? 'Sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithApple = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const { error: appleError } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken!,
      });
      if (appleError) throw appleError;
    } catch (e: any) {
      if (e.code !== 'ERR_CANCELED') {
        setError(e.message ?? 'Apple Sign-In failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, signIn, signInWithApple, isLoading, error, setError };
}
