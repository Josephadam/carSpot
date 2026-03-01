import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/fonts';

export const CATEGORIES = ['All', 'Legendary', 'Rare', 'Common', 'Supercar', 'JDM', 'Muscle', 'Exotic', 'Daily'];

interface FilterBarProps {
  selected: string;
  onSelect: (category: string) => void;
}

export function FilterBar({ selected, onSelect }: FilterBarProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {CATEGORIES.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[styles.chip, selected === cat && styles.chipActive]}
          onPress={() => onSelect(cat)}
        >
          <Text style={[styles.chipText, selected === cat && styles.chipTextActive]}>
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.grayDark,
    backgroundColor: Colors.bgCard,
  },
  chipActive: {
    borderColor: Colors.accent,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
  },
  chipText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: Colors.gray,
  },
  chipTextActive: {
    color: Colors.accent,
  },
});
