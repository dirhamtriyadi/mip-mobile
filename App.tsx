import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import { Text, TouchableOpacity, PermissionsAndroid, Alert, Platform, View, ActivityIndicator } from 'react-native';

import { AuthContext, AuthProvider } from './src/contexts/AuthContext';
import LoginScreen from './src/screens/Auth/Login';
import HomeScreen from './src/screens/Home';
import AbsenScreen from './src/screens/Absen';
import AbsenMasukScreen from './src/screens/AbsenMasuk';
import AbsenPulangScreen from './src/screens/AbsenPulang';
import SakitScreen from './src/screens/Sakit';
import IzinScreen from './src/screens/Izin';
import CutiScreen from './src/screens/Cuti';
import PenagihanScreen from './src/screens/Penagihan';
import DetailPenagihanScreen from './src/screens/DetailPenagihan';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Absen: undefined;
  AbsenMasuk: undefined;
  AbsenPulang: undefined;
  Sakit: undefined;
  Izin: undefined;
  Cuti: undefined;
  Penagihan: undefined;
  DetailPenagihan: { id: string };
};

async function requestLocationPermission() {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "This app needs access to your location.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
      } else {
        console.log("Location permission denied");
        Alert.alert(
          "Permission Denied",
          "Location permission is required to use this feature. Please enable it in the app settings.",
          [
            { text: "OK" }
          ]
        );
      }
    } else {
      // For iOS, you can use a different library like react-native-permissions
      console.log("Location permission is not required for iOS in this example.");
    }
  } catch (err) {
    console.warn(err);
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

function Layout() {
  const { logout, isAuthenticated, isLoading } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={() => ({
                title: 'Home',
                headerRight: () => (
                  <TouchableOpacity
                    style={{
                      marginRight: 10,
                      padding: 10,
                      backgroundColor: '#da4a4a',
                      borderRadius: 5,
                    }}
                    onPress={() => handleLogout()}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    >
                      Logout
                    </Text>
                  </TouchableOpacity>
                ),
                // remove header back button
                headerBackVisible: false,
              })}
            />
            <Stack.Screen name="Absen" component={AbsenScreen} options={{ title: 'Absen' }} />
            <Stack.Screen name="AbsenMasuk" component={AbsenMasukScreen} options={{ title: 'Absen Masuk' }} />
            <Stack.Screen name="AbsenPulang" component={AbsenPulangScreen} options={{ title: 'Absen Pulang' }} />
            <Stack.Screen name="Sakit" component={SakitScreen} options={{ title: 'Sakit' }} />
            <Stack.Screen name="Izin" component={IzinScreen} options={{ title: 'Izin' }} />
            <Stack.Screen name="Cuti" component={CutiScreen} options={{ title: 'Cuti' }} />
            <Stack.Screen name="Penagihan" component={PenagihanScreen} options={{ title: 'Penagihan' }} />
            <Stack.Screen name="DetailPenagihan" component={DetailPenagihanScreen} options={{ title: 'Detail Penagihan' }} />
          </Stack.Group>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Login',
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;