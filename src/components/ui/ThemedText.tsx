import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/fonts';

type TextVariant =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'body'
  | 'bodyMedium'
  | 'bodySemiBold'
  | 'caption'
  | 'label';

interface ThemedTextProps extends TextProps {
  variant?: TextVariant;
  color?: string;
}

export function ThemedText({
  variant = 'body',
  color,
  style,
  ...props
}: ThemedTextProps) {
  return (
    <Text
      style={[styles[variant], color ? { color } : undefined, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  heading1: {
    fontFamily: Fonts.heading,
    fontSize: 32,
    color: Colors.white,
    letterSpacing: 1,
  },
  heading2: {
    fontFamily: Fonts.heading,
    fontSize: 24,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  heading3: {
    fontFamily: Fonts.headingMedium,
    fontSize: 18,
    color: Colors.white,
  },
  body: {
    fontFamily: Fonts.body,
    fontSize: 15,
    color: Colors.white,
  },
  bodyMedium: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 15,
    color: Colors.white,
  },
  bodySemiBold: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 15,
    color: Colors.white,
  },
  caption: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.gray,
  },
  label: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 13,
    color: Colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});
