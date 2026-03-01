import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

interface ThemedViewProps extends ViewProps {
  variant?: 'default' | 'card' | 'modal';
}

export function ThemedView({ variant = 'default', style, ...props }: ThemedViewProps) {
  return <View style={[styles[variant], style]} {...props} />;
}

const styles = StyleSheet.create({
  default: {
    backgroundColor: Colors.bg,
    flex: 1,
  },
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: 12,
  },
  modal: {
    backgroundColor: Colors.bgCard,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
