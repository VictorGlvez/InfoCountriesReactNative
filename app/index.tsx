import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';

export default function Index() {
  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/fondointro.mp4')}
        style={styles.video}
        resizeMode={"cover" as any}
        shouldPlay
        isLooping
        isMuted
      />
      <View style={styles.content}>
        <View style={styles.fondo_transparente}>
          <Text style={styles.titulo_introduccion}>Descubre tu próximo</Text>
          <Text style={styles.destacado}>destino</Text>
          <Text style={styles.subtitulo_introduccion}>
            Toda la información sobre países en un mismo lugar.
          </Text>
        </View>
      </View>
    </View>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: height,
  },
  content: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo_introduccion: {
    fontFamily: 'Patua One',
    fontSize: 24,
    margin: 10,
    color: '#ece5d7',
  },
  destacado: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 0,
    color: '#ece5d7',
  },
  subtitulo_introduccion: {
    fontSize: 18,
    margin: 30,
    color: '#ece5d7',
  },
  fondo_transparente: {
    backgroundColor: 'rgba(17, 57, 70, 0.7)',
    padding: 10,
    borderRadius: 50,
    borderColor: '#FFF2D8',
    borderWidth: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
