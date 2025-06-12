import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthStack from './AuthStack';
import AppTabs from './AppTabs';
import ProfileSelectionScreen from '../screens/ProfileSelectionScreen';
import { AuthContext } from '../state/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = Platform.OS === 'web'
  ? {
      getItem: async (key) => Promise.resolve(localStorage.getItem(key)),
      setItem: async (key, value) => Promise.resolve(localStorage.setItem(key, value)),
      removeItem: async (key) => Promise.resolve(localStorage.removeItem(key)),
      clear: async () => Promise.resolve(localStorage.clear()),
    }
  : AsyncStorage;

const Stack = createStackNavigator();

function Router() {
  const { user } = useContext(AuthContext);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setSelectedProfile(null);
        setLoading(false);
        return;
      }

      try {
        const data = await Storage.getItem('selectedProfile');
        if (data) {
          setSelectedProfile(JSON.parse(data));
        } else {
          setSelectedProfile(null);
        }
      } catch (error) {
        console.error('Error loading selectedProfile:', error);
      }

      setLoading(false);
    };

    loadProfile();
  }, [user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      ) : !selectedProfile ? (
        <>
          <Stack.Screen name="ProfileSelection" component={ProfileSelectionScreen} />
          <Stack.Screen name="CreateProfileScreen" component={require('../screens/CreateProfileScreen').default} />
          <Stack.Screen name="ChooseAvatarScreen" component={require('../screens/ChooseAvatarScreen').default} />
          <Stack.Screen name="CreateProfileConfirm" component={require('../screens/CreateProfileConfirm').default} />
        </>
      ) : (
        <Stack.Screen name="AppTabs" component={AppTabs} />
      )}
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}

