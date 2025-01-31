import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import globalStyles from '@styles/styles';

interface StatusPickerComponentProps {
  value: string;
  onChange: (value: string) => void;
}

function StatusPickerComponent({ value, onChange }: StatusPickerComponentProps) {
  return (
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
          selectedValue={value}
          onValueChange={onChange}>
          <Picker.Item label="Kunjungan" value="visit" />
          <Picker.Item label="Janji Bayar" value="promise_to_pay" />
          <Picker.Item label="Bayar" value="pay" />
        </Picker>
      </View>
    </View>
  );
}

export default StatusPickerComponent;