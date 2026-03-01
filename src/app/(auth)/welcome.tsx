import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ui/ThemedText';
import { Colors } from '@/constants/colors';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <ThemedText style={styles.logo}>🚗</ThemedText>
        <ThemedText variant="heading1" style={styles.title}>
          CarSpot
        </ThemedText>
        <ThemedText variant="body" color={Colors.gray} style={styles.subtitle}>
          Catch 'em all. Spot rare cars, earn XP, and build your garage.
        </ThemedText>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/(auth)/sign-up')}
        >
          <ThemedText variant="bodySemiBold" color={Colors.bg}>
            Get Started
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push('/(auth)/sign-in')}
        >
          <ThemedText variant="bodyMedium" color={Colors.accent}>
            I already have an account
          </ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  logo: {
    fontSize: 80,
  },
  title: {
    fontSize: 48,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    height: 56,
    backgroundColor: Colors.accent,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButton: {
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.accent,
  },
});
