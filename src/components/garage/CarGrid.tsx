import React from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import { CarCard } from './CarCard';
import { ThemedText } from '@/components/ui/ThemedText';
import type { DbGarageEntry } from '@/types/database';
import { Colors } from '@/constants/colors';

interface CarGridProps {
  entries: DbGarageEntry[];
  isLoading: boolean;
}

export function CarGrid({ entries, isLoading }: CarGridProps) {
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={Colors.accent} size="large" />
      </View>
    );
  }

  if (entries.length === 0) {
    return (
      <View style={styles.center}>
        <ThemedText style={styles.emptyIcon}>🚗</ThemedText>
        <ThemedText variant="heading3">No cars yet</ThemedText>
        <ThemedText variant="body" color={Colors.gray}>
          Go spot some cars!
        </ThemedText>
      </View>
    );
  }

  return (
    <FlatList
      data={entries}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <CarCard entry={item} />}
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
    padding: 10,
  },
});
