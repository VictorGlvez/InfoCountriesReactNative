import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { Ionicons, Foundation } from '@expo/vector-icons';

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo_infocountries.png')} style={styles.logo} />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>  
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'InfoCountries',
            title: 'InfoCountries',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color="black" />
            ),
          }}
        />
        <Drawer.Screen
          name="galeria"
          options={{
            drawerLabel: 'Galería',
            title: 'Galería de imágenes',
            drawerIcon: ({ color, size }) => (
              <Foundation name="photo" size={size} color="black" />
            ),
          }}
          />
          <Drawer.Screen
          name="comparador"
          options={{
            drawerLabel: 'Comparador',
            title: 'Comparador de países',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="information-circle-sharp" size={size} color="black" />
            ),
          }}
          />
          <Drawer.Screen
              name="About"
              options={{
                  drawerLabel: 'About',
                  title: 'About',
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
