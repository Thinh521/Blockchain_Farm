import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Button from '../CustomButton/CustomButton';

import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

const ErrorState = ({
  message = 'Đã có lỗi xảy ra',
  onRetry,
  fullScreen = false,
  style,
}) => {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen, style]}>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <Button.Main title="Thử lại" onPress={onRetry} style={styles.button} />
      )}
    </View>
  );
};

export default ErrorState;

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
    color: Colors.title,
    textAlign: 'center',
    marginBottom: scale(20),
    fontSize: FontSizes.semiLarge,
    fontWeight: FontWeights.semiBold,
  },
  button: {
    width: scale(160),
    borderRadius: 999,
  },
});
