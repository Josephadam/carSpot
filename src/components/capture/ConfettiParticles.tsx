import React, { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDecay,
  withDelay,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Colors } from '@/constants/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PARTICLE_COUNT = 20;
const COLORS = [Colors.gold, Colors.accent, '#FF6B6B', '#A78BFA', '#34D399'];

interface Particle {
  id: number;
  color: string;
  size: number;
  initialX: number;
  initialY: number;
  velX: number;
  velY: number;
  delay: number;
}

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    color: COLORS[i % COLORS.length],
    size: Math.random() * 8 + 4,
    initialX: SCREEN_WIDTH / 2 + (Math.random() - 0.5) * 40,
    initialY: SCREEN_HEIGHT * 0.4,
    velX: (Math.random() - 0.5) * 600,
    velY: -(Math.random() * 400 + 200),
    delay: Math.random() * 200,
  }));
}

function ConfettiParticle({ particle }: { particle: Particle }) {
  const x = useSharedValue(particle.initialX);
  const y = useSharedValue(particle.initialY);
  const opacity = useSharedValue(1);
  const rotation = useSharedValue(0);

  useEffect(() => {
    x.value = withDelay(
      particle.delay,
      withDecay({ velocity: particle.velX, deceleration: 0.998 }),
    );
    y.value = withDelay(
      particle.delay,
      withDecay({ velocity: particle.velY, deceleration: 0.995 }),
    );
    rotation.value = withDecay({ velocity: particle.velX * 3 });
    opacity.value = withDelay(1200, withTiming(0, { duration: 600 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.particle,
        animatedStyle,
        {
          width: particle.size,
          height: particle.size,
          backgroundColor: particle.color,
          borderRadius: particle.size / 4,
        },
      ]}
    />
  );
}

interface ConfettiParticlesProps {
  active: boolean;
}

export function ConfettiParticles({ active }: ConfettiParticlesProps) {
  if (!active) return null;
  const particles = generateParticles();
  return (
    <>
      {particles.map((p) => (
        <ConfettiParticle key={p.id} particle={p} />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
