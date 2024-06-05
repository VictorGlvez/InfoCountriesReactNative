import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'InfoCountries',
            title: 'InfoCountries',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color="black" />
            )
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

