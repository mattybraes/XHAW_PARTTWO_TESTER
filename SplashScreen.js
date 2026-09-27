import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../components/AppButton';
import { COLORS, SPACING } from '../theme';

export default function SplashScreen({ navigation }) {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800' }}
      style={styles.bg}
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.content}>
        <View style={styles.logoWrap}>
          <Ionicons name="triangle" size={40} color={COLORS.forest} />
          <Text style={styles.title}>ADVENTURE{'\n'}ESCAPE SA</Text>
          <Text style={styles.tagline}>Explore. Escape. Experience.</Text>
        </View>
        <AppButton
          title="GET STARTED"
          icon="→"
          onPress={() => navigation.replace('Drawer')}
          style={{ marginHorizontal: SPACING.lg, marginBottom: SPACING.xl }}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, justifyContent: 'space-between' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(246,241,231,0.55)' },
  content: { flex: 1, justifyContent: 'space-between' },
  logoWrap: { alignItems: 'center', marginTop: 80 },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.forest,
    textAlign: 'center',
    marginTop: SPACING.sm,
    letterSpacing: 1,
  },
  tagline: { color: COLORS.ink, marginTop: SPACING.xs, fontSize: 13 },
});