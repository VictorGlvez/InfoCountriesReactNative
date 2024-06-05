import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Modal } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

export default function Galeria() {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [fullScreenImage, setFullScreenImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);



    const handleImagePress = (image: any) => {
        setFullScreenImage(image);
        setModalVisible(true);
    };

    return (
        <ImageBackground
            source={require('../assets/fondo_galeria_con_filtro.png')}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.titulo_galeria}>Observa con detalle</Text>
                <View style={{ width: 200 }}>
                    <SelectList
                        setSelected={(val: any) => setSelectedCountry(val)}
                        data={data}
                        save="value"
                        placeholder={"País a buscar"}
                    />
                </View>

                <View style={styles.contenedorImagen}>
                    <TouchableOpacity onPress={() => handleImagePress(require('../assets/galeriaprueba.jpeg'))}>
                        <Image
                            source={require('../assets/galeriaprueba.jpeg')}
                            style={styles.formatoImagen}
                        />
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            {fullScreenImage && (
                            <Image
                                source={fullScreenImage}
                            />
                        )}
                        </View>
                    </Modal>
                </View>
            </View>
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
        backgroundColor: 'black', // Fondo negro
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const data = [
    { key: '1', value: 'Mobiles', disabled: true },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers', disabled: true },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' },
]