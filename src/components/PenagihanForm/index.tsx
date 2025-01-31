import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import InputField from '@components/InputField';
import InputCurrency from '@components/InputCurrency';
import ImagePicker from '@components/ImagePicker';
import InputSignature from '@components/InputSignature';
import InputDatePicker from '@components/InputDatePicker';
import InputStatusPicker from '@components/InputStatusPicker';
import styles from './styles';

interface PenagihanFormProps {
  data: any;
  onDataChange: (data: any) => void;
  onOpenCamera: () => void;
  onImageSelect: () => void;
  onImageReset: () => void;
  onScrollEnabledChange?: (scrollEnabled: boolean) => void;
}

function PenagihanForm({ data, onDataChange, onOpenCamera, onImageSelect, onImageReset, onScrollEnabledChange }: PenagihanFormProps) {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  
  useEffect(() => {
    if (onScrollEnabledChange) {
      onScrollEnabledChange(scrollEnabled);
    }
  }, [scrollEnabled]);

  return (
    <View style={styles.formContainer}>
      <InputField
        label="No Tagihan"
        placeholder="Masukan No Tagihan"
        value={data.no_billing}
        editable={false}
        onChangeText={() => { }}
      />
      <InputField
        label="Nama Nasabah"
        placeholder="Masukan Nama Nasabah"
        value={data.customer.name_customer}
        editable={false}
        onChangeText={() => { }}
      />
      <InputDatePicker
        label="Tanggal"
        value={data.date}
        iconName='calendar'
        onChange={(value) => onDataChange({...data, date: value})}
      />
      <InputStatusPicker
        value={data.status}
        onChange={(value) => onDataChange({ ...data, status: value })}
      />
      {data.status === 'promise_to_pay' && (
        <InputDatePicker
          label="Tanggal Janji Bayar"
          value={data.promise_date}
          iconName='calendar'
          onChange={(value) => onDataChange({ ...data, promise_date: value })}
        />
      )}
      {data.status === 'pay' && (
        <InputCurrency
          label="Nominal"
          placeholder="Masukan Nominal"
          value={data.amount || 0}
          onChangeValue={(value) => onDataChange({ ...data, amount: value })}
        />
      )}
      <ImagePicker
        label="Bukti"
        image={data.evidence}
        onOpenCamera={onOpenCamera}
        onImageSelected={onImageSelect}
        onResetImage={onImageReset}
      />
      <InputField
        label="Deskripsi"
        placeholder="Masukan Deskripsi"
        value={data.description || ''}
        onChangeText={(value) => onDataChange({ ...data, description: value })}
      />
      <InputSignature
        label="TTD Petugas"
        signature={data.signature_officer}
        onConfirm={(result) => onDataChange({ ...data, signature_officer: result })}
        onScrollEnabledChange={(scrollEnabled) => setScrollEnabled(scrollEnabled)}
      />
      <InputSignature
        label="TTD Customer"
        signature={data.signature_customer}
        onConfirm={(result) => onDataChange({ ...data, signature_customer: result })}
        onScrollEnabledChange={(scrollEnabled) => setScrollEnabled(scrollEnabled)}
      />
    </View>
  );
}

export default PenagihanForm;