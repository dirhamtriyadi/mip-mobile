import InputField from '@src/components/InputField';
import InputFieldNumber from '@src/components/InputFieldNumber';
import InputFieldTextArea from '@src/components/InputFieldTextArea';
import LocationPicker from '@src/components/LocationPicker';
import {useLocation} from '@src/hooks/useLocation';
import globalStyles from '@src/styles/styles';
import {useCallback, useEffect, useState} from 'react';
import {Alert, SafeAreaView, ScrollView, Text, View} from 'react-native';
import InputCurrency from '@src/components/InputCurrency';
import dayjs from 'dayjs';
import useDatePicker from '@src/hooks/useDatePicker';
import DatePicker from 'react-native-date-picker';
import InputStatusPicker from '@src/components/InputStatusPicker';
import InputSignature from '@src/components/InputSignature';
import AccordionSection from '@src/components/AccordionSection';
import ImagePicker from '@src/components/ImagePicker';
import useImagePicker from '@src/hooks/useImagePicker';
import {SurveiFormData} from '@src/types/survei';
import instance from '@src/configs/axios';
import Button from '@src/components/Button';
import {useNotification} from '@src/hooks/useNotification';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'App';

interface DetailSurveiScreenProps {
  route: any;
}

function DetailSurveiScreen({route}: DetailSurveiScreenProps) {
  const {id} = route.params;
  const [formDataSurvei, setFormDataSurvei] = useState<SurveiFormData>({
    id: '',
    name: '',
    address: '',
    number_ktp: '',
    address_status: '',
    phone_number: '',
    npwp: '',
    company_name: '',
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
    source_1_full_name: '',
    source_1_gender: '',
    source_1_source_relationship: '',
    source_1_source_character: '',
    source_1_knows_prospect_customer: '',
    source_1_prospect_lives_at_address: '',
    source_1_length_of_residence: '',
    source_1_house_ownership_status: '',
    source_1_prospect_status: '',
    source_1_number_of_dependents: '',
    source_1_prospect_character: '',
    source_2_full_name: '',
    source_2_gender: '',
    source_2_source_relationship: '',
    source_2_source_character: '',
    source_2_knows_prospect_customer: '',
    source_2_prospect_lives_at_address: '',
    source_2_length_of_residence: '',
    source_2_house_ownership_status: '',
    source_2_prospect_status: '',
    source_2_number_of_dependents: '',
    source_2_prospect_character: '',
    recommendation_pt: '',
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

  const {showNotification} = useNotification();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {location, getCurrentLocation, changeLocationMarker} = useLocation();
  const {date, openDatePicker, setOpenDatePicker, handleDateChange} =
    useDatePicker(formDataSurvei.dateSurvey);
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
    handleImageSelect:
      handleImageSelectSliphandleClickOpenCameraSlipSalaryImage2,
    handleClickReset: handleClickResetSliphandleClickOpenCameraSlipSalaryImage2,
  } = useImagePicker();

  useEffect(() => {
    setFormDataSurvei(prevData => ({
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

  const fetchSurveyDetails = async () => {
    try {
      const response = await instance.get(
        `v1/prospective-customer-surveys/${id}`,
      );
      console.log(response.data.data);

      setFormDataSurvei(prevData => ({...prevData, ...response.data.data}));
    } catch (error: any) {
      console.log(error.response);

      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    fetchSurveyDetails();
  }, []);

  const handleSubmit = useCallback(async () => {
    console.log(imageWorkplace1);
    
    try {
      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('name', formDataSurvei.name);
      formData.append('address', formDataSurvei.address);
      formData.append('number_ktp', formDataSurvei.number_ktp);
      formData.append('address_status', formDataSurvei.address_status);
      formData.append('phone_number', formDataSurvei.phone_number);
      formData.append('npwp', formDataSurvei.npwp);
      formData.append('company_name', formDataSurvei.company_name);
      formData.append('employee_tenure', formDataSurvei.employee_tenure);
      formData.append('job_level', formDataSurvei.job_level);
      formData.append('employee_status', formDataSurvei.employee_status);
      formData.append('salary', formDataSurvei.salary);
      formData.append('other_business', formDataSurvei.other_business);
      formData.append(
        'monthly_living_expenses',
        formDataSurvei.monthly_living_expenses,
      );
      formData.append('children', formDataSurvei.children);
      formData.append('wife', formDataSurvei.wife);
      formData.append('couple_jobs', formDataSurvei.couple_jobs);
      formData.append('couple_business', formDataSurvei.couple_business);
      formData.append('couple_income', formDataSurvei.couple_income);
      formData.append('bank_debt', formDataSurvei.bank_debt);
      formData.append('cooperative_debt', formDataSurvei.cooperative_debt);
      formData.append('personal_debt', formDataSurvei.personal_debt);
      formData.append('online_debt', formDataSurvei.online_debt);
      formData.append(
        'customer_character_analysis',
        formDataSurvei.customer_character_analysis,
      );
      formData.append(
        'financial_report_analysis',
        formDataSurvei.financial_report_analysis,
      );
      formData.append('slik_result', formDataSurvei.slik_result);
      formData.append('info_provider_name', formDataSurvei.info_provider_name);
      formData.append(
        'info_provider_position',
        formDataSurvei.info_provider_position,
      );
      formData.append(
        'workplace_condition',
        formDataSurvei.workplace_condition,
      );
      formData.append('employee_count', formDataSurvei.employee_count);
      formData.append('business_duration', formDataSurvei.business_duration);
      formData.append('office_address', formDataSurvei.office_address);
      formData.append('office_phone', formDataSurvei.office_phone);
      formData.append('loan_application', formDataSurvei.loan_application);
      formData.append(
        'recommendation_from_vendors',
        formDataSurvei.recommendation_from_vendors,
      );
      formData.append(
        'recommendation_from_treasurer',
        formDataSurvei.recommendation_from_treasurer,
      );
      formData.append(
        'recommendation_from_other',
        formDataSurvei.recommendation_from_other,
      );
      formData.append('source_1_full_name', formDataSurvei.source_1_full_name);
      formData.append('source_1_gender', formDataSurvei.source_1_gender);
      formData.append(
        'source_1_source_relationship',
        formDataSurvei.source_1_source_relationship,
      );
      formData.append(
        'source_1_source_character',
        formDataSurvei.source_1_source_character,
      );
      formData.append(
        'source_1_knows_prospect_customer',
        formDataSurvei.source_1_knows_prospect_customer,
      );
      formData.append(
        'source_1_prospect_lives_at_address',
        formDataSurvei.source_1_prospect_lives_at_address,
      );
      formData.append(
        'source_1_length_of_residence',
        formDataSurvei.source_1_length_of_residence,
      );
      formData.append(
        'source_1_house_ownership_status',
        formDataSurvei.source_1_house_ownership_status,
      );
      formData.append(
        'source_1_prospect_status',
        formDataSurvei.source_1_prospect_status,
      );
      formData.append(
        'source_1_number_of_dependents',
        formDataSurvei.source_1_number_of_dependents,
      );
      formData.append(
        'source_1_prospect_character',
        formDataSurvei.source_1_prospect_character,
      );
      formData.append('source_2_full_name', formDataSurvei.source_2_full_name);
      formData.append('source_2_gender', formDataSurvei.source_2_gender);
      formData.append(
        'source_2_source_relationship',
        formDataSurvei.source_2_source_relationship,
      );
      formData.append(
        'source_2_source_character',
        formDataSurvei.source_2_source_character,
      );
      formData.append(
        'source_2_knows_prospect_customer',
        formDataSurvei.source_2_knows_prospect_customer,
      );
      formData.append(
        'source_2_prospect_lives_at_address',
        formDataSurvei.source_2_prospect_lives_at_address,
      );
      formData.append(
        'source_2_length_of_residence',
        formDataSurvei.source_2_length_of_residence,
      );
      formData.append(
        'source_2_house_ownership_status',
        formDataSurvei.source_2_house_ownership_status,
      );
      formData.append(
        'source_2_prospect_status',
        formDataSurvei.source_2_prospect_status,
      );
      formData.append(
        'source_2_number_of_dependents',
        formDataSurvei.source_2_number_of_dependents,
      );
      formData.append(
        'source_2_prospect_character',
        formDataSurvei.source_2_prospect_character,
      );
      formData.append('recommendation_pt', formDataSurvei.recommendation_pt);
      formData.append('descriptionSurvey', formDataSurvei.descriptionSurvey);
      formData.append('locationSurvey', formDataSurvei.locationSurvey);
      formData.append(
        'dateSurvey',
        dayjs(formDataSurvei.dateSurvey).format('YYYY-MM-DD'),
      );
      formData.append('latitude', formDataSurvei.latitude);
      formData.append('longitude', formDataSurvei.longitude);
      formData.append('locationString', formDataSurvei.locationString);
      if (formDataSurvei.signature_officer) {
        formData.append('signature_officer', {
          uri: formDataSurvei.signature_officer,
          type: 'image/png',
          name: 'signature_officer.png',
        });
      }
      if (formDataSurvei.signature_customer) {
        formData.append('signature_customer', {
          uri: formDataSurvei.signature_customer,
          type: 'image/png',
          name: 'signature_customer.png',
        });
      }
      if (formDataSurvei.signature_couple) {
        formData.append('signature_couple', {
          uri: formDataSurvei.signature_couple,
          type: 'image/png',
          name: 'signature_couple.png',
        });
      }
      if (formDataSurvei.workplace_image1) {
        formData.append('workplace_image1', {
          uri: imageWorkplace1.uri,
          type: imageWorkplace1.type,
          name: imageWorkplace1.fileName,
        });
      }
      if (formDataSurvei.workplace_image2) {
        formData.append('workplace_image2', {
          uri: imageWorkplace2.uri,
          type: imageWorkplace2.type,
          name: imageWorkplace2.fileName,
        });
      }
      if (formDataSurvei.customer_image) {
        formData.append('customer_image', {
          uri: imageCustomer.uri,
          type: imageCustomer.type,
          name: imageCustomer.fileName,
        });
      }
      if (formDataSurvei.ktp_image) {
        formData.append('ktp_image', {
          uri: imageKtp.uri,
          type: imageKtp.type,
          name: imageKtp.fileName,
        });
      }
      if (formDataSurvei.loan_guarantee_image1) {
        formData.append('loan_guarantee_image1', {
          uri: imageLoanGuarantee1.uri,
          type: imageLoanGuarantee1.type,
          name: imageLoanGuarantee1.fileName,
        });
      }
      if (formDataSurvei.loan_guarantee_image2) {
        formData.append('loan_guarantee_image2', {
          uri: imageLoanGuarantee2.uri,
          type: imageLoanGuarantee2.type,
          name: imageLoanGuarantee2.fileName,
        });
      }
      if (formDataSurvei.kk_image) {
        formData.append('kk_image', {
          uri: imageKk.uri,
          type: imageKk.type,
          name: imageKk.fileName,
        });
      }
      if (formDataSurvei.id_card_image) {
        formData.append('id_card_image', {
          uri: imageIdCard.uri,
          type: imageIdCard.type,
          name: imageIdCard.fileName,
        });
      }
      if (formDataSurvei.salary_slip_image1) {
        formData.append('salary_slip_image1', {
          uri: imageSlipSalary1.uri,
          type: imageSlipSalary1.type,
          name: imageSlipSalary1.fileName,
        });
      }
      if (formDataSurvei.salary_slip_image2) {
        formData.append('salary_slip_image2', {
          uri: imageSlipSalary2.uri,
          type: imageSlipSalary2.type,
          name: imageSlipSalary2.fileName,
        });
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      await instance.post(
        `v1/prospective-customer-surveys/${formDataSurvei.id}`,
        formData,
        config,
      );

      Alert.alert('Berhasil', 'Prospective customer survey berhasil disimpan', [
        {text: 'OK', onPress: () => navigation.navigate('Home')},
      ]);
      showNotification('Penagihan', 'Status penagihan berhasil ditambahkan');
    } catch (error: any) {
      console.log(error);
      if (error.response?.data?.status === 'error') {
        const errorMessages = Object.values(error.response?.data?.errors || {})
          .flat()
          .join(', ');

        return Alert.alert('Error', errorMessages || 'Terjadi kesalahan.');
      }

      return Alert.alert(
        'Error',
        'Terjadi kesalahan saat prospective customer survey!',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
    }
  }, [
    formDataSurvei,
    imageCustomer,
    imageKtp,
    imageLoanGuarantee1,
    imageLoanGuarantee2,
    imageKk,
    imageIdCard,
    imageSlipSalary1,
    imageSlipSalary2,
    navigation,
    showNotification,
  ]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView scrollEnabled={scrollEnabled}>
        <View style={globalStyles.formContainer}>
          <AccordionSection title="1. CIF">
            <InputField
              label="Nama"
              placeholder="Masukan nama"
              value={formDataSurvei.name}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  name: text,
                }));
              }}
            />
            <InputFieldTextArea
              label="Alamat"
              placeholder="Masukan alamat"
              value={formDataSurvei.address}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  address: text,
                }));
              }}
            />
            <InputFieldNumber
              label="No KTP"
              placeholder="Masukan nomor KTP"
              value={formDataSurvei.number_ktp}
              onChangeText={text => {
                const numericValue = text.replace(/[^0-9]/g, '');
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  number_ktp: numericValue,
                }));
              }}
            />
            <InputField
              label="Status Alamat"
              placeholder="Masukan status alamat"
              value={formDataSurvei.address_status}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  address_status: text,
                }));
              }}
            />
            <InputFieldNumber
              label="No Telepon"
              placeholder="Masukan nomor telepon"
              value={formDataSurvei.phone_number}
              onChangeText={text => {
                const numericValue = text.replace(/[^0-9]/g, '');
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  phone_number: numericValue,
                }));
              }}
            />
            <InputField
              label="NPWP"
              placeholder="Masukan NPWP"
              value={formDataSurvei.npwp}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  npwp: text,
                }));
              }}
            />
          </AccordionSection>
          <AccordionSection title="2. Pendapatan">
            <InputField
              label="Jenis Pekerjaan"
              placeholder="Masukan jenis pekerjaan"
              value={formDataSurvei.job_type}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  job_type: text,
                }));
              }}
            />
            <InputField
              label="Nama Perusahaan"
              placeholder="Masukan nama perusahaan"
              value={formDataSurvei.company_name}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  company_name: text,
                }));
              }}
            />
            <InputField
              label="Jabatan"
              placeholder="Masukan jabatan"
              value={formDataSurvei.job_level}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  job_level: text,
                }));
              }}
            />
            <InputField
              label="Lama Kerja"
              placeholder="Masukan lama kerja"
              value={formDataSurvei.employee_tenure}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  employee_tenure: text,
                }));
              }}
            />
            <InputField
              label="Status Karyawan"
              placeholder="Masukan status karyawan"
              value={formDataSurvei.employee_status}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  employee_status: text,
                }));
              }}
            />
            <InputCurrency
              label="Gaji*"
              placeholder="Masukan gaji"
              value={formDataSurvei.salary}
              onChangeValue={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  salary: Number(text),
                }));
              }}
            />
            <InputCurrency
              label="Usaha Tambahan"
              placeholder="Masukan usaha tambahan"
              value={formDataSurvei.other_business}
              onChangeValue={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  other_business: Number(text),
                }));
              }}
            />
            <InputCurrency
              label="Biaya hidup per bulan*"
              placeholder="Masukan biaya hidup per bulan"
              value={formDataSurvei.monthly_living_expenses}
              onChangeValue={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  monthly_living_expenses: Number(text),
                }));
              }}
            />
            <Text>Tanggungan</Text>
            <InputField
              label="Anak"
              placeholder="Masukan anak"
              value={formDataSurvei.children}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  children: text,
                }));
              }}
            />
            <InputField
              label="Istri"
              placeholder="Masukan istri"
              value={formDataSurvei.wife}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  wife: text,
                }));
              }}
            />
            <Text>Kepemilikan Rumah</Text>
            <InputField
              label="Pekerjaan Pasangan"
              placeholder="Masukan pekerjaan pasangan"
              value={formDataSurvei.couple_jobs}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  couple_jobs: text,
                }));
              }}
            />
            <InputField
              label="Usaha Pasangan"
              placeholder="Masukan usaha pasangan"
              value={formDataSurvei.couple_business}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  couple_business: text,
                }));
              }}
            />
            <InputCurrency
              label="Pendapatan Pasangan"
              placeholder="Masukan pendapatan pasangan"
              value={formDataSurvei.couple_income}
              onChangeValue={text => {
                setFormDataSurvei(prevData => ({
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
              value={formDataSurvei.bank_debt}
              onChangeValue={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  bank_debt: Number(text),
                }));
              }}
            />
            <InputCurrency
              label="Koperasi"
              placeholder="Masukan hutang koperasi"
              value={formDataSurvei.cooperative_debt}
              onChangeValue={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  cooperative_debt: Number(text),
                }));
              }}
            />
            <InputCurrency
              label="Perorangan"
              placeholder="Masukan hutang perorangan"
              value={formDataSurvei.personal_debt}
              onChangeValue={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  personal_debt: Number(text),
                }));
              }}
            />
            <InputCurrency
              label="Online"
              placeholder="Masukan hutang online"
              value={formDataSurvei.online_debt}
              onChangeValue={text => {
                setFormDataSurvei(prevData => ({
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
              value={formDataSurvei.customer_character_analysis}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  customer_character_analysis: text,
                }));
              }}
            />
            <InputField
              label="B. Analisa Laporan Keuangan"
              placeholder="Masukan analisa laporan keuangan"
              value={formDataSurvei.financial_report_analysis}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  financial_report_analysis: text,
                }));
              }}
            />
            <InputField
              label="C. Hasil Slik"
              placeholder="Masukan hasil slik"
              value={formDataSurvei.slik_result}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
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
              value={formDataSurvei.info_provider_name}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  info_provider_name: text,
                }));
              }}
            />
            <InputField
              label="Jabatan Pemberi Informasi"
              placeholder="Masukan jabatan pemberi informasi"
              value={formDataSurvei.info_provider_position}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  info_provider_position: text,
                }));
              }}
            />
            <InputField
              label="Kondisi Tempat Kerja"
              placeholder="Masukan kondisi tempat kerja"
              value={formDataSurvei.workplace_condition}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  workplace_condition: text,
                }));
              }}
            />
            <InputField
              label="Banyak Karyawan"
              placeholder="Masukan banyak karyawan"
              value={formDataSurvei.employee_count}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  employee_count: text,
                }));
              }}
            />
            <InputField
              label="Lama Usaha Kantor"
              placeholder="Masukan lama usaha kantor"
              value={formDataSurvei.business_duration}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  business_duration: text,
                }));
              }}
            />
            <InputField
              label="Alamat Kantor"
              placeholder="Masukan alamat kantor"
              value={formDataSurvei.office_address}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  office_address: text,
                }));
              }}
            />
            <InputField
              label="Telepon Kantor"
              placeholder="Masukan telepon kantor"
              value={formDataSurvei.office_phone}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  office_phone: text,
                }));
              }}
            />
            <InputCurrency
              label="Pengajuan"
              placeholder="Masukan Pengajuan"
              value={formDataSurvei.loan_application}
              onChangeValue={text => {
                setFormDataSurvei(prevData => ({
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
              value={formDataSurvei.recommendation_from_vendors}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  recommendation_from_vendors: text,
                }));
              }}
            />
            <InputField
              label="Bendahara"
              placeholder="Masukan nama bendahara"
              value={formDataSurvei.recommendation_from_treasurer}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  recommendation_from_treasurer: text,
                }));
              }}
            />
            <InputFieldTextArea
              label="Lainnya"
              placeholder="Masukan lainnya"
              value={formDataSurvei.recommendation_from_other}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  recommendation_from_other: text,
                }));
              }}
            />
          </AccordionSection>
          <AccordionSection title="7. Wawancara 1">
            <InputField
              label="Nama"
              placeholder="Masukan nama"
              value={formDataSurvei.source_1_full_name}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  source_1_full_name: text,
                }));
              }}
            />
            <InputField
              label="Jenis Kelamin"
              placeholder="Masukan jenis kelamin"
              value={formDataSurvei.source_1_gender}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  source_1_gender: text,
                }));
              }}
            />
            <InputField
              label="Hubungan Sumber Informasi"
              placeholder="Masukan hubungan sumber informasi"
              value={formDataSurvei.source_1_source_relationship}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  source_1_source_relationship: text,
                }));
              }}
            />
            <InputField
              label="Karakter Sumber Informasi"
              placeholder="Masukan karakter sumber informasi"
              value={formDataSurvei.source_1_source_character}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  source_1_source_character: text,
                }));
              }}
            />
            <InputField
              label="Kenal Dengan Calon Nasabah?"
              placeholder="Masukan keterangan"
              value={formDataSurvei.source_1_knows_prospect_customer}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  source_1_knows_prospect_customer: text,
                }));
              }}
            />
            <InputField
              label="Calon Nasabah Tinggal di Alamat tersebut?"
              placeholder="Masukan keterangan"
              value={formDataSurvei.source_1_prospect_lives_at_address}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  source_1_prospect_lives_at_address: text,
                }));
              }}
            />
            <InputField
              label="Lama Tinggal"
              placeholder="Masukan lama tinggal"
              value={formDataSurvei.source_1_length_of_residence}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  source_1_length_of_residence: text,
                }));
              }}
            />
            <InputField
              label="Status Kepemilikan Rumah"
              placeholder="Masukan status kepemilikan rumah"
              value={formDataSurvei.source_1_house_ownership_status}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  source_1_house_ownership_status: text,
                }));
              }}
            />
            <InputField
              label="Status Calon Nasabah"
              placeholder="Masukan status calon nasabah"
              value={formDataSurvei.source_1_prospect_status}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  source_1_prospect_status: text,
                }));
              }}
            />
            <InputField
              label="Jumlah Tanggungan"
              placeholder="Masukkan jumlah tanggungan"
              value={formDataSurvei.source_1_number_of_dependents}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  source_1_number_of_dependents: text,
                }));
              }}
            />
            <InputField
              label="Karakter Calon Nasabah"
              placeholder="Masukkan karakter calon nasabah"
              value={formDataSurvei.source_1_prospect_character}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  source_1_prospect_character: text,
                }));
              }}
            />
          </AccordionSection>
          <AccordionSection title="8. Wawancara 2 (Opsional)">
            <InputField
              label="Nama"
              placeholder="Masukan nama"
              value={formDataSurvei.source_2_full_name}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  source_2_full_name: text,
                }));
              }}
            />
            <InputField
              label="Jenis Kelamin"
              placeholder="Masukan jenis kelamin"
              value={formDataSurvei.source_2_gender}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  source_2_gender: text,
                }));
              }}
            />
            <InputField
              label="Hubungan Sumber Informasi"
              placeholder="Masukan hubungan sumber informasi"
              value={formDataSurvei.source_2_source_relationship}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  source_2_source_relationship: text,
                }));
              }}
            />
            <InputField
              label="Karakter Sumber Informasi"
              placeholder="Masukan karakter sumber informasi"
              value={formDataSurvei.source_2_source_character}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  source_2_source_character: text,
                }));
              }}
            />
            <InputField
              label="Kenal Dengan Calon Nasabah?"
              placeholder="Masukan keterangan"
              value={formDataSurvei.source_2_knows_prospect_customer}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  source_2_knows_prospect_customer: text,
                }));
              }}
            />
            <InputField
              label="Calon Nasabah Tinggal di Alamat tersebut?"
              placeholder="Masukan keterangan"
              value={formDataSurvei.source_2_prospect_lives_at_address}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  source_2_prospect_lives_at_address: text,
                }));
              }}
            />
            <InputField
              label="Lama Tinggal"
              placeholder="Masukan lama tinggal"
              value={formDataSurvei.source_2_length_of_residence}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  source_2_length_of_residence: text,
                }));
              }}
            />
            <InputField
              label="Status Kepemilikan Rumah"
              placeholder="Masukan status kepemilikan rumah"
              value={formDataSurvei.source_2_house_ownership_status}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  source_2_house_ownership_status: text,
                }));
              }}
            />
            <InputField
              label="Status Calon Nasabah"
              placeholder="Masukan status calon nasabah"
              value={formDataSurvei.source_2_prospect_status}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  source_2_prospect_status: text,
                }));
              }}
            />
            <InputField
              label="Jumlah Tanggungan"
              placeholder="Masukkan jumlah tanggungan"
              value={formDataSurvei.source_2_number_of_dependents}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  source_2_number_of_dependents: text,
                }));
              }}
            />
            <InputField
              label="Karakter Calon Nasabah"
              placeholder="Masukkan karakter calon nasabah"
              value={formDataSurvei.source_2_prospect_character}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  source_2_prospect_character: text,
                }));
              }}
            />
          </AccordionSection>
          <AccordionSection title="9. Catatan Rekomendasi PT">
            <InputStatusPicker
              label="Direkomendasikan"
              value={formDataSurvei.recommendation_pt}
              onChange={value =>
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  recommendation_pt: value,
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
              value={formDataSurvei.descriptionSurvey}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  descriptionSurvey: text,
                }));
              }}
            />
            <InputField
              label="Tempat"
              placeholder="Masukan tempat"
              value={formDataSurvei.locationSurvey}
              onChangeText={text => {
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  locationSurvey: text,
                }));
              }}
            />
            <InputField
              label="Tanggal"
              placeholder="Tanggal"
              value={
                formDataSurvei.dateSurvey
                  ? dayjs(formDataSurvei.dateSurvey).format('dddd, DD-MM-YYYY')
                  : dayjs().format('dddd, DD-MM-YYYY')
              }
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
              signature={formDataSurvei.signature_officer}
              onConfirm={result =>
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  signature_officer: result,
                }))
              }
              onScrollEnabledChange={setScrollEnabled}
            />
            <InputSignature
              label="TTD Nasabah"
              signature={formDataSurvei.signature_customer}
              onConfirm={result =>
                setFormDataSurvei(prevData => ({
                  ...prevData,
                  signature_customer: result,
                }))
              }
              onScrollEnabledChange={setScrollEnabled}
            />
            <InputSignature
              label="TTD Pasangan/Penanggung Jawab"
              signature={formDataSurvei.signature_couple}
              onConfirm={result =>
                setFormDataSurvei(prevData => ({
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
                image={formDataSurvei.workplace_image1}
                onOpenCamera={handleClickOpenCameraWorkplaceImage1}
                onImageSelected={handleImageSelectWorkplaceImage1}
                onResetImage={handleClickResetWorkplaceImage1}
              />
              <ImagePicker
                label="Foto Gedung 2"
                image={formDataSurvei.workplace_image2}
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
                image={formDataSurvei.customer_image}
                onOpenCamera={handleClickOpenCameraCustomerImage}
                onImageSelected={handleImageSelectCustomerImage}
                onResetImage={handleClickResetCustomerImage}
              />
              <ImagePicker
                label="Foto KTP"
                image={formDataSurvei.ktp_image}
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
                image={formDataSurvei.loan_guarantee_image1}
                onOpenCamera={handleClickOpenCameraLoanGuarantee1}
                onImageSelected={handleImageSelectLoanGuarantee1}
                onResetImage={handleClickResetLoanGuarantee1}
              />
              <ImagePicker
                label="Foto Jaminan 2"
                image={formDataSurvei.loan_guarantee_image2}
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
                image={formDataSurvei.kk_image}
                onOpenCamera={handleClickOpenCameraKkImage}
                onImageSelected={handleImageSelectKkImage}
                onResetImage={handleClickResetKkImage}
              />
              <ImagePicker
                label="Foto ID Card"
                image={formDataSurvei.id_card_image}
                onOpenCamera={handleClickOpenCameraIdCardImage}
                onImageSelected={handleImageSelectIdCardImage}
                onResetImage={handleClickResetIdCardImage}
              />
            </View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>5. Slip Gaji</Text>
            <View style={{padding: 10}}>
              <ImagePicker
                label="Slip Gaji 1"
                image={formDataSurvei.salary_slip_image1}
                onOpenCamera={handleClickOpenCameraSlipSalaryImage1}
                onImageSelected={handleImageSelectSlipSalaryImage1}
                onResetImage={handleClickResetSlipSalaryImage1}
              />
              <ImagePicker
                label="Slip Gaji 2"
                image={formDataSurvei.salary_slip_image2}
                onOpenCamera={handleClickOpenCameraSlipSalaryImage2}
                onImageSelected={
                  handleImageSelectSliphandleClickOpenCameraSlipSalaryImage2
                }
                onResetImage={
                  handleClickResetSliphandleClickOpenCameraSlipSalaryImage2
                }
              />
            </View>
          </AccordionSection>
          <Button label="Kirim" onPress={handleSubmit} />
        </View>
      </ScrollView>
      <DatePicker
        modal
        mode="date"
        minimumDate={dayjs().hour(0).minute(0).second(0).toDate()}
        open={openDatePicker}
        date={
          formDataSurvei.dateSurvey
            ? dayjs(formDataSurvei.dateSurvey).toDate()
            : dayjs().toDate()
        }
        onConfirm={handleDateChange}
        onCancel={() => setOpenDatePicker(false)}
      />
    </SafeAreaView>
  );
}

export default DetailSurveiScreen;
