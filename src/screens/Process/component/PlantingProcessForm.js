import React from 'react';
import {Image, Text, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import DateInput from './DateInput';
import Input from '../../../components/CustomInput/CustomInput';
import Button from '../../../components/CustomButton/CustomButton';
import {launchImageLibrary} from 'react-native-image-picker';

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
      detail: '',
      image: null,
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

      {/* Mô tả quy trình */}
      <Controller
        control={control}
        name="detail"
        rules={{required: 'Vui lòng nhập chi tiết quy trình'}}
        render={({field: {onChange, value}}) => (
          <Input
            style={{marginBottom: 20}}
            placeholder="Mô tả quy trình"
            value={value}
            onChangeText={onChange}
            multiline
            error={errors.description?.message}
            isError={!!errors.description}
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

export default PlantingProcessForm;
