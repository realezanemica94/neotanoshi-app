import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function ProfileSettingsScreen() {
  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('selectedProfile').then(data => {
      if (data) setProfile(JSON.parse(data));
    });
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 1 });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const updateAvatar = async () => {
    if (!image || !profile) return;
    const formData = new FormData();
    formData.append('avatar', {
      uri: image,
      name: 'avatar.jpg',
      type: 'image/jpeg',
    });
    await axios.put(`http://localhost:3000/api/profiles/${profile._id}/avatar`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    Alert.alert('Avatar actualizado');
  };

  const deleteProfile = async () => {
    await axios.delete(`http://localhost:3000/api/profiles/${profile._id}`);
    await AsyncStorage.removeItem('selectedProfile');
    navigation.navigate('ProfileSelection');
  };

  if (!profile) return <Text>Cargando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes de Perfil</Text>
      <Text>Nombre: {profile.name}</Text>
      {profile.avatar && <Image source={{ uri: `http://localhost:3000${profile.avatar}` }} style={styles.avatar} />}
      <Button title="Cambiar avatar" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.avatar} />}
      <Button title="Actualizar avatar" onPress={updateAvatar} />
      <Button title="Eliminar este perfil" onPress={deleteProfile} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginVertical: 10 },
});
