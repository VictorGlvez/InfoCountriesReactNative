/*
import React, {useEffect, useState} from 'react';
import {View, Text, Image, Button, StyleSheet, ImageBackground, Modal, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import {Rectangulo} from "@/components/Rectangulo";
import RectanguloBuscador from "@/components/RectanguloBuscador";

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
    const [selectedCountry, setSelectedCountry] = useState<CountryDetails | null>(null);
    const [countryDetails, setCountryDetails] = useState<CountryDetails | null>(null);


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
    const [selectedData, setSelectedData] = useState<SelectedData>({
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
        if (value !== null) {
            // Aplicamos el filtro correspondiente a los resultados combinados
            switch (field) {
                case "Nombre":
                    combinedSearchResults = combinedSearchResults.filter((country: CountryDetails) => country.name.common === value!.value);
                    break;
                case "Moneda":
                    combinedSearchResults = combinedSearchResults.filter((country: CountryDetails) => Object.values(country.currencies).some(currency => currency.name === value!.value));
                    break;
                case "Idioma":
                    combinedSearchResults = combinedSearchResults.filter((country: CountryDetails) => Object.values(country.languages).includes(value!.value));
                    break;
                case "Región":
                    combinedSearchResults = combinedSearchResults.filter((country: CountryDetails) => country.region === value!.value);
                    break;
                case "Subregión":
                    combinedSearchResults = combinedSearchResults.filter((country: CountryDetails) => country.subregion === value!.value);
                    break;
                case "Capital":
                    combinedSearchResults = combinedSearchResults.filter((country: CountryDetails) => country.capital[0] === value!.value);
                    break;
            }
        }
    }

    // Opciones para los selectores
    type SearchFieldOption = {
        field: string;
        options: SelectedOption[];
    };

    const searchFieldOptions: SearchFieldOption[] = [
        {field: 'Nombre', options: countryNames},
        {field: 'Moneda', options: countryCurrencies},
        {field: 'Idioma', options: countryLanguages},
        {field: 'Región', options: countryRegions},
        {field: 'Subregión', options: countrySubregions},
        {field: 'Capital', options: countryCapitals},
    ];

    // Datos filtrados según los datos seleccionados
    let filteredData: [SelectedData] = [{
        Capital: null,
        Idioma: null,
        Moneda: null,
        Nombre: null,
        Región: null,
        Subregión: null
    }];
    for (let [key, value] of Object.entries(selectedData)) {
        if (value !== null) {
            // @ts-ignore
            filteredData[key] = searchFieldOptions.find(option => option.field === key).options.find(option => option.value === value!.value);
        }
    }

    // Manejadores para los cambios en los selectores
    const handleNameChange = (selectedOption: SelectedOption) => {
        setSelectedData(prevState => ({...prevState, "Nombre": selectedOption}));
    };
    const handleCurrencyChange = (selectedOption: SelectedOption) => {
        setSelectedData(prevState => ({...prevState, "Moneda": selectedOption}));
    }
    const handleLanguageChange = (selectedOption: SelectedOption) => {
        setSelectedData(prevState => ({...prevState, "Idioma": selectedOption}));
    }
    const handleRegionChange = (selectedOption: SelectedOption) => {
        setSelectedData(prevState => ({...prevState, "Región": selectedOption}));
    }
    const handleSubregionChange = (selectedOption: SelectedOption) => {
        setSelectedData(prevState => ({...prevState, "Subregión": selectedOption}));
    }
    const handleCapitalChange = (selectedOption: SelectedOption) => {
        setSelectedData(prevState => ({...prevState, "Capital": selectedOption}));
    }
    // Función para manejar el click en la tarjeta
    const handleCardClick = (country: CountryDetails) => {
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
    const fetchCountryDetails = async (countryName: string) => {
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
        const fetchData = async (data: any[]) => {
            // Función para buscar por nombre
            async function fetchByName(data: any[]) {
                let apiUrl = "https://restcountries.com/v3.1/name/";

                // @ts-ignore
                if (filteredData["Nombre"] && filteredData["Nombre"] !== lastSearchedName) {
                    // @ts-ignore
                    apiUrl += filteredData["Nombre"][0].value;
                    // @ts-ignore
                    setLastSearchedName(filteredData["Nombre"]);
                }
                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        // @ts-ignore
                        setSearchResultsByName(data);
                    } else {
                        console.error("Data is not an array:", data);
                        setSearchResultsByName([]);
                    }
                } catch (error) {
                    console.error("Error al obtener los países:", error);
                    alert("Ha ocurrido un error con el servidor. Sentimos las molestias!")
                }

                const names = data.map(country => ({value: country.name.common, label: country.name.common}));
                const uniqueNames = getUniqueSorted(names);
                setCountryNames(uniqueNames);
            }

            // Función para buscar por moneda
            async function fetchByCurrency(data: any[]) {
                let apiUrl = "https://restcountries.com/v3.1/currency/";

                // @ts-ignore
                if (filteredData["Moneda"] && filteredData["Moneda"] !== lastSearchedCurrency) {
                    // @ts-ignore
                    apiUrl += filteredData["Moneda"][0].value.toLowerCase()
                    // @ts-ignore
                    setLastSearchedCurrency(filteredData["Moneda"]);
                }
                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        // @ts-ignore
                        setSearchResultsByCurrency(data);
                    } else {
                        setSearchResultsByCurrency([]);
                    }
                } catch (error) {
                    console.error("Error al obtener los países:", error);
                    alert("Ha ocurrido un error con el servidor. Sentimos las molestias!")
                }


                const currencies = data.flatMap(country =>
                    // @ts-ignore
                    Object.values(country.currencies).map(currency => ({value: currency!.name, label: currency!.name}))
                );
                const uniqueCurrencies = getUniqueSorted(currencies);
                setCountryCurrencies(uniqueCurrencies);
            }

            // Función para buscar por idioma
            async function fetchByLanguage(data: any[]) {
                let apiUrl = "https://restcountries.com/v3.1/lang/";

                // @ts-ignore
                if (filteredData["Idioma"] && filteredData["Idioma"] !== lastSearchedLanguage) {
                    // @ts-ignore
                    apiUrl += filteredData["Idioma"][0].value.toLowerCase()
                    // @ts-ignore
                    setLastSearchedLanguage(filteredData["Idioma"]);
                }
                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        // @ts-ignore
                        setSearchResultsByLanguage(data);
                    } else {
                        setSearchResultsByLanguage([]);
                    }
                } catch (error) {
                    console.error("Error al obtener los países:", error);
                    alert("Ha ocurrido un error con el servidor. Sentimos las molestias!")
                }

                const languages = data.flatMap(country =>
                    Object.values(country.languages).map(language => ({value: language, label: language}))
                );
                const uniqueLanguages = getUniqueSorted(languages);
                setCountryLanguages(uniqueLanguages);
            }

            // Función para buscar por idioma
            async function fetchByRegion(data: any[]) {
                let apiUrl = "https://restcountries.com/v3.1/region/";

                // @ts-ignore
                if (filteredData["Región"] && filteredData["Región"] !== lastSearchedRegion) {
                    // @ts-ignore
                    apiUrl += filteredData["Región"][0].value.toLowerCase()
                    // @ts-ignore
                    setLastSearchedRegion(filteredData["Región"]);
                }
                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        // @ts-ignore
                        setSearchResultsByRegion(data);
                    } else {
                        setSearchResultsByRegion([]);
                    }
                } catch (error) {
                    console.error("Error al obtener los países:", error);
                    alert("Ha ocurrido un error con el servidor. Sentimos las molestias!")
                }

                const regions = data.flatMap(country =>
                    Object.values(country.region).map(region => ({value: region, label: region}))
                );
                const uniqueRegions = getUniqueSorted(regions);
                setCountryLanguages(uniqueRegions);
            }

// Función para buscar por subregión
            async function fetchBySubregion(data: any[]) {
                let apiUrl = "https://restcountries.com/v3.1/subregion/";

                // @ts-ignore
                if (filteredData["Subregión"] && filteredData["Subregión"] !== lastSearchedSubregion) {
                    // @ts-ignore
                    apiUrl += filteredData["Subregión"][0].value.toLowerCase()
                    // @ts-ignore
                    setLastSearchedSubregion(filteredData["Subregión"]);
                }
                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        // @ts-ignore
                        setSearchResultsBySubregion(data);
                    } else {
                        setSearchResultsBySubregion([]);
                    }
                } catch (error) {
                    console.error("Error al obtener los países:", error);
                    alert("Ha ocurrido un error con el servidor. Sentimos las molestias!")
                }

                const subregions = data.map(country => ({value: country.subregion, label: country.subregion}));
                const uniqueSubregions = getUniqueSorted(subregions);
                setCountrySubregions(uniqueSubregions);
            }

// Función para buscar por capital
            async function fetchByCapital(data: any[]) {
                let apiUrl = "https://restcountries.com/v3.1/capital/";

                // @ts-ignore
                if (filteredData["Capital"] && filteredData["Capital"] !== lastSearchedCapital) {
                    // @ts-ignore
                    apiUrl += filteredData["Capital"][0].value.toLowerCase()
                    // @ts-ignore
                    setLastSearchedCapital(filteredData["Capital"]);
                }
                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        // @ts-ignore
                        setSearchResultsByCapital(data);
                    } else {
                        setSearchResultsByCapital([]);
                    }
                } catch (error) {
                    console.error("Error al obtener los países:", error);
                    alert("Ha ocurrido un error con el servidor. Sentimos las molestias!")
                }

                const capitals = data.reduce((acc, country) => {
                    if (country.capital[0]) {
                        acc.push({value: country.capital[0], label: country.capital[0]});
                    }
                    return acc;
                }, []);
                const uniqueCapitals = getUniqueSorted(capitals);
                setCountryCapitals(uniqueCapitals);
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

                const languages = data.flatMap((country: {
                        languages: { [s: string]: unknown; } | ArrayLike<unknown>;
                    }) =>
                        Object.values(country.languages).map(language => ({value: language, label: language}))
                );
                const uniqueLanguages = getUniqueSorted(languages);
                setCountryLanguages(uniqueLanguages);

                const regions = data.map((country: { region: any; }) => ({
                    value: country.region,
                    label: country.region
                }));
                const uniqueRegions = getUniqueSorted(regions);
                setCountryRegions(uniqueRegions);

                const subregions = data.map((country: { subregion: any; }) => ({
                    value: country.subregion,
                    label: country.subregion
                }));
                const uniqueSubregions = getUniqueSorted(subregions);
                setCountrySubregions(uniqueSubregions);

                const capitals = data.reduce((acc: { value: any; label: any; }[], country: { capital: any[]; }) => {
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
        const getUniqueSorted = (items: any[]) => {
            const uniqueItems = items.reduce((acc, current) => {
                const x = acc.find((item: { label: any; }) => item.label === current.label);
                if (!x) {
                    return acc.concat([current]);
                } else {
                    return acc;
                }
            }, []);
            uniqueItems.sort((a: { label: string; }, b: { label: any; }) => a.label.localeCompare(b.label));
            return uniqueItems;
        };


        // @ts-ignore
        fetchData();

    }, [selectedData]);


    return (
        <ImageBackground
            source={require('../assets/fondo_buscador_con_filtro.png')}
            style={styles.background}
        >
            <MyContext.Provider value={{selectData: searchFieldOptions, handlers}}>
                <View style={styles.container}>
                    <Text style={styles.title}>Busca como un profesional</Text>
                    <View>
                        <View>
                            <RectanguloBuscador/>
                        </View>
                        <View>
                            <Rectangulo backgroundColor={"#fff2d8"} borderColor={"#113946"}>
                                <Text style={styles.title}>Resultados</Text>
                                <View style={styles.container}>
                                    <View>
                                        {
                                            <>
                                                {combinedSearchResults.map((country: CountryDetails, index) => (
                                                    country["name"] !== undefined &&
                                                    country["currencies"] !== undefined &&
                                                    country["region"] !== undefined && (
                                                        <View key={index}>
                                                            <TouchableOpacity
                                                                key={index}
                                                                onPress={() => handleCardClick(country)}
                                                            >
                                                                <Card.Title>{country.name.common}</Card.Title>
                                                            </TouchableOpacity>
                                                        </View>
                                                    )
                                                ))
                                                }
                                            </>
                                        }
                                    </View>
                                    <Modal visible={showModal} onDismiss={handleCloseModal}>
                                        <View style={styles.modalHeader}>
                                            <Text
                                            >{countryDetails ? countryDetails.name.common.toUpperCase() : ""}</Text>
                                        </View>
                                        <View style={styles.modalBody}>
                                            <Text>Bandera</Text>
                                            {countryDetails && countryDetails.flags ?
                                                <Image source={{uri: countryDetails.flags.png}}
                                                       style={styles.image}/> : ""}
                                            <Text>Información General</Text>
                                            <Text>Nombre
                                                Oficial: {countryDetails ? countryDetails.name.official : ""}</Text>
                                            <Text>Región: {countryDetails ? countryDetails.region : ""}</Text>
                                            <Text>Subregión: {countryDetails ? countryDetails.subregion : ""}</Text>
                                            <Text>Capital: {countryDetails ? countryDetails.capital[0] : ""}</Text>
                                            <Text>Área: {countryDetails ? countryDetails.area : ""} km²</Text>
                                            <Text>Población: {countryDetails ? countryDetails.population : ""}</Text>
                                            <Text>Moneda</Text>
                                            {countryDetails && countryDetails.currencies ? Object.values(countryDetails.currencies).map((currency, index) => (
                                                <Text key={index}>Nombre: {currency.name},
                                                    Símbolo: {currency.symbol}</Text>
                                            )) : ""}
                                            <Text>Idiomas</Text>
                                            {countryDetails && countryDetails.languages ? Object.values(countryDetails.languages).map((language, index) => (
                                                <Text key={index}>{language}</Text>
                                            )) : ""}
                                            <Text>Zonas Horarias</Text>
                                            {countryDetails && countryDetails.timezones ? countryDetails.timezones.map((timezone, index) => (
                                                <Text key={index}>{timezone}</Text>
                                            )) : ""}
                                            <Text>Gentilicios</Text>
                                            {countryDetails && countryDetails.demonyms ? Object.values(countryDetails.demonyms).map((demonym, index) => (
                                                <Text key={index}>{demonym.f} / {demonym.m}</Text>
                                            )) : ""}
                                            <Text>Inicio de la Semana</Text>
                                            <Text>{countryDetails ? countryDetails.startOfWeek : ""}</Text>
                                            <Text>Escudo</Text>
                                            {countryDetails && countryDetails.coatOfArms ?
                                                <Image source={{uri: countryDetails.coatOfArms.png}}
                                                       style={styles.image}/> : ""}
                                        </View>
                                        <View style={styles.modalFooter}>
                                            <Button title="Cerrar" onPress={handleCloseModal}/>
                                        </View>
                                    </Modal>
                                </View>
                            </Rectangulo>
                        </View>
                    </View>
                </View>
            </MyContext.Provider>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column'
    },
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
    modalHeader: {
        backgroundColor: "#113946",
        color: "#FFF2D8",
    },
    modalBody: {
        backgroundColor: "#FFF2D8",
        color: "#113946",
    },
    modalFooter: {
        backgroundColor: "#113946",
        color: "#FFF2D8",
    },
    image: {
        width: 200,
        height: 200,
        margin: 30,
        borderColor: "black",
        borderWidth: 4,
        borderRadius: 30
    },
})

// Define a type for the selected option
type SelectedOption = {
    value: string;
    label: string;
};

// Define a type for the country details
type CountryDetails = {
    map(arg0: (timezone: any, index: any) => React.JSX.Element): React.ReactNode;
    timezones: CountryDetails | null;
    name: {
        common: string;
        official: string;
    };
    currencies: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    languages: {
        [key: string]: string;
    };
    region: string;
    subregion: string;
    capital: string[];
    area: number;
    population: number;
    flags: {
        png: string;
    };
    coatOfArms: {
        png: string;
    };
    demonyms: {
        [key: string]: {
            f: string;
            m: string;
        };
    };
    startOfWeek: string;
};

// Define a type for the country
type Country = {
    name: {
        common: string;
    };
    currencies: {
        [key: string]: {
            name: string;
        };
    };
    region: string;
};

// Define a type for the selected data
type SelectedData = {
    "Nombre": SelectedOption | null;
    "Moneda": SelectedOption | null;
    "Idioma": SelectedOption | null;
    "Región": SelectedOption | null;
    "Subregión": SelectedOption | null;
    "Capital": SelectedOption | null;
};
*/
