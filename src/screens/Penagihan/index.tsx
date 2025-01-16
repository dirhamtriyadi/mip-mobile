import React, { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View, Alert, TextInput, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import instance from "../../configs/axios";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";

interface PenagihanData {
  id: string;
  no_billing: string;
  date: any;
  customer: {
    id: string;
    name_customer: string;
    no: string;
  };
  billingStatuses: any;
  latestBillingStatus: {
    status: {
      label: string;
      value: string;
    };
    status_date: string;
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
    <SafeAreaView style={styles.container}>
      <View style={styles.headContainer}>
        <Text style={[{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }]}>List Tagihan</Text>
        <View style={styles.groupSearch}>
          <TextInput
            placeholder="Masukan kata pencarian"
            style={{ width: '90%' }}
            onChangeText={(text) => handleChange(text)}
          />
          <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => fetchSearch()}><Icon name='search' size={20} color="#000" /></TouchableOpacity>
        </View>
        {/* <Text style={{ marginBottom: 10 }}>Kunjungan = visit, Janji bayar = promise_to_pay, Bayar = pay</Text> */}
      </View>
      <ScrollView>
        <View style={styles.listContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : data?.map((item, index) => (
            <TouchableOpacity key={index} style={[ styles.btn, { padding: 10, backgroundColor: '#f8f8f8', borderRadius: 10 }]} onPress={() => navigation.navigate('DetailPenagihan', { id: item.id })}>
              <View style={styles.head}>
                <Text style={styles.textKontrak}>No. Kontrak: {item.customer.no}</Text>
                <Text style={styles.textDate}>{item.date}</Text>
              </View>
              <Text>No. Tagihan: {item.no_billing}</Text>
              {/* {item.billingStatuses?.status == 'pending' ? <Text style={styles.statusPending}>Pending</Text> : item.billingStatuses.status == 'proccess' ? <Text style={styles.statusProcess}>Proccess</Text> : item.billingStatuses.status == 'success' ? <Text style={styles.statusSuccess}>Success</Text> : item.billingStatuses.status == 'cancel' ? <Text style={styles.statusCancel}>Cancel</Text> : item.billingStatuses?.status == null ? <Text style={styles.statusPending}>Belum Ada</Text> : <Text style={styles.statusError}>Error</Text>} */}
              <Text>{item.customer.name_customer}</Text>
              <View style={{flex: 1, flexDirection: 'row', gap: 5}}>
                {/* {item.latestBillingStatus?.status == 'visit' ? <Text style={styles.statusVisit}>Kunjungan</Text> : item.latestBillingStatus?.status == 'promise_to_pay' ? <Text style={styles.statusPromiseToPay}>Janji Bayar</Text> : item.latestBillingStatus?.status == 'pay' ? <Text style={styles.statusPay}>Bayar</Text> : item.latestBillingStatus?.status == null ? <Text style={styles.statusError}>Belum Ada</Text>  : <Text style={styles.statusError}>Error</Text>} */}
                {item.latestBillingStatus?.status.value == 'visit' ? <Text style={styles.statusVisit}>{item.latestBillingStatus?.status.label}</Text> : item.latestBillingStatus?.status.value == 'promise_to_pay' ? <Text style={styles.statusPromiseToPay}>{item.latestBillingStatus?.status.label}</Text> : item.latestBillingStatus?.status.value == 'pay' ? <Text style={styles.statusPay}>{item.latestBillingStatus?.status.label}</Text> : item.latestBillingStatus?.status.value == null ? <Text style={styles.statusError}>Belum Ada</Text>  : <Text style={styles.statusError}>Error</Text>}
                {item.latestBillingStatus?.status_date && (
                  <Text>{item.latestBillingStatus?.status_date}</Text>
                )}
              </View>
            </TouchableOpacity>
          )) }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default PenagihanScreen;