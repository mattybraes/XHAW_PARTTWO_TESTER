import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import { ACTIVITIES } from '../data';
import { COLORS, SPACING, RADIUS } from '../theme';

const FILTERS = ['All', 'Land', 'Water', 'Adventure'];

export default function ActivitiesScreen({ navigation }) {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? ACTIVITIES : ACTIVITIES.filter((a) => a.category === filter);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScreenHeader title="Individual Activities" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.pill, filter === f && styles.pillActive]}
          >
            <Text style={[styles.pillText, filter === f && styles.pillTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={styles.list}>
        {filtered.map((a) => (
          <TouchableOpacity
            key={a.id}
            style={styles.card}
            onPress={() => navigation.navigate('ActivityDetail', { activityId: a.id })}
          >
            <Image source={{ uri: a.image }} style={styles.thumb} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{a.name}</Text>
              <Text style={styles.desc} numberOfLines={2}>
                {a.description}
              </Text>
              <View style={styles.metaRow}>
                <Ionicons name="speedometer-outline" size={12} color={COLORS.muted} />
                <Text style={styles.metaText}>{a.difficulty}</Text>
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.price}>R{a.price}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={12} color={COLORS.sunset} />
                  <Text style={styles.rating}>
                    {a.rating} ({a.reviews})
                  </Text>
                </View>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.sand },
  filters: { paddingHorizontal: SPACING.md, paddingBottom: SPACING.sm },
  pill: {
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    marginRight: SPACING.sm,
  },
  pillActive: { backgroundColor: COLORS.forest, borderColor: COLORS.forest },
  pillText: { fontSize: 12, color: COLORS.ink },
  pillTextActive: { color: COLORS.white, fontWeight: '600' },
  list: { padding: SPACING.md, paddingBottom: SPACING.xl },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  thumb: { width: 64, height: 64, borderRadius: RADIUS.sm, marginRight: SPACING.sm },
  name: { fontWeight: '700', fontSize: 13, color: COLORS.ink },
  desc: { fontSize: 11, color: COLORS.muted, marginTop: 2 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 },
  metaText: { fontSize: 10, color: COLORS.muted },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  price: { fontWeight: '800', color: COLORS.forest, fontSize: 13 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  rating: { fontSize: 10, color: COLORS.muted },
});