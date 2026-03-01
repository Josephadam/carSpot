import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import type { Rarity } from '@/types/database';
import { RarityConfig } from '@/constants/rarities';
import { Colors } from '@/constants/colors';

interface GlowCardProps extends ViewProps {
  rarity?: Rarity;
  children: React.ReactNode;
}

export function GlowCard({ rarity, children, style, ...props }: GlowCardProps) {
  const glowColor = rarity ? RarityConfig[rarity].glowColor : 'transparent';
  const borderColor = rarity ? RarityConfig[rarity].color : Colors.grayDark;

  return (
    <View
      style={[
        styles.card,
        {
          borderColor,
          shadowColor: glowColor,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
});
