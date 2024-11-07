import React from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import useAuth from '../../hooks/useAuth';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';

function HomeScreen() {
  const { isLoading, isAuthenticated } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleInDevelopment = () => {
    Alert.alert('Dalam tahap pengembangan', 'Fitur ini sedang dalam tahap pengembangan.')
  }

  return (
    <View style={styles.container}>
      <View style={styles.colContainer}>
        <View style={styles.absenContainer}>
          <TouchableOpacity style={styles.buttonAbsen} onPress={() => navigation.navigate('Absen')}>
            <Icon name="sign-in-alt" size={30} color="#000" />
            <Text>Absen</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <TouchableOpacity style={styles.button} onPress={handleInDevelopment}>
            <Icon name="money-bill-wave" size={30} color="#000" />
            <Text>Penagihan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleInDevelopment}>
            <Icon name="file-invoice-dollar" size={30} color="#000" />
            <Text>Laporan Penagihan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  absenContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colContainer: {
    flexDirection: 'column',
    // flexWrap: 'wrap',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    margin: 3,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonAbsen: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 150,
    margin: 3,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});