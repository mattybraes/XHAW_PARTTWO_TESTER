import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useBooking } from '../BookingContext';
import { PACKAGES } from '../data';
import { COLORS, SPACING, RADIUS } from '../theme';

const MENU_ITEMS = [
  { icon: 'heart-outline', label: 'Booking History' },
  { icon: 'star-outline', label: 'Saved Adventures' },
  { icon: 'settings-outline', label: 'Settings' },
  { icon: 'help-circle-outline', label: 'Help & Support' },
];

export default function ProfileScreen({ navigation }) {
  const { reference, selectedPackages, bookingInfo, people } = useBooking();
  const pkg = PACKAGES.find((p) => selectedPackages.includes(p.id));

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Ionicons name="menu" size={26} color={COLORS.ink} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Adventures</Text>
        <View style={{ width: 26 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={28} color={COLORS.white} />
          </View>
          <View>
            <Text style={styles.name}>Robert Jones</Text>
            <Text style={styles.role}>Adventure Seeker</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.muted} style={{ marginLeft: 'auto' }} />
        </View>

        {reference && pkg ? (
          <>
            <Text style={styles.sectionTitle}>Upcoming Booking</Text>
            <View style={styles.bookingCard}>
              <Image source={{ uri: pkg.image }} style={styles.thumb} />
              <View style={{ flex: 1 }}>
                <Text style={styles.pkgName}>{pkg.name}</Text>
                <Text style={styles.pkgMeta}>
                  {bookingInfo.date || '—'} · {bookingInfo.time || '—'}
                </Text>
                <Text style={styles.pkgMeta}>{people} People</Text>
                <TouchableOpacity style={styles.viewBtn}>
                  <Text style={styles.viewBtnText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <Text style={styles.emptyText}>No upcoming bookings yet — go explore an adventure!</Text>
        )}

        {MENU_ITEMS.map((item) => (
          <TouchableOpacity key={item.label} style={styles.menuRow}>
            <Ionicons name={item.icon} size={18} color={COLORS.forest} />
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.muted} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
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
  content: { padding: SPACING.md, paddingBottom: SPACING.xl },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.lg },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.forest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontSize: 15, fontWeight: '700', color: COLORS.ink },
  role: { fontSize: 12, color: COLORS.muted },
  sectionTitle: { fontWeight: '700', fontSize: 13, color: COLORS.forest, marginBottom: SPACING.sm },
  emptyText: { fontSize: 12, color: COLORS.muted, marginBottom: SPACING.lg },
  bookingCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  thumb: { width: 60, height: 60, borderRadius: RADIUS.sm, marginRight: SPACING.sm },
  pkgName: { fontWeight: '700', fontSize: 13, color: COLORS.ink },
  pkgMeta: { fontSize: 11, color: COLORS.muted },
  viewBtn: { backgroundColor: COLORS.forest, borderRadius: 6, paddingVertical: 5, alignItems: 'center', marginTop: 6 },
  viewBtnText: { color: COLORS.white, fontSize: 11, fontWeight: '700' },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  menuLabel: { fontSize: 13, color: COLORS.ink },
});