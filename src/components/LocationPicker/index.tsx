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
  label: string;
  placeholder: string;
  getCurrentLocation: () => void;
  location: {
    latitude: number;
    longitude: number;
    locationString: string
  };
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  label,
  placeholder,
  getCurrentLocation,
  location
}) => (
  <View style={[styles.groupField]}>
    <Text style={[styles.fieldLabel]}>{label}</Text>
    <View
      style={[styles.fieldInput]}>
      <TextInput
        style={{color: '#242c40'}}
        placeholder={placeholder}
        value={location.locationString}
        // onChangeText={handleLocationChange}
      />
      <TouchableOpacity
        style={{position: 'absolute', right: 10}}
        onPress={getCurrentLocation}>
        <Icon name="location-arrow" size={20} color="#000" />
      </TouchableOpacity>
    </View>
    {location.locationString && (
      <MapView
        style={{width: '100%', height: 200, marginBottom: 10, marginTop: -10}}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Lokasi Anda"
          description={location.locationString}
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
  fieldInput: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    justifyContent: 'center',
  }
});

export default LocationPicker;
