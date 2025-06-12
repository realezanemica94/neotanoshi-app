import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen';

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AccountHome" component={AccountScreen} options={{ title: 'Cuenta' }} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} options={{ title: 'Ajustes de Perfil' }} />
    </Stack.Navigator>
  );
}
