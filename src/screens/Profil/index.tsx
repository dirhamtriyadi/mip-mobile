import {ActivityIndicator, Alert, SafeAreaView, ScrollView} from 'react-native';
import {Text, View} from 'react-native';
import styles from './styles';
import globalStyles from '@styles/styles';
import InputField from '@components/InputField';
import React, {useState, useEffect} from 'react';
import instance from '../../configs/axios';
import Button from '@src/components/Button';
import {DataPassword, DataProfil} from '@src/types/profil';

function ProfilScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});

  const [formDataProfil, setFormDataProfil] = useState<DataProfil>({
    _method: 'put',
    name: '',
    email: '',
    nik: '',
  });

  const [formDataPassword, setFormDataPassword] = useState<DataPassword>({
    _method: 'put',
    password: '',
    confirm_password: '',
  });

  const getProfil = async () => {
    try {
      setLoading(true);
      const response = await instance.get('v1/profile');
      setFormDataProfil(prevState => ({
        ...prevState,
        name: response.data.data.name,
        email: response.data.data.email,
        nik: response.data.data.detail_users?.nik,
      }));
      // console.log(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProfil();
  }, []);

  const handleChangeProfil = (key: string, value: string) => {
    setFormDataProfil(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleChangePassword = (key: string, value: string) => {
    setFormDataPassword(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSaveProfil = async () => {
    try {
      setLoading(true);

      instance.defaults.headers['Content-Type'] = 'application/json';
      const response = await instance.put('v1/profile', formDataProfil);
      Alert.alert('Success', response.data.message);
    } catch (error: any) {
      setErrors(error.response?.data?.errors || {});
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Gagal menyimpan data',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSavePassword = async () => {
    try {
      setLoading(true);
      if (formDataPassword.password !== formDataPassword.confirm_password) {
        setErrors({confirm_password: ['Konfirmasi password tidak cocok']});
        Alert.alert('Error', 'Konfirmasi password tidak cocok');
        return;
      }

      instance.defaults.headers['Content-Type'] = 'application/json';
      const response = await instance.put(
        'v1/profile/update-password',
        formDataPassword,
      );
      Alert.alert('Success', response.data.message);
      setFormDataPassword({_method: 'put', password: '', confirm_password: ''});
    } catch (error: any) {
      setErrors(error.response?.data?.errors || {});
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Gagal mengupdate password',
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <View
          style={[
            globalStyles.formContainer,
            styles.formGroup,
            {marginTop: 10, marginBottom: 5},
          ]}>
          <Text style={styles.title}>Edit Profil</Text>
        </View>
        <View style={[globalStyles.formContainer, styles.formGroup]}>
          <InputField
            label="Nama"
            value={formDataProfil.name}
            onChangeText={value => handleChangeProfil('name', value)}
            placeholder="Masukan Nama Anda"
          />
          {errors && errors.name && (
            <View style={styles.error}>
              <Text style={styles.errorText}>{errors.name[0]}</Text>
            </View>
          )}
          <InputField
            label="Email"
            value={formDataProfil.email}
            onChangeText={value => handleChangeProfil('email', value)}
            placeholder="Masukan Email Anda"
          />
          {errors && errors.email && (
            <View style={styles.error}>
              <Text style={styles.errorText}>{errors.email[0]}</Text>
            </View>
          )}
          <InputField
            editable={false}
            label="NIK"
            value={formDataProfil.nik}
            onChangeText={value => handleChangeProfil('nik', value)}
            placeholder="Masukan NIK Anda"
          />
          {errors && errors.nik && (
            <View style={styles.error}>
              <Text style={styles.errorText}>{errors.nik[0]}</Text>
            </View>
          )}
          <Button label="Simpan" onPress={() => handleSaveProfil()} />
        </View>
        <View
          style={[
            globalStyles.formContainer,
            styles.formGroup,
            {marginTop: 10, marginBottom: 5},
          ]}>
          <Text style={styles.title}>Edit Password</Text>
        </View>
        <View style={[globalStyles.formContainer, styles.formGroup]}>
          <InputField
            label="Password"
            value={formDataPassword.password}
            onChangeText={value => handleChangePassword('password', value)}
            placeholder="Masukan Password Baru"
          />
          {errors && errors.password && (
            <View style={styles.error}>
              <Text style={styles.errorText}>{errors.password[0]}</Text>
            </View>
          )}
          <InputField
            label="Konfirmasi Password"
            value={formDataPassword.confirm_password}
            onChangeText={value =>
              handleChangePassword('confirm_password', value)
            }
            placeholder="Masukan Konfirmasi Password"
          />
          {errors && errors.confirm_password && (
            <View style={styles.error}>
              <Text style={styles.errorText}>{errors.confirm_password[0]}</Text>
            </View>
          )}
          <Button label="Simpan" onPress={() => handleSavePassword()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfilScreen;
