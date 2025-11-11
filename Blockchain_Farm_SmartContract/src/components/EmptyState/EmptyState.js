import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../CustomButton/CustomButton';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

const EmptyState = ({
  message = 'Không có dữ liệu',
  fullScreen = false,
  style,
  children,
  showRetry = false,
  onRetry,
}) => {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen, style]}>
      <Text style={styles.message}>{message}</Text>
      {children}

      {showRetry && (
        <Button.Main
          title="Thử lại"
          style={styles.retryButton}
          onPress={onRetry}
        />
      )}
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
  retryButton: {
    borderRadius: 999,
    marginTop: scale(14),
    paddingHorizontal: scale(40),
  },
});
