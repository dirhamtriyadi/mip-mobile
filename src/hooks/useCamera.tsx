import {useState} from 'react';
import {Alert, Platform, PermissionsAndroid} from 'react-native';
import {launchCamera} from 'react-native-image-picker';

const useCamera = () => {
  const [image, setImage] = useState<any>(null);

  const handleClickOpenCamera = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        return Alert.alert(
          'Permission Denied',
          'Camera permission is required',
        );
      }
    }

    await launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
        cameraType: 'front',
      },
      (response: any) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.error('ImagePicker Error:', response.errorMessage);
        } else {
          setImage(response.assets[0]);
        }
      },
    );
  };

  const handleClickResetCamera = () => {
    setImage(null);
  };

  return {image, handleClickOpenCamera, handleClickResetCamera};
};

export default useCamera;
