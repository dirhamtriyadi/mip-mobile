import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import {useEffect, useState} from 'react';
import instance from '@src/configs/axios';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'App';
import dayjs from 'dayjs';
import {LaporanPenagihanData} from '@src/types/laporanPenagihan';

function LaporanPenagihanScreen() {
  const [data, setData] = useState<LaporanPenagihanData[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSearch = () => {
    // Cari enum yang cocok dengan pencarian
  };

  useEffect(() => {
    fetchDataBillingReports();
  }, [search]); // Pencarian akan otomatis dilakukan saat `search` berubah

  const fetchDataBillingReports = async () => {
    try {
      setLoading(true);
      const response = await instance.get('v1/customer-billing-reports', {
        params: search ? {search} : {},
      });
      setData(response.data.data);
    } catch (error: any) {
      console.error(error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Terjadi kesalahan',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headContainer}>
        <Text style={styles.textHeadContainer}>Laporan Penagihan</Text>
        <View style={styles.groupSearch}>
          <TextInput
            placeholder="Masukan kata pencarian"
            style={{width: '90%'}}
            value={search}
            onChangeText={setSearch}
            keyboardType="default"
            onSubmitEditing={handleSearch} // Jalankan pencarian saat "Enter" ditekan
          />
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={handleSearch}>
            <Icon name="search" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.listContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : data && data.length > 0 ? (
            data.map(item => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.btn,
                  {padding: 10, backgroundColor: '#f8f8f8', borderRadius: 10},
                ]}
                onPress={
                  () => navigation.navigate('DetailPenagihan', {id: item.id})
                  // console.log({id: item.id})
                }>
                <View style={styles.head}>
                  <Text style={styles.textKontrak}>
                    No. Kontrak: {item.customer.no_contract}
                  </Text>
                  <Text style={styles.textDate}>
                    {dayjs(item.created_at).format('DD-MM-YYYY')}
                  </Text>
                </View>
                <Text>No. Tagihan: {item.bill_number}</Text>
                <Text>Nama Nasabah: {item.customer.name_customer}</Text>
                <View style={{flex: 1, flexDirection: 'row', gap: 5}}>
                  {item.latestBillingFollowups?.status?.value ? (
                    <Text
                      style={getStatusStyle(
                        item.latestBillingFollowups.status.value,
                      )}>
                      {item.latestBillingFollowups.status.label}
                    </Text>
                  ) : (
                    <Text style={styles.statusError}>Belum Ada</Text>
                  )}
                  {item.latestBillingFollowups?.date_exec && (
                    <Text>
                      {dayjs(item.latestBillingFollowups.date_exec).format(
                        'DD-MM-YYYY',
                      )}
                    </Text>
                  )}
                </View>
                <View style={{flex: 1, flexDirection: 'row', gap: 5}}>
                  {item.latestBillingFollowups?.status?.value ===
                  'promise_to_pay' ? (
                    <Text>
                      Tanggal janji bayar:{' '}
                      {dayjs(item.latestBillingFollowups.promise_date).format(
                        'DD-MM-YYYY',
                      )}
                    </Text>
                  ) : null}
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.noData}>
              <Text style={styles.noDataText}>
                Tidak ada data yang ditemukan
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'visit':
      return styles.statusVisit;
    case 'promise_to_pay':
      return styles.statusPromiseToPay;
    case 'pay':
      return styles.statusPay;
    default:
      return styles.statusError;
  }
};

export default LaporanPenagihanScreen;
