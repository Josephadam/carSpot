import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraPreview } from '@/components/capture/CameraPreview';
import { CaptureResultSheet } from '@/components/capture/CaptureResultSheet';
import { useCaptureContext } from '@/context/CaptureContext';
import { useCapture } from '@/hooks/useCapture';
import { Colors } from '@/constants/colors';

export default function SpotScreen() {
  const capture = useCaptureContext();
  const { processPhoto, confirmCapture, dismissCapture } = useCapture();

  const showSheet = capture.state === 'result' || capture.state === 'saving';

  return (
    <View style={styles.container}>
      <CameraPreview
        onCapture={processPhoto}
        isIdentifying={capture.state === 'identifying'}
      />
      <CaptureResultSheet
        visible={showSheet}
        identification={capture.identification}
        photoUri={capture.photoUri}
        xpEarned={capture.xpEarned}
        isSaving={capture.state === 'saving'}
        onConfirm={confirmCapture}
        onDismiss={dismissCapture}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
});
