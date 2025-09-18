import React from 'react';
import {Switch} from 'react-native';

const SwitchComponent = ({value, onValueChange, color = '#10B981'}) => (
  <Switch
    value={value}
    onValueChange={onValueChange}
    thumbColor={value ? '#fff' : '#f4f3f4'}
    trackColor={{true: color, false: '#d1d5db'}}
    ios_backgroundColor="#d1d5db"
  />
);

export default SwitchComponent;
