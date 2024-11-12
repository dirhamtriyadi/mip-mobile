import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet} from 'react-native';

interface ImagePickerProps {
  image: {uri: string} | null;
  onOpenCamera: () => void;
  onResetCamera: () => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  image,
  onOpenCamera,
  onResetCamera,
}) => (
  <View style={[styles.groupField]}>
    <Text style={[styles.fieldLabel]}>Foto Selfie Masuk</Text>
    {image ? (
      <TouchableOpacity
        onPress={onResetCamera}
        style={{
          width: '100%',
          height: 45,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          marginBottom: 15,
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#242c40'}}>Reset Foto</Text>
        <Icon
          name="trash-alt"
          size={20}
          color="#000"
          style={{position: 'absolute', right: 10}}
        />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={onOpenCamera}
        style={{
          width: '100%',
          height: 45,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          marginBottom: 15,
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#242c40'}}>Ambil Foto</Text>
        <Icon
          name="camera"
          size={20}
          color="#000"
          style={{position: 'absolute', right: 10}}
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
});

export default ImagePicker;
