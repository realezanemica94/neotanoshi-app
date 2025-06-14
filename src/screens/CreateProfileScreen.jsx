import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function CreateProfileScreen({ navigation }) {
  const [name, setName] = useState('');

  const handleAvatarSelection = () => {
    if (!name.trim()) {
      Alert.alert('Por favor ingresa un nombre antes de elegir un avatar.');
      return;
    }
    navigation.navigate('ChooseAvatarScreen', { name });
  };

  const handleContinue = () => {
    if (!name.trim()) {
      Alert.alert('El nombre de perfil es obligatorio.');
      return;
    }
    navigation.navigate('ChooseAvatarScreen', { name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear perfil</Text>

      {/* Botón circular para seleccionar avatar */}
      <TouchableOpacity style={styles.avatarUpload} onPress={handleAvatarSelection}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>

      {/* Input para nombre de perfil */}
      <TextInput
        placeholder="Nombre de Perfil"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      {/* Botón para continuar */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continuar</Text>
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
