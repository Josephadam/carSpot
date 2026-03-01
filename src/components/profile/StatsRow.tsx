import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatBlock } from './StatBlock';
import type { DbUser } from '@/types/database';
import { Colors } from '@/constants/colors';

interface StatsRowProps {
  user: DbUser;
  totalCars: number;
}

export function StatsRow({ user, totalCars }: StatsRowProps) {
  return (
    <View style={styles.row}>
      <StatBlock label="Cars" value={totalCars} icon="🚗" />
      <View style={styles.divider} />
      <StatBlock label="XP" value={user.xp.toLocaleString()} icon="⚡" />
      <View style={styles.divider} />
      <StatBlock label="Streak" value={`${user.streak}d`} icon="🔥" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  divider: {
    width: 1,
    backgroundColor: Colors.grayDark,
    marginVertical: 4,
  },
});
