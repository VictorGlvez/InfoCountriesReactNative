import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'InfoCountries',
          }}
        />
        <Drawer.Screen
          name="prueba" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'MiPrueba',
            title: 'overview de prueba',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

