import React, {useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {countries} from '../utils/countries.js';
import Carousel from 'react-native-reanimated-carousel';
import {compareCountries} from '../utils/chatgpt.js';

export default function Comparador() {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [firstCountry, setFirstCountry] = useState(null);
    const [secondCountry, setSecondCountry] = useState(null);
    const [paginacion, setPaginacion] = useState(0);
    const [filtroPrimerPais, setFiltroPrimerPais] = useState(countries);
    const [filtroSegundoPais, setFiltroSegundoPais] = useState(countries);

    const compare = async () => {

        setLoading(true);
        const answer = await compareCountries(firstCountry, secondCountry);
        setLoading(false);
        if (answer == null) return Alert.alert('Error en la solicitud', 'Ha ocurrido un error con el servidor. ¡Sentimos las molestias!');
        const finalResult = answer.split('\n\n');
        setResult(finalResult);

        // setResult(fakeAnswer)
    };

    const onChangeCountry = () => {
        if (secondCountry !== null) {
            setFiltroPrimerPais(countries.filter(x => x.value !== secondCountry))
        } else if (firstCountry !== null) {
            setFiltroSegundoPais(countries.filter(x => x.value !== firstCountry))
        }
    }

    const renderItem = ({item}: { item: string }) => (
        <View style={styles.carouselItem}>
            <Text style={styles.resultText}>{item}</Text>
            <Text style={styles.paginacion}>{paginacion}/{result.length}</Text>
        </View>
    );

    return (
        <ImageBackground
            source={require('../assets/fondo_comparador_con_filtro.png')}
            style={styles.background}
        >
            <View>
                <Text style={styles.title}>Comparador de países</Text>
                <SelectList
                    setSelected={setFirstCountry}
                    data={filtroPrimerPais}
                    save="value"
                    onSelect={onChangeCountry}
                    placeholder="Primer país a comparar"
                    boxStyles={styles.selectBox}
                />
                <SelectList
                    setSelected={setSecondCountry}
                    data={filtroSegundoPais}
                    save="value"
                    onSelect={onChangeCountry}
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
                    <ActivityIndicator size="large" color="#0000ff" style={styles.loader}/>
                ) : (
                    result.length > 0 && (
                        <Carousel
                            loop
                            width={380}
                            height={350}
                            autoPlay={false}
                            data={result}
                            onSnapToItem={(index) => setPaginacion(index + 1)}
                            scrollAnimationDuration={1000}
                            renderItem={renderItem}
                        />
                    )
                )}
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
        width: 400,
        alignItems: 'center',
    },
    loader: {
        marginTop: 20,
    },
    resultText: {
        padding: 16,
        textAlign: 'center',
        justifyContent: "center",
        color: "white",
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        width: 150,
        borderRadius: 20,
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonDisabled: {
        backgroundColor: '#cccccc',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    carouselItem: {
        padding: 5,
        backgroundColor: '#113946',
        borderRadius: 20,
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
    paginacion: {
        textAlign: "right",
        paddingHorizontal: 4,
        color: "white",
    }
});


const fakeAnswer = [
    "En cuanto a política, España y Francia comparten similitudes como ser repúblicas unitarias con sistemas parlamentarios. Sin embargo, existe una diferencia fundamental en el sistema de gobierno: mientras que España es una monarquía constitucional con un rey como jefe de estado, Francia es una república con un presidente como jefe de estado. Esta distinción influye en la estructura política de cada país y en la manera en que se toman decisiones a nivel nacional.",
    "En el ámbito gastronómico, tanto España como Francia son conocidas por su rica tradición culinaria y sus famosos platos. Francia es célebre por su sofisticada cocina, caracterizada por su alta gastronomía y el uso de ingredientes de alta calidad. Destacan platos como el foie gras, el boeuf bourguignon y los macarons. Por otro lado, la gastronomía española se distingue por su diversidad y sabores intensos, con platos emblemáticos como la paella, el jamón ibérico y las tapas. Ambos países son destinos culinarios de renombre que atraen a amantes de la buena comida de todo el mundo.",
    "En cuanto a la dimensión cultural, España y Francia tienen una larga historia de riqueza cultural que se refleja en su arquitectura, arte, literatura y música. Francia es conocida por ser la cuna del impresionismo, la moda y la haute couture, así como por sus emblemáticos monumentos como la Torre Eiffel, el Louvre y el Arco de Triunfo. España, por su parte, destaca por su arte flamenco, la arquitectura de Gaudí, la literatura de Cervantes y la pintura de Velázquez. Ambos países son reconocidos por su herencia cultural y su contribución al patrimonio mundial.",
    "En el ámbito turístico, Francia y España son dos de los destinos más populares y visitados en Europa. Francia atrae a millones de turistas cada año gracias a su diversidad de paisajes, su rica historia y su renombrada gastronomía. Destinos como París, la Riviera francesa, los castillos del Valle del Loira y la región de la Borgoña son solo algunas de las atracciones que ofrece el país. Por su parte, España es famosa por sus playas en la costa mediterránea, la arquitectura de Barcelona, la cultura de Madrid y la historia de ciudades como Sevilla y Granada. Ambos países cuentan con una amplia oferta turística que satisface los gustos y preferencias de todo tipo de viajeros."
]
