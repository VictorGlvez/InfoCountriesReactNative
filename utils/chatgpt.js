export const compareCountries = async (firstCountry, secondCountry) => {
    const API_URL = 'https://api.openai.com/v1/chat/completions';
    const API_KEY = 'no-key-retrieval';
    // sk-proj-9MR9G4RnaqEZhaBJNx07T3BlbkFJUFp2F3BdNekM9bDTugs8

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'Eres un experto sobre de países.' },
                    { role: 'user', content: `Quiero que compares ${firstCountry} y ${secondCountry} en función de las siguientes temáticas: política, gastronomía, cultural y turísitca. Quiero que cada comparación me la devuelvas en un párrafo distinto de no más de 600 palabras. No escribas nada más que lo que te pido`}
                ],
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! estado: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data: ', data);
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Hubo un problema con la operacion del fetch: ', error);
    }
};