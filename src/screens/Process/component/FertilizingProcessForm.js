import React from 'react';
import {View, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import DateInput from './DateInput';
import Input from '../../../components/CustomInput/CustomInput';
import Button from '../../../components/CustomButton/CustomButton';

const FertilizingProcessForm = ({onSubmit}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      nameFertilizer: '',
      quantityFertilizer: '',
      fertilizerDate: '',
      fertilizerType: '',
      applicationMethod: '',
      expectedEffect: '',
    },
  });

  return (
    <View>
      {/* Tên phân bón */}
      <Controller
        control={control}
        name="nameFertilizer"
        rules={{required: 'Tên phân bón không được để trống'}}
        render={({field: {onChange, value}}) => (
          <Input
            style={{marginBottom: 20}}
            placeholder="Tên phân bón"
            value={value}
            onChangeText={onChange}
            error={errors.nameFertilizer?.message}
            isError={!!errors.nameFertilizer}
          />
        )}
      />

      {/* Số lượng */}
      <Controller
        control={control}
        name="quantityFertilizer"
        rules={{required: 'Số lượng không được để trống'}}
        render={({field: {onChange, value}}) => (
          <Input
            style={{marginBottom: 6}}
            placeholder="Số lượng phân bón"
            value={value}
            onChangeText={onChange}
            error={errors.quantityFertilizer?.message}
            isError={!!errors.quantityFertilizer}
          />
        )}
      />

      {/* Ngày bón */}
      <Controller
        control={control}
        name="fertilizerDate"
        rules={{required: 'Ngày bón không được để trống'}}
        render={({field: {onChange, value}}) => (
          <DateInput
            style={{marginBottom: 6}}
            placeholder="Ngày bón"
            value={value}
            onChange={onChange}
            error={errors.fertilizerDate?.message}
            isError={!!errors.fertilizerDate}
          />
        )}
      />

      {/* Loại phân bón */}
      <Controller
        control={control}
        name="fertilizerType"
        rules={{required: 'Loại phân bón không được để trống'}}
        render={({field: {onChange, value}}) => (
          <Input
            style={{marginBottom: 6}}
            placeholder="Loại phân bón"
            value={value}
            onChangeText={onChange}
            error={errors.fertilizerType?.message}
            isError={!!errors.fertilizerType}
          />
        )}
      />

      {/* Phương pháp bón */}
      <Controller
        control={control}
        name="applicationMethod"
        rules={{required: 'Phương pháp bón không được để trống'}}
        render={({field: {onChange, value}}) => (
          <Input
            style={{marginBottom: 6}}
            placeholder="Phương pháp bón"
            value={value}
            onChangeText={onChange}
            multiline
            error={errors.applicationMethod?.message}
            isError={!!errors.applicationMethod}
          />
        )}
      />

      {/* Hiệu quả kỳ vọng */}
      <Controller
        control={control}
        name="expectedEffect"
        rules={{required: 'Hiệu quả kỳ vọng không được để trống'}}
        render={({field: {onChange, value}}) => (
          <Input
            style={{marginBottom: 6}}
            placeholder="Hiệu quả kỳ vọng"
            value={value}
            onChangeText={onChange}
            multiline
            error={errors.expectedEffect?.message}
            isError={!!errors.expectedEffect}
          />
        )}
      />

      {/* Nút Submit */}
      <View style={{marginTop: 16}}>
        <Button.Main
          onPress={handleSubmit(onSubmit)}
          title={'Hoàn thành quy trình'}
          >
        </Button.Main>
      </View>
    </View>
  );
};

export default FertilizingProcessForm;
