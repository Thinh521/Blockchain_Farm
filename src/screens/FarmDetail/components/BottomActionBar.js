import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../FarmDetail/FarmDetail.styles';

const BottomActionBar = ({handleCall}) => (
  <View style={styles.bottomActionBar}>
    <TouchableOpacity style={styles.callButton} onPress={handleCall}>
      <Ionicons name="call" size={20} color="#FFFFFF" />
      <Text style={styles.callButtonText}>Gọi ngay</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.visitButton}>
      <Ionicons name="calendar" size={20} color="#FFFFFF" />
      <Text style={styles.visitButtonText}>Đặt lịch</Text>
    </TouchableOpacity>
  </View>
);

export default BottomActionBar;
