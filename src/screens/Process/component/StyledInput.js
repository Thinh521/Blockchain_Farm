import React, {memo, useState} from 'react';
import {TextInput, TouchableOpacity, Platform, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../ProcessSreen.style';

const StyledInput = memo(
  ({
    placeholder,
    value,
    onChangeText,
    multiline = false,
    editable = true,
    type = 'text', // mặc định text, có thể truyền 'date'
  }) => {
    const [showPicker, setShowPicker] = useState(false);

    const handlePress = () => {
      if (type === 'date') {
        setShowPicker(true);
      }
    };

    const onChangeDate = (event, selectedDate) => {
      setShowPicker(false);
      if (selectedDate) {
        const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
        onChangeText && onChangeText(formattedDate);
      }
    };

    return (
      <View>
        <TouchableOpacity
          activeOpacity={type === 'date' ? 0.8 : 1}
          onPress={handlePress}>
          <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={type === 'date' ? undefined : onChangeText}
            multiline={multiline}
            editable={type === 'date' ? false : editable}
            style={[styles.input, multiline && styles.multilineInput]}
            placeholderTextColor="#999"
          />
        </TouchableOpacity>

        {showPicker && type === 'date' && (
          <DateTimePicker
            value={value ? new Date(value) : new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChangeDate}
          />
        )}
      </View>
    );
  },
);

export default StyledInput;
