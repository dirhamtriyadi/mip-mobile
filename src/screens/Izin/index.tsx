import React, { useState, useEffect } from "react";
import { ScrollView, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker from "react-native-date-picker";
import { useCurrentLocation } from "@hooks/useCurrentLocation";
import instance from "../../configs/axios";
import { useUserData } from "@hooks/useUserData";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import dayjs from "dayjs";
import { useNotification } from "@hooks/useNotification";
import useImagePicker from "@hooks/useImagePicker";
import useDatePicker from "@hooks/useDatePicker";
import useTimePicker from "@hooks/useTimePicker";
import InputField from "@components/InputField";
import ImagePicker from "@components/ImagePicker";
import LocationPicker from "@components/LocationPicker";
import globalStyles from "@styles/styles";
import Button from "@src/components/Button";

function IzinScreen() {
  const [data, setData] = useState({
    code: '',
    nik: '',
    name: '',
    date: dayjs(),
    time_check_in: dayjs(),
    type: 'permit',
    image_check_in: '',
    location_check_in: '',
    latitude: 0,
    longitude: 0,
  });


  const { image, handleClickOpenCamera, handleImageSelect, handleClickReset } = useImagePicker();
  const { date, openDatePicker, setOpenDatePicker, handleDateChange } = useDatePicker(data.date);
  const { time, openTimePicker, setOpenTimePicker, handleTimeChange } = useTimePicker(data.time_check_in);
  const { userDetailData } = useUserData();
  const { location, getCurrentLocation } = useCurrentLocation();
  const { showNotification } = useNotification();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (location.latitude !== 0 && location.longitude !== 0) {
      setData((prevData) => ({
        ...prevData,
        latitude: location.latitude,
        longitude: location.longitude,
        location_check_in: location.locationString
      }));
    }
  }, [location]);

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      code: userDetailData.name + data.date.format('DD/MM/YYYY'),
      nik: userDetailData.nik,
      name: userDetailData.name,
      date: date,
      time_check_in: time,
      image_check_in: image,
    }));
  }, [userDetailData, data.date, date, time, image]);

  const handleLocationChange = (text: string) => {
    const [latitude, longitude] = text.split(',').map(coord => parseFloat(coord.trim()));
    if (!isNaN(latitude) && !isNaN(longitude)) {
      setData((prevData) => ({
        ...prevData,
        location: text,
        latitude,
        longitude
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        location: text
      }));
    }
  };

  const handleSubmit = async () => {

    // add validation here
    if (data.code === '') {
      return Alert.alert('Kode absen harus diisi');
    }
    if (data.nik === '') {
      return Alert.alert('NIK harus diisi');
    }
    if (data.name === '') {
      return Alert.alert('Nama harus diisi');
    }
    // if (data.image_check_in === '') {
    //   return Alert.alert('Foto izin harus diisi');
    // }
    if (data.location_check_in === '') {
      return Alert.alert('Lokasi harus diisi');
    }

    try {
      const { date, time_check_in, type, location_check_in } = data;

      const formData = new FormData();
      
      formData.append('date', date.format('YYYY-MM-DD'));
      formData.append('time_check_in', time_check_in.format('HH:mm:ss'));
      formData.append('type', type);
      formData.append('location_check_in', location_check_in);

      // Add image file to formData
      if (image) {
        formData.append('image_check_in', {
          uri: image.uri,
          type: image.type,
          name: image.fileName,
        });
      }

      instance.defaults.headers['Content-Type'] = 'multipart/form-data';

      await instance.post('v1/attendances/permit', formData);
      Alert.alert('Absen izin berhasil', 'Absen izin berhasil disubmit', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        }
      ]);
      showNotification('Absen izin berhasil', 'Absen izin berhasil disubmit');
    } catch (error: any) {
      if (error.response?.data?.message?.code) {
        error.response?.data?.message?.code.map((item: any) => {
          // console.log(item);
          return Alert.alert('Absen Izin Gagal', item);
        });
      } else {
        Alert.alert('Absen Izin Gagal', 'Gagal terjadi kesalahan karena:\n' + error.response.data.message);
        // console.log('Error submitting absen izin: ', error.response.data.message);
      }
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <View style={globalStyles.formContainer}>
          <InputField
            label="Kode Absen"
            placeholder="Kode"
            value={data.code}
            onChangeText={(text) => setData((prevData) => ({ ...prevData, code: text }))}
          />
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
            label="Tanggal"
            placeholder="Tanggal"
            value={data.date.format('DD/MM/YYYY')}
            onChangeText={() => {}}
            editable={false}
            onIconPress={() => setOpenDatePicker(true)}
            iconName="calendar"
          />
          <InputField
            label="Jam"
            placeholder="Jam"
            value={data.time_check_in.format('HH:mm:ss')}
            onChangeText={() => {}}
            editable={false}
            onIconPress={() => setOpenTimePicker(true)}
            iconName="clock"
          />
          <ImagePicker
            label="Foto Izin"
            image={image}
            onOpenCamera={handleClickOpenCamera}
            onResetImage={handleClickReset}
          />
          <LocationPicker
            label="Lokasi Absen Izin"
            placeholder="Lokasi Absen Izin"
            location={location}
            getCurrentLocation={getCurrentLocation}
          />
          <View style={[globalStyles.groupField, { marginBottom: 10 }]}>
            <Button label="Simpan" onPress={handleSubmit} />
          </View>
        </View>
      </ScrollView>
      <DatePicker
        modal
        mode="date"
        minimumDate={dayjs().hour(0).minute(0).second(0).toDate()}
        open={openDatePicker}
        date={data.date.toDate()}
        onConfirm={handleDateChange}
        onCancel={() => setOpenDatePicker(false)}
      />
      <DatePicker
        modal
        mode="time"
        minimumDate={dayjs().toDate()}
        open={openTimePicker}
        date={data.time_check_in.toDate()}
        onConfirm={handleTimeChange}
        onCancel={() => setOpenTimePicker(false)}
      />
    </SafeAreaView>
  );
}

export default IzinScreen;
