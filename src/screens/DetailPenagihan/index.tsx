import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import instance from '../../configs/axios';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import dayjs from 'dayjs';
import useImagePicker from "@hooks/useImagePicker";
import { useNotification } from '@hooks/useNotification';
import globalStyles from '@styles/styles';
import styles from './styles';
import Button from '@src/components/Button';
import PenagihanForm from '@src/components/PenagihanForm';

interface DetailPenagihanScreenProps {
  route: any;
}

interface DetailPenagihanData {
  id: number;
  no_billing: string;
  date: any;
  customer_id: number;
  customer: {
    name_customer: string;
  };
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
  const { showNotification } = useNotification();
  const { image, handleClickOpenCamera, handleImageSelect, handleClickReset } = useImagePicker();
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [data, setData] = useState<DetailPenagihanData>({
    id: 0,
    no_billing: '',
    date: dayjs().toDate(),
    customer_id: 0,
    customer: { name_customer: '' },
    user_id: 0,
    status: 'visit',
    description: '',
    evidence: null,
    promise_date: dayjs().toDate(),
    amount: null,
    signature_officer: null,
    signature_customer: null,
  });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      evidence: image,
    }));
  }, [image]);

  useEffect(() => {
    fetchBillingDetails();
  }, []);

  const fetchBillingDetails = async () => {
    try {
      const response = await instance.get(`v1/billings/${id}`);
      setData(prevData => ({
        ...prevData,
        id: response.data.data.id,
        no_billing: response.data.data.no_billing,
        customer_id: response.data.data.customer_id,
        customer: { name_customer: response.data.data.customer.name_customer },
      }));
    } catch (error: any) {
      if (error.response.data.status === 'error') {
        Alert.alert('Gagal mengambil data penagihan', error.response.data.message);
      }
      Alert.alert('Gagal mengambil data penagihan', `Gagal terjadi kesalahan.`);
    }
  };

  const handleSubmit = useCallback(async () => {
    try {
      const { id, no_billing, date, status, description, evidence, promise_date, amount, signature_officer, signature_customer } = data;

      const formData = new FormData();
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

      if (signature_officer) {
        formData.append('signature_officer', {
          uri: signature_officer,
          type: 'image/png',
          name: 'signature_officer.png',
        });
      }

      if (signature_customer) {
        formData.append('signature_customer', {
          uri: signature_customer,
          type: 'image/png',
          name: 'signature_customer.png',
        });
      }

      instance.defaults.headers['Content-Type'] = 'multipart/form-data';
      await instance.post('v1/billing-statuses/', formData);

      Alert.alert('Penagihan berhasil', 'Status penagihan berhasil ditambahkan', [
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ]);
      showNotification('Penagihan', 'Status penagihan berhasil ditambahkan');
    } catch (error: any) {
      if (error.response.data.status === 'error') {
        Alert.alert('Penagihan Gagal', `Gagal terjadi kesalahan karena:\n${error.response.data.message}`);
      }
      Alert.alert('Penagihan Gagal', `Gagal terjadi kesalahan.`);
    }
  }, [data, image, navigation, showNotification]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView scrollEnabled={scrollEnabled}>
        <PenagihanForm
          data={data}
          onDataChange={setData}
          onOpenCamera={handleClickOpenCamera}
          onImageSelect={handleImageSelect}
          onImageReset={handleClickReset}
          onScrollEnabledChange={setScrollEnabled}
        />
        <View style={[styles.formContainer, { marginBottom: 10 }]}>
          <Button label='Simpan' onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetailPenagihanScreen;