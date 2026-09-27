import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { COLORS, SPACING } from '../theme';

export default function ScreenHeader({ title, showMenu = false, rightIcon, onRightPress }) {
  const navigation = useNavigation();

  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() =>
          showMenu ? navigation.dispatch(DrawerActions.openDrawer()) : navigation.goBack()
        }
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name={showMenu ? 'menu' : 'chevron-back'} size={24} color={COLORS.ink} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {rightIcon ? (
        <TouchableOpacity onPress={onRightPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name={rightIcon} size={22} color={COLORS.ink} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.ink,
  },
});