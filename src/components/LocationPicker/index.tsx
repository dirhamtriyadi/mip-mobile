import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface LocationPickerProps {
  getCurrentLocation: () => void;
  data: {
    location_check_in: string;
    latitude: number;
    longitude: number;
  };
  location: {
    latitude: number;
    longitude: number;
  };
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  getCurrentLocation,
  data,
}) => (
  <View style={[styles.groupField]}>
    <Text style={[styles.fieldLabel]}>Lokasi Absen Masuk</Text>
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
      <TextInput
        style={{color: '#242c40'}}
        placeholder="Lokasi Absen Masuk"
        value={data.location_check_in}
        // onChangeText={handleLocationChange}
      />
      <TouchableOpacity
        style={{position: 'absolute', right: 10}}
        onPress={getCurrentLocation}>
        <Icon name="location-arrow" size={20} color="#000" />
      </TouchableOpacity>
    </View>
    {data.latitude !== 0 && data.longitude !== 0 && (
      <MapView
        style={{width: '100%', height: 200, marginBottom: 10, marginTop: -10}}
        initialRegion={{
          latitude: data.latitude,
          longitude: data.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: data.latitude,
            longitude: data.longitude,
          }}
          title="Lokasi Anda"
          description={data.location_check_in}
        />
      </MapView>
    )}
  </View>
);

const styles = StyleSheet.create({
  groupField: {
    width: '100%',
  },
  fieldLabel: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default LocationPicker;
