import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {Drawer} from 'expo-router/drawer';
import {Ionicons, Foundation, FontAwesome5, FontAwesome} from '@expo/vector-icons';

function CustomDrawerContent(props: any) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo_infocountries.png')} style={styles.logo}/>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

export default function Layout() {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: 'InfoCountries',
                        title: 'InfoCountries',
                        drawerIcon: ({color, size}) => (
                            <Ionicons name="home" size={size} color="black"/>
                        ),
                    }}
                />
                <Drawer.Screen
                    name="galeria"
                    options={{
                        drawerLabel: 'Galería',
                        title: 'Galería de imágenes',
                        drawerIcon: ({color, size}) => (
                            <Foundation name="photo" size={size} color="black"/>
                        ),
                    }}
                />
                <Drawer.Screen
                    name="comparador"
                    options={{
                        drawerLabel: 'Comparador',
                        title: 'Comparador de países',
                        drawerIcon: ({color, size}) => (
                            <Ionicons name="information-circle-sharp" size={size} color="black"/>
                        ),
                    }}
                />
                <Drawer.Screen
                    name="juegobandera"
                    options={{
                        drawerLabel: 'Juego Bandera',
                        title: 'Juego bandera',
                        drawerIcon: ({color, size}) => (
                            <FontAwesome name="flag" size={24} color="black"/>
                        ),
                    }}
                />
                <Drawer.Screen
                    name="juegocapital"
                    options={{
                        drawerLabel: 'Juego Capital',
                        title: 'Juego capital',
                        drawerIcon: ({color, size}) => (
                            <FontAwesome5 name="city" size={24} color="black"/>
                        ),
                    }}
                />
                <Drawer.Screen
                    name="buscador"
                    options={{
                        drawerLabel: 'Buscador',
                        title: 'Buscador de países',
                        drawerIcon: ({color, size}) => (
                            <Ionicons name="people" size={size} color="black"/>
                        ),
                    }}
                />
                <Drawer.Screen
                    name="about"
                    options={{
                        drawerLabel: 'About',
                        title: 'About',
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: 'InfoCountries',
                        title: 'InfoCountries',
                        drawerIcon: ({color, size}) => (
                            <Ionicons name="home" size={size} color="black"/>
                        ),
                    }}
                />
                <Drawer.Screen
                    name="galeria"
                    options={{
                        drawerLabel: 'Galería',
                        title: 'Galería de imágenes',
                        drawerIcon: ({color, size}) => (
                            <Foundation name="photo" size={size} color="black"/>
                        ),
                    }}
                />
                <Drawer.Screen
                    name="comparador"
                    options={{
                        drawerLabel: 'Comparador',
                        title: 'Comparador de países',
                        drawerIcon: ({color, size}) => (
                            <Ionicons name="information-circle-sharp" size={size} color="black"/>
                        ),
                    }}
                />
                <Drawer.Screen
                    name="buscador"
                    options={{
                        drawerLabel: 'Buscador',
                        title: 'Buscador de países',
                        drawerIcon: ({color, size}) => (
                            <Ionicons name="people" size={size} color="black"/>
                        ),
                    }}
                />
                <Drawer.Screen
                    name="about"
                    options={{
                        drawerLabel: 'About',
                        title: 'About',
                        drawerIcon: ({color, size}) => (
                            <Ionicons name="people-outline" size={size} color="black"/>
                        ),
                    }}
                />
                <Drawer.Screen
                    name="prueba"
                    options={{
                        drawerLabel: 'MiPrueba',
                        title: 'overview de prueba',
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
});
