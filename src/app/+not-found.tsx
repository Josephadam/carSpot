import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { Colors } from '@/constants/colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <ThemedText variant="heading1">404</ThemedText>
        <ThemedText variant="body" color={Colors.gray}>
          This screen does not exist.
        </ThemedText>
        <Link href="/(tabs)/spot" style={styles.link}>
          <ThemedText variant="bodyMedium" color={Colors.accent}>
            Go to home screen
          </ThemedText>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.bg,
    gap: 12,
  },
  link: {
    marginTop: 16,
  },
});
