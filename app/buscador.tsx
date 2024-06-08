import React, {useEffect, useState} from "react"
import {Rectangulo} from "@/components/Rectangulo";
import {ImageBackground, StyleSheet, View, Text, Modal, TouchableOpacity, Image, ActivityIndicator} from "react-native";
import RectanguloBuscador from "@/components/RectanguloBuscador";
import {ScrollView} from "react-native-gesture-handler";
import {Card} from "react-native-elements";

//TODO: cambiar el color del texto en los selectores al escribir
//TODO: Que se puedan deseleccionar los selectores
//TODO: Poner un loading mientras se cargan los datos

// Contexto para compartir datos entre componentes
export const MyContext = React.createContext({
    handleDataChange: () => {
    },
    searchFieldOptions: []
});

export default function Buscador() {
    const [allCountries, setAllCountries] = useState([]);
    const [countryDetails, setCountryDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedData, setSelectedData] = useState({
        "Nombre": null,
        "Moneda": null,
        "Idioma": null,
        "Región": null,
        "Subregión": null,
        "Capital": null
    });

    const [countryNames, setCountryNames] = useState([]);
    const [countryCurrencies, setCountryCurrencies] = useState([]);
    const [countryLanguages, setCountryLanguages] = useState([]);
    const [countryRegions, setCountryRegions] = useState([]);
    const [countrySubregions, setCountrySubregions] = useState([]);
    const [countryCapitals, setCountryCapitals] = useState([]);

    // Opciones para los selectores
    const searchFieldOptions = [
        {field: 'Nombre', options: countryNames},
        {field: 'Moneda', options: countryCurrencies},
        {field: 'Idioma', options: countryLanguages},
        {field: 'Región', options: countryRegions},
        {field: 'Subregión', options: countrySubregions},
        {field: 'Capital', options: countryCapitals},
    ];

    const Separator = () => (
        <View style={styles.separator}/>
    );

    let combinedSearchResults = Object.values(selectedData).some(value => value !== null) ? allCountries : [];
// Iteramos sobre los campos de búsqueda seleccionados
    for (let [field, value] of Object.entries(selectedData)) {
        if (value) {
            // Aplicamos el filtro correspondiente a los resultados combinados
            switch (field) {
                case "Nombre":
                    combinedSearchResults = combinedSearchResults.filter(country => country.name.common === value);
                    break;
                case "Moneda":
                    combinedSearchResults = combinedSearchResults.filter(country => Object.values(country.currencies).some(currency => currency.name === value));
                    break;
                case "Idioma":
                    combinedSearchResults = combinedSearchResults.filter(country => Object.values(country.languages).includes(value));
                    break;
                case "Región":
                    combinedSearchResults = combinedSearchResults.filter(country => {
                        return country.region === value;
                    });
                    break;
                case "Subregión":
                    combinedSearchResults = combinedSearchResults.filter(country => country.subregion === value);
                    break;
                case "Capital":
                    combinedSearchResults = combinedSearchResults.filter(country => country.capital[0] === value);
                    break;
            }
        }
    }
    const handleDataChange = async (field, selectedOption) => {
        await setSelectedData(prevState => ({...prevState, [field]: selectedOption}));
    };

    const handleCardClick = (country) => {
        setIsLoading(true)
        fetchCountryDetails(country.name.common).then(() => {
            setIsLoading(false);
            setShowModal(true);
        });
    };

    const fetchCountryDetails = async (countryName) => {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        setCountryDetails(data[0]);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };


    // Función para obtener elementos únicos y ordenados
    const getUniqueSorted = (items) => {
        const uniqueItems = items.reduce((acc, current) => {
            const x = acc.find(item => item.label === current.label);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);
        uniqueItems.sort((a, b) => a.label.localeCompare(b.label));
        return uniqueItems;
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://restcountries.com/v3.1/all?fields=name,currencies,languages,region,subregion,capital");
            const data = await response.json();
            setAllCountries(data)


            const names = data.map(country => ({value: country.name.common, label: country.name.common}));
            const uniqueNames = getUniqueSorted(names);
            setCountryNames(uniqueNames);

            const languages = data.flatMap(country =>
                Object.values(country.languages).map(language => ({value: language, label: language}))
            );
            const uniqueLanguages = getUniqueSorted(languages);
            setCountryLanguages(uniqueLanguages);


            const currencies = data.flatMap(country =>
                Object.values(country.currencies).map(currency => ({value: currency.name, label: currency.name}))
            );
            const uniqueCurrencies = getUniqueSorted(currencies);
            setCountryCurrencies(uniqueCurrencies);


            const regions = data.map(country => ({value: country.region, label: country.region}));
            const uniqueRegions = getUniqueSorted(regions);
            setCountryRegions(uniqueRegions);

            const subregions = data.map(country => ({value: country.subregion, label: country.subregion}));
            const uniqueSubregions = getUniqueSorted(subregions);
            setCountrySubregions(uniqueSubregions);

            const capitals = data.reduce((acc, country) => {
                if (country.capital[0]) {
                    acc.push({value: country.capital[0], label: country.capital[0]});
                }
                return acc;
            }, []);
            const uniqueCapitals = getUniqueSorted(capitals);
            setCountryCapitals(uniqueCapitals);


        };
        fetchData();
    }, [selectedData]);
    return (
        <ImageBackground
            source={require('../assets/fondo_buscador_con_filtro.png')}
            style={styles.background}
        >
            {isLoading && (
                <View style={styles.loadingCircle}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            )}
            <MyContext.Provider value={{searchFieldOptions: searchFieldOptions, handleDataChange: handleDataChange}}>
                <ScrollView>

                    <RectanguloBuscador/>
                    <View style={styles.container}>
                        <Rectangulo backgroundColor={"#FDF6EA"} borderColor={"#113946"} textColor={"#113946"}
                                    padding={{padding: "20px"}} minWidth={300} minHeight={200} margin={40}>
                            <Text style={styles.title}>Resultados</Text>
                            <View style={styles.row}>
                                {combinedSearchResults.map((country, index) => (
                                    <View style={styles.col}>
                                        <TouchableOpacity onPress={() => handleCardClick(country)}>

                                            <Card key={index} containerStyle={styles.cardContainer}
                                            >
                                                <Card.Title
                                                    style={styles.cardTitle}>{country["name"].common}</Card.Title>
                                            </Card>
                                        </TouchableOpacity>


                                    </View>
                                ))}
                            </View>
                            <ScrollView>

                                <Modal visible={showModal} onRequestClose={handleCloseModal} animationType="slide">
                                    <View style={styles.modalContainer}>
                                        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                                            <Text style={styles.closeButtonText}>X</Text>
                                        </TouchableOpacity>
                                        <Text
                                            style={styles.modalTitle}>{countryDetails ? countryDetails.name.common : ""}</Text>
                                        <Text style={styles.modalSubtitle}>Bandera</Text>
                                        {countryDetails && countryDetails.flags ?
                                            <Image source={{uri: countryDetails.flags.png}}
                                                   style={styles.modalImage}/> : <Text/>}
                                        <Separator/>
                                        <Text style={styles.modalSubtitle}>Información General</Text>
                                        <Text style={styles.modalStrong}>Nombre
                                            Oficial: {countryDetails ? countryDetails.name.official : <Text/>}</Text>

                                        <Text style={styles.modalStrong}>Región: </Text>
                                        <Text >{countryDetails ? countryDetails.region :
                                            <Text/>}</Text>
                                        <Text
                                            style={styles.modalStrong}>Subregión: {countryDetails ? countryDetails.subregion :
                                            <Text/>}</Text>
                                        <Text
                                            style={styles.modalStrong}>Capital: {countryDetails ? countryDetails.capital : ""}</Text>
                                        <Text style={styles.modalStrong}>Área: {countryDetails ? countryDetails.area :
                                            <Text/>} km²</Text>
                                        <Text
                                            style={styles.modalStrong}>Población: {countryDetails ? countryDetails.population :
                                            <Text/>}</Text>
                                        <Separator/>
                                        <Text style={styles.modalSubtitle}>Moneda</Text>
                                        {countryDetails && countryDetails.currencies ? Object.values(countryDetails.currencies).map((currency, index) => (
                                            <Text key={index}>Nombre: {currency.name}, Símbolo: {currency.symbol}</Text>
                                        )) : <Text/>}
                                        <Separator/>

                                        <Text style={styles.modalSubtitle}>Idiomas</Text>
                                        {countryDetails && countryDetails.languages ? Object.values(countryDetails.languages).map((language, index) => (
                                            <Text key={index}>{language}</Text>
                                        )) : <Text/>}
                                        <Separator/>

                                        <Text style={styles.modalSubtitle}>Zonas Horarias</Text>
                                        {countryDetails && countryDetails.timezones ? countryDetails.timezones.map((timezone, index) => (
                                            <Text key={index}>{timezone}</Text>
                                        )) : <Text/>}
                                        <Separator/>

                                        <Text style={styles.modalSubtitle}>Gentilicios</Text>
                                        {countryDetails && countryDetails.demonyms ? Object.values(countryDetails.demonyms).map((demonym, index) => (
                                            <Text key={index}>{demonym.f} / {demonym.m}</Text>
                                        )) : <Text/>}
                                        <Separator/>

                                        <Text style={styles.modalSubtitle}>Inicio de la Semana</Text>
                                        <Text>{countryDetails ? countryDetails.startOfWeek : <Text/>}</Text>
                                        <Separator/>

                                        <Text style={styles.modalSubtitle}>Escudo</Text>
                                        {countryDetails && countryDetails.coatOfArms ?
                                            <Image source={{uri: countryDetails.coatOfArms.png}}
                                                   style={styles.modalImage}/> : <Text/>}
                                    </View>
                                </Modal>
                            </ScrollView>

                        </Rectangulo>


                    </View>

                </ScrollView>

            </MyContext.Provider>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    titulo_galeria: {
        fontWeight: 'bold',
        fontSize: 30,
        margin: 30,
    },
    contenedorImagen: {
        padding: 40
    },
    formatoImagen: {
        width: 200,
        height: 200,
        margin: 30,
        borderColor: "black",
        borderWidth: 4,
        borderRadius: 30
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#FDF6EA',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#113946',
    },
    modalImage: {
        width: '20%',
        height: '20%',
        resizeMode: 'contain',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    col: {
        flexDirection: 'column',
    },
    cardContainer: {
        backgroundColor: '#113946',
        color: '#FDF6EA',
        borderRadius: 10,
        borderColor: '#FDF6EA',
        borderWidth: 2,
        margin: 10,
    },
    cardTitle: {
        color: '#FDF6EA',
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    loadingCircle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.2)', // Puedes cambiar el color y la opacidad a tu gusto
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, // Asegúrate de que este valor sea mayor que el de cualquier otro elemento

    },
    separator: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 10, // Puedes ajustar este valor para cambiar el espaciado alrededor del separador
    },
    modalTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        backgroundColor: '#113946',
    },
    modalSubtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#113946',
    },
    modalStrong: {
        fontWeight: 'bold',
    },

    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#ccc',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 20,
        color: '#333',
    },


});

