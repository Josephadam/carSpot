import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ui/ThemedText';
import { ChallengeList } from '@/components/challenges/ChallengeList';
import { useChallenges } from '@/hooks/useChallenges';
import { Colors } from '@/constants/colors';

export default function ChallengesScreen() {
  const { challenges, isLoading } = useChallenges();

  const completed = challenges.filter((c) => c.completed_at).length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <ThemedText variant="heading2">Challenges</ThemedText>
        <ThemedText variant="body" color={Colors.gray}>
          {completed}/{challenges.length} complete
        </ThemedText>
      </View>
      <ChallengeList challenges={challenges} isLoading={isLoading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
});
