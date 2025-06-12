import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../state/AuthContext';

export default function AccountScreen({ navigation }) {
  const { logout } = useContext(AuthContext);

  return (
    <View style={{ padding: 20 }}>
      <Text>Opciones de cuenta</Text>
      <Button title="Ajustes de Perfil" onPress={() => navigation.navigate('ProfileSettings')} />
      <Button title="Cerrar sesión" onPress={logout} />
    </View>
  );
}
