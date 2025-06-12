import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function ChooseAvatarScreen({ route, navigation }) {
  const { name, password } = route.params;
  const [image, setImage] = useState(null);

  const predefinedAvatars = [
    require('../assets/images/avatares/avatar1.jpeg'),
    require('../assets/images/avatares/avatar2.jpeg'),
    require('../assets/images/avatares/avatar3.jpeg'),
    require('../assets/images/avatares/avatar4.jpeg'),
    require('../assets/images/avatares/avatar5.jpeg'),
    require('../assets/images/avatares/avatar6.jpeg'),
    require('../assets/images/avatares/avatar7.jpeg'),
    require('../assets/images/avatares/avatar8.jpeg'),
    require('../assets/images/avatares/avatar9.jpeg'),
    require('../assets/images/avatares/avatar10.jpeg'),
    require('../assets/images/avatares/avatar11.jpeg'),
    require('../assets/images/avatares/avatar12.jpeg'),
  ];

  const isSelected = (avatar) => image && image.source === avatar;

  const handleContinue = () => {
    navigation.navigate('CreateProfileConfirm', {
      selectedAvatar: image?.source || null,
      name,
      password,
    });
  };

  const handleSkip = () => {
    navigation.navigate('CreateProfileConfirm', {
      name,
      password,
      selectedAvatar: null,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elegir avatar</Text>

      <View style={styles.grid}>
        {predefinedAvatars.map((avatar, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setImage({ source: avatar })}
            style={[
              styles.avatarOption,
              isSelected(avatar) && styles.selectedAvatar,
            ]}
          >
            <Image source={avatar} style={styles.avatarImage} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.skipButton]}
        onPress={handleSkip}
      >
        <Text style={styles.buttonText}>Omitir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0c0c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatarOption: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    margin: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedAvatar: {
    borderColor: '#3b82f6',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    width: '100%',
    marginTop: 10,
  },
  skipButton: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
