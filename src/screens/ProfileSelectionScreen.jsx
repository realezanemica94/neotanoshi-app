import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../state/AuthContext';

export default function ProfileSelectionScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadProfiles = async () => {
      if (!user) return;

      try {
        const res = await axios.get(`http://localhost:3000/api/profiles/${user._id}`);
        if (isMounted) setProfiles(res.data);
      } catch (err) {
        console.error('Error fetching profiles', err);
      }
    };

    loadProfiles();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const selectProfile = async (item) => {
    await AsyncStorage.setItem('selectedProfile', JSON.stringify(item));
    navigation.replace('AppTabs'); // Redirigir directamente a la app principal
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.profileItem} onPress={() => selectProfile(item)}>
      <Image
        source={{ uri: item.avatarUrl || 'https://example.com/default-avatar.png' }}
        style={styles.avatar}
      />
      <Text style={styles.profileName}>Perfil {index + 1}</Text>
    </TouchableOpacity>
  );

  const renderAddProfile = () => (
    <TouchableOpacity style={styles.profileItem} onPress={() => navigation.navigate('CreateProfile')}>
      <View style={styles.addProfileCircle}>
        <Text style={styles.plusSign}>+</Text>
      </View>
      <Text style={styles.profileName}>Añadir perfil</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Cuál es tu comic perfil?</Text>
      <FlatList
        data={profiles.slice(0, 3)}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListFooterComponent={renderAddProfile}
        contentContainerStyle={styles.listContent}
      />
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
