import React, { useEffect } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/fonts';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface XPCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
}

export function XPCounter({ value, duration = 1200, prefix = '+' }: XPCounterProps) {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withTiming(value, {
      duration,
      easing: Easing.out(Easing.cubic),
    });
  }, [value]);

  const animatedProps = useAnimatedProps(() => ({
    text: `${prefix}${Math.round(animatedValue.value)} XP`,
    defaultValue: `${prefix}${Math.round(animatedValue.value)} XP`,
  }));

  return (
    <AnimatedTextInput
      style={styles.text}
      animatedProps={animatedProps}
      editable={false}
      value={`${prefix}${value} XP`}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.heading,
    fontSize: 36,
    color: Colors.gold,
    textAlign: 'center',
  },
});
