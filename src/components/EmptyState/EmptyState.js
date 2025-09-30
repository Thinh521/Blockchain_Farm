import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';

const EmptyState = ({
  message = 'Không có dữ liệu',
  fullScreen = false,
  style,
  children,
}) => {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen, style]}>
      <Text style={styles.message}>{message}</Text>
      {children}
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    color: Colors.gray,
    textAlign: 'center',
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.bold,
  },
});
