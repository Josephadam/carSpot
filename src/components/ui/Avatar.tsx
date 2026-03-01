import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/fonts';

interface AvatarProps {
  uri?: string | null;
  username?: string;
  size?: number;
}

export function Avatar({ uri, username, size = 48 }: AvatarProps) {
  const initials = username
    ? username.slice(0, 2).toUpperCase()
    : '?';

  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
        />
      ) : (
        <Text style={[styles.initials, { fontSize: size * 0.35 }]}>{initials}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgCardHover,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  image: {
    resizeMode: 'cover',
  },
  initials: {
    fontFamily: Fonts.heading,
    color: Colors.accent,
  },
});
