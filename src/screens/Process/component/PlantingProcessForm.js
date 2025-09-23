import React from 'react';
import {View} from 'react-native';
import StyledInput from './StyledInput';
import DateInput from './DateInput';

const PlantingProcessForm = ({farmingProcess, setFarmingProcess}) => {
  return (
    <View>
      <StyledInput
        placeholder="Tên quy trình"
        value={farmingProcess.nameProcess}
        onChangeText={text =>
          setFarmingProcess({...farmingProcess, nameProcess: text})
        }
      />

      <StyledInput
        placeholder="Nguồn gốc"
        value={farmingProcess.source}
        onChangeText={text =>
          setFarmingProcess({...farmingProcess, source: text})
        }
      />

      {/* Ngày trồng */}
      <DateInput
        placeholder="Ngày trồng"
        value={farmingProcess.plantingDate}
        onChange={date =>
          setFarmingProcess({...farmingProcess, plantingDate: date})
        }
      />

      {/* Ngày gieo */}
      <DateInput
        placeholder="Ngày gieo"
        value={farmingProcess.sowingDate}
        onChange={date =>
          setFarmingProcess({...farmingProcess, sowingDate: date})
        }
      />
    </View>
  );
};

export default PlantingProcessForm;
