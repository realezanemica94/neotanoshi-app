import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function CreateProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // Ir a pantalla de selección de avatar
  const goToAvatarScreen = () => {
    if (!name.trim()) {
      alert('Por favor ingresa un nombre de perfil.');
      return;
    }

    navigation.navigate('ChooseAvatarScreen', {
      name,
      password,
    });
  };

  // Ir directamente a confirmar perfil sin avatar
  const skipAvatar = () => {
    if (!name.trim()) {
      alert('Por favor ingresa un nombre de perfil.');
      return;
    }

    navigation.navigate('CreateProfileConfirm', {
      name,
      password,
      selectedAvatar: null, // clave correcta esperada por la pantalla 3
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear perfil</Text>

      {/* Botón "+" para seleccionar avatar */}
      <TouchableOpacity style={styles.avatarUpload} onPress={goToAvatarScreen}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>

      {/* Campos de entrada */}
      <TextInput
        placeholder="Nombre de Perfil"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Contraseña (Opcional)"
        placeholderTextColor="#ccc"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* Botón para saltar selección de avatar */}
      <TouchableOpacity style={styles.button} onPress={skipAvatar}>
        <Text style={styles.buttonText}>Crear Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0c0c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  avatarUpload: {
    backgroundColor: '#ccc',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  plus: {
    fontSize: 40,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    backgroundColor: '#000',
    borderColor: '#3b82f6',
    borderWidth: 2,
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 8,
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
