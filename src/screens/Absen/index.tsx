import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../../App";

function AbsenScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleAbsenMasuk = () => {
    navigation.navigate('AbsenMasuk');
  }

  const handleAbsenPulang = () => {
    navigation.navigate('AbsenPulang');
  }

  const handleSakit = () => {
    navigation.navigate('Sakit');
  }

  const handleIzin = () => {
    navigation.navigate('Izin');
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.listButton}>
        <TouchableOpacity style={styles.btn} onPress={handleAbsenMasuk}>
          <Text>Absen Masuk</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleAbsenPulang}>
          <Text>Absen Pulang</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleSakit}>
          <Text>Sakit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleIzin}>
          <Text>Izin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text>Cuti</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default AbsenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  listButton: {
    padding: 5,
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    margin: 3,
    // padding: 20,
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
  }
});