import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Modal, Alert} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { countries } from '../utils/countries.js'
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';

export default function Galeria() {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [images, setImages] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const [modalImageUri, setModalImageUri] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);


    const APIkey = "s80PZl05y2VQ3IiHUeFEZMEOKvYGaHAngMtqVi0XGkl2zxw77tcHlYln"

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setIsLoading(true)
                if (selectedCountry) {
                    const imageRequest = await fetch(
                        `https://api.pexels.com/v1/search?query=${selectedCountry}&per_page=6&page=1`,
                        {
                            headers: {
                                Authorization: APIkey,
                            },
                        },
                    )
                    const imageData = await imageRequest.json();
                    setImages(imageData.photos.length ? imageData.photos : []);
                    setIsLoading(false)
                }
            } catch (error) {
                console.log("Error con las imágenes de pexel:", error);
                Alert.alert("Error con la solicitud","Se ha producido un error en el servidor y no podemos mostrate las imágenes. Sentimos las molestias :(")
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages();
    }, [selectedCountry]);

    const handleImagePress = (image) => {
        setModalImageUri(image.src.portrait);
        setModalVisible(true);
    };

    return (
        <ImageBackground
            source={require('../assets/fondo_galeria_con_filtro.png')}
            style={styles.background}
        >
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.titulo_galeria}>Observa con detalle</Text>
                    <View style={{ width: 200 }}>
                        <SelectList
                            setSelected={(val: any) => setSelectedCountry(val)}
                            data={countries}
                            save="value"
                            placeholder={"País a buscar"}
                        />
                    </View>
                    <View style={styles.contenedorImagen}>
                    {isLoading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : images === null ? (
                            <Text></Text>
                        ) : images.length === 0 ? (
                            <Text>No hay imágenes disponibles para este país</Text>
                        ) : (
                            images.map((image, index) => (
                                <TouchableOpacity key={index} onPress={() => handleImagePress(image)}>
                                    <Image
                                        source={{ uri: image.src.medium }}
                                        style={styles.formatoImagen}
                                    />
                                </TouchableOpacity>
                            ))
                        )}
                        <Modal
                            animationType="slide"
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <View style={styles.modalContainer}>
                                <Image
                                    source={{ uri: modalImageUri }}
                                    style={styles.modalImage}
                                />
                            </View>
                        </Modal>
                    </View>
                </View>
            </ScrollView>
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