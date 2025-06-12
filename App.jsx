// src/App.js
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './src/state/AuthContext';

import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';

import CreateProfileScreen from './src/screens/CreateProfileScreen';
import ChooseAvatarScreen from './src/screens/ChooseAvatarScreen';
import CreateProfileConfirm from './src/screens/CreateProfileConfirm';
import ProfileSelectionScreen from './src/screens/ProfileSelectionScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="ProfileSelectionScreen" component={ProfileSelectionScreen} />
          <Stack.Screen name="CreateProfileScreen" component={CreateProfileScreen} />
          <Stack.Screen name="ChooseAvatarScreen" component={ChooseAvatarScreen} />
          <Stack.Screen name="CreateProfileConfirm" component={CreateProfileConfirm} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

