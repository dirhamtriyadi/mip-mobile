import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  style?: any;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  style,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[styles.btn, style]}
      disabled={disabled}
      onPress={onPress}>
      <Text style={[styles.btnText]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
//   btn: {
//     width: '100%',
//     height: 45,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btnText: {
//     color: '#242c40',
//   },
btn: {
    backgroundColor: '#242c40',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export default Button;