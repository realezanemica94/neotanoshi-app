import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const stored = await AsyncStorage.getItem('selectedProfile');
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    };
    loadProfile();
  }, []);

  const seguirLeyendo = [
    { id: '1', title: 'Vinland Saga', image: require('../assets/images/vinland.jpg') },
    { id: '2', title: 'Chainsaw Man', image: require('../assets/images/chainsaw.jpg') },
    { id: '3', title: 'My Hero', image: require('../assets/images/grace.jpg') },
  ];

  const masReciente = [
    { id: '4', image: require('../assets/images/grace.jpg') },
    { id: '5', image: require('../assets/images/vinland.jpg') },
    { id: '6', image: require('../assets/images/chainsaw.jpg') },
  ];

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        {/* Banner principal */}
        <Image
          source={require('../assets/images/banner_naruto.jpg')}
          style={styles.banner}
        />

        {/* Título y sinopsis */}
        <View style={styles.description}>
          <Text style={styles.title}>Nombre anime ejemplo 1 Ej: Naruto</Text>
          <Text style={styles.synopsis}>
            Aquí iría la sinopsis ej: Una chica que pelea contra los villanos
          </Text>
        </View>

        {/* Sección Seguir leyendo */}
        <Text style={styles.sectionTitle}>Seguir leyendo</Text>
        <FlatList
          data={seguirLeyendo}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.image} style={styles.cardImage} />
              <Text style={styles.cardText}>{item.title}</Text>
            </View>
          )}
        />

        {/* Sección Lo más reciente */}
        <Text style={styles.sectionTitle}>Lo más reciente</Text>
        <FlatList
          data={masReciente}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <Image source={item.image} style={styles.recentImage} />
          )}
        />
      </ScrollView>

      {/* Barra inferior de navegación */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require('../assets/images/menu/home_1.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require('../assets/images/menu/favorite.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require('../assets/images/menu/explore.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Explorar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require('../assets/images/menu/profile.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  banner: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  description: {
    padding: 10,
  },
  title: {
    color: '#ffa500',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  synopsis: {
    color: '#fff',
    fontSize: 14,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  card: {
    marginRight: 10,
    alignItems: 'center',
    width: 100,
  },
  cardImage: {
    width: 90,
    height: 130,
    borderRadius: 4,
  },
  cardText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  recentImage: {
    width: 90,
    height: 130,
    borderRadius: 4,
    marginRight: 10,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#111',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#333',
  },
  navButton: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  navText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
});
