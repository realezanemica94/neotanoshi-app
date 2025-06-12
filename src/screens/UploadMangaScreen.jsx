import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

export default function UploadMangaScreen() {
  const [title, setTitle] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [pdf, setPdf] = useState(null);

  const pickPdf = async () => {
    const res = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
    if (res.type === 'success') setPdf(res);
  };

  const upload = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('synopsis', synopsis);
    formData.append('pdf', {
      uri: pdf.uri,
      name: pdf.name,
      type: 'application/pdf',
    });

    await axios.post('http://localhost:3000/api/mangas/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    alert('Subido');
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Título" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Sinopsis" value={synopsis} onChangeText={setSynopsis} />
      <Button title="Seleccionar PDF" onPress={pickPdf} />
      {pdf && <Text>{pdf.name}</Text>}
      <Button title="Subir Manga" onPress={upload} />
    </View>
  );
}
