import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { Colors } from '@/constants/colors';

interface StatBlockProps {
  label: string;
  value: string | number;
  icon?: string;
}

export function StatBlock({ label, value, icon }: StatBlockProps) {
  return (
    <View style={styles.container}>
      {icon && <ThemedText style={styles.icon}>{icon}</ThemedText>}
      <ThemedText variant="heading2" color={Colors.accent}>
        {value}
      </ThemedText>
      <ThemedText variant="label">{label}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  icon: {
    fontSize: 20,
  },
});
