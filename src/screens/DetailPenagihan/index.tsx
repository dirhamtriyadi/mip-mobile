import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import instance from '../../configs/axios';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import InputField from '@components/InputField';
import ImagePicker from '@components/ImagePicker';
import InputCurrency from '@components/InputCurrency';
import useDatePicker from '@hooks/useDatePicker';
import DatePicker from 'react-native-date-picker';
import { Picker } from '@react-native-picker/picker';
import dayjs from 'dayjs';
import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";
import useImagePicker from "@hooks/useImagePicker";
import { useNotification } from '@hooks/useNotification';
import globalStyles from '@styles/styles';
import styles from './styles';
import webStyles from './webStyles';
import Button from '@src/components/Button';

interface DetailPenagihanScreenProps {
  route: any;
}

interface DetailPenagihanData {
  id: number,
  no_billing: string;
  date: any;
  customer_id: number;
  customer: {
    name_customer: string,
  },
  user_id: number;
  status: string;
  description: string;
  evidence: string | null;
  promise_date: any | null;
  amount: number | null;
  signature_officer: string | null;
  signature_customer: string | null;
}

function DetailPenagihanScreen({ route }: DetailPenagihanScreenProps) {
  const { id } = route.params;
  
  const refOfficer = React.useRef<SignatureViewRef>(null);
  const refCustomer = React.useRef<SignatureViewRef>(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [isLockedOfficer, setIsLockedOfficer] = useState(true);
  const [isLockedCustomer, setIsLockedCustomer] = useState(true);
  const { showNotification } = useNotification();
  const { image, handleClickOpenCamera, handleImageSelect, handleClickReset } = useImagePicker();
  const { openDatePicker: openDatePickerPromiseDate, setOpenDatePicker: setOpenDatePickerPromiseDate, handleDateChange: handleDateChangePromiseDate, date: datePromiseDate } = useDatePicker();
  const { openDatePicker, setOpenDatePicker, handleDateChange, date } = useDatePicker();

  const [data, setData] = useState<DetailPenagihanData>({
    id: 0,
    no_billing: '',
    date: dayjs(),
    customer_id: 0,
    customer: {
      name_customer: '',
    },
    user_id: 0,
    status: 'visit',
    description: '',
    evidence: null,
    promise_date: null,
    amount: null,
    signature_officer: null,
    signature_customer: null,
  });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      date: date.toDate(),
      evidence: image,
      promise_date: datePromiseDate,
    }));
  }, [ date, image, datePromiseDate ]);

  useEffect(() => {
    fetchBillingDetails();
  }, []);

  const fetchBillingDetails = async () => {
    try {
      const response = await instance.get('v1/billings/' + id);
      setData((prevData) => ({
        ...prevData,
        id: response.data.data.id,
        no_billing: response.data.data.no_billing,
        name: response.data.data.name,
        date: response.data.data.date,
        customer_id: response.data.data.customer_id,
        customer: {
          name_customer: response.data.data.customer.name_customer,
        },
      }));
    } catch (error: any) {
      Alert.alert(
        'Gagal mengambil data penagihan',
        error.response.data.message,
      );
    }
  };

  const handleDoubleTap = (setIsLocked: React.Dispatch<React.SetStateAction<boolean>>) => {
    let lastTap = 0;
    return () => {
      const now = Date.now();
      if (lastTap && (now - lastTap) < 300) {
        setIsLocked(false);
      } else {
        lastTap = now;
      }
    };
  };

  const handleSignatureConfirm = (result: string, setIsLocked: React.Dispatch<React.SetStateAction<boolean>>, field: 'signature_officer' | 'signature_customer') => {
    setData((prevData: any) => ({
      ...prevData,
      [field]: result,
    }));
    setIsLocked(true);
  };

  const handleSubmit = async () => {
    try {
      const { id, no_billing, date, status, description, evidence, promise_date, amount, signature_officer, signature_customer } = data;

      // Create form data
      const formData = new FormData();

      // formData.append('_method', 'put');
      formData.append('id', id);
      formData.append('no_billing', no_billing);
      formData.append('status_date', dayjs(date).format('YYYY-MM-DD'));
      formData.append('status', status);
      formData.append('description', description || '');
      if (evidence) {
        formData.append('evidence', {
          uri: image.uri,
          type: image.type,
          name: image.fileName,
        });
      }
      if (status === 'promise_to_pay') {
        formData.append('promise_date', dayjs(promise_date).format('YYYY-MM-DD'));
      } else if (status === 'pay') {
        formData.append('amount', amount ?? null);
      }
      // Add image file to formData
      if (signature_officer) {
        formData.append('signature_officer', {
          uri: signature_officer,
          type: 'image/png',
          name: 'signature_officer',
        });
      }
      // Add image file to formData
      if (signature_customer) {
        formData.append('signature_customer', {
          uri: signature_customer,
          type: 'image/png',
          name: 'signature_customer',
        });
      }

      // Set headers
      instance.defaults.headers['Content-Type'] = 'multipart/form-data';

      // Send request
      await instance.post('v1/billing-statuses/', formData);
      Alert.alert('Penagihan berhasil', 'Status penagihan berhasil ditambahkan', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        }
      ]);
      showNotification('Penagihan', 'Status penagihan berhasil ditambahkan');
    } catch (error: any) {
      // console.log(error);
      Alert.alert('Penagihan Gagal', 'Gagal terjadi kesalahan karena:\n' + error.response.data.message);
      // console.log('Error submitting penagihan: ', error.response);
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView scrollEnabled={scrollEnabled}>
        <View style={styles.formContainer}>
          <InputField
            label="No Tagihan"
            placeholder="Masukan No Tagihan"
            value={data.no_billing}
            editable={false}
            onChangeText={() => { }}
          />
          <InputField
            label="Nama Nasabah"
            placeholder="Masukan Nama Nasabah"
            value={data.customer.name_customer}
            editable={false}
            onChangeText={() => { }}
          />
          <InputField
            label="Tanggal"
            placeholder="Masukan Tanggal"
            value={dayjs(data.date).format('DD/MM/YYYY')}
            onChangeText={() => { }}
            editable={false}
            onIconPress={() => {}}
            iconName="calendar"
          />
          <View style={globalStyles.groupField}>
            <Text style={styles.fieldLabel}>Tujuan Penagihan</Text>
            <View
              style={{
                width: '100%',
                height: 45,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                marginBottom: 15,
                paddingHorizontal: 10,
                justifyContent: 'center',
              }}>
              <Picker
                style={{ color: '#242c40' }}
                selectedValue={data.status}
                onValueChange={(itemValue, itemIndex) =>
                  itemValue === 'visit' ? setData((prevData: any) => ({ ...prevData, status: itemValue })) : itemValue === 'promise_to_pay' ? setData((prevData: any) => ({ ...prevData, status: itemValue, promise_date: dayjs() })) : setData((prevData: any) => ({ ...prevData, status: itemValue }))
                }>
                <Picker.Item label="Kunjungan" value="visit" />
                <Picker.Item label="Janji Bayar" value="promise_to_pay" />
                <Picker.Item label="Bayar" value="pay" />
              </Picker>
            </View>
            {data.status == 'promise_to_pay' ? (
              <>
                <InputField
                  label="Tanggal Janji Bayar"
                  placeholder="Masukan Tanggal Janji Bayar"
                  value={dayjs(data.promise_date).format('DD/MM/YYYY')}
                  onChangeText={() => { }}
                  editable={false}
                  onIconPress={() => setOpenDatePickerPromiseDate(true)}
                  iconName="calendar"
                />
              </>
            ) : data.status == 'pay' ? (
              <>
                <InputCurrency
                  label="Nominal"
                  placeholder="Masukan Nominal"
                  value={data.amount || 0}
                  onChangeValue={(value) => {
                    setData((prevData: any) => ({
                      ...prevData,
                      amount: value,
                    }));
                  }}
                />
              </>
            ) : null}
            <ImagePicker
              label="Bukti"
              image={image}
              onOpenCamera={handleClickOpenCamera}
              onImageSelected={handleImageSelect}
              onResetImage={handleClickReset}
            />
            <InputField
              label="Deskripsi"
              placeholder="Masukan Deskripsi"
              value={data.description || ''}
              onChangeText={(value) => {
                setData((prevData: any) => ({
                  ...prevData,
                  description: value,
                }));
              }}
            />
            <View style={globalStyles.groupField}>
              <Text style={styles.fieldLabel}>TTD Petugas</Text>
              {data.signature_officer ? (
                <Image
                  resizeMode={"contain"}
                  style={[{ width: 335, height: 114 }, styles.fieldInput, webStyles.container]}
                  source={{ uri: data.signature_officer }}
                  // source={{ uri: `data:image/jpeg;base64,${data.signature_customer}` }}
                />
              ) : null}
              {isLockedOfficer ? (
                <TouchableOpacity
                  style={[styles.fieldInput, webStyles.container]}
                  onPress={handleDoubleTap(setIsLockedOfficer)}
                  activeOpacity={1}
                >
                  <Text style={styles.lockedText}>Double tap to unlock</Text>
                </TouchableOpacity>
              ) : (
                <View style={webStyles.container}>
                  <SignatureScreen
                    ref={refOfficer}
                    onBegin={() => setScrollEnabled(false)}
                    onEnd={() => setScrollEnabled(true)}
                    onOK={(result) => handleSignatureConfirm(result, setIsLockedOfficer, 'signature_officer')}
                    onEmpty={() => {
                      console.log("Empty");
                    }}
                    onClear={() => {
                      console.log("clear");
                    }}
                    autoClear={true}
                    descriptionText={"Tanda Tangan Petugas"}
                    imageType='image/png'
                    // imageType="image/jpeg"
                  />
                </View>
              )}
            </View>
            <View style={globalStyles.groupField}>
              <Text style={styles.fieldLabel}>TTD Customer</Text>
              {data.signature_customer ? (
                <Image
                  resizeMode={"contain"}
                  style={[{ width: 335, height: 114 }, styles.fieldInput, webStyles.container]}
                  source={{ uri: data.signature_customer }}
                  // source={{ uri: `data:image/jpeg;base64,${data.signature_customer}` }}
                />
              ) : null}
              {isLockedCustomer ? (
                <TouchableOpacity
                  style={[styles.fieldInput, webStyles.container]}
                  onPress={handleDoubleTap(setIsLockedCustomer)}
                  activeOpacity={1}
                >
                  <Text style={styles.lockedText}>Double tap to unlock</Text>
                </TouchableOpacity>
              ) : (
                <View style={webStyles.container}>
                  <SignatureScreen
                    ref={refCustomer}
                    onBegin={() => setScrollEnabled(false)}
                    onEnd={() => setScrollEnabled(true)}
                    onOK={(result) => handleSignatureConfirm(result, setIsLockedCustomer, 'signature_customer')}
                    onEmpty={() => {
                      console.log("Empty");
                    }}
                    onClear={() => {
                      console.log("clear");
                    }}
                    autoClear={true}
                    descriptionText={"Tanda Tangan Customer"}
                    imageType='image/png'
                    // imageType="image/jpeg"
                  />
                </View>
              )}
              <View style={[globalStyles.groupField, { marginBottom: 10 }]}>
                <Button label='Simpan' onPress={handleSubmit} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <DatePicker
        modal
        mode="date"
        minimumDate={dayjs().hour(0).minute(0).second(0).toDate()}
        open={openDatePicker}
        date={dayjs(data.date).toDate()}
        onConfirm={handleDateChange}
        onCancel={() => setOpenDatePicker(false)}
      />
      <DatePicker
        modal
        mode="date"
        minimumDate={dayjs().hour(0).minute(0).second(0).toDate()}
        open={openDatePickerPromiseDate}
        date={dayjs(data.promise_date?.toString()).toDate()}
        onConfirm={handleDateChangePromiseDate}
        onCancel={() => setOpenDatePickerPromiseDate(false)}
      />
    </SafeAreaView>
  );
}

export default DetailPenagihanScreen;