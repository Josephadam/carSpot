import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { GlowCard } from '@/components/ui/GlowCard';
import { ThemedText } from '@/components/ui/ThemedText';
import { RarityBadge } from '@/components/ui/RarityBadge';
import type { DbGarageEntry } from '@/types/database';
import { Colors } from '@/constants/colors';

interface CarCardProps {
  entry: DbGarageEntry;
}

export function CarCard({ entry }: CarCardProps) {
  const car = entry.car!;
  return (
    <GlowCard rarity={car.rarity} style={styles.card}>
      {car.image_url ? (
        <Image source={{ uri: car.image_url }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <ThemedText style={styles.placeholderIcon}>🚗</ThemedText>
        </View>
      )}
      <View style={styles.info}>
        <ThemedText variant="heading3" numberOfLines={1}>
          {car.make}
        </ThemedText>
        <ThemedText variant="body" color={Colors.gray} numberOfLines={1}>
          {car.model}
        </ThemedText>
        <View style={styles.footer}>
          <RarityBadge rarity={car.rarity} size="small" />
          {entry.spot_count > 1 && (
            <ThemedText variant="caption">×{entry.spot_count}</ThemedText>
          )}
        </View>
      </View>
    </GlowCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
  },
  image: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.bgCardHover,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 36,
  },
  info: {
    padding: 10,
    gap: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
});
