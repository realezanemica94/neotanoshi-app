import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const numColumns = 3;
const imageSize = width / numColumns - 20;

const TABS = ['Todo el manga', 'Géneros', 'Puede gustarte'];

const data = [
  { id: '1', image: require('../assets/images/manga1.jpg') },
  { id: '2', image: require('../assets/images/manga2.jpg') },
  { id: '3', image: require('../assets/images/manga3.jpg') },
  { id: '4', image: require('../assets/images/manga4.jpg') },
  { id: '5', image: require('../assets/images/manga5.jpg') },
  { id: '6', image: require('../assets/images/manga6.jpg') },
  { id: '7', image: require('../assets/images/manga7.jpg') },
  { id: '8', image: require('../assets/images/manga8.jpg') },
  { id: '9', image: require('../assets/images/manga9.jpg') },
];

export default function ExploreScreen() {
  const [activeTab, setActiveTab] = useState('Todo el manga');

  const renderTab = (tab) => (
    <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
      <Text
        style={[
          styles.tabText,
          activeTab === tab && styles.activeTabText,
        ]}
      >
        {tab}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <View style={styles.imageWrapper}>
      <Image source={item.image} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explorar</Text>

      <View style={styles.tabs}>
        {TABS.map(renderTab)}
      </View>

      <FlatList
        data={data}
        numColumns={numColumns}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  header: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingBottom: 5,
  },
  tabText: {
    color: '#aaa',
    fontSize: 14,
  },
  activeTabText: {
    color: '#3b82f6',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  grid: {
    paddingBottom: 20,
  },
  imageWrapper: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  image: {
    width: imageSize,
    height: imageSize * 1.4,
    borderRadius: 4,
  },
});
