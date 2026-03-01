import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

interface Coords {
  lat: number;
  lng: number;
}

export function useLocation() {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [permission, setPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const granted = status === 'granted';
      setPermission(granted);
      if (!granted) return;

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setCoords({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    })();
  }, []);

  const refreshLocation = async () => {
    if (!permission) return;
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    setCoords({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  return { coords, permission, refreshLocation };
}
