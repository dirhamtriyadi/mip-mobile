import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface InputCurrencyProps {
    label: string;
    placeholder?: string;
    value: number;
    editable?: boolean;
    onChangeValue?: (value: number | null) => void;
    iconName?: string;
    onIconPress?: () => void;
}

const InputCurrency: React.FC<InputCurrencyProps> = ({
    label,
    placeholder,
    value,
    editable = true,
    onChangeValue,
    iconName,
    onIconPress,
}) => {
  return (
    <View style={[styles.groupField]}>
        <Text style={[styles.fieldLabel]}>{label}</Text>
        <View style={[styles.fieldInput]}>
            <CurrencyInput
                value={value}
                editable={editable}
                placeholder={placeholder}
                onChangeValue={onChangeValue}
                prefix="Rp. "
                delimiter="."
                separator=","
                precision={0}
                minValue={0}
                // showPositiveSign
                onChangeText={(formattedValue) => {
                    // console.log(formattedValue); // R$ +2.310,46
                }}
            />
            {iconName && (
                <TouchableOpacity
                    style={{position: 'absolute', right: 10}}
                    onPress={onIconPress}>
                    <Icon name={iconName} size={20} color="#000" />
                </TouchableOpacity>
            )}
        </View>
    </View>
  )
}

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

export default InputCurrency