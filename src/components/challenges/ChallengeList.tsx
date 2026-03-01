import React from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import { ChallengeCard } from './ChallengeCard';
import { ThemedText } from '@/components/ui/ThemedText';
import type { DbUserChallenge } from '@/types/database';
import { Colors } from '@/constants/colors';

interface ChallengeListProps {
  challenges: DbUserChallenge[];
  isLoading: boolean;
}

export function ChallengeList({ challenges, isLoading }: ChallengeListProps) {
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={Colors.accent} size="large" />
      </View>
    );
  }

  if (challenges.length === 0) {
    return (
      <View style={styles.center}>
        <ThemedText style={styles.emptyIcon}>🏆</ThemedText>
        <ThemedText variant="heading3">No active challenges</ThemedText>
        <ThemedText variant="body" color={Colors.gray}>
          Check back soon!
        </ThemedText>
      </View>
    );
  }

  return (
    <FlatList
      data={challenges}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChallengeCard userChallenge={item} />}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  emptyIcon: {
    fontSize: 48,
  },
  list: {
    paddingVertical: 8,
  },
});
