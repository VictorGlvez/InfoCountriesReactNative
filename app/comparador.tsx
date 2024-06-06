import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Rectangulo } from '../components/Rectangulo';
import { countries } from '../utils/countries.js';
import Carousel from 'react-native-reanimated-carousel';
import { compareCountries } from '../utils/chatgpt.js';

export default function Comparador() {
    const [result, setResult] = useState<String[]>([]);
    const [loading, setLoading] = useState(false);
    const [firstCountry, setFirstCountry] = useState(null);
    const [secondCountry, setSecondCountry] = useState(null);

    const compare = async () => {
        // setLoading(true);
        // const answer = await compareCountries(firstCountry, secondCountry);
        // console.log('Answer: ', answer);
        // setLoading(false);
        // if (answer == null) return alert('Ha ocurrido un error con el servidor. Sentimos las molestias!');
        // const finalResult = answer.split('\n\n');
        // setResult(finalResult);
        const answer = "hola que tal \n\n esto es una prueba simple \n\n y pues nada que tal tu dia?"

        const finalResult = answer.split('\n\n');
        setResult(finalResult);
    };

    return (
        <ImageBackground
            source={require('../assets/fondo_comparador_con_filtro.png')}
            style={styles.background}
        >
            <View>
                <Text style={styles.title}>Comparador de países</Text>
                <SelectList
                    setSelected={setFirstCountry}
                    data={countries.filter(x => x !== secondCountry)}
                    placeholder="Primer país a comparar"
                    boxStyles={styles.selectBox}
                />
                <SelectList
                    setSelected={setSecondCountry}
                    data={countries.filter(x => x !== firstCountry)}
                    placeholder="Segundo país a comparar"
                    boxStyles={styles.selectBox}
                />
            </View>
            <TouchableOpacity
                onPress={compare}
                disabled={firstCountry == null || secondCountry == null}
                style={[
                    styles.button,
                    (firstCountry == null || secondCountry == null) && styles.buttonDisabled,
                ]}
            >
                <Text style={styles.buttonText}>Comparar</Text>
            </TouchableOpacity>
            <View style={styles.resultContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
                ) : (
                    result.length > 0 && (
                        // <Carousel
                        //     data={result}
                        //     sliderWidth={300}
                        //     itemWidth={300}
                        // />
                        <Text>{result[0]}</Text>
                    ))}
            </View>
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    background: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    selectBox: {
        marginBottom: 15,

    },
    resultContainer: {
        width: '80%',
        alignItems: 'center',
    },
    loader: {
        marginTop: 20,
    },
    resultText: {
        padding: 16,
        textAlign: 'center',
    },
    dotStyle: {
        backgroundColor: '#000',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        width: 150,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#cccccc',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});
