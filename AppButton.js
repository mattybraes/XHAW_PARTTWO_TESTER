import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../theme';

export default function AppButton({ title, onPress, variant = 'primary', style, icon }) {
  const bg =
    variant === 'primary' ? COLORS.forest : variant === 'accent' ? COLORS.sunset : 'transparent';
  const textColor = variant === 'outline' ? COLORS.forest : COLORS.white;
  const border = variant === 'outline' ? { borderWidth: 1.5, borderColor: COLORS.forest } : {};

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.button, { backgroundColor: bg }, border, style]}
    >
      <Text style={[styles.text, { color: textColor }]}>
        {title} {icon ? icon : ''}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
  },
});