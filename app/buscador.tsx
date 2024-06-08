import React, {useEffect, useState} from "react"
import {Rectangulo} from "@/components/Rectangulo";
import {ImageBackground, StyleSheet, View, Text} from "react-native";
import RectanguloBuscador from "@/components/RectanguloBuscador";
import {ScrollView} from "react-native-gesture-handler";

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
        fetchCountryDetails(country.name.common).then(() => {
            setShowModal(true);
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const fetchCountryDetails = async (countryName) => {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        setCountryDetails(data[0]);
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
            <MyContext.Provider value={{searchFieldOptions: searchFieldOptions, handleDataChange: handleDataChange}}>
                <ScrollView>

                    <RectanguloBuscador/>
                    <View style={styles.container}>
                        <Rectangulo backgroundColor={"#FDF6EA"} borderColor={"#113946"} textColor={"#113946"}
                                    padding={{padding: "20px"}}>
                            <Text>Resultados</Text>
                            <View>
                                {combinedSearchResults.map((country, index) => (
                                    <View key={index}>
                                        <Text>{country["name"].common}</Text>
                                    </View>

                                ))}
                            </View>
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
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
});


{/*

        <MyContext.Provider value={{selectData: searchFieldOptions, handlers}}>
            <div className={"fondo fondo_buscador pb-5 pb-lg-0 main-content"}>
                <div className={"d-flex flex-column"}>
                    <h1 className={"titulo_buscador pt-5 mt-lg-5 mb-5"}>Busca como un profesional</h1>
                    <Row className={"mb-lg-5  justify-content-center "}>
                        <Col xs={11} sm={8} lg={6} xl={5} className={"z-2 justify-content-lg-start me-xl-5"}>
                            <RectanguloBuscador/>
                        </Col>
                        <Col xs={11} sm={8} lg={6} xl={5} className={"justify-content-lg-end"}>
                            <Rectangulo classNames={"rectangulo_buscador_2 container mt-5 mt-lg-0 ms-xl-5 p-sm-4"}
                                        backgroundColor={"#FFF2D8"}
                                        borderColor={"#113946"}
                                        textColor={"#113946"} padding={{padding: "20px"}}>
                                <h1 className={"m-4"}>Resultados</h1>
                                <div className={"container"}>
                                    <Row>
                                        {
                                            <>
                                                {combinedSearchResults.map((country, index) => (
                                                    country["name"] !== undefined &&
                                                    country["currencies"] !== undefined &&
                                                    country["region"] !== undefined && (
                                                        <Col xs={12} md={6} lg={6} key={index}>
                                                            <Card key={index} country={country} className="custom-card"
                                                                  onClick={() => handleCardClick(country)}>
                                                                <Card.Body className={"custom-card-body text-center"}>
                                                                    <Card.Title>{country["name"].common}</Card.Title>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    )
                                                ))
                                                }
                                            </>
                                        }
                                    </Row>
                                    <Modal show={showModal} onHide={handleCloseModal}>
                                        <Modal.Header closeButton
                                                      className={"custom-modal-header justify-content-center"}
                                        >
                                            <Modal.Title
                                                className={"fw-bold h1"}>{countryDetails ? countryDetails.name.common.toUpperCase() : ""}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="custom-modal-body text-center">
                                            <h5>Bandera</h5>
                                            {countryDetails && countryDetails.flags ?
                                                <img src={countryDetails.flags.png} alt="Bandera"
                                                     className={"img-fluid d-block mx-auto"}/> : ""}
                                            <hr/>

                                            <h5>Información General</h5>
                                            <p><strong>Nombre
                                                Oficial:</strong> {countryDetails ? countryDetails.name.official : ""}
                                            </p>
                                            <p><strong>Región:</strong> {countryDetails ? countryDetails.region : ""}
                                            </p>
                                            <p>
                                                <strong>Subregión:</strong> {countryDetails ? countryDetails.subregion : ""}
                                            </p>
                                            <p>
                                                <strong>Capital:</strong> {countryDetails ? countryDetails.capital[0] : ""}
                                            </p>
                                            <p><strong>Área:</strong> {countryDetails ? countryDetails.area : ""} km²
                                            </p>
                                            <p>
                                                <strong>Población:</strong> {countryDetails ? countryDetails.population : ""}
                                            </p>
                                            <hr/>
                                            <h5>Moneda</h5>
                                            {countryDetails && countryDetails.currencies ? Object.values(countryDetails.currencies).map((currency, index) => (
                                                <p key={index}>
                                                    <strong>Nombre:</strong> {currency.name}, <strong>Símbolo:</strong> {currency.symbol}
                                                </p>
                                            )) : ""}
                                            <hr/>
                                            <h5>Idiomas</h5>
                                            {countryDetails && countryDetails.languages ? Object.values(countryDetails.languages).map((language, index) => (
                                                <p key={index}>{language}</p>
                                            )) : ""}
                                            <hr/>
                                            <h5>Zonas Horarias</h5>
                                            {countryDetails && countryDetails.timezones ? countryDetails.timezones.map((timezone, index) => (
                                                <p key={index}>{timezone}</p>
                                            )) : ""}
                                            <hr/>
                                            <h5>Gentilicios</h5>
                                            {countryDetails && countryDetails.demonyms ? Object.values(countryDetails.demonyms).map((demonym, index) => (
                                                <p key={index}>{demonym.f} / {demonym.m}</p>
                                            )) : ""}
                                            <hr/>
                                            <h5>Inicio de la Semana</h5>
                                            <p>{countryDetails ? countryDetails.startOfWeek : ""}</p>
                                            <hr/>
                                            <h5>Escudo</h5>
                                            {countryDetails && countryDetails.coatOfArms ?
                                                <img src={countryDetails.coatOfArms.png} alt="Escudo"
                                                     className={"img-fluid d-block mx-auto"}/> : ""}

                                        </Modal.Body>
                                        <Modal.Footer className={"custom-modal-footer"}>
                                            <Button variant="warning" onClick={handleCloseModal}>
                                                Cerrar
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </Rectangulo>
                        </Col>
                    </Row>
                </div>
            </div>
        </MyContext.Provider>

    )
}
*/
}
