// /screens/AuthOrProfileSwitch.jsx

import React, { useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../state/AuthContext';

export default function AuthOrProfileSwitch({ navigation }) {
  const { activeProfile, isLoading } = useContext(AuthContext);

useEffect(() => {
  console.log('Evaluando navegación...');
  console.log('Perfil activo:', activeProfile);
  console.log('¿Está cargando?', isLoading);

  if (isLoading) return;

  if (activeProfile) {
    navigation.reset({ index: 0, routes: [{ name: 'AppTabs' }] });
  } else {
    navigation.reset({ index: 0, routes: [{ name: 'ProfileSelection' }] });
  }
}, [activeProfile, isLoading]);


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#3b82f6" />
    </View>
  );
}
