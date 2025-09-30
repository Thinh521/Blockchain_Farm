import React from 'react';
import {Text, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import DateInput from './DateInput';
import Input from '../../../components/CustomInput/CustomInput';
import Button from '../../../components/CustomButton/CustomButton';

const PlantingProcessForm = ({onSubmit}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      nameProcess: '',
      source: '',
      plantingDate: '',
      sowingDate: '',
    },
  });

  return (
    <View>
      {/* Tên quy trình */}
      <Controller
        control={control}
        name="nameProcess"
        rules={{required: 'Tên quy trình là bắt buộc'}}
        render={({field: {onChange, value}}) => (
          <Input
            style={{marginBottom: 20}}
            placeholder="Tên quy trình"
            value={value}
            onChangeText={onChange}
            error={errors.nameProcess?.message}
            isError={!!errors.nameProcess}
          />
        )}
      />

      {/* Nguồn gốc */}
      <Controller
        control={control}
        name="source"
        rules={{required: 'Nguồn gốc là bắt buộc'}}
        render={({field: {onChange, value}}) => (
          <Input
            style={{marginBottom: 20}}
            placeholder="Nguồn gốc"
            value={value}
            onChangeText={onChange}
            error={errors.source?.message}
            isError={!!errors.source}
          />
        )}
      />

      {/* Ngày trồng */}
      <Controller
        control={control}
        name="plantingDate"
        rules={{required: 'Ngày trồng là bắt buộc'}}
        render={({field: {onChange, value}}) => (
          <DateInput
            style={{marginBottom: 20}}
            placeholder="Ngày trồng"
            value={value}
            onChange={onChange}
            error={errors.plantingDate?.message}
            isError={!!errors.plantingDate}
          />
        )}
      />

      {/* Ngày gieo */}
      <Controller
        control={control}
        name="sowingDate"
        rules={{required: 'Ngày gieo là bắt buộc'}}
        render={({field: {onChange, value}}) => (
          <DateInput
            style={{marginBottom: 20}}
            placeholder="Ngày gieo"
            value={value}
            onChange={onChange}
            error={errors.sowingDate?.message}
            isError={!!errors.sowingDate}
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

export default PlantingProcessForm;
