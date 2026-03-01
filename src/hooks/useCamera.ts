import { useState, useRef } from 'react';
import { Alert } from 'react-native';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';

export function useCamera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const ensurePermission = async (): Promise<boolean> => {
    if (permission?.granted) return true;
    const result = await requestPermission();
    if (!result.granted) {
      Alert.alert(
        'Camera Permission Required',
        'CarSpot needs camera access to spot cars.',
      );
      return false;
    }
    return true;
  };

  const takePicture = async () => {
    if (!cameraRef.current || isCapturing) return null;
    setIsCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: true,
        exif: false,
      });
      return photo;
    } catch (e) {
      console.error('takePicture error:', e);
      return null;
    } finally {
      setIsCapturing(false);
    }
  };

  const toggleFacing = () => {
    setFacing((f) => (f === 'back' ? 'front' : 'back'));
  };

  return {
    permission,
    requestPermission: ensurePermission,
    cameraRef,
    facing,
    toggleFacing,
    isCapturing,
    takePicture,
  };
}
