import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function MangaDetailScreen({ route, navigation }) {
  const { manga } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const profile = JSON.parse(await AsyncStorage.getItem('selectedProfile'));
      const res = await axios.get(`http://localhost:3000/api/profiles/${profile._id}/favorites`);
      setIsFavorite(res.data.some(fav => fav._id === manga._id));
    };
    checkFavorite();
  }, []);

  const toggleFavorite = async () => {
    const profile = JSON.parse(await AsyncStorage.getItem('selectedProfile'));
    if (isFavorite) {
      await axios.delete(`http://localhost:3000/api/profiles/${profile._id}/favorites/${manga._id}`);
    } else {
      await axios.post(`http://localhost:3000/api/profiles/${profile._id}/favorites`, { mangaId: manga._id });
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{manga.title}</Text>
      <Text style={styles.synopsis}>{manga.synopsis}</Text>
      <Button title="Leer manga" onPress={() => navigation.navigate('MangaReader', { manga })} />
      <Button title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'} onPress={toggleFavorite} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  synopsis: { marginBottom: 20 },
});
