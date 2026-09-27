import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../components/AppButton';
import { useBooking } from '../BookingContext';
import { PACKAGES } from '../data';
import { COLORS, SPACING, RADIUS } from '../theme';

export default function ConfirmationScreen({ route, navigation }) {
  const { reference, selectedPackages, people, bookingInfo, reset } = useBooking();
  const total = route.params?.total ?? '0';
  const pkg = PACKAGES.find((p) => selectedPackages.includes(p.id));

  const handleBackHome = () => {
    reset();
    navigation.popToTop();
    navigation.getParent()?.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={36} color={COLORS.white} />
        </View>
        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>Your adventure is all set. We can't wait for you to join us!</Text>

        <View style={styles.refBox}>
          <Text style={styles.refLabel}>Booking Reference</Text>
          <Text style={styles.refValue}>{reference}</Text>
        </View>

        <View style={styles.detailsCard}>
          <DetailRow icon="trail-sign-outline" label="Adventure" value={pkg?.name ?? '—'} />
          <DetailRow icon="calendar-outline" label="Date" value={bookingInfo.date || '—'} />
          <DetailRow icon="time-outline" label="Time" value={bookingInfo.time || '—'} />
          <DetailRow icon="people-outline" label="Number of People" value={String(people)} />
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Paid</Text>
          <Text style={styles.amountLabel}>Amount Due</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalValue}>R{total}</Text>
          <Text style={styles.amountValue}>R0</Text>
        </View>

        <AppButton title="VIEW BOOKING" variant="primary" style={{ marginTop: SPACING.lg }} />
        <AppButton title="BACK TO HOME" variant="outline" style={{ marginTop: SPACING.sm }} onPress={handleBackHome} />
      </View>
    </SafeAreaView>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <View style={styles.detailRow}>
      <Ionicons name={icon} size={16} color={COLORS.forest} />
      <View>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.sand },
  content: { padding: SPACING.lg, alignItems: 'center' },
  checkCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.forest,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
  },
  title: { fontSize: 20, fontWeight: '800', color: COLORS.forest },
  subtitle: { fontSize: 12, color: COLORS.muted, textAlign: 'center', marginTop: 4, marginBottom: SPACING.lg },
  refBox: {
    backgroundColor: '#E7F0EA',
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    width: '100%',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  refLabel: { fontSize: 11, color: COLORS.moss, fontWeight: '600' },
  refValue: { fontSize: 15, fontWeight: '800', color: COLORS.forest, marginTop: 2 },
  detailsCard: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  detailRow: { flexDirection: 'row', gap: SPACING.sm, alignItems: 'flex-start' },
  detailLabel: { fontSize: 11, color: COLORS.muted },
  detailValue: { fontSize: 13, fontWeight: '600', color: COLORS.ink },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: SPACING.md },
  totalLabel: { fontSize: 12, color: COLORS.muted },
  amountLabel: { fontSize: 12, color: COLORS.muted },
  totalValue: { fontSize: 18, fontWeight: '800', color: COLORS.forest },
  amountValue: { fontSize: 18, fontWeight: '800', color: COLORS.ink },
});