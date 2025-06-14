import React, { useState, useContext } from 'react';
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
import { Asset } from 'expo-asset';
import { AuthContext } from '../state/AuthContext';

const API_URL = 'http://localhost:3000/api/profiles';

export default function CreateProfileConfirm({ route, navigation }) {
  const { name: initialName, selectedAvatar } = route.params;
  const [name, setName] = useState(initialName || '');

  const { updateActiveProfile } = useContext(AuthContext);

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert('Por favor ingresa un nombre de perfil.');
      return;
    }

    if (!selectedAvatar || typeof selectedAvatar !== 'number') {
      Alert.alert('Avatar inválido.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Sesión expirada. Redirigiendo al inicio...');
        await AsyncStorage.clear();
        navigation.reset({ index: 0, routes: [{ name: 'Startup' }] });
        return;
      }

      const asset = Asset.fromModule(selectedAvatar);
      await asset.downloadAsync();

      const imageUri = asset.localUri || asset.uri;

      if (!imageUri) {
        Alert.alert('No se pudo cargar el avatar correctamente.');
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('avatar', {
        uri: imageUri,
        name: 'avatar.jpg',
        type: 'image/jpeg',
      });

      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      // ✅ Verifica que el backend devuelva correctamente el perfil
      if (!response.data || !response.data.profile) {
        console.error('Respuesta inesperada:', response.data);
        Alert.alert('Error', 'No se recibió un perfil válido desde el servidor.');
        return;
      }

      const profile = response.data.profile;
      console.log('Perfil creado correctamente:', profile);

      // ✅ Guarda perfil y redirige al flujo de verificación
      await updateActiveProfile(profile);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Startup' }],
      });

    } catch (error) {
      console.error('Error al crear perfil:', error.response?.data || error.message);

      // Manejo específico si ya existe un perfil
      if (error.response?.status === 409) {
        Alert.alert('Perfil existente', 'Ya tienes un perfil creado. Selecciónalo o elimínalo para crear uno nuevo.');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Startup' }],
        });
        return;
      }

      Alert.alert('Error al crear el perfil', 'Revisa la consola para más detalles.');
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
