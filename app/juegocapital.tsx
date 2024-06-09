import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, Image, TouchableOpacity, Modal, StyleSheet, ImageBackground, Animated } from 'react-native';
// import { Audio } from 'expo-av';
import { correctCountry, options } from '../utils/juego.js';
import gameMusic from '../assets/audio/game.mp3';
import correctSound from '../assets/audio/correct.mp3';
import incorrectSound from '../assets/audio/incorrect.mp3';
import { Ionicons } from '@expo/vector-icons';

export default function juegocapital() {
  const [correctAnswer, setCorrectAnswer] = useState({});
  const [buttonOptions, setButtonOptions] = useState([]);
  const [count, setCount] = useState(0);
  const [round, setRound] = useState(1);
  const [isSelect, setIsSelect] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sound, setSound] = useState();
  const buttonScale = useRef(new Animated.Value(1)).current;
  const flagRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadGame();
    // playBackgroundMusic();
    startFlagAnimation();
    // return () => sound && sound.unloadAsync();
  }, []);

  const loadGame = async () => {
    const correctAnswerResult = await correctCountry();
    const buttonOptions = await options(correctAnswerResult);
    setCorrectAnswer(correctAnswerResult);
    setButtonOptions(buttonOptions);
  };

  const resetGame = () => {
    setRound(1);
    setCount(0);
    setShowModal(false);
    loadGame();
  };

  const finalMessage = () => {
    if (count === 0) return "Eres horrible";
    if (count === 1) return "¿De verdad? ¿Solo una? en fin....";
    if (count > 1 && count < 5) return "Has suspendido... ¡la próxima vez será! ¡Ánimo!";
    if (count >= 5 && count < 7) return "¡Buen trabajo! Seguro que la próxima vez te irá mejor";
    if (count >= 7 && count < 10) return "¡Bien hecho! A ver si la próxima vez las aciertas todas";
    if (count === 10) return "¡Eres un fenómeno! Qué pena que saberte todas las banderas no sirva de nada...";
  };

  const buttonClick = async (option) => {
    setIsSelect(true);
    setSelectedButton(option.name);
    if (option.name === correctAnswer.name) {
      setCount(count + 1);
    }
    //   if (!isMuted) await playSound(correctSound);
    // } else {
    //   if (!isMuted) await playSound(incorrectSound);
    // }
    setTimeout(() => {
      setIsSelect(false);
      if (round < 10 && !showModal) {
        setRound(round + 1);
        loadGame();
      } else if (round === 10) {
        setShowModal(true);
      }
    }, 1200);
  };

  // const toggleMute = async () => {
  //   setIsMuted(!isMuted);
  //   if (sound) {
  //     if (isMuted) {
  //       await sound.playAsync();
  //     } else {
  //       await sound.pauseAsync();
  //     }
  //   }
  // };

  // const playSound = async (soundFile) => {
  //   const { sound } = await Audio.Sound.createAsync(soundFile);
  //   setSound(sound);
  //   await sound.playAsync();
  // };

  // const playBackgroundMusic = async () => {
  //   const { sound } = await Audio.Sound.createAsync(gameMusic, { isLooping: true });
  //   setSound(sound);
  //   if (!isMuted) await sound.playAsync();
  // };
  Animated.sequence([
    Animated.timing(buttonScale, {
      toValue: 1.2,
      duration: 600,
      useNativeDriver: true,
    }),
    Animated.timing(buttonScale, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }),

  ]).start();

  const startFlagAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(flagRotation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(flagRotation, {
          toValue: -1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(flagRotation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const flagRotationInterpolate = flagRotation.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-5deg', '5deg'],
  });
  return (
    <ImageBackground
      source={require('../assets/fondo_juego_con_filtro.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.gameContainer}>
          <Text style={styles.title}>Adivina la capital</Text>
          <Text style={styles.roundCounter}>Ronda {round}/10</Text>
          {correctAnswer.name && (
            <Animated.Text
              style={[styles.country, { transform: [{ rotate: flagRotationInterpolate }] }]}>
              {correctAnswer.name}
            </Animated.Text>
          )}
          <View style={styles.optionsContainer}>
            {buttonOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => buttonClick(option)}
                style={[
                  styles.optionButton,
                  selectedButton === option.name && (option.name === correctAnswer.name
                    ? styles.correctAnswer
                    : styles.incorrectAnswer),
                  selectedButton === option.name && { transform: [{ scale: buttonScale }] }
                ]}
                disabled={isSelect}
              >
                <Text style={styles.optionButtonText}>{option.capital}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>¡Se acabó!</Text>
            <Text style={styles.modalText}>Has acertado: {count} de 10</Text>
            <Text style={styles.modalMessage}>{finalMessage()}</Text>
            <View style={styles.modalButtons}>
              <Button title="Reiniciar" onPress={resetGame} />
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

{/* <TouchableOpacity style={styles.soundButton} onPress={toggleMute}>
<Ionicons name={isMuted ? 'volume-mute' : 'volume-high'} size={48} color="black" />
</TouchableOpacity> */}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameContainer: {
    alignItems: 'center',
    backgroundColor: '#113946',
    padding: 20,
    borderRadius: 30,
    borderColor: "#FDF6EA",
    borderWidth: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  roundCounter: {
    fontSize: 18,
    marginBottom: 20,
    color: 'white',
  },
  country: {
    width: '100%',
    height: 120,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
    alignItems: 'center'
  
    
  },
  optionsContainer: {
    alignItems: 'center',
  },
  optionButton: {
    margin: 10,
    fontWeight: 'bold',
    backgroundColor: '#4b48f3',
    borderRadius: 20,
    borderColor: '#c7c6c4',
    borderWidth: 3,
    minWidth: 80,
    alignItems: 'center'
  },
  optionButtonText: {
    color: 'white',
    padding: 10,
  },
  correctAnswer: {
    backgroundColor: 'green',
  },
  incorrectAnswer: {
    backgroundColor: 'red',
  },
  soundButton: {
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#FFF2D8',
    borderRadius: 30,
    padding: 35,
    borderColor: "black",
    borderWidth: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',

  },
});