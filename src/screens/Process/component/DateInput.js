import React, {useState} from 'react';
import {TouchableOpacity, Platform, StyleSheet, View, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {format, parse} from 'date-fns';
import Input from '../../../components/CustomInput/CustomInput';

const DateInput = ({value, onChange, placeholder, style, error, isError}) => {
  const [showPicker, setShowPicker] = useState(false);

  // Convert value string (dd/MM/yyyy) to Date object
  const getDateValue = () => {
    if (!value) return new Date();
    
    try {
      // Nếu value là dd/MM/yyyy, parse nó
      if (typeof value === 'string' && value.includes('/')) {
        return parse(value, 'dd/MM/yyyy', new Date());
      }
      // Nếu là Date object hoặc ISO string
      return new Date(value);
    } catch (error) {
      console.error('Date parsing error:', error);
      return new Date();
    }
  };

  const handleChange = (event, selectedDate) => {
    setShowPicker(false);
    if (event.type === 'set' && selectedDate) {
      // Format thành dd/MM/yyyy
      const formatted = format(selectedDate, 'dd/MM/yyyy');
      onChange(formatted);
    }
  };

  return (
    <View style={style}>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => setShowPicker(true)}
        activeOpacity={0.8}>
        <Input
          placeholder={placeholder}
          value={value || ''}
          editable={false}
          pointerEvents="none"
          error={error}
          isError={isError}
        />

        <Ionicons
          name="calendar-outline"
          size={20}
          color="#bebbbbff"
          style={styles.icon}
        />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={getDateValue()}
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