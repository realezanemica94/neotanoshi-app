import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileSelectionScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const loadUserAndProfiles = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        const token = await AsyncStorage.getItem('token');

        if (!storedUser || !token) {
          console.warn('Usuario o token no encontrados');
          return;
        }

        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        const res = await axios.get(`http://localhost:3000/api/profiles/${parsedUser._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfiles(res.data.filter(p => p.avatar));
      } catch (err) {
        console.error('Error cargando perfiles:', err);
      }
    };

    loadUserAndProfiles();
  }, []);

  const selectProfile = async (item) => {
    await AsyncStorage.setItem('selectedProfile', JSON.stringify(item));
    navigation.replace('AppTabs');
  };

  const getAvatarSource = (avatarUrl) => {
    if (avatarUrl.startsWith('http')) return { uri: avatarUrl };
    return require('../assets/images/icon_plus.png');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.profileItem} onPress={() => selectProfile(item)}>
      <Image source={getAvatarSource(item.avatar)} style={styles.avatar} />
      <Text style={styles.profileName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderAddProfile = () => (
    <TouchableOpacity style={styles.profileItem} onPress={() => navigation.navigate('CreateProfileScreen')}>
      <View style={styles.addProfileCircle}><Text style={styles.plusSign}>+</Text></View>
      <Text style={styles.profileName}>Añadir perfil</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccionar perfil</Text>
      <FlatList data={profiles} keyExtractor={item => item._id} renderItem={renderItem} numColumns={2} columnWrapperStyle={styles.row} ListFooterComponent={renderAddProfile} contentContainerStyle={styles.listContent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0c0c',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 30,
  },
  listContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  profileItem: {
    alignItems: 'center',
    margin: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 5,
  },
  profileName: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
  },
  addProfileCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  plusSign: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
