import React from 'react';
import {View, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import DateInput from './DateInput';
import Input from '../../../components/CustomInput/CustomInput';
import Button from '../../../components/CustomButton/CustomButton';

const HarvestingProcessForm = ({onSubmit}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      harvestDate: '',
      estimatedQuantity: '',
      actualQuantity: '',
      quality: '',
      harvestMethod: '',
    },
  });

  return (
    <View>
      {/* Ngày thu hoạch */}
      <Controller
        control={control}
        name="harvestDate"
        rules={{required: 'Ngày thu hoạch là bắt buộc'}}
        render={({field: {onChange, value}}) => (
          <DateInput
            style={{marginBottom: 20}}
            placeholder="Ngày thu hoạch"
            value={value}
            onChange={onChange}
            error={errors.harvestDate?.message}
            isError={!!errors.harvestDate}
          />
        )}
      />

      {/* Số lượng dự kiến */}
      <Controller
        control={control}
        name="estimatedQuantity"
        rules={{required: 'Vui lòng nhập số lượng dự kiến'}}
        render={({field: {onChange, value}}) => (
          <Input
            style={{marginBottom: 20}}
            placeholder="Số lượng dự kiến"
            value={value}
            onChangeText={onChange}
            error={errors.estimatedQuantity?.message}
            isError={!!errors.estimatedQuantity}
          />
        )}
      />

      <Controller
        control={control}
        name="actualQuantity"
        rules={{required: 'Vui lòng nhập số lượng Số lượng thực tế'}}
        render={({field: {onChange, value}}) => (
          <Input
            style={{marginBottom: 20}}
            placeholder="Số lượng thực tế"
            value={value}
            onChangeText={onChange}
            error={errors.actualQuantity?.message}
            isError={!!errors.actualQuantity}
          />
        )}
      />

      <Controller
        control={control}
        name="quality"
        rules={{required: 'Vui lòng nhập chất lượng'}}
        render={({field: {onChange, value}}) => (
          <Input
            style={{marginBottom: 20}}
            placeholder="Chất lượng"
            value={value}
            onChangeText={onChange}
            error={errors.quality?.message}
            isError={!!errors.quality}
          />
        )}
      />

      <Controller
        control={control}
        name="harvestMethod"
        rules={{required: 'Vui lòng nhập phương pháp thu hoạch'}}
        render={({field: {onChange, value}}) => (
          <Input
            style={{marginBottom: 20}}
            placeholder="Phương pháp thu hoạch"
            value={value}
            onChangeText={onChange}
            error={errors.harvestMethod?.message}
            isError={!!errors.harvestMethod}
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

export default HarvestingProcessForm;
