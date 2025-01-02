import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';

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
        style={[styles.imgContainer]}>
        <Image
          source={{uri: image.uri}}
          style={[styles.imgStyle]}
        />
      </View>
    )}
  </View>
);

export default ImagePicker;
