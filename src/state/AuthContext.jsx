import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [activeProfile, setActiveProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = 'http://10.0.2.2:3000/api/auth'; // Centralizar endpoint

  const register = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/register`, { email, password });
      const { token, user } = res.data;

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (err) {
      console.error('Error en registro:', err.response?.data || err.message);
      throw new Error(err.response?.data?.msg || 'Error al registrar usuario');
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      const { token, user } = res.data;

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (err) {
      console.error('Error en login:', err.response?.data || err.message);
      throw new Error(err.response?.data?.msg || 'Credenciales inválidas');
    }
  };

  const resetPassword = async (email, newPassword) => {
    try {
      await axios.post(`${API_URL}/reset-password`, { email, newPassword });
    } catch (err) {
      console.error('Error al restablecer contraseña:', err.response?.data || err.message);
      throw new Error(err.response?.data?.msg || 'No se pudo restablecer la contraseña');
    }
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setUser(null);
    setActiveProfile(null);
  };

  const updateActiveProfile = async (profile) => {
    try {
      setActiveProfile(profile);
      await AsyncStorage.setItem('selectedProfile', JSON.stringify(profile));
    } catch (err) {
      console.error('Error guardando perfil activo:', err);
    }
  };


  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const profileData = await AsyncStorage.getItem('selectedProfile');

      if (userData) setUser(JSON.parse(userData));
      if (profileData) setActiveProfile(JSON.parse(profileData));
    } catch (err) {
      console.error('Error cargando sesión:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        activeProfile,
        isLoading,
        login,
        register,
        resetPassword,
        logout,
        setActiveProfile,
        updateActiveProfile,   
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
