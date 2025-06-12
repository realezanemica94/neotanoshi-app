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
  const { name: initialName, selectedAvatar } = route.params;
  const [name, setName] = useState(initialName || '');

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert('Por favor ingresa un nombre de perfil.');
      return;
    }

    if (!selectedAvatar) {
      Alert.alert('El avatar es obligatorio.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');

      if (!token || !userData) {
        Alert.alert('No hay sesión activa. Por favor vuelve a iniciar sesión.');
        return;
      }

      const user = JSON.parse(userData);

      const formData = new FormData();
      formData.append('userId', user._id);
      formData.append('name', name);
      formData.append('avatar', {
        uri: selectedAvatar.uri || selectedAvatar,
        name: 'avatar.jpg',
        type: 'image/jpeg',
      });

      await axios.post('http://localhost:3000/api/profiles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      navigation.replace('ProfileSelectionScreen');
    } catch (error) {
      console.error('Error al crear perfil:', error);
      Alert.alert('Error al crear el perfil. Intenta de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear perfil</Text>

      {selectedAvatar && (
        <Image
          source={selectedAvatar.uri ? { uri: selectedAvatar.uri } : selectedAvatar}
          style={styles.avatar}
        />
      )}

      <TextInput
        placeholder="Nombre de Perfil"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={name}
        onChangeText={setName}
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
