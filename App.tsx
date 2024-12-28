import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
import ProfileScreen from './src/screens/Profile';

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
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function App() {

  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="Home" component={HomeScreen} options={() => ({ title: 'Home' })} />
        <Stack.Screen name="Absen" component={AbsenScreen} options={{ title: 'Absen' }} />
        <Stack.Screen name="AbsenMasuk" component={AbsenMasukScreen} options={{ title: 'Absen Masuk' }} />
        <Stack.Screen name="AbsenPulang" component={AbsenPulangScreen} options={{ title: 'Absen Pulang' }} />
        <Stack.Screen name="Sakit" component={SakitScreen} options={{ title: 'Sakit' }} />
        <Stack.Screen name="Izin" component={IzinScreen} options={{ title: 'Izin' }} />
        <Stack.Screen name="Cuti" component={CutiScreen} options={{ title: 'Cuti' }} />
        <Stack.Screen name="Penagihan" component={PenagihanScreen} options={{ title: 'Penagihan' }} />
        <Stack.Screen name="DetailPenagihan" component={DetailPenagihanScreen} options={{ title: 'Detail Penagihan' }} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

function ProfileStackScreen() {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{
        title: 'Profile',
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
        }} />
    </Stack.Navigator>
  );
}

function Layout() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  return (
    <NavigationContainer>
      {isAuthenticated ? (
          <Tab.Navigator>
            <Tab.Screen name="HomeStackScreen" component={HomeStackScreen} options={{
              headerShown: false,
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <Ionicons name='home-outline' size={24} color={color} />
                ),
              }} />
            <Tab.Screen name="ProfileStackScreen" component={ProfileStackScreen} options={{
              headerShown: false,
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color }) => (
                <Ionicons name='person-outline' size={24} color={color} />
                ),
            }} />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: 'Login',
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        )}
    </NavigationContainer>
  );
}

export default App;