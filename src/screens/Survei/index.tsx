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
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styles from './styles';
import InputCurrency from '@src/components/InputCurrency';
import dayjs, {Dayjs} from 'dayjs';
import 'dayjs/locale/id';
import useDatePicker from '@src/hooks/useDatePicker';
import DatePicker from 'react-native-date-picker';

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
  salary: number;
  other_business: number;
  monthly_living_expenses: number;
  children: string;
  wife: string;
  couple_jobs: string;
  couple_business: string;
  couple_income: number;
  bank_debt: number;
  cooperative_debt: number;
  personal_debt: number;
  online_debt: number;
  customer_character_analysis: string;
  financial_report_analysis: string;
  slik_result: string;
  info_provider_name: string;
  info_provider_position: string;
  workplace_condition: string;
  employee_count: string;
  business_duration: string;
  office_address: string;
  office_phone: string;
  loan_application: number;
  recommendation_from_vendors: string;
  recommendation_from_treasurer: string;
  recommendation_from_other: string;
  descriptionSurvey: string;
  locationSurvey: string;
  dateSurvey: Dayjs;
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
    salary: 0,
    other_business: 0,
    monthly_living_expenses: 0,
    children: '',
    wife: '',
    couple_jobs: '',
    couple_business: '',
    couple_income: 0,
    bank_debt: 0,
    cooperative_debt: 0,
    personal_debt: 0,
    online_debt: 0,
    customer_character_analysis: '',
    financial_report_analysis: '',
    slik_result: '',
    info_provider_name: '',
    info_provider_position: '',
    workplace_condition: '',
    employee_count: '',
    business_duration: '',
    office_address: '',
    office_phone: '',
    loan_application: 0,
    recommendation_from_vendors: '',
    recommendation_from_treasurer: '',
    recommendation_from_other: '',
    descriptionSurvey: '',
    locationSurvey: '',
    dateSurvey: dayjs(),
    latitude: 0,
    longitude: 0,
    locationString: '',
  });

  const {location, getCurrentLocation, changeLocationMarker} = useLocation();
  const {date, openDatePicker, setOpenDatePicker, handleDateChange} =
    useDatePicker(formData.dateSurvey);

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      dateSurvey: date,
      latitude: location.latitude,
      longitude: location.longitude,
      locationString: location.locationString,
    }));
  }, [location, date]);

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
            <InputCurrency
              label="Gaji*"
              placeholder="Masukan gaji"
              value={formData.salary}
              onChangeValue={text => {
                setFormData(prevData => ({
                  ...prevData,
                  salary: Number(text),
                }));
              }}
            />
            <InputCurrency
              label="Usaha Tambahan"
              placeholder="Masukan usaha tambahan"
              value={formData.other_business}
              onChangeValue={text => {
                setFormData(prevData => ({
                  ...prevData,
                  other_business: Number(text),
                }));
              }}
            />
            <InputCurrency
              label="Biaya hidup per bulan*"
              placeholder="Masukan biaya hidup per bulan"
              value={formData.monthly_living_expenses}
              onChangeValue={text => {
                setFormData(prevData => ({
                  ...prevData,
                  monthly_living_expenses: Number(text),
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
            <InputCurrency
              label="Pendapatan Pasangan"
              placeholder="Masukan pendapatan pasangan"
              value={formData.couple_income}
              onChangeValue={text => {
                setFormData(prevData => ({
                  ...prevData,
                  couple_income: Number(text),
                }));
              }}
            />
          </AccordionSection>
          <AccordionSection title="3. Hutang">
            <InputCurrency
              label="Bank"
              placeholder="Masukan hutang bank"
              value={formData.bank_debt}
              onChangeValue={text => {
                setFormData(prevData => ({
                  ...prevData,
                  bank_debt: Number(text),
                }));
              }}
            />
            <InputCurrency
              label="Koperasi"
              placeholder="Masukan hutang koperasi"
              value={formData.cooperative_debt}
              onChangeValue={text => {
                setFormData(prevData => ({
                  ...prevData,
                  cooperative_debt: Number(text),
                }));
              }}
            />
            <InputCurrency
              label="Perorangan"
              placeholder="Masukan hutang perorangan"
              value={formData.personal_debt}
              onChangeValue={text => {
                setFormData(prevData => ({
                  ...prevData,
                  personal_debt: Number(text),
                }));
              }}
            />
            <InputCurrency
              label="Online"
              placeholder="Masukan hutang online"
              value={formData.online_debt}
              onChangeValue={text => {
                setFormData(prevData => ({
                  ...prevData,
                  online_debt: Number(text),
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
          <AccordionSection title="5. Informasi Tambahan dan Pengajuan">
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
              placeholder="Masukan kondisi tempat kerja"
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
            <InputCurrency
              label="Pengajuan"
              placeholder="Masukan Pengajuan"
              value={formData.loan_application}
              onChangeValue={text => {
                setFormData(prevData => ({
                  ...prevData,
                  loan_application: Number(text),
                }));
              }}
            />
          </AccordionSection>
          <AccordionSection title="6. Rekomendasi dari">
            <InputField
              label="Vendor"
              placeholder="Masukan nama vendor"
              value={formData.recommendation_from_vendors}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  recommendation_from_vendors: text,
                }));
              }}
            />
            <InputField
              label="Bendahara"
              placeholder="Masukan nama bendahara"
              value={formData.recommendation_from_treasurer}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  recommendation_from_treasurer: text,
                }));
              }}
            />
            <InputFieldTextArea
              label="Lainnya"
              placeholder="Masukan lainnya"
              value={formData.recommendation_from_other}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  recommendation_from_other: text,
                }));
              }}
            />
          </AccordionSection>
          <AccordionSection title="7. Wawancara 1">
            <Text>Test</Text>
          </AccordionSection>
          <AccordionSection title="8. Wawancara 2 (Opsional)">
            <Text>Test</Text>
          </AccordionSection>
          <AccordionSection title="9. Catatan Rekomendasi PT">
            <InputFieldTextArea
              label="Keterangan"
              placeholder="Masukan keterangan"
              value={formData.recommendation_from_other}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  recommendation_from_other: text,
                }));
              }}
            />
            <InputField
              label="Tempat"
              placeholder="Masukan tempat"
              value={formData.descriptionSurvey}
              onChangeText={text => {
                setFormData(prevData => ({
                  ...prevData,
                  descriptionSurvey: text,
                }));
              }}
            />
            <InputField
              label="Tanggal"
              placeholder="Tanggal"
              value={formData.dateSurvey.format('dddd - DD/MM/YYYY')}
              onChangeText={() => {}}
              editable={false}
              onIconPress={() => setOpenDatePicker(true)}
              iconName="calendar"
            />
            <LocationPicker
              label="Lokasi"
              placeholder="Lokasi"
              location={location}
              getCurrentLocation={getCurrentLocation}
              onDragMarker={changeLocationMarker}
            />
          </AccordionSection>
          <AccordionSection title='10. Berkas'>
            <Text>Test</Text>
          </AccordionSection>
        </View>
      </ScrollView>
      <DatePicker
        modal
        mode="date"
        minimumDate={dayjs().hour(0).minute(0).second(0).toDate()}
        open={openDatePicker}
        date={formData.dateSurvey.toDate()}
        onConfirm={handleDateChange}
        onCancel={() => setOpenDatePicker(false)}
      />
    </SafeAreaView>
  );
}

export default SurveiScreen;
