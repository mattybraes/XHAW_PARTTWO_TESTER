import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import AppButton from '../components/AppButton';
import { useBooking } from '../BookingContext';
import { COLORS, SPACING, RADIUS } from '../theme';

function generateReference() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = String(Math.floor(Math.random() * 9999)).padStart(4, '0');
  return `AESA-${y}${m}${d}-${rand}`;
}

export default function BookingScreen({ route, navigation }) {
  const { details, people, bookingInfo, setBookingInfo, setReference } = useBooking();
  const [agreed, setAgreed] = useState(false);
  const total = route.params?.total ?? '0';

  const handleConfirm = () => {
    if (!agreed) return;
    setReference(generateReference());
    navigation.navigate('Confirmation', { total });
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScreenHeader title="Book Your Adventure" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <View style={styles.field}>
          <Ionicons name="calendar-outline" size={16} color={COLORS.muted} />
          <TextInput
            placeholder="Sat, 18 Oct 2026"
            style={styles.input}
            value={bookingInfo.date}
            onChangeText={(t) => setBookingInfo({ ...bookingInfo, date: t })}
          />
        </View>

        <Text style={styles.sectionTitle}>Preferred Time</Text>
        <View style={styles.field}>
          <Ionicons name="time-outline" size={16} color={COLORS.muted} />
          <TextInput
            placeholder="09:00 AM"
            style={styles.input}
            value={bookingInfo.time}
            onChangeText={(t) => setBookingInfo({ ...bookingInfo, time: t })}
          />
        </View>

        <Text style={styles.sectionTitle}>Participant Details</Text>
        <View style={styles.field}>
          <Ionicons name="people-outline" size={16} color={COLORS.muted} />
          <Text style={styles.input}>{people} Participant{people > 1 ? 's' : ''}</Text>
        </View>
        <View style={styles.field}>
          <Ionicons name="call-outline" size={16} color={COLORS.muted} />
          <Text style={styles.input}>{details.phone || 'Contact Number'}</Text>
        </View>

        <Text style={styles.sectionTitle}>Emergency Contact</Text>
        <View style={styles.field}>
          <Ionicons name="person-outline" size={16} color={COLORS.muted} />
          <TextInput
            placeholder="Name & Number"
            style={styles.input}
            value={bookingInfo.emergencyContact}
            onChangeText={(t) => setBookingInfo({ ...bookingInfo, emergencyContact: t })}
          />
        </View>

        <TouchableOpacity style={styles.checkRow} onPress={() => setAgreed(!agreed)}>
          <Ionicons name={agreed ? 'checkbox' : 'square-outline'} size={20} color={COLORS.forest} />
          <Text style={styles.checkLabel}>I agree to the Terms & Conditions</Text>
        </TouchableOpacity>

        <AppButton
          title="CONFIRM BOOKING"
          icon="→"
          variant="primary"
          style={{ marginTop: SPACING.lg }}
          onPress={handleConfirm}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.sand },
  content: { padding: SPACING.md, paddingBottom: SPACING.xl },
  sectionTitle: { fontWeight: '700', fontSize: 13, color: COLORS.forest, marginTop: SPACING.md, marginBottom: SPACING.sm },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    gap: SPACING.sm,
  },
  input: { flex: 1, paddingVertical: 10, fontSize: 13, color: COLORS.ink },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginTop: SPACING.md },
  checkLabel: { fontSize: 12, color: COLORS.ink, flex: 1 },
});