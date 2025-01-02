import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';

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
        style={styles.textInput}
        placeholder={placeholder}
        value={location.locationString}
        // onChangeText={handleLocationChange}
      />
      <TouchableOpacity
        style={styles.btnIcon}
        onPress={getCurrentLocation}>
        <Icon name="location-arrow" size={20} color="#000" />
      </TouchableOpacity>
    </View>
    {location.locationString && (
      <MapView
        style={[styles.map]}
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

export default LocationPicker;
