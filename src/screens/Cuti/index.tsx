import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker from 'react-native-date-picker';
import instance from "../../configs/axios";
import { useUserData } from "../../hooks/useUserData";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import dayjs from "dayjs";
import { useNotification } from "../../hooks/useNotification";
import useDatePickerStartDate from "../../hooks/useDatePicker";
import useDatePickerEndDate from "../../hooks/useDatePicker";
import InputField from "../../components/InputField";

function CutiScreen() {
  const [data, setData] = useState({
    nik: '',
    name: '',
    start_date: dayjs(),
    end_date: dayjs(),
  });

  const { date: startDate, openDatePicker: openDatePickerStartDate, setOpenDatePicker: setOpenDatePickerStartDate, handleDateChange: handleDateChangeStartDate } = useDatePickerStartDate(data.start_date);
  const { date: endDate, openDatePicker: openDatePickerEndDate, setOpenDatePicker: setOpenDatePickerEndDate, handleDateChange: handleDateChangeEndDate } = useDatePickerEndDate(data.end_date);
  const { userDetailData } = useUserData();
  const { showNotification } = useNotification();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    setData((prevData) => ({
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
      return Alert.alert('NIK harus diisi');
    }
    if (data.name === '') {
      return Alert.alert('Nama harus diisi');
    }
    
    try {
      const { start_date, end_date } = data;

      const formData = new FormData();
      
      formData.append('start_date', start_date.format('YYYY-MM-DD'));
      formData.append('end_date', end_date.format('YYYY-MM-DD'));
      
      instance.defaults.headers['Content-Type'] = 'multipart/form-data';

      await instance.post('v1/leaves/submission', formData);
      Alert.alert('Cuti berhasil', 'Cuti berhasil diajukan', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        }
      ]);
      showNotification('Cuti berhasil', 'Cuti berhasil diajukan');
    } catch (error: any) {
      if (error.response?.data?.message?.code) {
        error.response?.data?.message?.code.map((item: any) => {
          console.log(item);
          return Alert.alert('Cuti Gagal', item);
        });
      } else {
        Alert.alert('Cuti Gagal', 'Gagal terjadi kesalahan karena:\n' + error.response.data.message);
        console.log('Error submitting cuti: ', error.response.data.message);
      }
    }
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView>
        <View style={[styles.formContainer]}>
          <InputField
            label="NIK"
            placeholder="NIK"
            value={data.nik}
            onChangeText={(text) => setData((prevData) => ({ ...prevData, nik: text }))}
          />
          <InputField
            label="Nama"
            placeholder="Nama"
            value={data.name}
            onChangeText={(text) => setData((prevData) => ({ ...prevData, name: text }))}
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
          <View style={[styles.groupField, { marginBottom: 10 }]}>
            <TouchableOpacity style={{ backgroundColor: '#242c40', padding: 10, borderRadius: 5, alignItems: 'center' }} onPress={handleSubmit}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Ajukan Cuti</Text>
            </TouchableOpacity>
          </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  formContainer: {
    width: '90%',
    marginHorizontal: '5%',
  },
  groupField: {
    width: '100%',
  },
});