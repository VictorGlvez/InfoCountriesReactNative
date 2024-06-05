import React from "react";
import {View, Text, Linking} from "react-native";
import {Rectangulo} from "@/components/Rectangulo";

export default function About() {
    return (
        <View>
            <View >
                <Text>Sobre nosotros</Text>
                <View style={{flexDirection: 'row'}}>
                    <View style={{marginBottom: 100}}>
                        <Rectangulo backgroundColor="#113946" borderColor="#BCA37F" textColor="#FFF2D8" padding={20}>
                            <Text>Quiénes somos</Text>
                            <Text>
                                Somos Juan Valera y Víctor Gálvez, estudiantes de FP en Desarrollo de Aplicaciones
                                Multiplataforma (DAM) en el I.E.S. Chirinos. Esta página web es nuestro proyecto de fin
                                de grado, creada para proporcionar información detallada y accesible sobre países de
                                todo
                                el mundo.
                            </Text>
                            <Text>
                                Apasionados por la informática y las buenas prácticas, hemos dedicado nuestro tiempo a
                                diseñar una plataforma útil y educativa. Aquí encontrarás datos actualizados sobre
                                geografía, cultura, gastronomía y más, todo organizado de manera fácil de navegar.
                            </Text>
                            <Text>
                                Esperamos que disfrutes explorando nuestra web tanto como nosotros disfrutamos
                                desarrollándola. ¡Gracias por visitarnos!
                            </Text>
                        </Rectangulo>
                    </View>
                    <View style={{marginBottom: 100}}>
                        <Text>Contacto</Text>
                        <Text>
                            Puedes acceder al repositorio de github de este
                            proyecto <Text style={{color: 'blue'}}
                                           onPress={() => Linking.openURL('https://github.com/JuanValeraDev/InfoCountries')}>aquí</Text>. {"\n"}
                            Si quieres contactar con nosotros personalmente puedes hacerlo aquí: {"\n"}
                            - Juan Valera: <Text style={{color: 'blue'}}
                                                 onPress={() => Linking.openURL('https://github.com/JuanValeraDev')}>Github</Text> {"\n"}
                            - Víctor Gálvez: <Text style={{color: 'blue'}}
                                                   onPress={() => Linking.openURL('https://github.com/VictorGlvez')}>Github</Text>
                        </Text>
                    </View>
                    <View>
                        <Rectangulo backgroundColor="#113946" borderColor="#FFF2D8" textColor="#FFF2D8" padding={20}>
                            <Text>FAQs</Text>
                            <Text>
                                ¿Qué tipo de información puedo encontrar sobre cada país? {"\n"}
                                En nuestra página web, puedes encontrar información básica sobre cada país, como su
                                moneda, región y bandera, disponible en el buscador. Además, ofrecemos una galería de
                                imágenes y la opción de comparar dos países en aspectos como política, cultura,
                                gastronomía y
                                turismo. {"\n"}
                                ¿Puedo utilizar la información de la página para proyectos académicos o
                                investigaciones? {"\n"}
                                Sí, toda la información es de acceso abierto y está disponible para que la uses como
                                necesites. {"\n"}
                                ¿Hay algún costo asociado con el uso de la página web? {"\n"}
                                No, la página web es totalmente gratuita. No hay ningún costo por usar ninguna de sus
                                funciones. {"\n"}
                                ¿Puedo contactar a los creadores de la página para consultas o sugerencias? {"\n"}
                                Sí, los enlaces a nuestros perfiles de GitHub están disponibles en la sección de
                                contacto, justo al
                                lado de esta sección de FAQs. {"\n"}
                                ¿La página web es accesible desde dispositivos móviles? {"\n"}
                                Sí, nuestra página web es completamente accesible desde dispositivos móviles.
                                Además, hemos desarrollado una versión específica para móviles utilizando React Native.
                                Puedes
                                encontrar más detalles y acceder al código en nuestro repositorio de GitHub: <Text
                                style={{color: 'blue'}}
                                onPress={() => Linking.openURL('https://github.com/JuanValeraDev/InfoCountriesReactNative')}>aquí</Text>.
                            </Text>
                        </Rectangulo>
                    </View>
                </View>
            </View>
        </View>
    )
}




