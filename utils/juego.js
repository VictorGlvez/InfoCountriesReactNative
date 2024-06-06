
var countries = [];

const fetchData = async () => {
    try {
        const flagsApiResponse = await fetch('https://restcountries.com/v3.1/all');
        const countriesData = await flagsApiResponse.json();

        countries = countriesData.map(country => ({
            name: country.translations.spa.common,
            flag: country.flags.png,
            capital: country.capital ? country.capital[0] : "Sin capital"
        }));    
    } catch (error) {
        console.error('Error con el fetch:', error);
        alert("Ha ocurrido un error con el servidor. Sentimos las molestias!")
    }
};

export function correctCountry() {
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex]
}

export function options(correctCountryVar) {
    const otherCountries = countries.filter(country => country.name !== correctCountryVar.name).sort(() => Math.random() - 0.5).slice(0, 2);
    return shuffleArray([...otherCountries, correctCountryVar]);
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
};

fetchData();






