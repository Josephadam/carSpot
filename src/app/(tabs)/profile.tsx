import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ui/ThemedText';
import { Avatar } from '@/components/ui/Avatar';
import { LevelRing } from '@/components/ui/LevelRing';
import { StatsRow } from '@/components/profile/StatsRow';
import { GlowCard } from '@/components/ui/GlowCard';
import { useProfile } from '@/hooks/useProfile';
import { useGarage } from '@/hooks/useGarage';
import { useAuthContext } from '@/context/AuthContext';
import { levelProgress } from '@/lib/xpEngine';
import { Colors } from '@/constants/colors';

export default function ProfileScreen() {
  const { signOut } = useAuthContext();
  const { profile, isLoading } = useProfile();
  const { entries } = useGarage();

  if (isLoading || !profile) {
    return <View style={styles.container} />;
  }

  const progress = levelProgress(profile.xp);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText variant="heading2">Profile</ThemedText>
          <TouchableOpacity onPress={signOut}>
            <ThemedText variant="bodyMedium" color={Colors.gray}>
              Sign Out
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Profile card */}
        <GlowCard style={styles.profileCard}>
          <View style={styles.profileTop}>
            <Avatar uri={profile.avatar_url} username={profile.username} size={64} />
            <View style={styles.profileInfo}>
              <ThemedText variant="heading2">{profile.username}</ThemedText>
              <ThemedText variant="body" color={Colors.gray}>
                Level {profile.level} Spotter
              </ThemedText>
            </View>
            <LevelRing level={profile.level} progress={progress} size={72} />
          </View>
        </GlowCard>

        {/* Stats */}
        <GlowCard style={styles.statsCard}>
          <StatsRow user={profile} totalCars={entries.length} />
        </GlowCard>

        {/* Rarity breakdown */}
        <GlowCard style={styles.rarityCard}>
          <ThemedText variant="label" style={styles.sectionLabel}>
            Collection
          </ThemedText>
          {(['Legendary', 'Rare', 'Common'] as const).map((rarity) => {
            const count = entries.filter((e) => e.car?.rarity === rarity).length;
            return (
              <View key={rarity} style={styles.rarityRow}>
                <ThemedText variant="bodyMedium">{rarity}</ThemedText>
                <ThemedText variant="bodySemiBold" color={Colors.accent}>
                  {count}
                </ThemedText>
              </View>
            );
          })}
        </GlowCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scroll: {
    padding: 16,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileCard: {
    padding: 16,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileInfo: {
    flex: 1,
    gap: 2,
  },
  statsCard: {
    overflow: 'hidden',
  },
  rarityCard: {
    padding: 16,
    gap: 12,
  },
  sectionLabel: {
    marginBottom: 4,
  },
  rarityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayDark,
  },
});
