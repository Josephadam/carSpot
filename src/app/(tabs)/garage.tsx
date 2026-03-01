import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ui/ThemedText';
import { CarGrid } from '@/components/garage/CarGrid';
import { FilterBar } from '@/components/garage/FilterBar';
import { useGarage } from '@/hooks/useGarage';
import { Colors } from '@/constants/colors';
import type { Rarity } from '@/types/database';

export default function GarageScreen() {
  const { entries, isLoading } = useGarage();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const RARITIES: Rarity[] = ['Common', 'Rare', 'Legendary'];

  const filtered = useMemo(() => {
    if (selectedFilter === 'All') return entries;
    if (RARITIES.includes(selectedFilter as Rarity)) {
      return entries.filter((e) => e.car?.rarity === selectedFilter);
    }
    return entries.filter((e) => e.car?.category === selectedFilter);
  }, [entries, selectedFilter]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <ThemedText variant="heading2">Garage</ThemedText>
        <ThemedText variant="body" color={Colors.gray}>
          {entries.length} car{entries.length !== 1 ? 's' : ''} spotted
        </ThemedText>
      </View>
      <FilterBar selected={selectedFilter} onSelect={setSelectedFilter} />
      <CarGrid entries={filtered} isLoading={isLoading} />
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
