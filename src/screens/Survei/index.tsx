import InputField from '@src/components/InputField';
import InputFieldNumber from '@src/components/InputFieldNumber';
import InputFieldTextArea from '@src/components/InputFieldTextArea';
import LocationPicker from '@src/components/LocationPicker';
import {useLocation} from '@src/hooks/useLocation';
import globalStyles from '@src/styles/styles';
import {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styles from './styles';

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
  couple_jobs: string;
  couple_business: string;
  couple_income: string;
  bank_debt: string;
  cooperative_debt: string;
  personal_debt: string;
  online_debt: string;
  customer_character_analysis: string;
  financial_report_analysis: string;
  slik_result: string;
  info_provider_name: string;
  info_provider_position: string;
  workplace_condition: string;
  building_type: string;
  employee_count: string;
  business_duration: string;
  office_address: string;
  office_phone: string;
  loan_application: string;
  latitude: number;
  longitude: number;
  locationString: string;
}

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
}

const AccordionSection = ({title, children}: AccordionSectionProps) => {
  const heightValue = useSharedValue(0);

  const toggleExpand = useCallback(() => {
    const newHeight = heightValue.value === 0 ? 1 : 0;
    heightValue.value = withTiming(newHeight, {duration: 300});
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    height: heightValue.value ? 'auto' : 0,
    overflow: 'hidden',
    padding: heightValue.value ? 10 : 0,
  }));

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity onPress={toggleExpand} style={styles.accordionHeader}>
        <Text style={styles.accordionTitle}>{title}</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.accordionContent, animatedStyle]}>
        {children}
      </Animated.View>
    </View>
  );
};

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
    couple_jobs: '',
    couple_business: '',
    couple_income: '',
    bank_debt: '',
    cooperative_debt: '',
    personal_debt: '',
    online_debt: '',
    customer_character_analysis: '',
    financial_report_analysis: '',
    slik_result: '',
    info_provider_name: '',
    info_provider_position: '',
    workplace_condition: '',
    building_type: '',
    employee_count: '',
    business_duration: '',
    office_address: '',
    office_phone: '',
    loan_application: '',
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
          <AccordionSection title="1. CIF">
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
          </AccordionSection>
          <AccordionSection title="2. Pendapatan">
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
              value={formData.couple_jobs}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  couple_jobs: text,
                }));
              }}
            />
            <InputField
              label="Usaha Pasangan"
              placeholder="Masukan usaha pasangan"
              value={formData.couple_business}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  couple_business: text,
                }));
              }}
            />
            <InputField
              label="Pendapatan Pasangan"
              placeholder="Masukan pendapatan pasangan"
              value={formData.couple_income}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  couple_income: text,
                }));
              }}
            />
          </AccordionSection>
          <AccordionSection title="3. Hutang">
            <InputField
              label="Bank"
              placeholder="Masukan hutang bank"
              value={formData.bank_debt}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  bank_debt: text,
                }));
              }}
            />
            <InputField
              label="Koperasi"
              placeholder="Masukan hutang koperasi"
              value={formData.cooperative_debt}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  cooperative_debt: text,
                }));
              }}
            />
            <InputField
              label="Perorangan"
              placeholder="Masukan hutang perorangan"
              value={formData.personal_debt}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  personal_debt: text,
                }));
              }}
            />
            <InputField
              label="Online"
              placeholder="Masukan hutang online"
              value={formData.online_debt}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  online_debt: text,
                }));
              }}
            />
          </AccordionSection>
          <AccordionSection title="4. Scorring">
            <InputField
              label="A. Analisa Karakter Nasabah"
              placeholder="Masukan analisa karakter nasabah"
              value={formData.customer_character_analysis}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  customer_character_analysis: text,
                }));
              }}
            />
            <InputField
              label="B. Analisa Laporan Keuangan"
              placeholder="Masukan analisa laporan keuangan"
              value={formData.financial_report_analysis}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  financial_report_analysis: text,
                }));
              }}
            />
            <InputField
              label="C. Hasil Slik"
              placeholder="Masukan hasil slik"
              value={formData.slik_result}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  slik_result: text,
                }));
              }}
            />
          </AccordionSection>
          <AccordionSection title="5. Informasi Tamabahan dan Pengajuan">
            <InputField
              label="Nama Pemberi Informasi"
              placeholder="Masukan nama pemeberi informasi"
              value={formData.info_provider_name}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  info_provider_name: text,
                }));
              }}
            />
            <InputField
              label="Jabatan Pemberi Informasi"
              placeholder="Masukan jabatan pemberi informasi"
              value={formData.info_provider_position}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  info_provider_position: text,
                }));
              }}
            />
            <InputField
              label="Kondisi Tempat Kerja"
              placeholder="Masukan kondisi gedung/tempat kerja"
              value={formData.workplace_condition}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  workplace_condition: text,
                }));
              }}
            />
            <InputField
              label="Banyak Karyawan"
              placeholder="Masukan banyak karyawan"
              value={formData.employee_count}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  employee_count: text,
                }));
              }}
            />
            <InputField
              label="Lama Usaha Kantor"
              placeholder="Masukan lama usaha kantor"
              value={formData.business_duration}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  business_duration: text,
                }));
              }}
            />
            <InputField
              label="Alamat Kantor"
              placeholder="Masukan alamat kantor"
              value={formData.office_address}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  office_address: text,
                }));
              }}
            />
            <InputField
              label="Telepon Kantor"
              placeholder="Masukan telepon kantor"
              value={formData.office_phone}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  office_phone: text,
                }));
              }}
            />
            <InputField
              label="Pengajuan"
              placeholder="Masukan pengajuan"
              value={formData.loan_application}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  loan_application: text,
                }));
              }}
            />
          </AccordionSection>
          <AccordionSection title="6. Rekomendasi dari">
            <InputField
              label="Vendor"
              placeholder="Masukan nama vendor"
              value={formData.info_provider_name}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  info_provider_name: text,
                }));
              }}
            />
            <InputField
              label="Bendahara"
              placeholder="Masukan nama bendahara"
              value={formData.info_provider_position}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  info_provider_position: text,
                }));
              }}
            />
            <InputFieldTextArea
              label="Lainnya"
              placeholder="Masukan info lainnya"
              value={formData.workplace_condition}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  workplace_condition: text,
                }));
              }}
            />
          </AccordionSection>
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
