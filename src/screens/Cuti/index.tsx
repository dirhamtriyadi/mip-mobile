import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import instance from "../../configs/axios";
import { useUserData } from "../../hooks/useUserData";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import dayjs from "dayjs";
import { useNotification } from "../../hooks/useNotification";

function CutiScreen() {
  const [openDatePickerStartDate, setOpenDatePickerStartDate] = useState(false);
  const [openDatePickerEndDate, setOpenDatePickerEndDate] = useState(false);
  const { userDetailData } = useUserData();
  const { showNotification } = useNotification();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [data, setData] = useState({
    nik: '',
    name: '',
    start_date: dayjs(),
    end_date: dayjs(),
  });

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      nik: userDetailData.nik,
      name: userDetailData.name,
    }));
  }, [userDetailData]);

  const handleDateChangeStartDate = (selectedDate: Date) => {
    setData((prevData) => ({ ...prevData, start_date: dayjs(selectedDate) }));
    setOpenDatePickerStartDate(false);
  };

  const handleDateChangeEndDate = (selectedDate: Date) => {
    setData((prevData) => ({ ...prevData, end_date: dayjs(selectedDate) }));
    setOpenDatePickerEndDate(false);
  };
  
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
          <View style={[styles.groupField]}>
            <Text style={[styles.fieldLabel]}>NIK</Text>
            <TextInput
              style={[styles.fieldInput]}
              placeholder="NIK"
              value={data.nik}
              onChangeText={(text) => setData((prevData) => ({ ...prevData, nik: text }))}
            />
          </View>
          <View style={[styles.groupField]}>
            <Text style={[styles.fieldLabel]}>Nama</Text>
            <TextInput
              style={[styles.fieldInput]}
              placeholder="Nama"
              value={data.name}
              onChangeText={(text) => setData((prevData) => ({ ...prevData, name: text }))}
            />
          </View>
          <View style={[styles.groupField]}>
            <Text style={[styles.fieldLabel]}>Tanggal Mulai Cuti</Text>
            <View style={{ width: '100%', height: 45, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 15, paddingHorizontal: 10, justifyContent: 'center' }}>
              <TextInput
                style={{ color: '#242c40' }}
                placeholder="Tanggal Mulai Cuti"
                value={data.start_date.format('DD/MM/YYYY')}
                editable={false}
              />
              <TouchableOpacity style={{ position: 'absolute', right: 10 }} onPress={() => setOpenDatePickerStartDate(true)}>
                <Icon name="calendar" size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.groupField]}>
            <Text style={[styles.fieldLabel]}>Tanggal Akhir Cuti</Text>
            <View style={{ width: '100%', height: 45, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 15, paddingHorizontal: 10, justifyContent: 'center' }}>
              <TextInput
                style={{ color: '#242c40' }}
                placeholder="Tanggal Akhir Cuti"
                value={data.end_date.format('DD/MM/YYYY')}
                editable={false}
              />
              <TouchableOpacity style={{ position: 'absolute', right: 10 }} onPress={() => setOpenDatePickerEndDate(true)}>
                <Icon name="calendar" size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
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
  fieldLabel: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  fieldInput: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});