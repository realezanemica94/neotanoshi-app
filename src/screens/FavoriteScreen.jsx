import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TABS = ['Sin empezar', 'Retomar', 'Historial'];

export default function FavoriteScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('Sin empezar');

  useEffect(() => {
    const fetchFavorites = async () => {
      const profile = JSON.parse(await AsyncStorage.getItem('selectedProfile'));
      const res = await axios.get(`http://localhost:3000/api/profiles/${profile._id}/favorites`);
      setFavorites(res.data);
    };
    fetchFavorites();
  }, []);

  const filteredFavorites = favorites.filter(item => item.status === activeTab);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('MangaDetail', { manga: item })}
      style={styles.mangaContainer}
    >
      <Image source={{ uri: item.cover }} style={styles.coverImage} />
      <Text style={styles.mangaTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis lista</Text>

      <View style={styles.tabContainer}>
        {TABS.map(tab => (
          <Pressable key={tab} onPress={() => setActiveTab(tab)} style={styles.tab}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.activeUnderline} />}
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredFavorites}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

        <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateLists')}>
        <Text style={styles.createButtonText}>Crear lista</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get('window');
const itemWidth = width * 0.4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
  },
  header: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    color: '#888',
    fontSize: 14,
  },
  activeTabText: {
    color: '#00f',
    fontWeight: 'bold',
  },
  activeUnderline: {
    height: 2,
    backgroundColor: '#f0f',
    width: 40,
    marginTop: 2,
  },
  listContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  mangaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  coverImage: {
    width: 60,
    height: 90,
    borderRadius: 4,
    marginRight: 10,
  },
  mangaTitle: {
    color: '#fff',
    fontSize: 14,
    flexShrink: 1,
  },
  createButton: {
    backgroundColor: '#00f',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 4,
    margin: 16,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: '#222',
    borderTopWidth: 1,
    paddingVertical: 10,
    backgroundColor: '#111',
  },
  navItem: {
    color: '#fff',
    fontSize: 12,
  },
});

