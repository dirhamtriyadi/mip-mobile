import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet} from 'react-native';

interface ImagePickerProps {
  label: string;
  image: {uri: string} | null;
  onOpenCamera: () => void;
  onResetCamera: () => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  label,
  image,
  onOpenCamera,
  onResetCamera,
}) => (
  <View style={[styles.groupField]}>
    <Text style={[styles.fieldLabel]}>{label}</Text>
    {image ? (
      <TouchableOpacity
        onPress={onResetCamera}
        style={[styles.btn]}>
        <Text style={[styles.btnText]}>Reset Foto</Text>
        <Icon
          name="trash-alt"
          size={20}
          color="#000"
          style={[styles.btnIcon]}
        />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={onOpenCamera}
        style={[styles.btn]}>
        <Text style={[styles.btnText]}>Ambil Foto</Text>
        <Icon
          name="camera"
          size={20}
          color="#000"
          style={[styles.btnIcon]}
        />
      </TouchableOpacity>
    )}
    {image && (
      <View
        style={{
          width: '100%',
          height: 200,
          marginBottom: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: image.uri}}
          style={{width: '100%', height: '100%', resizeMode: 'contain'}}
        />
      </View>
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
  btnText: {
    color: '#242c40',
  },
  btn: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnIcon: {
    position: 'absolute', right: 10
  }
});

export default ImagePicker;
