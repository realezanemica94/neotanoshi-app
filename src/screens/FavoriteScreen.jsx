import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavoriteScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const profile = JSON.parse(await AsyncStorage.getItem('selectedProfile'));
      const res = await axios.get(`http://localhost:3000/api/profiles/${profile._id}/favorites`);
      setFavorites(res.data);
    };
    fetchFavorites();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Tus mangas favoritos:</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('MangaDetail', { manga: item })}>
            <Text style={{ marginBottom: 10 }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

