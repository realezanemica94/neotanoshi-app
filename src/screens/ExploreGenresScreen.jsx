// src/screens/ExploreGenresScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    color: '#ccc',
    fontSize: 18,
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tabText: {
    color: '#0af',
    fontSize: 13,
  },
  activeTab: {
    color: '#00ffff',
    fontWeight: 'bold',
  },
  activeUnderline: {
    height: 2,
    backgroundColor: '#00ffff',
    width: 40,
    alignSelf: 'center',
    marginTop: 2,
  },
  genreGrid: {
    paddingTop: 16,
    gap: 12,
  },
  genreBox: {
    alignItems: 'center',
    width: Dimensions.get('window').width / 3 - 20,
    margin: 5,
  },
  genreImage: {
    width: 70,
    height: 70,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  genreText: {
    color: '#0af',
    fontSize: 13,
    textAlign: 'center',
  },
});


const TABS = ['Todo el manga', 'Generos', 'puede gustarte...'];

const genres = [
  { id: '1', name: 'Accion', image: require('../assets/genres/accion.png') },
  { id: '2', name: 'Aventura', image: require('../assets/genres/aventura.png') },
  { id: '3', name: 'Romance', image: require('../assets/genres/romance.png') },
  { id: '4', name: 'Drama', image: require('../assets/genres/drama.png') },
  { id: '5', name: 'Fantasia', image: require('../assets/genres/fantasia.png') },
  { id: '6', name: 'Deportes', image: require('../assets/genres/deportes.png') },
  { id: '7', name: 'Comedia', image: require('../assets/genres/comedia.png') },
  { id: '8', name: 'Thriller', image: require('../assets/genres/thriller.png') },
  { id: '9', name: 'Ciencia Ficción', image: require('../assets/genres/scifi.png') },
];

export default function ExploreGenresScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Generos');

  const renderGenre = ({ item }) => (
    <TouchableOpacity style={styles.genreBox} onPress={() => {/* Navegar a lista por género */}}>
      <Image source={item.image} style={styles.genreImage} />
      <Text style={styles.genreText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explorar</Text>

      <View style={styles.tabContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTab]}>
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.activeUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'Generos' && (
        <FlatList
          data={genres}
          renderItem={renderGenre}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.genreGrid}
        />
      )}
    </View>
  );
}
