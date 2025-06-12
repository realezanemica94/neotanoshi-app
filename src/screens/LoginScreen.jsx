import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { AuthContext } from '../state/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Contraseña" value={password} secureTextEntry onChangeText={setPassword} />
      <Button title="Iniciar sesión" onPress={() => login(email, password)} />
      <Text onPress={() => navigation.navigate('ForgotPassword')}>¿Olvidaste tu contraseña?</Text>
    </View>
  );
}
