// src/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateProfileScreen from './src/screens/CreateProfileScreen';
import ChooseAvatarScreen from './src/screens/ChooseAvatarScreen';
import CreateProfileConfirm from './src/screens/CreateProfileConfirm';
import HomeScreen from './src/screens/HomeScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CreateProfileScreen" component={CreateProfileScreen} />
        <Stack.Screen name="ChooseAvatarScreen" component={ChooseAvatarScreen} />
        <Stack.Screen name="CreateProfileConfirm" component={CreateProfileConfirm} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



