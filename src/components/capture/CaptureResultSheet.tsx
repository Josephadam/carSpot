import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '@/constants/colors';
import { ThemedText } from '@/components/ui/ThemedText';
import { RarityBadge } from '@/components/ui/RarityBadge';
import { XPCounter } from '@/components/ui/XPCounter';
import { GlowCard } from '@/components/ui/GlowCard';
import { ConfettiParticles } from './ConfettiParticles';
import { UnlockAnimation } from './UnlockAnimation';
import type { CarIdentification } from '@/types/api';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.65;

interface CaptureResultSheetProps {
  visible: boolean;
  identification: CarIdentification | null;
  photoUri: string | null;
  xpEarned: number;
  isSaving: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
}

export function CaptureResultSheet({
  visible,
  identification,
  photoUri,
  xpEarned,
  isSaving,
  onConfirm,
  onDismiss,
}: CaptureResultSheetProps) {
  const translateY = useSharedValue(SHEET_HEIGHT);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, { damping: 18, stiffness: 120 });
      backdropOpacity.value = withTiming(1, { duration: 300 });
    } else {
      translateY.value = withSpring(SHEET_HEIGHT, { damping: 20, stiffness: 150 });
      backdropOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  if (!visible && !identification) return null;

  const isLegendary = identification?.rarity === 'Legendary';

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents={visible ? 'auto' : 'none'}>
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onDismiss} />
      </Animated.View>

      {/* Confetti for Legendary */}
      <ConfettiParticles active={visible && isLegendary} />

      {/* Unlock animation for Legendary */}
      <UnlockAnimation active={visible && isLegendary} />

      {/* Bottom sheet */}
      <Animated.View style={[styles.sheet, sheetStyle]}>
        <View style={styles.handle} />

        {identification && (
          <>
            {/* Photo thumbnail */}
            {photoUri && (
              <Image source={{ uri: photoUri }} style={styles.photo} />
            )}

            <View style={styles.content}>
              <View style={styles.header}>
                <View style={styles.titleRow}>
                  <ThemedText variant="heading2">
                    {identification.make} {identification.model}
                  </ThemedText>
                  {identification.year && (
                    <ThemedText variant="body" color={Colors.gray}>
                      {identification.year}
                    </ThemedText>
                  )}
                </View>
                <RarityBadge rarity={identification.rarity} size="large" />
              </View>

              <View style={styles.stats}>
                <View style={styles.statItem}>
                  <ThemedText variant="label">Category</ThemedText>
                  <ThemedText variant="bodyMedium">{identification.category}</ThemedText>
                </View>
                <View style={styles.statItem}>
                  <ThemedText variant="label">Confidence</ThemedText>
                  <ThemedText variant="bodyMedium">
                    {Math.round(identification.confidence * 100)}%
                  </ThemedText>
                </View>
              </View>

              <XPCounter value={xpEarned} />

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.dismissButton}
                  onPress={onDismiss}
                >
                  <ThemedText variant="bodyMedium" color={Colors.gray}>
                    Skip
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.confirmButton,
                    isSaving && styles.confirmDisabled,
                  ]}
                  onPress={onConfirm}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <ActivityIndicator color={Colors.bg} />
                  ) : (
                    <ThemedText variant="bodySemiBold" color={Colors.bg}>
                      Capture!
                    </ThemedText>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SHEET_HEIGHT,
    backgroundColor: Colors.bgCard,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.grayDark,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  photo: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  header: {
    gap: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  stats: {
    flexDirection: 'row',
    gap: 24,
  },
  statItem: {
    gap: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 'auto',
  },
  dismissButton: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.grayDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    flex: 2,
    height: 52,
    borderRadius: 12,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmDisabled: {
    opacity: 0.6,
  },
});
