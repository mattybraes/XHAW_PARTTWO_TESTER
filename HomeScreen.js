    import React from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import AppButton from '../components/AppButton';
import { COLORS, SPACING, RADIUS } from '../theme';

const FEATURES = [
  { icon: 'leaf', label: 'Eco-Friendly\nAdventures' },
  { icon: 'trail-sign', label: 'Unforgettable\nExperiences' },
  { icon: 'people', label: 'For Everyone\n& Family' },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Ionicons name="menu" size={26} color={COLORS.ink} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={22} color={COLORS.ink} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>Good morning,</Text>
        <Text style={styles.greetingBold}>Adventurer!</Text>
        <Text style={styles.subtitle}>Western Cape adventures await...</Text>

        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=700' }}
          style={styles.hero}
          imageStyle={{ borderRadius: RADIUS.md }}
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroText}>Explore Adventure Escape</Text>
          </View>
        </ImageBackground>

        <View style={styles.row}>
          <AppButton
            title="Explore Adventures"
            variant="primary"
            style={{ flex: 1, marginRight: SPACING.sm }}
            onPress={() => navigation.navigate('Explore')}
          />
          <AppButton
            title="Calculate Fees"
            variant="accent"
            style={{ flex: 1 }}
            onPress={() => navigation.navigate('Calculate')}
          />
        </View>

        <Text style={styles.sectionTitle}>Why Adventure Escape SA?</Text>
        <View style={styles.row}>
          {FEATURES.map((f) => (
            <View key={f.label} style={styles.featureCard}>
              <Ionicons name={f.icon} size={20} color={COLORS.forest} />
              <Text style={styles.featureLabel}>{f.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.sand },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  content: { padding: SPACING.md, paddingBottom: SPACING.xl },
  greeting: { fontSize: 20, color: COLORS.ink },
  greetingBold: { fontSize: 20, fontWeight: '800', color: COLORS.forest, marginTop: -4 },
  subtitle: { color: COLORS.muted, marginTop: 2, marginBottom: SPACING.md },
  hero: { height: 150, justifyContent: 'flex-end', marginBottom: SPACING.md, overflow: 'hidden' },
  heroOverlay: {
    backgroundColor: 'rgba(31,77,58,0.55)',
    padding: SPACING.md,
    borderBottomLeftRadius: RADIUS.md,
    borderBottomRightRadius: RADIUS.md,
  },
  heroText: { color: COLORS.white, fontWeight: '700', fontSize: 16 },
  row: { flexDirection: 'row', marginBottom: SPACING.md },
  sectionTitle: { fontWeight: '700', fontSize: 15, color: COLORS.ink, marginBottom: SPACING.sm },
  featureCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: SPACING.sm,
    marginRight: SPACING.sm,
    alignItems: 'center',
  },
  featureLabel: { fontSize: 10, textAlign: 'center', marginTop: 6, color: COLORS.ink },
});