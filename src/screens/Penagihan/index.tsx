import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, TextInput, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import instance from "../../configs/axios";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import Icon from 'react-native-vector-icons/FontAwesome5';

interface PenagihanData {
  id: string;
  no_billing: string;
  date: any;
  destination: string;
  customer: {
    id: string;
    name_customer: string;
    no: string;
  };
}

function PenagihanScreen() {
  const [data, setData] = useState<PenagihanData[]>([]);

  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleChange = (search: string) => {
    setSearch(search)
  }

  const fetchSearch = async () => {
    try {
      setLoading(true)
      const response = await instance.get('v1/billings/', {
        params: {
          search: search
        }
      })

      setData(response.data.data)
      setLoading(false)
    } catch (error: any) {
      Alert.alert('Gagal mencari data', error.response.data.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBillings();
  }, []);

  const fetchBillings = async () => {
    try {
      setLoading(true)
      const response = await instance.get('v1/billings');
      setData(response.data.data);
      setLoading(false)
    } catch (error: any) {
      Alert.alert('Gagal mengambil data penagihan', error.response.data.message);
      setLoading(false)
    }
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.headContainer}>
        <Text style={[{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }]}>List Tagihan</Text>
        <View style={[styles.groupSearch]}>
          <TextInput
            placeholder="Masukan kata pencarian"
            style={{ width: '90%' }}
            onChangeText={(text) => handleChange(text)}
          />
          <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => fetchSearch()}><Icon name='search' size={20} color="#000" /></TouchableOpacity>
        </View>
        <Text style={{ marginBottom: 10 }}>Kunjungan = visit, Janji bayar = promise, Bayar = pay</Text>
      </View>
      <ScrollView>
        <View style={[styles.listContainer]}>
          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : data?.map((item, index) => (
            <TouchableOpacity key={index} style={[ styles.btn, { padding: 10, backgroundColor: '#f8f8f8', borderRadius: 10 }]} onPress={() => navigation.navigate('DetailPenagihan', { id: item.id })}>
              <View style={styles.head}>
                <Text style={styles.textKontrak}>No. Kontrak: {item.customer.no}</Text>
                <Text style={styles.textDate}>{item.date}</Text>
              </View>
              <Text>No. Tagihan: {item.no_billing}</Text>
              {item.destination == 'visit' ? <Text style={styles.destinationVisit}>Kunjungan</Text> : item.destination == 'promise' ? <Text style={styles.destinationPromise}>Janji Bayar</Text> : <Text style={styles.destinationPay}>Bayar</Text>}
              <Text>{item.customer.name_customer}</Text>
            </TouchableOpacity>
          )) }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default PenagihanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  headContainer: {
    width: '90%',
    marginHorizontal: '5%',
  },
  listContainer: {
    width: '90%',
    marginHorizontal: '5%',
  },
  groupField: {
    width: '100%',
  },
  btn: {
    // alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
    // height: 50,
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
  },
  groupSearch: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    // marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textKontrak: {
    fontSize: 15,
    fontWeight: 'bold',
    width: '80%',
  },
  textDate: {
    fontSize: 12,
    color: '#888',
  },
  destinationVisit: {
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    color: '#fff',
  },
  destinationPromise: {
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    color: 'black',
  },
  destinationPay: {
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    color: '#fff',
  },
});