import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapContainer } from '@/components/map/MapContainer';
import { useLocation } from '@/hooks/useLocation';
import { useSightings } from '@/hooks/useSightings';
import { Colors } from '@/constants/colors';
import { ThemedText } from '@/components/ui/ThemedText';

const DEFAULT_CAMERA = { lat: 37.7749, lng: -122.4194, zoom: 12 };

export default function MapScreen() {
  const { coords, permission } = useLocation();
  const { sightings, isLoading } = useSightings();

  const cameraPosition = coords
    ? { lat: coords.lat, lng: coords.lng, zoom: 14 }
    : DEFAULT_CAMERA;

  if (permission === false) {
    return (
      <View style={styles.center}>
        <ThemedText variant="heading3">Location Needed</ThemedText>
        <ThemedText variant="body" color={Colors.gray}>
          Enable location to see the sightings map.
        </ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapContainer sightings={sightings} cameraPosition={cameraPosition} />
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color={Colors.accent} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bg,
    gap: 8,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});
