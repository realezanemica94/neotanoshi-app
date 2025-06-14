import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
  Platform,
} from 'react-native';
import axios from 'axios';

const API_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3000/api/auth'
    : 'http://localhost:3000/api/auth';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      await axios.post(`${API_URL}/reset-password`, {
        email: normalizedEmail,
        newPassword,
      });

      Alert.alert('Éxito', 'Contraseña restablecida correctamente');
      navigation.navigate('Login');
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      Alert.alert('Error', err.response?.data?.error || 'No se pudo restablecer la contraseña');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/LoginScreen.jpeg')} // usa tu imagen de fondo
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Restablecer contraseña</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Nueva contraseña"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirme nueva contraseña"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Restablecer Contraseña</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1e1e1e',
    borderWidth: 1,
    borderColor: '#3f51b5',
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
    color: '#fff',
  },
  button: {
    backgroundColor: '#3f51b5',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginLink: {
    color: '#00ffff',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
});
