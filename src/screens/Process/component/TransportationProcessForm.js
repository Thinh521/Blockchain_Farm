import React from 'react';
import {Text, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Input from '../../../components/CustomInput/CustomInput';
import Button from '../../../components/CustomButton/CustomButton';

const TransportationProcessForm = ({onSubmit}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      distributorName: '',
      distributorPartner: '',
      distributionDate: '',
      transportMethod: '',
      storageConditions: '',
    },
  });

  return (
    <View>
      {/* Tên nhà phân phối */}
      <Controller
        control={control}
        name="distributorName"
        rules={{required: 'Tên nhà phân phối là bắt buộc'}}
        render={({field: {onChange, value}}) => (
          <Input
            style={{marginBottom: 20}}
            placeholder="Tên nhà phân phối"
            value={value}
            onChangeText={onChange}
            error={errors.distributorName?.message}
            isError={!!errors.distributorName}
          />
        )}
      />

      {/* Đối tác phân phối */}
      <Controller
        control={control}
        name="distributorPartner"
        rules={{required: 'Đối tác phân phối là bắt buộc'}}
        render={({field: {onChange, value}}) => (
          <Input
            style={{marginBottom: 20}}
            placeholder="Đối tác phân phối"
            value={value}
            onChangeText={onChange}
            error={errors.distributorPartner?.message}
            isError={!!errors.distributorPartner}
          />
        )}
      />

      {/* Ngày phân phối */}
      <Controller
        control={control}
        name="distributionDate"
        rules={{
          required: 'Ngày phân phối là bắt buộc',
          pattern: {
            value: /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
            message: 'Ngày phải theo định dạng YYYY-MM-DD',
          },
        }}
        render={({field: {onChange, value}}) => (
          <Input
            style={{marginBottom: 20}}
            placeholder="Ngày phân phối (YYYY-MM-DD)"
            value={value}
            onChangeText={onChange}
            error={errors.distributionDate?.message}
            isError={!!errors.distributionDate}
          />
        )}
      />

      {/* Phương thức vận chuyển */}
      <Controller
        control={control}
        name="transportMethod"
        rules={{required: 'Phương thức vận chuyển là bắt buộc'}}
        render={({field: {onChange, value}}) => (
          <Input
            style={{marginBottom: 20}}
            placeholder="Phương thức vận chuyển"
            value={value}
            onChangeText={onChange}
            error={errors.transportMethod?.message}
            isError={!!errors.transportMethod}
          />
        )}
      />

      {/* Điều kiện bảo quản */}
      <Controller
        control={control}
        name="storageConditions"
        rules={{required: 'Điều kiện bảo quản là bắt buộc'}}
        render={({field: {onChange, value}}) => (
          <Input
            style={{marginBottom: 20}}
            placeholder="Điều kiện bảo quản"
            value={value}
            onChangeText={onChange}
            error={errors.storageConditions?.message}
            isError={!!errors.storageConditions}
            multiline
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

export default TransportationProcessForm;
