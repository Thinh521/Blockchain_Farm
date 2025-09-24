import React, {useState} from 'react';
import {TouchableOpacity, Platform, StyleSheet, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {format} from 'date-fns';
import StyledInput from './StyledInput';

const DateInput = ({value, onChange, placeholder}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      // Lưu raw theo format dd/MM/yyyy
      const raw = format(selectedDate, 'dd/MM/yyyy');
      onChange(raw);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => setShowPicker(true)}
        activeOpacity={0.8}>
        <StyledInput
          placeholder={placeholder}
          value={value || ''} 
          editable={false}
          pointerEvents="none"
        />

        <Ionicons
          name="calendar-outline"
          size={22}
          color="#555"
          style={styles.icon}
        />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{translateY: -11}],
  },
});

export default DateInput;
