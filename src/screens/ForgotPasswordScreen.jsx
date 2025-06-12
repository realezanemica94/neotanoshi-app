import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleReset = async () => {
    await axios.post('http://localhost:3000/api/auth/reset-password', { email, newPassword });
    Alert.alert('Contraseña restablecida');
    navigation.navigate('Login');
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Nueva contraseña" secureTextEntry value={newPassword} onChangeText={setNewPassword} />
      <Button title="Restablecer" onPress={handleReset} />
    </View>
  );
}
