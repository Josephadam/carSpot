import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
import { CameraView } from 'expo-camera';
import { Colors } from '@/constants/colors';
import { useCamera } from '@/hooks/useCamera';

interface CameraPreviewProps {
  onCapture: (uri: string, base64: string) => void;
  isIdentifying: boolean;
}

export function CameraPreview({ onCapture, isIdentifying }: CameraPreviewProps) {
  const { permission, requestPermission, cameraRef, facing, toggleFacing, isCapturing, takePicture } =
    useCamera();

  const handleShutter = async () => {
    if (isCapturing || isIdentifying) return;
    const hasPermission = await requestPermission();
    if (!hasPermission) return;
    const photo = await takePicture();
    if (photo?.uri && photo.base64) {
      onCapture(photo.uri, photo.base64);
    }
  };

  if (!permission?.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera access needed</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Access</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
      />

      {/* Corner frame guides */}
      <View style={styles.frame} pointerEvents="none">
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.flipButton} onPress={toggleFacing}>
          <Text style={styles.flipText}>⟳</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.shutterButton,
            (isCapturing || isIdentifying) && styles.shutterDisabled,
          ]}
          onPress={handleShutter}
          activeOpacity={0.7}
        >
          {isCapturing || isIdentifying ? (
            <ActivityIndicator color={Colors.bg} />
          ) : (
            <View style={styles.shutterInner} />
          )}
        </TouchableOpacity>

        <View style={styles.flipButton} />
      </View>

      {isIdentifying && (
        <View style={styles.identifyingOverlay}>
          <ActivityIndicator color={Colors.accent} size="large" />
          <Text style={styles.identifyingText}>Identifying...</Text>
        </View>
      )}
    </View>
  );
}

const CORNER_SIZE = 24;
const CORNER_THICKNESS = 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bg,
    gap: 16,
  },
  permissionText: {
    color: Colors.white,
    fontSize: 16,
  },
  permissionButton: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: Colors.bg,
    fontWeight: '600',
  },
  frame: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: CORNER_SIZE,
    height: CORNER_SIZE,
  },
  topLeft: {
    top: '25%',
    left: '10%',
    borderTopWidth: CORNER_THICKNESS,
    borderLeftWidth: CORNER_THICKNESS,
    borderColor: Colors.accent,
  },
  topRight: {
    top: '25%',
    right: '10%',
    borderTopWidth: CORNER_THICKNESS,
    borderRightWidth: CORNER_THICKNESS,
    borderColor: Colors.accent,
  },
  bottomLeft: {
    bottom: '25%',
    left: '10%',
    borderBottomWidth: CORNER_THICKNESS,
    borderLeftWidth: CORNER_THICKNESS,
    borderColor: Colors.accent,
  },
  bottomRight: {
    bottom: '25%',
    right: '10%',
    borderBottomWidth: CORNER_THICKNESS,
    borderRightWidth: CORNER_THICKNESS,
    borderColor: Colors.accent,
  },
  controls: {
    position: 'absolute',
    bottom: 48,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  shutterButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Colors.accent,
  },
  shutterDisabled: {
    opacity: 0.6,
  },
  shutterInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.white,
  },
  flipButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipText: {
    fontSize: 24,
    color: Colors.white,
  },
  identifyingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(8,11,17,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  identifyingText: {
    color: Colors.accent,
    fontSize: 18,
    fontWeight: '600',
  },
});
