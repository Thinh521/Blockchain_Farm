import React from 'react';
import {Text, View} from 'react-native';
import styles from './Home.styles';

const HomeScreen = () => {
  return (
    <View style={styles.contaiber}>
      <View style={styles.card}>
        <Text>HomeScreen</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
