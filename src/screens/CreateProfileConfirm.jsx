import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateProfileConfirm({ route, navigation }) {
  const { selectedAvatar, name: initialName, password: initialPassword } = route.params;

  const [name, setName] = useState(initialName || '');
  const [password, setPassword] = useState(initialPassword || '');

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert('Por favor ingresa un nombre de perfil.');
      return;
    }

    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'));

      if (!user || !user._id) {
        Alert.alert('Usuario no encontrado.');
        return;
      }

      const formData = new FormData();
      formData.append('user', user._id); // ✅ CORREGIDO
      formData.append('name', name);
      if (password) formData.append('password', password);

      if (selectedAvatar?.uri) {
        formData.append('avatar', {
          uri: selectedAvatar.uri,
          name: 'avatar.jpg',
          type: 'image/jpeg',
        });
      }

      const response = await axios.post('http://localhost:3000/api/profiles', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const profile = response.data;

      await AsyncStorage.setItem('selectedProfile', JSON.stringify(profile)); // ✅ GUARDADO

      navigation.reset({
        index: 0,
        routes: [{ name: 'AppTabs' }], // ✅ REDIRECCIÓN
      });
    } catch (error) {
      console.error('❌ Error al crear perfil:', error.response?.data || error.message);
      Alert.alert('Error al crear el perfil. Intenta de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear perfil</Text>

      {selectedAvatar && (
        <Image source={selectedAvatar} style={styles.avatar} />
      )}

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

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
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
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
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
