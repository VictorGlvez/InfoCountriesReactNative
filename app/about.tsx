import React from "react";
import {View, Text, Linking, StyleSheet} from "react-native";
import {Rectangulo} from "@/components/Rectangulo";
import {ScrollView} from "react-native-gesture-handler";

export default function About() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.titulo}>Sobre nosotros</Text>
                <View style={{marginBottom: 50}}>
                    <Rectangulo backgroundColor="#113946" borderColor="#BCA37F" padding={20} margin={20}>
                        <Text style={styles.tituloRectangulo}>Quiénes somos</Text>
                        <Text style={styles.textoRectangulo}>
                            Somos Juan Valera y Víctor Gálvez, estudiantes de FP en Desarrollo de Aplicaciones
                            Multiplataforma (DAM) en el I.E.S. Chirinos. Esta página web es nuestro proyecto de fin
                            de grado, creada para proporcionar información detallada y accesible sobre países de
                            todo el mundo.
                            Apasionados por la informática y las buenas prácticas, hemos dedicado nuestro tiempo a
                            diseñar una plataforma útil y educativa. Aquí encontrarás datos actualizados sobre
                            geografía, cultura, gastronomía y más, todo organizado de manera fácil de navegar.
                            Esperamos que disfrutes explorando nuestra web tanto como nosotros disfrutamos
                            desarrollándola. ¡Gracias por visitarnos!
                        </Text>
                    </Rectangulo>
                </View>
                <View style={{marginBottom: 50}}>
                    <Text style={styles.titulo}>Contacto</Text>
                    <Text style={styles.contacto}>
                        Puedes acceder al repositorio de github de este
                        proyecto <Text style={{color: 'blue'}}
                                       onPress={() => Linking.openURL('https://github.com/VictorGlvez/InfoCountriesReactNative')}>aquí</Text>. {"\n"}
                        Si quieres contactar con nosotros personalmente puedes hacerlo aquí: {"\n"}
                        - Juan Valera: <Text style={{color: 'blue'}}
                                             onPress={() => Linking.openURL('https://github.com/JuanValeraDev')}>Github</Text> {"\n"}
                        - Víctor Gálvez: <Text style={{color: 'blue'}}
                                               onPress={() => Linking.openURL('https://github.com/VictorGlvez')}>Github</Text>
                    </Text>
                </View>
                <View>
                    <Rectangulo backgroundColor="#113946" borderColor="#FFF2D8" padding={20} margin={20}>
                        <Text style={styles.tituloRectangulo}>FAQs</Text>
                        <Text style={styles.textoRectangulo}>
                            <Text style={styles.subtituloRectangulo}> ¿Qué tipo de información puedo encontrar sobre
                                cada país? </Text>{"\n"}
                            En nuestra página web, puedes encontrar información básica sobre cada país, como su
                            moneda, región y bandera, disponible en el buscador. Además, ofrecemos una galería de
                            imágenes y la opción de comparar dos países en aspectos como política, cultura,
                            gastronomía y
                            turismo. {"\n"}
                            <Text style={styles.subtituloRectangulo}> ¿Puedo utilizar la información de la página para
                                proyectos académicos o
                                investigaciones? {"\n"}
                            </Text>
                            Sí, toda la información es de acceso abierto y está disponible para que la uses como
                            necesites. {"\n"}
                            <Text style={styles.subtituloRectangulo}> ¿Hay algún costo asociado con el uso de la página
                                web? </Text>{"\n"}
                            No, la página web es totalmente gratuita. No hay ningún costo por usar ninguna de sus
                            funciones. {"\n"}
                            <Text style={styles.subtituloRectangulo}>  ¿Puedo contactar a los creadores de la página para consultas o sugerencias? </Text>{"\n"}
                            Sí, los enlaces a nuestros perfiles de GitHub están disponibles en la sección de
                            contacto, justo al
                            lado de esta sección de FAQs. {"\n"}
                            <Text style={styles.subtituloRectangulo}>  ¿La página web es accesible desde la web? </Text>{"\n"}
                            Sí, nuestra aplicación móvil es completamente accesible desde la web.
                            Además, hemos desarrollado una versión específica para navegadores utilizando React.
                            Puedes
                            encontrar más detalles y acceder al código en nuestro repositorio de GitHub: <Text
                            style={{color: 'blue'}}
                            onPress={() => Linking.openURL('https://github.com/JuanValeraDev/InfoCountries')}>aquí</Text>.
                        </Text>
                    </Rectangulo>
                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff2d8', // Aquí puedes poner el color que desees
    },
    tituloRectangulo: {
        fontSize: 28,
        color: '#fff2d8',
        textAlign: 'center',
    },
    subtituloRectangulo: {
        fontSize: 20,
        color: '#fff2d8',
        textAlign: 'center',
        fontStyle: 'italic',
        marginVertical: 10,
    },
    textoRectangulo: {
        color: '#fff2d8',
        fontSize: 16,
        textAlign: 'center',
    },
    titulo: {
        fontSize: 24,
        margin: 10,
        color: '#113946',
        textAlign: 'center',
    },
    contacto: {
        fontSize: 20,
        margin: 10,
        color: '#113946',
        textAlign: 'center',
    }

})


