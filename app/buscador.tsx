import React, {useEffect, useState} from "react"
import {Rectangulo} from "@/components/Rectangulo";
import {ImageBackground, StyleSheet, View, Text} from "react-native";
import RectanguloBuscador from "@/components/RectanguloBuscador";
import {ScrollView} from "react-native-gesture-handler";

// Contexto para compartir datos entre componentes
export const MyContext = React.createContext({
    handlers: {},
    selectData: [],
    dataSelected: {
        "Nombre": null,
        "Moneda": null,
        "Idioma": null,
        "Región": null,
        "Subregión": null,
        "Capital": null
    }
});

export default function Buscador() {
    // Estados para almacenar los datos de los países
    const [allCountries, setAllCountries] = useState([]);
    const [countryNames, setCountryNames] = useState([]);
    const [countryCurrencies, setCountryCurrencies] = useState([]);
    const [countryLanguages, setCountryLanguages] = useState([]);
    const [countryRegions, setCountryRegions] = useState([]);
    const [countrySubregions, setCountrySubregions] = useState([]);
    const [countryCapitals, setCountryCapitals] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [countryDetails, setCountryDetails] = useState(null);


    // Estados para almacenar los resultados de la búsqueda
    const [searchResultsByName, setSearchResultsByName] = useState([]);
    const [searchResultsByCurrency, setSearchResultsByCurrency] = useState([]);
    const [searchResultsByLanguage, setSearchResultsByLanguage] = useState([]);
    const [searchResultsByRegion, setSearchResultsByRegion] = useState([]);
    const [searchResultsBySubregion, setSearchResultsBySubregion] = useState([]);
    const [searchResultsByCapital, setSearchResultsByCapital] = useState([]);


    // Estados para almacenar los últimos términos de búsqueda
    const [lastSearchedName, setLastSearchedName] = useState(null);
    const [lastSearchedCurrency, setLastSearchedCurrency] = useState(null);
    const [lastSearchedLanguage, setLastSearchedLanguage] = useState(null);
    const [lastSearchedRegion, setLastSearchedRegion] = useState(null);
    const [lastSearchedSubregion, setLastSearchedSubregion] = useState(null);
    const [lastSearchedCapital, setLastSearchedCapital] = useState(null);


    // Estado para almacenar los datos seleccionados en los selectores
    const [selectedData, setSelectedData] = useState({
        "Nombre": null,
        "Moneda": null,
        "Idioma": null,
        "Región": null,
        "Subregión": null,
        "Capital": null
    });

// Inicializamos los resultados combinados con todos los países
// solo si al menos un campo de búsqueda está seleccionado
    let combinedSearchResults = Object.values(selectedData).some(value => value !== null) ? allCountries : [];
// Iteramos sobre los campos de búsqueda seleccionados
    for (let [field, value] of Object.entries(selectedData)) {
        if (value) {
            // Aplicamos el filtro correspondiente a los resultados combinados
            switch (field) {
                case "Nombre":
                    combinedSearchResults = combinedSearchResults.filter(country => country.name.common === value.value);
                    break;
                case "Moneda":
                    combinedSearchResults = combinedSearchResults.filter(country => Object.values(country.currencies).some(currency => currency.name === value.value));
                    break;
                case "Idioma":
                    combinedSearchResults = combinedSearchResults.filter(country => Object.values(country.languages).includes(value.value));
                    break;
                case "Región":
                    combinedSearchResults = combinedSearchResults.filter(country => country.region === value.value);
                    break;
                case "Subregión":
                    combinedSearchResults = combinedSearchResults.filter(country => country.subregion === value.value);
                    break;
                case "Capital":
                    combinedSearchResults = combinedSearchResults.filter(country => country.capital[0] === value.value);
                    break;
            }
        }
    }

    // Opciones para los selectores
    const searchFieldOptions = [
        {field: 'Nombre', options: countryNames},
        {field: 'Moneda', options: countryCurrencies},
        {field: 'Idioma', options: countryLanguages},
        {field: 'Región', options: countryRegions},
        {field: 'Subregión', options: countrySubregions},
        {field: 'Capital', options: countryCapitals},
    ];

    // Datos filtrados según los datos seleccionados
    let filteredData = {};
    for (let [key, value] of Object.entries(selectedData)) {
        if (value !== null) {
            filteredData[key] = searchFieldOptions.find(option => option.field === key).options.filter(option => option.value === value.value);
        }
    }

    // Manejadores para los cambios en los selectores
    const handleNameChange = (selectedOption) => {
        setSelectedData(prevState => ({...prevState, "Nombre": selectedOption}));
    };
    const handleCurrencyChange = (selectedOption) => {
        setSelectedData(prevState => ({...prevState, "Moneda": selectedOption}));
    }
    const handleLanguageChange = (selectedOption) => {
        setSelectedData(prevState => ({...prevState, "Idioma": selectedOption}));
    }
    const handleRegionChange = (selectedOption) => {
        setSelectedData(prevState => ({...prevState, "Región": selectedOption}));
    }
    const handleSubregionChange = (selectedOption) => {
        setSelectedData(prevState => ({...prevState, "Subregión": selectedOption}));
    }
    const handleCapitalChange = (selectedOption) => {
        setSelectedData(prevState => ({...prevState, "Capital": selectedOption}));
    }
    // Función para manejar el click en la tarjeta
    const handleCardClick = (country) => {
        setSelectedCountry(country);
        fetchCountryDetails(country.name.common).then(() => {
            setShowModal(true);
        });
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Objeto con los manejadores
    const handlers = {
        "Nombre": handleNameChange,
        "Moneda": handleCurrencyChange,
        "Idioma": handleLanguageChange,
        "Región": handleRegionChange,
        "Subregión": handleSubregionChange,
        "Capital": handleCapitalChange
    }
    const fetchCountryDetails = async (countryName) => {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
            const data = await response.json();
            setCountryDetails(data[0]);
        } catch (error) {
            console.error("Error al obtener los detalles del país:", error);
            alert("Ha ocurrido un error con el servidor. Sentimos las molestias!")
        }
    };

    // Efecto para buscar los datos cuando cambian los datos seleccionados
    useEffect(() => {
        // Función para obtener los datos de los países
        const fetchData = async () => {
            // Función para buscar por nombre
            async function fetchByName() {
                let apiUrl = "https://restcountries.com/v3.1/name/";

                if (filteredData["Nombre"] && filteredData["Nombre"] !== lastSearchedName) {
                    apiUrl += filteredData["Nombre"][0].value;
                    setLastSearchedName(filteredData["Nombre"]);
                }
                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        setSearchResultsByName(data);
                    } else {
                        console.error("Data is not an array:", data);
                        setSearchResultsByName([]);
                    }
                } catch (error) {
                    console.error("Error al obtener los países:", error);
                    alert("Ha ocurrido un error con el servidor. Sentimos las molestias!")
                }


            }

            // Función para buscar por moneda
            async function fetchByCurrency() {
                let apiUrl = "https://restcountries.com/v3.1/currency/";

                if (filteredData["Moneda"] && filteredData["Moneda"] !== lastSearchedCurrency) {
                    apiUrl += filteredData["Moneda"][0].value.toLowerCase()
                    setLastSearchedCurrency(filteredData["Moneda"]);
                }
                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        setSearchResultsByCurrency(data);
                    } else {
                        setSearchResultsByCurrency([]);
                    }
                } catch (error) {
                    console.error("Error al obtener los países:", error);
                    alert("Ha ocurrido un error con el servidor. Sentimos las molestias!")
                }


            }

            // Función para buscar por idioma
            async function fetchByLanguage() {
                let apiUrl = "https://restcountries.com/v3.1/lang/";

                if (filteredData["Idioma"] && filteredData["Idioma"] !== lastSearchedLanguage) {
                    apiUrl += filteredData["Idioma"][0].value.toLowerCase()
                    setLastSearchedLanguage(filteredData["Idioma"]);
                }
                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        setSearchResultsByLanguage(data);
                    } else {
                        setSearchResultsByLanguage([]);
                    }
                } catch (error) {
                    console.error("Error al obtener los países:", error);
                    alert("Ha ocurrido un error con el servidor. Sentimos las molestias!")
                }


            }

            // Función para buscar por idioma
            async function fetchByRegion() {
                let apiUrl = "https://restcountries.com/v3.1/region/";

                if (filteredData["Región"] && filteredData["Región"] !== lastSearchedRegion) {
                    apiUrl += filteredData["Región"][0].value.toLowerCase()
                    setLastSearchedRegion(filteredData["Región"]);
                }
                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        setSearchResultsByRegion(data);
                    } else {
                        setSearchResultsByRegion([]);
                    }
                } catch (error) {
                    console.error("Error al obtener los países:", error);
                    alert("Ha ocurrido un error con el servidor. Sentimos las molestias!")
                }

            }

