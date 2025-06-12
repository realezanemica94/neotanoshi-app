// src/screens/MangaReaderScreen.jsx
import React from 'react';
import { View, StyleSheet, Dimensions, Platform, Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MangaReaderScreen({ route }) {
  const { manga } = route.params;

  if (!manga || !manga.pdfUrl) {
    return <Text style={{ padding: 20 }}>PDF no disponible.</Text>;
  }

  const pdfUrl = Platform.OS === 'web'
    ? `http://localhost:3000${manga.pdfUrl}`
    : `http://10.0.2.2:3000${manga.pdfUrl}`; // Cambia esto por tu IP local en dispositivos físicos

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: pdfUrl }}
        originWhitelist={['*']}
        useWebKit
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1, width: Dimensions.get('window').width },
});


