import React from 'react';
import {View, Text} from 'react-native';
import styles from '../ProcessSreen.style';

const ProgressIndicator = ({currentStep}) => {
  return (
    <View style={styles.progressContainer}>
      {[1, 2, 3, 4, 5].map(step => (
        <View key={step} style={styles.progressStep}>
          <View
            style={[
              styles.progressCircle,
              step <= currentStep
                ? styles.progressCircleActive
                : styles.progressCircleInactive,
            ]}>
            <Text
              style={[
                styles.progressText,
                step <= currentStep
                  ? styles.progressTextActive
                  : styles.progressTextInactive,
              ]}>
              {step}
            </Text>
          </View>
          {step < 5 && (
            <View
              style={[
                styles.progressLine,
                step < currentStep
                  ? styles.progressLineActive
                  : styles.progressLineInactive,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );
};

export default ProgressIndicator;