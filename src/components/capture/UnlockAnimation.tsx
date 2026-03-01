import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { Colors } from '@/constants/colors';
import { ThemedText } from '@/components/ui/ThemedText';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface UnlockAnimationProps {
  active: boolean;
}

export function UnlockAnimation({ active }: UnlockAnimationProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    if (active) {
      scale.value = withSequence(
        withSpring(1.2, { damping: 8, stiffness: 120 }),
        withSpring(1, { damping: 12, stiffness: 100 }),
      );
      opacity.value = withTiming(1, { duration: 300 });
      glowOpacity.value = withSequence(
        withTiming(1, { duration: 400 }),
        withDelay(600, withTiming(0, { duration: 600 })),
      );
    } else {
      scale.value = 0;
      opacity.value = 0;
      glowOpacity.value = 0;
    }
  }, [active]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  if (!active) return null;

  return (
    <View style={styles.overlay} pointerEvents="none">
      <Animated.View style={[styles.glowCircle, glowStyle]} />
      <Animated.View style={[styles.badge, containerStyle]}>
        <ThemedText style={styles.star}>★</ThemedText>
        <ThemedText style={styles.text}>LEGENDARY</ThemedText>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  glowCircle: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.8,
    borderRadius: SCREEN_WIDTH * 0.4,
    backgroundColor: 'transparent',
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 60,
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  badge: {
    alignItems: 'center',
    gap: 8,
  },
  star: {
    fontSize: 64,
    color: Colors.gold,
  },
  text: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.gold,
    letterSpacing: 4,
  },
});
