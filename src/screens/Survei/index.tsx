import InputField from '@src/components/InputField';
import InputFieldNumber from '@src/components/InputFieldNumber';
import InputFieldTextArea from '@src/components/InputFieldTextArea';
import LocationPicker from '@src/components/LocationPicker';
import {useLocation} from '@src/hooks/useLocation';
import globalStyles from '@src/styles/styles';
import {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

interface FormData {
  name: string;
  address: string;
  number_ktp: string;
  address_status: string;
  phone_number: string;
  npwp: string;
  job: string;
  employee_tenure: string;
  job_level: string;
  employee_status: string;
  job_type: string;
  salary: string;
  other_business: string;
  monthly_living_expenses: string;
  children: string;
  wife: string;
  couple_work: string;
  latitude: number;
  longitude: number;
  locationString: string;
}

function SurveiScreen() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    number_ktp: '',
    address_status: '',
    phone_number: '',
    npwp: '',
    job: '',
    employee_tenure: '',
    job_level: '',
    employee_status: '',
    job_type: '',
    salary: '',
    other_business: '',
    monthly_living_expenses: '',
    children: '',
    wife: '',
    couple_work: '',
    latitude: 0,
    longitude: 0,
    locationString: '',
  });

  const {location, getCurrentLocation, changeLocationMarker} = useLocation();

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      latitude: location.latitude,
      longitude: location.longitude,
      locationString: location.locationString,
    }));
  }, [location]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <View style={globalStyles.formContainer}>
          <Text style={{fontWeight: 'bold', fontSize: 15, marginLeft: -17}}>
            1. CIF
          </Text>
          <InputField
            label="Nama"
            placeholder="Masukan nama"
            value={formData.name}
            onChangeText={text => {
              setFormData(prevData => ({
                ...prevData,
                name: text,
              }));
            }}
          />
          <InputFieldTextArea
            label="Alamat"
            placeholder="Masukan alamat"
            value={formData.address}
            onChangeText={text => {
              setFormData(prevData => ({
                ...prevData,
                address: text,
              }));
            }}
          />
          <InputFieldNumber
            label="No KTP"
            placeholder="Masukan nomor KTP"
            value={formData.number_ktp}
            onChangeText={text => {
              const numericValue = text.replace(/[^0-9]/g, '');
              setFormData(prevData => ({
                ...prevData,
                number_ktp: numericValue,
              }));
            }}
          />
          <InputField
            label="Status Alamat"
            placeholder="Masukan status alamat"
            value={formData.address_status}
            onChangeText={text => {
              setFormData(prevData => ({
                ...prevData,
                address_status: text,
              }));
            }}
          />
          <InputFieldNumber
            label="No Telepon"
            placeholder="Masukan nomor telepon"
            value={formData.phone_number}
            onChangeText={text => {
              const numericValue = text.replace(/[^0-9]/g, '');
              setFormData(prevData => ({
                ...prevData,
                phone_number: numericValue,
              }));
            }}
          />
          <InputField
            label="NPWP"
            placeholder="Masukan NPWP"
            value={formData.npwp}
            onChangeText={text => {
              setFormData(prevData => ({
                ...prevData,
                npwp: text,
              }));
            }}
          />
          <Text style={{fontWeight: 'bold', fontSize: 15, marginLeft: -17}}>
            2. Pendapatan
          </Text>
          <InputField
            label="Pekerjaan"
            placeholder="Masukan pekerjaan"
            value={formData.job}
            onChangeText={text => {
              setFormData(prevData => ({
                ...prevData,
                job: text,
              }));
            }}
          />
          <InputField
            label="Lama Kerja"
            placeholder="Masukan lama kerja"
            value={formData.employee_tenure}
            onChangeText={text => {
              setFormData(prevData => ({
                ...prevData,
                employee_tenure: text,
              }));
            }}
          />
          <InputField
            label="Jabatan"
            placeholder="Masukan jabatan"
            value={formData.job_level}
            onChangeText={text => {
              setFormData(prevData => ({
                ...prevData,
                job_level: text,
              }));
            }}
          />
          <InputField
            label="Status Karyawan"
            placeholder="Masukan status karyawan"
            value={formData.employee_status}
            onChangeText={text => {
              setFormData(prevData => ({
                ...prevData,
                employee_status: text,
              }));
            }}
          />
          <InputField
            label="Jenis Pekerjaan"
            placeholder="Masukan jenis pekerjaan"
            value={formData.job_type}
            onChangeText={text => {
              setFormData(prevData => ({
                ...prevData,
                job_type: text,
              }));
            }}
          />
          <InputField
            label="Gaji*"
            placeholder="Masukan gaji"
            value={formData.salary}
            onChangeText={text => {
              setFormData(prevData => ({
                ...prevData,
                salary: text,
              }));
            }}
          />
          <InputFieldNumber
            label="Usaha Tambahan"
            placeholder="Masukan usaha tambahan"
            value={formData.other_business}
            onChangeText={text => {
              const numericValue = text.replace(/[^0-9]/g, '');
              setFormData(prevData => ({
                ...prevData,
                other_business: numericValue,
              }));
            }}
          />
          <InputField
            label="Biaya hidup per bulan*"
            placeholder="Masukan biaya hidup per bulan"
            value={formData.monthly_living_expenses}
            onChangeText={text => {
              setFormData(prevData => ({
                ...prevData,
                monthly_living_expenses: text,
              }));
            }}
          />
          <Text>Tanggungan</Text>
          <InputField
            label="Anak"
            placeholder="Masukan anak"
            value={formData.children}
            onChangeText={text => {
              setFormData(prevData => ({
                ...prevData,
                children: text,
              }));
            }}
          />
          <InputField
            label="Istri"
            placeholder="Masukan istri"
            value={formData.wife}
            onChangeText={text => {
              setFormData(prevData => ({
                ...prevData,
                wife: text,
              }));
            }}
          />
          <Text>Kepemilikan Rumah</Text>
          <InputField
            label="Pekerjaan Pasangan"
            placeholder="Masukan pekerjaan pasangan"
            value={formData.couple_work}
            onChangeText={text => {
              setFormData(prevData => ({
                ...prevData,
                couple_work: text,
              }));
            }}
          />
          <LocationPicker
            label="Lokasi"
            placeholder="Lokasi"
            location={location}
            getCurrentLocation={getCurrentLocation}
            onDragMarker={changeLocationMarker}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SurveiScreen;
