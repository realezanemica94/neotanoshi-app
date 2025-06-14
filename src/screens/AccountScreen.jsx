// src/screens/AccountScreen.js
import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { AuthContext } from '../state/AuthContext';

export default function AccountScreen({ navigation }) {
  const { logout, user } = useContext(AuthContext); // Asegúrate que user.email venga del backend

  const handleDeleteAccount = () => {
    Alert.alert('Eliminar cuenta', '¿Estás seguro de que deseas eliminar tu cuenta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        onPress: () => {
          console.log('Cuenta eliminada');
          // Aquí va lógica de backend
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/avatares/avatar1.jpeg')} style={styles.avatar} />
      <Text style={styles.profileName}>Perfil 1</Text>

      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => navigation.navigate('ProfileSelectionScreen')}
        >
          <Text style={styles.optionText}>Cambiar perfil</Text>
          <Icon name="chevron-right" size={20} color="#fff" />
        </TouchableOpacity>

        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Correo:</Text>
          <Text style={styles.emailText}>{user?.email || 'Sin correo'}</Text>
        </View>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.optionText}>Cambiar contraseña</Text>
          <Icon name="chevron-right" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow} onPress={handleDeleteAccount}>
          <Text style={styles.optionText}>Eliminar cuenta</Text>
          <Icon name="chevron-right" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow} onPress={logout}>
          <Text style={styles.optionText}>Cerrar sesión</Text>
          <Icon name="chevron-right" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  profileName: {
    color: '#3b82f6',
    fontSize: 16,
    marginBottom: 30,
  },
  optionContainer: {
    width: '100%',
    gap: 16,
  },
  optionRow: {
    borderBottomWidth: 2,
    borderBottomColor: '#f0f',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 14,
  },
  emailText: {
    color: '#3b82f6',
    fontSize: 13,
  },
});

