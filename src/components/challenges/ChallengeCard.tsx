import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GlowCard } from '@/components/ui/GlowCard';
import { ThemedText } from '@/components/ui/ThemedText';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { DbUserChallenge } from '@/types/database';
import { Colors } from '@/constants/colors';

interface ChallengeCardProps {
  userChallenge: DbUserChallenge;
}

export function ChallengeCard({ userChallenge }: ChallengeCardProps) {
  const { challenge, progress, completed_at } = userChallenge;
  if (!challenge) return null;

  const progressRatio = Math.min(1, progress / challenge.target_count);
  const isComplete = !!completed_at;

  return (
    <GlowCard
      rarity={isComplete ? 'Legendary' : undefined}
      style={styles.card}
    >
      <View style={styles.header}>
        <View style={styles.titleArea}>
          <ThemedText variant="heading3">{challenge.title}</ThemedText>
          {challenge.description && (
            <ThemedText variant="caption">{challenge.description}</ThemedText>
          )}
        </View>
        <View style={styles.xpBadge}>
          <ThemedText variant="bodySemiBold" color={Colors.gold}>
            +{challenge.xp_reward} XP
          </ThemedText>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <ThemedText variant="caption">
            {progress} / {challenge.target_count}
          </ThemedText>
          {isComplete && (
            <ThemedText variant="caption" color={Colors.success}>
              ✓ Complete
            </ThemedText>
          )}
        </View>
        <ProgressBar
          progress={progressRatio}
          color={isComplete ? Colors.gold : Colors.accent}
        />
      </View>
    </GlowCard>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    gap: 12,
    marginHorizontal: 16,
    marginVertical: 6,
  },
  header: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  titleArea: {
    flex: 1,
    gap: 2,
  },
  xpBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  progressSection: {
    gap: 6,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
