import React from 'react';
import { View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/images/WelcomeScreen.jpeg')} 
      /* Asegúrate de tener en /src/assets la imagen del fondo */
      style={styles.background}
    >
      <View style={styles.overlay}>
      <Image
        source={require('../assets/images/neotanoshilogo.png')} 
        style={styles.logo}
      />
        <Text style={styles.subtitle}>¡Tu mundo de mangas en un solo lugar!</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={[styles.buttonText, styles.outlineText]}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain', // para que no se deforme
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // semitransparente
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    color: '#FF2E63', // color neón/rosa del mockup
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#2b77e4', // color neón azulado
    borderWidth: 2,
    borderColor: '#00E0FF',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonOutline: {
    width: '80%',
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#2b77e4', // color neón azulado
    borderWidth: 2,
    borderColor: '#00E0FF',
    alignItems: 'center',
    marginBottom: 16,
  },
  outlineText: {
    color: '#ffffff',
  },
});
