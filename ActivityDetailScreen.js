import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import AppButton from '../components/AppButton';
import { ACTIVITIES } from '../data';
import { COLORS, SPACING, RADIUS } from '../theme';

export default function ActivityDetailScreen({ route, navigation }) {
  const { activityId } = route.params;
  const activity = ACTIVITIES.find((a) => a.id === activityId);

  const STATS = [
    { icon: 'pricetag-outline', label: 'Price', value: `R${activity.price} per person` },
    { icon: 'time-outline', label: 'Duration', value: activity.duration },
    { icon: 'speedometer-outline', label: 'Difficulty', value: activity.difficulty },
    { icon: 'body-outline', label: 'Age', value: activity.age },
  ];

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScreenHeader title="" rightIcon="heart-outline" />
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: activity.image }} style={styles.image} />
        <View style={styles.titleRow}>
          <Text style={styles.name}>{activity.name}</Text>
          <Text style={styles.price}>R{activity.price}</Text>
        </View>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color={COLORS.sunset} />
          <Text style={styles.rating}>
            {activity.rating} ({activity.reviews} reviews)
          </Text>
        </View>

        <View style={styles.statsBox}>
          {STATS.map((s) => (
            <View key={s.label} style={styles.statRow}>
              <View style={styles.statLeft}>
                <Ionicons name={s.icon} size={16} color={COLORS.forest} />
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
              <Text style={styles.statValue}>{s.value}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>About This Activity</Text>
        <Text style={styles.desc}>{activity.description}</Text>
      </ScrollView>
      <View style={styles.footer}>
        <AppButton
          title="CALCULATE FEES / BOOK NOW"
          icon="→"
          variant="primary"
          onPress={() =>
            navigation.navigate('Calculate', { screen: 'CalculateFees', params: { activityId: activity.id } })
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.sand },
  content: { padding: SPACING.md, paddingBottom: SPACING.md },
  image: { width: '100%', height: 180, borderRadius: RADIUS.md, marginBottom: SPACING.md },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 20, fontWeight: '800', color: COLORS.ink },
  price: { fontSize: 20, fontWeight: '800', color: COLORS.forest },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4, marginBottom: SPACING.md },
  rating: { fontSize: 12, color: COLORS.muted },
  statsBox: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  statLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statLabel: { fontSize: 12, color: COLORS.muted },
  statValue: { fontSize: 12, fontWeight: '600', color: COLORS.ink },
  sectionTitle: { fontWeight: '700', fontSize: 14, color: COLORS.ink, marginBottom: 6 },
  desc: { fontSize: 13, color: COLORS.muted, lineHeight: 19 },
  footer: { padding: SPACING.md, borderTopWidth: 1, borderTopColor: COLORS.line, backgroundColor: COLORS.sand },
});