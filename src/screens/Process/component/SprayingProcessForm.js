import React from 'react';
import {View} from 'react-native';
import StyledInput from './StyledInput';
import DateInput from './DateInput';

const SprayingProcessForm = ({medicine, setMedicine}) => {
  return (
    <View>
      <StyledInput
        placeholder="Tên thuốc"
        value={medicine.nameMedicine}
        onChangeText={text =>
          setMedicine({...medicine, nameMedicine: text})
        }
      />

      <StyledInput
        placeholder="Số lượng thuốc"
        value={medicine.quantityMedicine}
        onChangeText={text =>
          setMedicine({...medicine, quantityMedicine: text})
        }
      />

      <DateInput
        placeholder="Ngày sử dụng"
        value={medicine.medicineDate}
        onChange={date =>
          setMedicine({...medicine, medicineDate: date})
        }
      />

      <StyledInput
        placeholder="Loại thuốc"
        value={medicine.medicineType}
        onChangeText={text =>
          setMedicine({...medicine, medicineType: text})
        }
      />

      <StyledInput
        placeholder="Phương pháp sử dụng"
        value={medicine.applicationMethod}
        onChangeText={text =>
          setMedicine({...medicine, applicationMethod: text})
        }
        multiline
      />
    </View>
  );
};

export default SprayingProcessForm;
