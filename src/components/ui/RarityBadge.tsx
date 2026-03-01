import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Rarity } from '@/types/database';
import { RarityConfig } from '@/constants/rarities';
import { Fonts } from '@/constants/fonts';

interface RarityBadgeProps {
  rarity: Rarity;
  size?: 'small' | 'medium' | 'large';
}

export function RarityBadge({ rarity, size = 'medium' }: RarityBadgeProps) {
  const config = RarityConfig[rarity];
  return (
    <View
      style={[
        styles.badge,
        styles[size],
        { backgroundColor: config.glowColor, borderColor: config.color },
      ]}
    >
      <Text style={[styles.text, styles[`text_${size}`], { color: config.color }]}>
        {config.emoji} {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  small: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  medium: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  large: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  text: {
    fontFamily: Fonts.bodySemiBold,
  },
  text_small: { fontSize: 11 },
  text_medium: { fontSize: 13 },
  text_large: { fontSize: 16 },
});
