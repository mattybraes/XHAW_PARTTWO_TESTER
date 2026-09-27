import React, { useMemo } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import AppButton from '../components/AppButton';
import { useBooking } from '../BookingContext';
import { PACKAGES, ACTIVITIES } from '../data';
import { COLORS, SPACING, RADIUS } from '../theme';

const VAT_RATE = 0.15;

export default function QuoteScreen({ navigation }) {
  const { selectedPackages, selectedActivities, people } = useBooking();

  const packages = PACKAGES.filter((p) => selectedPackages.includes(p.id));
  const activities = ACTIVITIES.filter((a) => selectedActivities.includes(a.id));

  const { subtotal, vat, total } = useMemo(() => {
    const pkgTotal = packages.reduce((sum, p) => sum + p.price, 0);
    const actTotal = activities.reduce((sum, a) => sum + a.price, 0);
    const sub = (pkgTotal + actTotal) * people;
    const v = sub * VAT_RATE;
    return { subtotal: sub, vat: v, total: sub + v };
  }, [packages, activities, people]);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScreenHeader title="YOUR QUOTE" />
      <ScrollView contentContainerStyle={styles.content}>
        {packages.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Selected Package{packages.length > 1 ? 's' : ''}</Text>
            {packages.map((p) => (
              <View key={p.id} style={styles.card}>
                <Image source={{ uri: p.image }} style={styles.thumb} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{p.name}</Text>
                  <Text style={styles.price}>R{p.price}</Text>
                  <Text style={styles.desc} numberOfLines={2}>{p.description}</Text>
                </View>
              </View>
            ))}
          </>
        )}

        {activities.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Selected Activit{activities.length > 1 ? 'ies' : 'y'}</Text>
            {activities.map((a) => (
              <View key={a.id} style={styles.card}>
                <Image source={{ uri: a.image }} style={styles.thumb} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{a.name}</Text>
                  <Text style={styles.price}>R{a.price}</Text>
                  <Text style={styles.desc} numberOfLines={2}>{a.description}</Text>
                </View>
              </View>
            ))}
          </>
        )}

        <Text style={styles.sectionTitle}>Number of People</Text>
        <Text style={styles.peopleValue}>{people}</Text>

        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>R{subtotal.toFixed(0)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Vat (15%)</Text>
          <Text style={styles.summaryValue}>R{vat.toFixed(0)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>R{total.toFixed(0)}</Text>
        </View>

        <AppButton
          title="CONTINUE TO BOOKING"
          icon="→"
          variant="accent"
          style={{ marginTop: SPACING.lg }}
          onPress={() => navigation.navigate('Booking', { total: total.toFixed(0) })}
        />
        <AppButton
          title="EDIT SELECTION"
          variant="outline"
          style={{ marginTop: SPACING.sm }}
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.sand },
  content: { padding: SPACING.md, paddingBottom: SPACING.xl },
  sectionTitle: { fontWeight: '700', fontSize: 13, color: COLORS.forest, marginTop: SPACING.md, marginBottom: SPACING.sm },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  thumb: { width: 56, height: 56, borderRadius: RADIUS.sm, marginRight: SPACING.sm },
  name: { fontWeight: '700', fontSize: 13, color: COLORS.ink },
  price: { color: COLORS.forest, fontWeight: '700', fontSize: 12 },
  desc: { fontSize: 11, color: COLORS.muted, marginTop: 2 },
  peopleValue: { fontSize: 16, fontWeight: '700', color: COLORS.ink },
  divider: { height: 1, backgroundColor: COLORS.line, marginVertical: SPACING.md },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  summaryLabel: { fontSize: 13, color: COLORS.muted },
  summaryValue: { fontSize: 13, color: COLORS.ink },
  totalLabel: { fontSize: 16, fontWeight: '800', color: COLORS.forest },
  totalValue: { fontSize: 16, fontWeight: '800', color: COLORS.forest },
});