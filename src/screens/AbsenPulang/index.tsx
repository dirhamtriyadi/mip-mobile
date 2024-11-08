import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, PermissionsAndroid, Platform, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker from 'react-native-date-picker';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { launchCamera } from 'react-native-image-picker';
import { useUserData } from "../../hooks/useUserData";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import instance from "../../configs/axios";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import dayjs from "dayjs";

function SakitScreen() {
    const { userDetailData } = useUserData();
    const { location, getCurrentLocation } = useCurrentLocation();
    const [image, setImage] = useState<any>(null);
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [openTimePicker, setOpenTimePicker] = useState(false);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [data, setData] = useState({
        code: '',
        nik: '',
        name: '',
        date: dayjs(),
        time_check_out: dayjs(),
        description_check_out: '',
        image_check_out: '',
        location_check_out: '',
        latitude: 0,
        longitude: 0,
    });

    useEffect(() => {
        if (location.latitude !== 0 && location.longitude !== 0) {
            setData((prevData) => ({
                ...prevData,
                latitude: location.latitude,
                longitude: location.longitude,
                location_check_out: location.locationString
            }));
        }
    }, [location]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            code: userDetailData.name + data.date.format('DD/MM/YYYY'),
            nik: userDetailData.nik,
            name: userDetailData.name,
        }));
    }, [userDetailData, data.date]);

    const handleDateChange = (selectedDate: Date) => {
        // setData((prevData) => ({ ...prevData, date: selectedDate }));
        setData((prevData) => ({
            ...prevData,
            date: dayjs(selectedDate),
            time_check_out: dayjs(selectedDate).hour(prevData.time_check_out.hour()).minute(prevData.time_check_out.minute()).second(prevData.time_check_out.second())
        }));
        setOpenDatePicker(false);
    };

    const handleTimeChange = (selectedTime: Date) => {
        // setData((prevData) => ({ ...prevData, time_check_out: selectedTime }));
        setData((prevData) => ({
            ...prevData,
            time_check_out: dayjs(selectedTime),
            date: dayjs(selectedTime).hour(prevData.date.hour()).minute(prevData.date.minute()).second(prevData.date.second())
        }));
        setOpenTimePicker(false);
    };

    const handleLocationChange = (text: string) => {
        const [latitude, longitude] = text.split(',').map(coord => parseFloat(coord.trim()));
        if (!isNaN(latitude) && !isNaN(longitude)) {
            setData((prevData) => ({
                ...prevData,
                location_check_out: text,
                latitude,
                longitude
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                location_check_out: text
            }));
        }
    };

    const handleClickOpenCamera = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                return Alert.alert('Permission Denied', 'Camera permission is required');
            }
        }

        await launchCamera({
            mediaType: 'photo',
            quality: 0.5,
            // includeBase64: true,
            cameraType: 'front',
        }, (response: any) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.error('ImagePicker Error:', response.errorMessage);
            } else {
                setImage(response.assets[0]);
                setData((prevData) => ({ ...prevData, image_check_out: response.assets[0] }));
            }
        });

    }

    const handleClickResetCamera = async () => {
        setImage('');
        setData((prevData) => ({ ...prevData, image_check_out: '' }));
    }

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
        if (data.description_check_out === '') {
            return Alert.alert('Keterangan pulang harus diisi');
        }
        if (data.image_check_out === '') {
            return Alert.alert('Foto selfie harus diisi');
        }
        if (data.location_check_out === '') {
            return Alert.alert('Lokasi harus diisi');
        }

        try {
            const { date, time_check_out, description_check_out, location_check_out } = data;

            // Create form data
            const formData = new FormData();

            formData.append('date', date.format('YYYY-MM-DD'));
            formData.append('time_check_out', time_check_out.format('HH:mm:ss'));
            formData.append('description_check_out', description_check_out);
            formData.append('location_check_out', location_check_out);

            // Add image file to formData
            if (image) {
                formData.append('image_check_out', {
                    uri: image.uri,
                    type: image.type,
                    name: image.fileName,
                });
            }

            // Set headers
            instance.defaults.headers['Content-Type'] = 'multipart/form-data';

            // Send request
            await instance.post('v1/attendances/check-out', formData);
            Alert.alert('Absen pulang berhasil', 'Absen pulang berhasil disubmit', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Home'),
                }
            ]);
        } catch (error: any) {
            if (error.response?.data?.message?.code) {
                error.response?.data?.message?.code.map((item: any) => {
                    console.log(item);
                    return Alert.alert('Absen Pulang Gagal', item);
                });
            } else {
                Alert.alert('Absen Pulang Gagal:\n', error.response.data.message);
                console.log('Error submitting absen pulang: ', error.response.data.message);
            }
        }
    };

    return (
        <SafeAreaView style={[styles.container]}>
            <ScrollView>
                <View style={[styles.formContainer]}>
                    <View style={[styles.groupField, { marginTop: 10 }]}>
                        <Text style={[styles.fieldLabel]}>Kode Absen</Text>
                        <TextInput
                            style={[styles.fieldInput]}
                            placeholder="Kode"
                            value={data.code}
                            onChangeText={(text) => setData((prevData) => ({ ...prevData, code: text }))}
                        />
                    </View>
                    <View style={[styles.groupField]}>
                        <Text style={[styles.fieldLabel]}>NIK</Text>
                        <TextInput
                            style={[styles.fieldInput]}
                            placeholder="NIK"
                            value={data.nik}
                            onChangeText={(text) => setData((prevData) => ({ ...prevData, nik: text }))}
                        />
                    </View>
                    <View style={[styles.groupField]}>
                        <Text style={[styles.fieldLabel]}>Nama</Text>
                        <TextInput
                            style={[styles.fieldInput]}
                            placeholder="Nama"
                            value={data.name}
                            onChangeText={(text) => setData((prevData) => ({ ...prevData, name: text }))}
                        />
                    </View>
                    <View style={[styles.groupField]}>
                        <Text style={[styles.fieldLabel]}>Tanggal</Text>
                        <View style={{ width: '100%', height: 45, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 15, paddingHorizontal: 10, justifyContent: 'center' }}>
                            <TextInput
                                style={{ color: '#242c40' }}
                                placeholder="Tanggal"
                                value={data.date.format('DD/MM/YYYY')}
                                editable={false}
                            />
                            <TouchableOpacity style={{ position: 'absolute', right: 10 }} onPress={() => setOpenDatePicker(true)}>
                                <Icon name="calendar" size={20} color="#000" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.groupField]}>
                        <Text style={[styles.fieldLabel]}>Jam</Text>
                        <View style={{ width: '100%', height: 45, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 15, paddingHorizontal: 10, justifyContent: 'center' }}>
                            <TextInput
                                style={{ color: '#242c40' }}
                                placeholder="Jam"
                                value={data.time_check_out.format('HH:mm:ss')}
                                editable={false}
                            />
                            <TouchableOpacity style={{ position: 'absolute', right: 10 }} onPress={() => setOpenTimePicker(true)}>
                                <Icon name="clock" size={20} color="#000" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.groupField]}>
                        <Text style={[styles.fieldLabel]}>Keterangan Pulang</Text>
                        <TextInput
                            style={[styles.fieldInput]}
                            placeholder="Keterangan Pulang"
                            value={data.description_check_out}
                            onChangeText={(text) => setData((prevData) => ({ ...prevData, description_check_out: text }))}
                        />
                    </View>
                    <View style={[styles.groupField]}>
                        <Text style={[styles.fieldLabel]}>Foto Selfie Pulang</Text>
                        {image ? (
                            <TouchableOpacity onPress={handleClickResetCamera} style={{ width: '100%', height: 45, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 15, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#242c40' }}>Reset Foto</Text>
                                <Icon name="trash-alt" size={20} color="#000" style={{ position: 'absolute', right: 10 }} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={handleClickOpenCamera} style={{ width: '100%', height: 45, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 15, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#242c40' }}>Ambil Foto</Text>
                                <Icon name="camera" size={20} color="#000" style={{ position: 'absolute', right: 10 }} />
                            </TouchableOpacity>

                        )}
                        {image && (
                            <View style={{ width: '100%', height: 200, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{ uri: image.uri }} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                            </View>
                        )}
                    </View>
                    <View style={[styles.groupField]}>
                        <Text style={[styles.fieldLabel]}>Lokasi</Text>
                        <View style={{ width: '100%', height: 45, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 15, paddingHorizontal: 10, justifyContent: 'center' }}>
                            <TextInput
                                style={{ color: '#242c40' }}
                                placeholder="Lokasi"
                                value={data.location_check_out}
                                // onChangeText={handleLocationChange}
                            />
                            <TouchableOpacity style={{ position: 'absolute', right: 10 }} onPress={() => getCurrentLocation()}>
                                <Icon name="location-arrow" size={20} color="#000" />
                            </TouchableOpacity>
                        </View>
                        {data.latitude !== 0 && data.longitude !== 0 && (
                            <MapView
                                style={{ width: '100%', height: 200, marginBottom: 10, marginTop: -10 }}
                                initialRegion={{
                                    latitude: data.latitude,
                                    longitude: data.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: data.latitude,
                                        longitude: data.longitude,
                                    }}
                                    title="Lokasi Anda"
                                    description={data.location_check_out}
                                />
                            </MapView>
                        )}
                    </View>
                    <View style={[styles.groupField, { marginBottom: 10 }]}>
                        <TouchableOpacity style={{ backgroundColor: '#242c40', padding: 10, borderRadius: 5, alignItems: 'center' }} onPress={handleSubmit}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Absen Pulang</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <DatePicker
                modal
                mode="date"
                minimumDate={dayjs().hour(0).minute(0).second(0).toDate()}
                open={openDatePicker}
                date={new Date()}
                onConfirm={handleDateChange}
                onCancel={() => setOpenDatePicker(false)}
            />
            <DatePicker
                modal
                mode="time"
                minimumDate={dayjs().hour(0).minute(0).second(0).toDate()}
                open={openTimePicker}
                date={new Date()}
                onConfirm={handleTimeChange}
                onCancel={() => setOpenTimePicker(false)}
            />
        </SafeAreaView>
    );
}

export default SakitScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    formContainer: {
        width: '90%',
        marginHorizontal: '5%',
    },
    groupField: {
        width: '100%',
    },
    fieldLabel: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    fieldInput: {
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    }
});