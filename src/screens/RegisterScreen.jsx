import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
} from 'react-native';
import { AuthContext } from '../state/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      await register(email, password);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Startup' }],
      });
    } catch (err) {
      console.error('Error en handleRegister:', err);
      Alert.alert('Error', 'Registro fallido.');
    }
  };


  return (
    <ImageBackground
      source={require('../assets/images/LoginScreen.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.headerText}>
          ¡Te damos la bienvenida a NeoTaoshi! Ingresa tus datos para registrarte
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ddd"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#ddd"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.termsText}>
          Al crear la cuenta accedes a nuestros{' '}
          <Text style={styles.link}>términos</Text> y{' '}
          <Text style={styles.link}>condiciones</Text>
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <Text style={styles.bottomText}>
          ¿Ya tienes una cuenta?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
            Inicia sesión
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1c1c1c',
    borderColor: '#6a5acd',
    borderWidth: 2,
    borderRadius: 6,
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
    width: '100%',
  },
  termsText: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
  },
  link: {
    color: '#3b82f6',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bottomText: {
    color: '#00e6f6',
    marginTop: 10,
    fontSize: 13,
  },
});
