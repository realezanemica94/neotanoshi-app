import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function CreateListScreen() {
  const [listName, setListName] = useState('');
  const [mangas, setMangas] = useState([]);

  const handleAddManga = () => {
    // Simulación: agrega un manga genérico
    const dummyManga = {
      id: Date.now().toString(),
      title: 'Nuevo manga',
      cover: null, // Opcional: puedes usar imágenes reales
    };
    setMangas([...mangas, dummyManga]);
  };

  const handleCreateList = () => {
    if (listName && mangas.length) {
      const newList = {
        name: listName,
        items: mangas,
      };
      console.log('Lista creada:', newList);
      // Aquí podrías hacer una petición POST a tu backend
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis lista</Text>

      <Text style={styles.label}>+ Nombre de la lista</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe el nombre..."
        placeholderTextColor="#888"
        value={listName}
        onChangeText={setListName}
      />

      <TouchableOpacity onPress={handleAddManga}>
        <Text style={styles.addMangaText}>+ Añadir manga ...</Text>
      </TouchableOpacity>

      <FlatList
        data={mangas}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={styles.mangaList}
        renderItem={({ item }) => (
          <View style={styles.mangaIcon}>
            <Icon name="download" size={40} color="#f0f" />
          </View>
        )}
      />

      <TouchableOpacity style={styles.createButton} onPress={handleCreateList}>
        <Text style={styles.createButtonText}>Crear lista</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    color: '#ccc',
    fontSize: 18,
    marginBottom: 20,
  },
  label: {
    color: '#00f',
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#f0f',
    color: '#fff',
    paddingVertical: 6,
    marginBottom: 20,
  },
  addMangaText: {
    color: '#0af',
    marginBottom: 20,
    fontSize: 14,
  },
  mangaList: {
    marginBottom: 30,
    gap: 20,
  },
  mangaIcon: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
  },
  createButton: {
    backgroundColor: '#00f',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 4,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
