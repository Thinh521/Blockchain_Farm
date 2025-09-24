import React from 'react';
import {View} from 'react-native';
import StyledInput from './StyledInput';

const TransportationProcessForm = ({distribution, setDistribution}) => {
  return (
    <View>
      <StyledInput
        placeholder="Tên nhà phân phối"
        value={distribution.distributorName}
        onChangeText={text =>
          setDistribution({...distribution, distributorName: text})
        }
      />
      <StyledInput
        placeholder="Đối tác phân phối"
        value={distribution.distributorPartner}
        onChangeText={text =>
          setDistribution({...distribution, distributorPartner: text})
        }
      />
      <StyledInput
        placeholder="Ngày phân phối (YYYY-MM-DD)"
        value={distribution.distributionDate}
        onChangeText={text =>
          setDistribution({...distribution, distributionDate: text})
        }
      />
      <StyledInput
        placeholder="Phương thức vận chuyển"
        value={distribution.transportMethod}
        onChangeText={text =>
          setDistribution({...distribution, transportMethod: text})
        }
      />
      <StyledInput
        placeholder="Điều kiện bảo quản"
        value={distribution.storageConditions}
        onChangeText={text =>
          setDistribution({...distribution, storageConditions: text})
        }
        multiline={true}
      />
    </View>
  );
};

export default TransportationProcessForm;