    import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabs from './MainTabs';
import AboutScreen from '../screens/AboutScreen';
import ContactScreen from '../screens/ContactScreen';
import { COLORS } from '../theme';

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: COLORS.forest,
        drawerLabelStyle: { fontSize: 14, fontWeight: '600' },
      }}
    >
      <Drawer.Screen name="MainTabs" component={MainTabs} options={{ title: 'Home' }} />
      <Drawer.Screen name="About" component={AboutScreen} options={{ title: 'About Us' }} />
      <Drawer.Screen name="Contact" component={ContactScreen} options={{ title: 'Contact Us' }} />
    </Drawer.Navigator>
  );
}