import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (email, password) => {
    const res = await axios.post('http://localhost:5000/api/auth/register', { email, password });
    await AsyncStorage.setItem('user', JSON.stringify(res.data));
    await AsyncStorage.removeItem('selectedProfile'); // limpiar perfil previo
    setUser(res.data);
  };

const login = async (email, password) => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    await AsyncStorage.setItem('user', JSON.stringify(res.data));
    await AsyncStorage.removeItem('selectedProfile');
    setUser(res.data);
  } catch (err) {
    alert('Credenciales inválidas');
    console.error('Login error:', err.response?.data || err.message);
  }
};

  const resetPassword = async (email, newPassword) => {
    await axios.post('http://localhost:5000/api/auth/reset-password', {
      email,
      newPassword,
    });
  };

  const logout = async () => {
    await AsyncStorage.clear(); // borra user y perfil
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
