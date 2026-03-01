import { Redirect } from 'expo-router';
import { useAuthContext } from '@/context/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/colors';

export default function Index() {
  const { session, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.bg, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={Colors.accent} size="large" />
      </View>
    );
  }

  if (session) {
    return <Redirect href="/(tabs)/spot" />;
  }

  return <Redirect href="/(auth)/welcome" />;
}
