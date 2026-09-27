    import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashScreen from './screens/SplashScreen';
import AppDrawer from './navigation/AppDrawer';
import { BookingProvider } from './BookingContext';

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BookingProvider>
          <NavigationContainer>
            <StatusBar style="dark" />
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
              <RootStack.Screen name="Splash" component={SplashScreen} />
              <RootStack.Screen name="Drawer" component={AppDrawer} />
            </RootStack.Navigator>
          </NavigationContainer>
        </BookingProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}