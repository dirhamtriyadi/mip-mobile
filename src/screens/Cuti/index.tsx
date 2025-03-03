import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View, Alert, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
import instance from '../../configs/axios';
import {useUserData} from '@hooks/useUserData';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import {useNotification} from '@hooks/useNotification';
import useDatePickerStartDate from '@hooks/useDatePicker';
import useDatePickerEndDate from '@hooks/useDatePicker';
import InputField from '@components/InputField';
import globalStyles from '@styles/styles';
import styles from './styles';
import Button from '@src/components/Button';

interface CutiData {
  start_date: any;
  end_date: any;
  status: string;
  response: string;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    name: string;
    email: string;
    detail_users: {
      id: string;
      nik: string;
    };
    created_at: string;
    updated_at: string;
  };
}

function CutiScreen() {
  const [data, setData] = useState({
    nik: '',
    name: '',
    start_date: dayjs(),
    end_date: dayjs(),
  });

  const {
    date: startDate,
    openDatePicker: openDatePickerStartDate,
    setOpenDatePicker: setOpenDatePickerStartDate,
    handleDateChange: handleDateChangeStartDate,
  } = useDatePickerStartDate(data.start_date);
  const {
    date: endDate,
    openDatePicker: openDatePickerEndDate,
    setOpenDatePicker: setOpenDatePickerEndDate,
    handleDateChange: handleDateChangeEndDate,
  } = useDatePickerEndDate(data.end_date);
  const {userDetailData} = useUserData();
  const {showNotification} = useNotification();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [isLoading, setIsLoading] = useState(false);
  const [cutiData, setCutiData] = useState<CutiData>();

  const fetchCutiData = async () => {
    try {
      setIsLoading(true);
      const response = await instance.get('v1/leaves');
      setCutiData(response.data.data);
    } catch (error: any) {
      if (error.response.status === 404) {
        Alert.alert('Cuti kosong', 'Anda belum pernah mengajukan cuti');
        return;
      }
      Alert.alert('Gagal mengambil data cuti', error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCutiData();
  }, []);

  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      nik: userDetailData.nik,
      name: userDetailData.name,
      start_date: startDate,
      end_date: endDate,
    }));
  }, [userDetailData, startDate, endDate]);

  const handleSubmit = async () => {
    // add validation here
    if (data.nik === '') {
      return Alert.alert('NIK', 'NIK harus diisi tidak boleh kosong');
    }
    if (data.name === '') {
      return Alert.alert('Nama', 'Nama harus diisi tidak boleh kosong');
    }
    if (data.end_date < data.start_date) {
      return Alert.alert(
        'Tanggal',
        'Tanggal akhir cuti tidak boleh kurang dari mulai cuti',
      );
    }

    try {
      const {start_date, end_date} = data;

      const formData = new FormData();

      formData.append('start_date', start_date.format('YYYY-MM-DD'));
      formData.append('end_date', end_date.format('YYYY-MM-DD'));

      instance.defaults.headers['Content-Type'] = 'multipart/form-data';

      await instance.post('v1/leaves/submission', formData);
      Alert.alert('Cuti berhasil', 'Cuti berhasil diajukan', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]);
      showNotification('Cuti berhasil', 'Cuti berhasil diajukan');
    } catch (error: any) {
      if (error.response?.data?.message?.code) {
        error.response?.data?.message?.code.map((item: any) => {
          // console.log(item);
          return Alert.alert('Cuti Gagal', item);
        });
      } else {
        Alert.alert(
          'Cuti Gagal',
          'Gagal terjadi kesalahan karena:\n' + error.response.data.message,
        );
        // console.log('Error submitting cuti: ', error.response.data.message);
      }
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <View style={globalStyles.formContainer}>
          <InputField
            label="NIK"
            placeholder="NIK"
            value={data.nik}
            onChangeText={text =>
              setData(prevData => ({...prevData, nik: text}))
            }
          />
          <InputField
            label="Nama"
            placeholder="Nama"
            value={data.name}
            onChangeText={text =>
              setData(prevData => ({...prevData, name: text}))
            }
          />
          <InputField
            label="Tanggal Mulai Cuti"
            placeholder="Tanggal Mulai Cuti"
            value={data.start_date.format('DD/MM/YYYY')}
            onChangeText={() => {}}
            editable={false}
            onIconPress={() => setOpenDatePickerStartDate(true)}
            iconName="calendar"
          />
          <InputField
            label="Tanggal Akhir Cuti"
            placeholder="Tanggal Akhir Cuti"
            value={data.end_date.format('DD/MM/YYYY')}
            onChangeText={() => {}}
            editable={false}
            onIconPress={() => setOpenDatePickerEndDate(true)}
            iconName="calendar"
          />
          <View style={[globalStyles.groupField, {marginBottom: 10}]}>
            <Button label="Ajukan Cuti" onPress={handleSubmit} />
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : cutiData ? (
            <View style={styles.groupDetailCuti}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Detail Terakhir Cuti
              </Text>
              <View style={[globalStyles.groupField, {marginBottom: 10}]}>
                <Text style={{color: 'black'}}>Nama: {cutiData.user.name}</Text>
                <Text style={{color: 'black'}}>
                  NIK: {cutiData.user.detail_users.nik}
                </Text>
                <Text style={{color: 'black'}}>
                  Tanggal Mulai Cuti:{' '}
                  {dayjs(cutiData.start_date)
                    .locale('id')
                    .format('DD MMMM YYYY')}
                </Text>
                <Text style={{color: 'black'}}>
                  Tanggal Selesai Cuti:{' '}
                  {dayjs(cutiData.end_date).locale('id').format('DD MMMM YYYY')}
                </Text>
                <Text style={{color: 'black'}}>
                  Status Cuti: {cutiData.status}
                </Text>
                <Text style={{color: 'black'}}>
                  Response Cuti: {cutiData.response}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.groupDetailCuti}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Detail Terakhir Cuti
              </Text>
              <Text style={{color: 'black'}}>Tidak ada data</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <DatePicker
        modal
        mode="date"
        minimumDate={dayjs().hour(0).minute(0).second(0).toDate()}
        open={openDatePickerStartDate}
        date={data.start_date.toDate()}
        onConfirm={handleDateChangeStartDate}
        onCancel={() => setOpenDatePickerStartDate(false)}
      />
      <DatePicker
        modal
        mode="date"
        minimumDate={dayjs().hour(0).minute(0).second(0).toDate()}
        open={openDatePickerEndDate}
        date={data.end_date.toDate()}
        onConfirm={handleDateChangeEndDate}
        onCancel={() => setOpenDatePickerEndDate(false)}
      />
    </SafeAreaView>
  );
}

export default CutiScreen;
