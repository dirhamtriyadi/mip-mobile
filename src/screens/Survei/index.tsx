import InputField from '@src/components/InputField';
import InputFieldNumber from '@src/components/InputFieldNumber';
import InputFieldTextArea from '@src/components/InputFieldTextArea';
import LocationPicker from '@src/components/LocationPicker';
import {useLocation} from '@src/hooks/useLocation';
import globalStyles from '@src/styles/styles';
import {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import InputCurrency from '@src/components/InputCurrency';
import dayjs, {Dayjs} from 'dayjs';
import 'dayjs/locale/id';
import useDatePicker from '@src/hooks/useDatePicker';
import DatePicker from 'react-native-date-picker';
import InputStatusPicker from '@src/components/InputStatusPicker';
import InputSignature from '@src/components/InputSignature';
import AccordionSection from '@src/components/AccordionSection';
import ImagePicker from '@src/components/ImagePicker';
import useImagePicker from '@src/hooks/useImagePicker';

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
  recomendation_pt: string;
  descriptionSurvey: string;
  locationSurvey: string;
  dateSurvey: Dayjs;
  latitude: number;
  longitude: number;
  locationString: string;
  signature_officer: string | null;
  signature_customer: string | null;
  signature_couple: string | null;
  workplace_image1: {uri: string} | null;
  workplace_image2: {uri: string} | null;
  customer_image: {uri: string} | null;
  ktp_image: {uri: string} | null;
  loan_guarantee_image1: {uri: string} | null;
  loan_guarantee_image2: {uri: string} | null;
  kk_image: {uri: string} | null;
  id_card_image: {uri: string} | null;
  salary_slip_image1: {uri: string} | null;
  salary_slip_image2: {uri: string} | null;
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
    recomendation_pt: '',
    descriptionSurvey: '',
    locationSurvey: '',
    dateSurvey: dayjs(),
    latitude: 0,
    longitude: 0,
    locationString: '',
    signature_officer: null,
    signature_customer: null,
    signature_couple: null,
    workplace_image1: null,
    workplace_image2: null,
    customer_image: null,
    ktp_image: null,
    loan_guarantee_image1: null,
    loan_guarantee_image2: null,
    kk_image: null,
    id_card_image: null,
    salary_slip_image1: null,
    salary_slip_image2: null,
  });
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const {location, getCurrentLocation, changeLocationMarker} = useLocation();
  const {date, openDatePicker, setOpenDatePicker, handleDateChange} =
    useDatePicker(formData.dateSurvey);
  const {
    image: imageWorkplace1,
    handleClickOpenCamera: handleClickOpenCameraWorkplaceImage1,
    handleImageSelect: handleImageSelectWorkplaceImage1,
    handleClickReset: handleClickResetWorkplaceImage1,
  } = useImagePicker();
  const {
    image: imageWorkplace2,
    handleClickOpenCamera: handleClickOpenCameraWorkplaceImage2,
    handleImageSelect: handleImageSelectWorkplaceImage2,
    handleClickReset: handleClickResetWorkplaceImage2,
  } = useImagePicker();
  const {
    image: imageCustomer,
    handleClickOpenCamera: handleClickOpenCameraCustomerImage,
    handleImageSelect: handleImageSelectCustomerImage,
    handleClickReset: handleClickResetCustomerImage,
  } = useImagePicker();
  const {
    image: imageKtp,
    handleClickOpenCamera: handleClickOpenCameraKtpImage,
    handleImageSelect: handleImageSelectKtpImage,
    handleClickReset: handleClickResetKtpImage,
  } = useImagePicker();
  const {
    image: imageLoanGuarantee1,
    handleClickOpenCamera: handleClickOpenCameraLoanGuarantee1,
    handleImageSelect: handleImageSelectLoanGuarantee1,
    handleClickReset: handleClickResetLoanGuarantee1,
  } = useImagePicker();
  const {
    image: imageLoanGuarantee2,
    handleClickOpenCamera: handleClickOpenCameraLoanGuarantee2,
    handleImageSelect: handleImageSelectLoanGuarantee2,
    handleClickReset: handleClickResetLoanGuarantee2,
  } = useImagePicker();
  const {
    image: imageKk,
    handleClickOpenCamera: handleClickOpenCameraKkImage,
    handleImageSelect: handleImageSelectKkImage,
    handleClickReset: handleClickResetKkImage,
  } = useImagePicker();
  const {
    image: imageIdCard,
    handleClickOpenCamera: handleClickOpenCameraIdCardImage,
    handleImageSelect: handleImageSelectIdCardImage,
    handleClickReset: handleClickResetIdCardImage,
  } = useImagePicker();
  const {
    image: imageSlipSalary1,
    handleClickOpenCamera: handleClickOpenCameraSlipSalaryImage1,
    handleImageSelect: handleImageSelectSlipSalaryImage1,
    handleClickReset: handleClickResetSlipSalaryImage1,
  } = useImagePicker();
  const {
    image: imageSlipSalary2,
    handleClickOpenCamera: handleClickOpenCameraSlipSalaryImage2,
    handleImageSelect: handleImageSelectSliphandleClickOpenCameraSlipSalaryImage2,
    handleClickReset: handleClickResetSliphandleClickOpenCameraSlipSalaryImage2,
  } = useImagePicker();

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      dateSurvey: date,
      latitude: location.latitude,
      longitude: location.longitude,
      locationString: location.locationString,
      workplace_image1: imageWorkplace1,
      workplace_image2: imageWorkplace2,
      customer_image: imageCustomer,
      ktp_image: imageKtp,
      loan_guarantee_image1: imageLoanGuarantee1,
      loan_guarantee_image2: imageLoanGuarantee2,
      kk_image: imageKk,
      id_card_image: imageIdCard,
      salary_slip_image1: imageSlipSalary1,
      salary_slip_image2: imageSlipSalary2,
    }));
  }, [
    location,
    date,
    imageWorkplace1,
    imageWorkplace2,
    imageCustomer,
    imageKtp,
    imageLoanGuarantee1,
    imageLoanGuarantee2,
    imageKk,
    imageIdCard,
    imageSlipSalary1,
    imageSlipSalary2,
  ]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView scrollEnabled={scrollEnabled}>
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
            <InputStatusPicker
              label="Direkomendasikan"
              value={formData.recomendation_pt}
              onChange={value =>
                setFormData(prevData => ({
                  ...prevData,
                  recomendation_pt: value,
                }))
              }
              options={[
                {label: 'Ya', value: 'yes'},
                {label: 'Tidak', value: 'no'},
              ]}
            />
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
            <InputSignature
              label="TTD Petugas"
              signature={formData.signature_officer}
              onConfirm={result =>
                setFormData(prevData => ({
                  ...prevData,
                  signature_officer: result,
                }))
              }
              onScrollEnabledChange={setScrollEnabled}
            />
            <InputSignature
              label="TTD Nasabah"
              signature={formData.signature_customer}
              onConfirm={result =>
                setFormData(prevData => ({
                  ...prevData,
                  signature_customer: result,
                }))
              }
              onScrollEnabledChange={setScrollEnabled}
            />
            <InputSignature
              label="TTD Pasangan/Penanggung Jawab"
              signature={formData.signature_couple}
              onConfirm={result =>
                setFormData(prevData => ({
                  ...prevData,
                  signature_couple: result,
                }))
              }
              onScrollEnabledChange={setScrollEnabled}
            />
          </AccordionSection>
          <AccordionSection title="10. Berkas">
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              1. Foto Gedung
            </Text>
            <View style={{padding: 10}}>
              <ImagePicker
                label="Foto Gedung 1"
                image={formData.workplace_image1}
                onOpenCamera={handleClickOpenCameraWorkplaceImage1}
                onImageSelected={handleImageSelectWorkplaceImage1}
                onResetImage={handleClickResetWorkplaceImage1}
              />
              <ImagePicker
                label="Foto Gedung 2"
                image={formData.workplace_image2}
                onOpenCamera={handleClickOpenCameraWorkplaceImage2}
                onImageSelected={handleImageSelectWorkplaceImage2}
                onResetImage={handleClickResetWorkplaceImage2}
              />
            </View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              2. Foto Nasabah dan KTP
            </Text>
            <View style={{padding: 10}}>
              <ImagePicker
                label="Foto Nasabah"
                image={formData.customer_image}
                onOpenCamera={handleClickOpenCameraCustomerImage}
                onImageSelected={handleImageSelectCustomerImage}
                onResetImage={handleClickResetCustomerImage}
              />
              <ImagePicker
                label="Foto KTP"
                image={formData.ktp_image}
                onOpenCamera={handleClickOpenCameraKtpImage}
                onImageSelected={handleImageSelectKtpImage}
                onResetImage={handleClickResetKtpImage}
              />
            </View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              3. Foto Jaminan
            </Text>
            <View style={{padding: 10}}>
              <ImagePicker
                label="Foto Jaminan 1"
                image={formData.loan_guarantee_image1}
                onOpenCamera={handleClickOpenCameraLoanGuarantee1}
                onImageSelected={handleImageSelectLoanGuarantee1}
                onResetImage={handleClickResetLoanGuarantee1}
              />
              <ImagePicker
                label="Foto Jaminan 2"
                image={formData.loan_guarantee_image2}
                onOpenCamera={handleClickOpenCameraLoanGuarantee2}
                onImageSelected={handleImageSelectLoanGuarantee2}
                onResetImage={handleClickResetLoanGuarantee2}
              />
            </View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              4. Foto KK dan ID Card
            </Text>
            <View style={{padding: 10}}>
              <ImagePicker
                label="Foto KK"
                image={formData.kk_image}
                onOpenCamera={handleClickOpenCameraKkImage}
                onImageSelected={handleImageSelectKkImage}
                onResetImage={handleClickResetKkImage}
              />
              <ImagePicker
                label="Foto ID Card"
                image={formData.id_card_image}
                onOpenCamera={handleClickOpenCameraIdCardImage}
                onImageSelected={handleImageSelectIdCardImage}
                onResetImage={handleClickResetIdCardImage}
              />
            </View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              5. Slip Gaji
            </Text>
            <View style={{padding: 10}}>
              <ImagePicker
                label="Slip Gaji 1"
                image={formData.salary_slip_image1}
                onOpenCamera={handleClickOpenCameraSlipSalaryImage1}
                onImageSelected={handleImageSelectSlipSalaryImage1}
                onResetImage={handleClickResetSlipSalaryImage1}
              />
              <ImagePicker
                label="Slip Gaji 2"
                image={formData.salary_slip_image2}
                onOpenCamera={handleClickOpenCameraSlipSalaryImage2}
                onImageSelected={handleImageSelectSliphandleClickOpenCameraSlipSalaryImage2}
                onResetImage={handleClickResetSliphandleClickOpenCameraSlipSalaryImage2}
              />
            </View>
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
