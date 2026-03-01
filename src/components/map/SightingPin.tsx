import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import type { Rarity } from '@/types/database';
import { RarityConfig } from '@/constants/rarities';

interface SightingPinProps {
  rarity: Rarity;
}

export function SightingPin({ rarity }: SightingPinProps) {
  const config = RarityConfig[rarity];
  return (
    <View style={[styles.pin, { borderColor: config.color, backgroundColor: config.glowColor }]}>
      <Text style={[styles.emoji, { color: config.color }]}>{config.emoji}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 14,
  },
});
