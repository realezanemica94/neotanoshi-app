// src/App.js
import React, { useContext } from 'react';
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
import AppTabs from './src/navigation/AppTabs';

import FavoriteScreen from './src/screens/FavoriteScreen'; 
import CreateLists from './src/screens/CreateLists';



import { ActivityIndicator, View } from 'react-native'; // para loading

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user, activeProfile, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </>
      ) : activeProfile ? (
        <>
          <Stack.Screen name="AppTabs" component={AppTabs} />
          <Stack.Screen name="CreateLists" component={CreateLists} />
          <Stack.Screen name="ProfileSelectionScreen" component={ProfileSelectionScreen} />
          <Stack.Screen name="CreateProfileScreen" component={CreateProfileScreen} />
          <Stack.Screen name="ChooseAvatarScreen" component={ChooseAvatarScreen} />
          <Stack.Screen name="CreateProfileConfirm" component={CreateProfileConfirm} />
        </>
      ) : (
        <>
          <Stack.Screen name="ProfileSelectionScreen" component={ProfileSelectionScreen} />
          <Stack.Screen name="CreateProfileScreen" component={CreateProfileScreen} />
          <Stack.Screen name="ChooseAvatarScreen" component={ChooseAvatarScreen} />
          <Stack.Screen name="CreateProfileConfirm" component={CreateProfileConfirm} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
          <Stack.Screen name="CreateLists" component={CreateLists} />
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
