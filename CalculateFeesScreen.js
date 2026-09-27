import React, { useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import AppButton from '../components/AppButton';
import { useBooking } from '../BookingContext';
import { PACKAGES, ACTIVITIES } from '../data';
import { COLORS, SPACING, RADIUS } from '../theme';

export default function CalculateFeesScreen({ route, navigation }) {
  const {
    details,
    setDetails,
    selectedPackages,
    togglePackage,
    selectedActivities,
    toggleActivity,
    people,
    setPeople,
  } = useBooking();

  useEffect(() => {
    const pkgId = route.params?.packageId;
    const actId = route.params?.activityId;
    if (pkgId && !selectedPackages.includes(pkgId)) togglePackage(pkgId);
    if (actId && !selectedActivities.includes(actId)) toggleActivity(actId);
  }, [route.params]);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScreenHeader title="Calculate Fees" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Your Details</Text>
        <View style={styles.field}>
          <Ionicons name="person-outline" size={16} color={COLORS.muted} />
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={details.name}
            onChangeText={(t) => setDetails({ ...details, name: t })}
          />
        </View>
        <View style={styles.field}>
          <Ionicons name="call-outline" size={16} color={COLORS.muted} />
          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            keyboardType="phone-pad"
            value={details.phone}
            onChangeText={(t) => setDetails({ ...details, phone: t })}
          />
        </View>
        <View style={styles.field}>
          <Ionicons name="mail-outline" size={16} color={COLORS.muted} />
          <TextInput
            placeholder="Email Address"
            style={styles.input}
            keyboardType="email-address"
            value={details.email}
            onChangeText={(t) => setDetails({ ...details, email: t })}
          />
        </View>

        <Text style={styles.sectionTitle}>Select Packages</Text>
        {PACKAGES.map((p) => (
          <TouchableOpacity key={p.id} style={styles.checkRow} onPress={() => togglePackage(p.id)}>
            <Ionicons
              name={selectedPackages.includes(p.id) ? 'checkbox' : 'square-outline'}
              size={20}
              color={COLORS.forest}
            />
            <Text style={styles.checkLabel}>
              {p.name} (R{p.price})
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Individual Activities</Text>
        {ACTIVITIES.map((a) => (
          <TouchableOpacity key={a.id} style={styles.checkRow} onPress={() => toggleActivity(a.id)}>
            <Ionicons
              name={selectedActivities.includes(a.id) ? 'checkbox' : 'square-outline'}
              size={20}
              color={COLORS.forest}
            />
            <Text style={styles.checkLabel}>
              {a.name} (R{a.price})
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Number of People</Text>
        <View style={styles.stepper}>
          <TouchableOpacity
            style={styles.stepperBtn}
            onPress={() => setPeople(Math.max(1, people - 1))}
          >
            <Ionicons name="remove" size={18} color={COLORS.ink} />
          </TouchableOpacity>
          <Text style={styles.stepperValue}>{people}</Text>
          <TouchableOpacity style={styles.stepperBtn} onPress={() => setPeople(people + 1)}>
            <Ionicons name="add" size={18} color={COLORS.ink} />
          </TouchableOpacity>
        </View>

        <AppButton
          title="CALCULATE QUOTE"
          variant="accent"
          style={{ marginTop: SPACING.lg }}
          onPress={() => navigation.navigate('Quote')}
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
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  input: { flex: 1, paddingVertical: 10, fontSize: 13, color: COLORS.ink },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, paddingVertical: 6 },
  checkLabel: { fontSize: 13, color: COLORS.ink },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  stepperBtn: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  stepperValue: { fontSize: 16, fontWeight: '700', color: COLORS.ink },
});