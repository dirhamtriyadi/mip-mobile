import Button from '@src/components/Button';
import ImagePicker from '@src/components/ImagePicker';
import useImagePicker from '@src/hooks/useImagePicker';
import globalStyles from '@src/styles/styles';
import {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';

interface FormData {
  ktp: any;
  kk: any;
}

function CalonNasabahScreen() {
  const {
    image: imageKtp,
    handleClickOpenCamera: handleClickOpenCameraKtp,
    handleImageSelect: handleImageSelectKtp,
    handleClickReset: handleClickResetKtp,
  } = useImagePicker();

  const {
    image: imageKk,
    handleClickOpenCamera: handleClickOpenCameraKk,
    handleImageSelect: handleImageSelectKk,
    handleClickReset: handleClickResetKk,
  } = useImagePicker();

  const [formData, setFormData] = useState<FormData>({
    ktp: '',
    kk: '',
  });

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      ktp: imageKtp,
      kk: imageKk,
    }));
  }, [imageKtp, imageKk]);

  const handleSubmit = useCallback(async () => {
    console.log(formData);
  }, [formData]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <View style={globalStyles.formContainer}>
          <ImagePicker
            image={imageKtp}
            label="Ktp"
            onImageSelected={handleImageSelectKtp}
            onOpenCamera={handleClickOpenCameraKtp}
            onResetImage={handleClickResetKtp}
          />
          <ImagePicker
            image={imageKk}
            label="Kartu Keluarga"
            onImageSelected={handleImageSelectKk}
            onOpenCamera={handleClickOpenCameraKk}
            onResetImage={handleClickResetKk}
          />
          <Button label="Simpan" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CalonNasabahScreen;
