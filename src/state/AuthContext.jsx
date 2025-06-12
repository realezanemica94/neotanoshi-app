import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', { email, password });

      const { token, user } = res.data;

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (err) {
      console.error('Error en registro:', err.response?.data || err.message);
      alert('Error al registrar usuario');
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });

      const { token, user } = res.data;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      setUser(user);
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert('Credenciales inválidas');
    }
  };

  const resetPassword = async (email, newPassword) => {
    try {
      await axios.post('http://localhost:3000/api/auth/reset-password', {
        email,
        newPassword,
      });
      alert('Contraseña restablecida correctamente.');
    } catch (err) {
      console.error('Error al restablecer contraseña:', err.response?.data || err.message);
      alert('Error al restablecer contraseña');
    }
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, resetPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
