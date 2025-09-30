import React from 'react';
import {Text, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import DateInput from './DateInput';
import Input from '../../../components/CustomInput/CustomInput';
import Button from '../../../components/CustomButton/CustomButton';

const SprayingProcessForm = ({onSubmit}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      nameMedicine: '',
      quantityMedicine: '',
      medicineDate: '',
      medicineType: '',
      applicationMethod: '',
    },
  });

  return (
    <View>
      {/* Tên thuốc */}
      <Controller
        control={control}
        name="nameMedicine"
        rules={{required: 'Tên thuốc là bắt buộc'}}
        render={({field: {onChange, value}}) => (
          <Input
            style={{marginBottom: 20}}
            placeholder="Tên thuốc"
            value={value}
            onChangeText={onChange}
            error={errors.nameMedicine?.message}
            isError={!!errors.nameMedicine}
          />
        )}
      />

      {/* Số lượng thuốc */}
      <Controller
        control={control}
        name="quantityMedicine"
        rules={{required: 'Số lượng thuốc là bắt buộc'}}
        render={({field: {onChange, value}}) => (
          <Input
            style={{marginBottom: 20}}
            placeholder="Số lượng thuốc"
            value={value}
            onChangeText={onChange}
            error={errors.quantityMedicine?.message}
            isError={!!errors.quantityMedicine}
          />
        )}
      />

      {/* Ngày sử dụng */}
      <Controller
        control={control}
        name="medicineDate"
        rules={{required: 'Ngày sử dụng là bắt buộc'}}
        render={({field: {onChange, value}}) => (
          <DateInput
            style={{marginBottom: 20}}
            placeholder="Ngày sử dụng"
            value={value}
            onChange={onChange}
            error={errors.medicineDate?.message}
            isError={!!errors.medicineDate}
          />
        )}
      />

      {/* Loại thuốc */}
      <Controller
        control={control}
        name="medicineType"
        rules={{required: 'Loại thuốc là bắt buộc'}}
        render={({field: {onChange, value}}) => (
          <Input
            style={{marginBottom: 20}}
            placeholder="Loại thuốc"
            value={value}
            onChangeText={onChange}
            error={errors.medicineType?.message}
            isError={!!errors.medicineType}
          />
        )}
      />

      {/* Phương pháp sử dụng */}
      <Controller
        control={control}
        name="applicationMethod"
        rules={{required: 'Phương pháp sử dụng là bắt buộc'}}
        render={({field: {onChange, value}}) => (
          <Input
            style={{marginBottom: 20}}
            placeholder="Phương pháp sử dụng"
            value={value}
            onChangeText={onChange}
            error={errors.applicationMethod?.message}
            isError={!!errors.applicationMethod}
            multiline
          />
        )}
      />

      {/* Nút Submit */}
      <View style={{marginTop: 16}}>
        <Button.Main
          onPress={handleSubmit(onSubmit)}
          title={'Hoàn thành quy trình'}></Button.Main>
      </View>
    </View>
  );
};

export default SprayingProcessForm;
