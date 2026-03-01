const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// URL polyfill required for Supabase on React Native
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  url: require.resolve('react-native-url-polyfill'),
};

module.exports = config;
