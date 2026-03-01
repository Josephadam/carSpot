import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ui/ThemedText';
import { Colors } from '@/constants/colors';
import { useAuth } from '@/hooks/useAuth';

export default function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, isLoading, error, setError } = useAuth();

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    await signUp(email, password, username);
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
            Create Account
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
              <ThemedText variant="label">Username</ThemedText>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="spotter123"
                placeholderTextColor={Colors.gray}
                autoCapitalize="none"
                textContentType="username"
              />
            </View>

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
                textContentType="newPassword"
              />
            </View>

            <TouchableOpacity
              style={[styles.primaryButton, isLoading && styles.disabled]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.bg} />
              ) : (
                <ThemedText variant="bodySemiBold" color={Colors.bg}>
                  Create Account
                </ThemedText>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')}>
            <ThemedText variant="body" color={Colors.gray} style={styles.switchText}>
              Already have an account?{' '}
              <ThemedText variant="bodyMedium" color={Colors.accent}>
                Sign In
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
  disabled: { opacity: 0.6 },
  switchText: { textAlign: 'center' },
});
