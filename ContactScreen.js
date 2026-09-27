import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import AppButton from '../components/AppButton';
import { COLORS, SPACING, RADIUS } from '../theme';

const CONTACT_INFO = [
  { icon: 'call-outline', title: '+27 72 123 4567', subtitle: 'Mon - Fri, 08:00 - 17:00' },
  { icon: 'mail-outline', title: 'info@adventureescapesa.co.za', subtitle: "We'll reply within 24 hours" },
  { icon: 'location-outline', title: '12 Mountain View Road', subtitle: 'Hout Bay, Cape Town, 7806' },
];

export default function ContactScreen() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScreenHeader title="Contact Us" showMenu />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Get In Touch</Text>
        {CONTACT_INFO.map((c) => (
          <View key={c.title} style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Ionicons name={c.icon} size={16} color={COLORS.forest} />
            </View>
            <View>
              <Text style={styles.infoTitle}>{c.title}</Text>
              <Text style={styles.infoSubtitle}>{c.subtitle}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Send Us a Message</Text>
        <View style={styles.field}>
          <Ionicons name="person-outline" size={16} color={COLORS.muted} />
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={form.name}
            onChangeText={(t) => setForm({ ...form, name: t })}
          />
        </View>
        <View style={styles.field}>
          <Ionicons name="mail-outline" size={16} color={COLORS.muted} />
          <TextInput
            placeholder="Email Address"
            style={styles.input}
            value={form.email}
            onChangeText={(t) => setForm({ ...form, email: t })}
          />
        </View>
        <View style={[styles.field, { alignItems: 'flex-start', paddingTop: 10 }]}>
          <Ionicons name="chatbox-outline" size={16} color={COLORS.muted} />
          <TextInput
            placeholder="Your Message"
            style={[styles.input, { height: 70 }]}
            multiline
            value={form.message}
            onChangeText={(t) => setForm({ ...form, message: t })}
          />
        </View>
        <AppButton title="SEND MESSAGE" variant="primary" />

        <Text style={styles.sectionTitle}>Our Location</Text>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=700' }}
          style={styles.map}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.sand },
  content: { padding: SPACING.md, paddingBottom: SPACING.xl },
  sectionTitle: { fontWeight: '700', fontSize: 14, color: COLORS.ink, marginTop: SPACING.md, marginBottom: SPACING.sm },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.sm },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTitle: { fontSize: 13, fontWeight: '600', color: COLORS.ink },
  infoSubtitle: { fontSize: 11, color: COLORS.muted },
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
  map: { width: '100%', height: 100, borderRadius: RADIUS.md },
});