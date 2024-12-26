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
import InputField from '../../components/InputField';
import ImagePicker from '../../components/ImagePicker';
import InputCurrency from '../../components/InputCurrency';
import useDatePicker from '../../hooks/useDatePicker';
import DatePicker from 'react-native-date-picker';
import { Picker } from '@react-native-picker/picker';
import dayjs from 'dayjs';
import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";
import useCamera from '../../hooks/useCamera';
import { useNotification } from '../../hooks/useNotification';
import globalStyles from '../../styles/styles';
import styles from './styles';
import webStyles from './webStyles';

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
  destination: string;
  image_visit: File | null;
  description_visit: string | null;
  promise_date: any | null;
  image_promise: File | null;
  description_promise: string | null;
  amount: number | null;
  image_amount: File | null;
  description_amount: string | null;
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
  const { image: imageVisit, handleClickOpenCamera: handleClickOpenCameraVisit, handleClickResetCamera: handleClickResetCameraVisit } = useCamera();
  const { image: imagePromise, handleClickOpenCamera: handleClickOpenCameraPromise, handleClickResetCamera: handleClickResetCameraPromise } = useCamera();
  const { image: imageAmount, handleClickOpenCamera: handleClickOpenCameraAmount, handleClickResetCamera: handleClickResetCameraAmount } = useCamera();
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
    destination: '',
    image_visit: null,
    description_visit: null,
    promise_date: null,
    image_promise: null,
    description_promise: null,
    amount: null,
    image_amount: null,
    description_amount: null,
    signature_officer: null,
    signature_customer: null,
  });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      image_visit: imageVisit,
      image_promise: imagePromise,
      image_amount: imageAmount,
      promise_date: datePromiseDate,
    }));
  }, [imageVisit, imagePromise, imageAmount, datePromiseDate]);

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      date: date.toDate(),
    }));
  }, [date]);

  useEffect(() => {
    fetchBillingDetails();
  }, []);

  const fetchBillingDetails = async () => {
    try {
      const response = await instance.get('v1/billings/' + id);
      setData(response.data.data);
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
      const { id, no_billing, date, destination, image_visit, description_visit, promise_date, image_promise, description_promise, amount, image_amount, description_amount, signature_officer, signature_customer } = data

      // Create form data
      const formData = new FormData();

      formData.append('_method', 'put');
      formData.append('no_billing', no_billing);
      formData.append('date', dayjs(date).format('YYYY-MM-DD'));
      formData.append('destination', destination);
      if (destination === 'visit') {
        // Add imahe file to formData
        if (image_visit) {
          formData.append('image_visit', {
            uri: imageVisit.uri,
            type: imageVisit.type,
            name: imageVisit.fileName,
          });
        }
        if (description_visit != null) {
          formData.append('description_visit', description_visit);
        }
      } else if (destination === 'promise') {
        formData.append('promise_date', dayjs(promise_date).format('YYYY-MM-DD'));
        // Add imahe file to formData
        if (image_promise) {
          formData.append('image_promise', {
            uri: imagePromise.uri,
            type: imagePromise.type,
            name: imagePromise.fileName,
          });
        }
        if (description_promise != null) {
          formData.append('description_promise', description_promise);
        }
      } else if (destination === 'pay') {
        formData.append('amount', amount ? amount : null);
        // Add imahe file to formData
        if (image_amount) {
          formData.append('image_amount', {
            uri: imageAmount.uri,
            type: imageAmount.type,
            name: imageAmount.fileName,
          });
        }
        if (description_amount != null) {
          formData.append('description_amount', description_amount);
        }
      }
      // Add imahe file to formData
      if (signature_officer) {
        formData.append('signature_officer', {
          uri: signature_officer,
          type: 'image/png',
          name: 'signature_officer',
        });
      }
      // Add imahe file to formData
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
      await instance.post('v1/billings/' + id, formData);
      Alert.alert('Penagihan berhasil', 'Penagihan berhasil diupdate', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        }
      ]);
      showNotification('Penagihan', 'Penagihan berhasil disubmit');
    } catch (error: any) {
      // console.log(error);
      Alert.alert('Penagihan Gagal', 'Gagal terjadi kesalahan karena:\n' + error.response.data.message);
      // console.log('Error submitting penagihan: ', error.response.data);
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
            onIconPress={() => setOpenDatePicker(true)}
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
                selectedValue={data.destination}
                onValueChange={(itemValue, itemIndex) =>
                  itemValue === 'visit' ? setData((prevData: any) => ({ ...prevData, destination: itemValue })) : itemValue === 'promise' ? setData((prevData: any) => ({ ...prevData, destination: itemValue, promise_date: dayjs() })) : setData((prevData: any) => ({ ...prevData, destination: itemValue }))
                }>
                <Picker.Item label="Kunjungan" value="visit" />
                <Picker.Item label="Janji Bayar" value="promise" />
                <Picker.Item label="Bayar" value="pay" />
              </Picker>
            </View>
            {data.destination == 'visit' ? (
              <>
                <ImagePicker
                  label="Bukti Kunjungan"
                  image={imageVisit}
                  onOpenCamera={handleClickOpenCameraVisit}
                  onResetCamera={handleClickResetCameraVisit}
                />
                <InputField
                  label="Deskripsi Kunjungan"
                  placeholder="Masukan Deskripsi Kunjungan"
                  value={data.description_visit || ''}
                  onChangeText={(value) => {
                    setData((prevData: any) => ({
                      ...prevData,
                      description_visit: value,
                    }));
                  }}
                />
              </>
            ) : data.destination == 'promise' ? (
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
                <ImagePicker
                  label="Bukti Janji Bayar"
                  image={imagePromise}
                  onOpenCamera={handleClickOpenCameraPromise}
                  onResetCamera={handleClickResetCameraPromise}
                />
                <InputField
                  label="Deskripsi Janji Bayar"
                  placeholder="Masukan Deskripsi Janji Bayar"
                  value={data.description_promise || ''}
                  onChangeText={(value) => {
                    setData((prevData: any) => ({
                      ...prevData,
                      description_promise: value,
                    }));
                  }}
                />
              </>
            ) : (
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
                <ImagePicker
                  label="Bukti Pembayaran"
                  image={imageAmount}
                  onOpenCamera={handleClickOpenCameraAmount}
                  onResetCamera={handleClickResetCameraAmount}
                />
                <InputField
                  label="Deskripsi Bayar"
                  placeholder="Masukan Deskripsi Bayar"
                  value={data.description_amount || ''}
                  onChangeText={(value) => {
                    setData((prevData: any) => ({
                      ...prevData,
                      description_amount: value,
                    }));
                  }}
                />
              </>
            )}
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
                <TouchableOpacity style={{ backgroundColor: '#242c40', padding: 10, borderRadius: 5, alignItems: 'center' }} onPress={handleSubmit}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Simpan</Text>
                </TouchableOpacity>
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