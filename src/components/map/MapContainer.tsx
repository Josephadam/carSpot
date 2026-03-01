import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import type { DbSighting } from '@/types/database';

interface CameraPosition {
  lat: number;
  lng: number;
  zoom?: number;
}

interface MapContainerProps {
  sightings: DbSighting[];
  cameraPosition: CameraPosition;
}

export function MapContainer({ sightings, cameraPosition }: MapContainerProps) {
  if (Platform.OS === 'ios') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const AppleMaps = require('expo-maps/apple');
    const markers = sightings
      .filter((s) => s.lat != null && s.lng != null)
      .map((s) => ({
        id: s.id,
        coordinates: { latitude: s.lat!, longitude: s.lng! },
        title: s.car ? `${s.car.make} ${s.car.model}` : 'Car',
        snippet: s.car?.rarity,
      }));

    return (
      <AppleMaps.View
        style={StyleSheet.absoluteFill}
        cameraPosition={{
          coordinates: {
            latitude: cameraPosition.lat,
            longitude: cameraPosition.lng,
          },
          zoom: cameraPosition.zoom ?? 14,
        }}
        markers={markers}
        mapType="standard"
      />
    );
  }

  // Android — Google Maps
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const GoogleMaps = require('expo-maps/google');
  const markers = sightings
    .filter((s) => s.lat != null && s.lng != null)
    .map((s) => ({
      id: s.id,
      coordinates: { latitude: s.lat!, longitude: s.lng! },
      title: s.car ? `${s.car.make} ${s.car.model}` : 'Car',
      snippet: s.car?.rarity,
    }));

  return (
    <GoogleMaps.View
      style={StyleSheet.absoluteFill}
      cameraPosition={{
        coordinates: {
          latitude: cameraPosition.lat,
          longitude: cameraPosition.lng,
        },
        zoom: cameraPosition.zoom ?? 14,
      }}
      markers={markers}
    />
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
