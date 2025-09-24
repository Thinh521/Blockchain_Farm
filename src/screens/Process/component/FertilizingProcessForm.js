import React from 'react';
import {View} from 'react-native';
import StyledInput from './StyledInput';
import DateInput from './DateInput';

const FertilizingProcessForm = ({fertilizer, setFertilizer}) => {
  return (
    <View>
      <StyledInput
        placeholder="Tên phân bón"
        value={fertilizer.nameFertilizer}
        onChangeText={text =>
          setFertilizer({...fertilizer, nameFertilizer: text})
        }
      />

      <StyledInput
        placeholder="Số lượng phân bón"
        value={fertilizer.quantityFertilizer}
        onChangeText={text =>
          setFertilizer({...fertilizer, quantityFertilizer: text})
        }
      />

      {/* Ngày bón */}
      <DateInput
        placeholder="Ngày bón"
        value={fertilizer.fertilizerDate}
        onChange={date =>
          setFertilizer({...fertilizer, fertilizerDate: date})
        }
      />

      <StyledInput
        placeholder="Loại phân bón"
        value={fertilizer.fertilizerType}
        onChangeText={text =>
          setFertilizer({...fertilizer, fertilizerType: text})
        }
      />

      <StyledInput
        placeholder="Phương pháp bón"
        value={fertilizer.applicationMethod}
        onChangeText={text =>
          setFertilizer({...fertilizer, applicationMethod: text})
        }
        multiline
      />

      <StyledInput
        placeholder="Hiệu quả kỳ vọng"
        value={fertilizer.expectedEffect}
        onChangeText={text =>
          setFertilizer({...fertilizer, expectedEffect: text})
        }
        multiline
      />
    </View>
  );
};

export default FertilizingProcessForm;
