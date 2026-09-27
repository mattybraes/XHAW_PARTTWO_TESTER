import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { PACKAGES } from '../data';
import { COLORS, SPACING, RADIUS } from '../theme';

const FILTERS = ['All', 'Day Trips', 'Weekend', 'Group'];

export default function PackagesScreen({ navigation }) {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? PACKAGES : PACKAGES.filter((p) => p.category === filter);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Ionicons name="menu" size={26} color={COLORS.ink} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adventure Packages</Text>
        <View style={{ width: 26 }} />
      </View>

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
        {filtered.map((pkg) => (
          <View key={pkg.id} style={styles.card}>
            <Image source={{ uri: pkg.image }} style={styles.thumb} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{pkg.name}</Text>
              <Text style={styles.desc} numberOfLines={2}>
                {pkg.description}
              </Text>
              <View style={styles.cardFooter}>
                <Text style={styles.price}>R{pkg.price}</Text>
                <TouchableOpacity
                  style={styles.bookBtn}
                  onPress={() => navigation.navigate('Calculate', { screen: 'CalculateFees', params: { packageId: pkg.id } })}
                >
                  <Text style={styles.bookBtnText}>BOOK NOW →</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.sand },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: COLORS.ink },
  filters: { paddingHorizontal: SPACING.md, gap: SPACING.sm, paddingBottom: SPACING.sm },
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
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  thumb: { width: 70, height: 70, borderRadius: RADIUS.sm, marginRight: SPACING.sm },
  name: { fontWeight: '700', fontSize: 13, color: COLORS.ink },
  desc: { fontSize: 11, color: COLORS.muted, marginTop: 2 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  price: { fontWeight: '800', color: COLORS.forest, fontSize: 14 },
  bookBtn: { backgroundColor: COLORS.sunset, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  bookBtnText: { color: COLORS.white, fontSize: 10, fontWeight: '700' },
});