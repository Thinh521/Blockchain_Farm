import React from 'react';
import {View, Text, Image} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import DateInput from './DateInput';
import Input from '../../../components/CustomInput/CustomInput';
import Button from '../../../components/CustomButton/CustomButton';
import { launchImageLibrary } from 'react-native-image-picker';

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
      image: null,
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


{/* Ảnh minh họa */}
<Controller
  control={control}
  name="image"
  render={({field: {onChange, value}}) => (
    <View style={{marginBottom: 20}}>
      <Button.Main
        title={value ? 'Đổi ảnh' : 'Chọn ảnh'}
        onPress={async () => {
          const result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
          });

          if (!result.didCancel && result.assets?.[0]?.uri) {
            onChange(result.assets[0].uri);
          }
        }}
      />
      {value && (
        <Image
          source={{uri: value}}
          style={{
            width: '100%',
            height: 180,
            marginTop: 10,
            borderRadius: 10,
          }}
        />
      )}
    </View>
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

export default FertilizingProcessForm;
