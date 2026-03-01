import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as AppleAuthentication from 'expo-apple-authentication';
import { ThemedText } from '@/components/ui/ThemedText';
import { Colors } from '@/constants/colors';
import { useAuth } from '@/hooks/useAuth';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signInWithApple, isLoading, error, setError } = useAuth();

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    await signIn(email, password);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={() => router.back()} style={styles.back}>
            <ThemedText variant="bodyMedium" color={Colors.accent}>
              ← Back
            </ThemedText>
          </TouchableOpacity>

          <ThemedText variant="heading1" style={styles.title}>
            Sign In
          </ThemedText>

          {error && (
            <View style={styles.errorBox}>
              <ThemedText variant="body" color={Colors.error}>
                {error}
              </ThemedText>
            </View>
          )}

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <ThemedText variant="label">Email</ThemedText>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor={Colors.gray}
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText variant="label">Password</ThemedText>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor={Colors.gray}
                secureTextEntry
                textContentType="password"
              />
            </View>

            <TouchableOpacity
              style={[styles.primaryButton, isLoading && styles.disabled]}
              onPress={handleSignIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.bg} />
              ) : (
                <ThemedText variant="bodySemiBold" color={Colors.bg}>
                  Sign In
                </ThemedText>
              )}
            </TouchableOpacity>

            {Platform.OS === 'ios' && (
              <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
                cornerRadius={12}
                style={styles.appleButton}
                onPress={signInWithApple}
              />
            )}
          </View>

          <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
            <ThemedText variant="body" color={Colors.gray} style={styles.switchText}>
              Don't have an account?{' '}
              <ThemedText variant="bodyMedium" color={Colors.accent}>
                Sign Up
              </ThemedText>
            </ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  flex: { flex: 1 },
  container: {
    padding: 24,
    gap: 24,
    flexGrow: 1,
  },
  back: { alignSelf: 'flex-start' },
  title: { marginTop: 8 },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  form: { gap: 16 },
  inputGroup: { gap: 6 },
  input: {
    height: 52,
    backgroundColor: Colors.bgCard,
    borderRadius: 12,
    paddingHorizontal: 16,
    color: Colors.white,
    borderWidth: 1,
    borderColor: Colors.grayDark,
    fontSize: 16,
  },
  primaryButton: {
    height: 56,
    backgroundColor: Colors.accent,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  appleButton: {
    height: 52,
    width: '100%',
  },
  disabled: { opacity: 0.6 },
  switchText: { textAlign: 'center' },
});