// Función para buscar por subregión
            async function fetchBySubregion() {
                let apiUrl = "https://restcountries.com/v3.1/subregion/";

                if (filteredData["Subregión"] && filteredData["Subregión"] !== lastSearchedSubregion) {
                    apiUrl += filteredData["Subregión"][0].value.toLowerCase()
                    setLastSearchedSubregion(filteredData["Subregión"]);
                }
                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        setSearchResultsBySubregion(data);
                    } else {
                        setSearchResultsBySubregion([]);
                    }
                } catch (error) {
                    console.error("Error al obtener los países:", error);
                    alert("Ha ocurrido un error con el servidor. Sentimos las molestias!")
                }
            }

// Función para buscar por capital
            async function fetchByCapital() {
                let apiUrl = "https://restcountries.com/v3.1/capital/";

                if (filteredData["Capital"] && filteredData["Capital"] !== lastSearchedCapital) {
                    apiUrl += filteredData["Capital"][0].value.toLowerCase()
                    setLastSearchedCapital(filteredData["Capital"]);
                }
                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        setSearchResultsByCapital(data);
                    } else {
                        setSearchResultsByCapital([]);
                    }
                } catch (error) {
                    console.error("Error al obtener los países:", error);
                    alert("Ha ocurrido un error con el servidor. Sentimos las molestias!")
                }

            }

            try {
                const response = await fetch("https://restcountries.com/v3.1/all?fields=name,currencies,languages,region,subregion,capital");
                const data = await response.json();
                setAllCountries(data)
                await fetchByName(data);
                await fetchByCurrency(data);
                await fetchByLanguage(data);
                await fetchByRegion(data);
                await fetchBySubregion(data);
                await fetchByCapital(data);

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

            } catch (error) {
                console.error("Error al obtener los datos:", error);
                alert("Ha ocurrido un error con el servidor. Sentimos las molestias!")
            }
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

        fetchData();
    }, [selectedData]);


    return (
        <ImageBackground
            source={require('../assets/fondo_buscador_con_filtro.png')}
            style={styles.background}
        >
            <MyContext.Provider value={{selectData: searchFieldOptions, handlers}}>
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
