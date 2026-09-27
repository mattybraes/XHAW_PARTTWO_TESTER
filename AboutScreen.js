import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import Card from '../components/Card';
import { COLORS, SPACING, RADIUS } from '../theme';

const INFO = [
  { icon: 'locate', bg: COLORS.forest, title: 'Our Mission', text: 'To provide authentic adventures that inspire people and protect nature.' },
  { icon: 'eye', bg: '#3B2A20', title: 'Our Vision', text: "To be South Africa's leading adventure company for sustainable tourism." },
  { icon: 'people', bg: COLORS.sunset, title: 'Our Values', text: 'Safety, Sustainability, Community, Adventure.' },
];

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScreenHeader title="About Us" showMenu />
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=700' }}
          style={styles.image}
        />
        <Text style={styles.h2}>About Us</Text>
        <Text style={styles.body}>
          Adventure Escape SA is a tourism business based in the beautiful Western Cape. We offer a
          variety of outdoor activities and adventure packages for individuals, families, and groups
          who want to explore, educate and create unforgettable memories.
        </Text>
        {INFO.map((item) => (
          <Card key={item.title} style={styles.infoCard}>
            <View style={[styles.iconWrap, { backgroundColor: item.bg }]}>
              <Ionicons name={item.icon} size={18} color={COLORS.white} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoTitle}>{item.title}</Text>
              <Text style={styles.infoText}>{item.text}</Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.sand },
  content: { padding: SPACING.md, paddingBottom: SPACING.xl },
  image: { width: '100%', height: 130, borderRadius: RADIUS.md, marginBottom: SPACING.md },
  h2: { fontSize: 18, fontWeight: '800', color: COLORS.forest, marginBottom: SPACING.xs },
  body: { color: COLORS.ink, fontSize: 13, lineHeight: 19, marginBottom: SPACING.md },
  infoCard: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: SPACING.sm },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  infoTitle: { fontWeight: '700', fontSize: 13, color: COLORS.ink, marginBottom: 2 },
  infoText: { fontSize: 12, color: COLORS.muted },
}); 