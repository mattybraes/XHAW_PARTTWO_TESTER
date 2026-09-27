import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import PackagesScreen from '../screens/PackagesScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import ActivityDetailScreen from '../screens/ActivityDetailScreen';
import CalculateFeesScreen from '../screens/CalculateFeesScreen';
import QuoteScreen from '../screens/QuoteScreen';
import BookingScreen from '../screens/BookingScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS } from '../theme';

const Tab = createBottomTabNavigator();
const ExploreStack = createNativeStackNavigator();
const CalculateStack = createNativeStackNavigator();

function ExploreStackScreen() {
  return (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
      <ExploreStack.Screen name="Packages" component={PackagesScreen} />
      <ExploreStack.Screen name="Activities" component={ActivitiesScreen} />
      <ExploreStack.Screen name="ActivityDetail" component={ActivityDetailScreen} />
    </ExploreStack.Navigator>
  );
}

function CalculateStackScreen() {
  return (
    <CalculateStack.Navigator screenOptions={{ headerShown: false }}>
      <CalculateStack.Screen name="CalculateFees" component={CalculateFeesScreen} />
      <CalculateStack.Screen name="Quote" component={QuoteScreen} />
      <CalculateStack.Screen name="Booking" component={BookingScreen} />
      <CalculateStack.Screen name="Confirmation" component={ConfirmationScreen} />
    </CalculateStack.Navigator>
  );
}

const ICONS = {
  Home: 'home',
  Explore: 'compass',
  Calculate: 'calculator',
  Profile: 'person',
};

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.forest,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={ICONS[route.name]} size={size - 4} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreStackScreen} options={{ title: 'Explore' }} />
      <Tab.Screen name="Calculate" component={CalculateStackScreen} options={{ title: 'Calculate' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}