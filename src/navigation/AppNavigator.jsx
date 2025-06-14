// AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTabs from '../navigation/AppTabs';
import CreateListScreen from '../screens/CreateLists'; // Ajusta la ruta si es diferente
import ProfileSelectionScreen from '../screens/ProfileSelectionScreen';
import AuthOrProfileSwitch from '../screens/AuthOrProfileSwitch';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Startup" component={AuthOrProfileSwitch} />
      <Stack.Screen name="AppTabs" component={AppTabs} />
      <Stack.Screen name="ProfileSelection" component={ProfileSelectionScreen} />
      <Stack.Screen name="CreateList" component={CreateListScreen} />
    </Stack.Navigator>
  );
}
