import React from 'react';
import {View} from 'react-native';
import StyledInput from './StyledInput';
import DateInput from './DateInput';

const HarvestingProcessForm = ({harvest, setHarvest}) => {
  return (
    <View>
      <DateInput
        placeholder="Ngày thu hoạch"
        value={harvest.harvestDate}
        onChange={date => setHarvest({...harvest, harvestDate: date})}
      />

      <StyledInput
        placeholder="Số lượng dự kiến"
        value={harvest.estimatedQuantity}
        onChangeText={text =>
          setHarvest({...harvest, estimatedQuantity: text})
        }
      />

      <StyledInput
        placeholder="Số lượng thực tế"
        value={harvest.actualQuantity}
        onChangeText={text =>
          setHarvest({...harvest, actualQuantity: text})
        }
      />

      <StyledInput
        placeholder="Chất lượng"
        value={harvest.quality}
        onChangeText={text => setHarvest({...harvest, quality: text})}
      />

      <StyledInput
        placeholder="Phương pháp thu hoạch"
        value={harvest.harvestMethod}
        onChangeText={text =>
          setHarvest({...harvest, harvestMethod: text})
        }
        multiline
      />
    </View>
  );
};

export default HarvestingProcessForm;
