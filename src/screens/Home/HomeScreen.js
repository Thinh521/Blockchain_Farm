import React from 'react';
import {Button, Text, View} from 'react-native';
import styles from './Home.styles';
import {useNavigation} from '@react-navigation/core';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.contaiber}>
      <Button
        title="onboarding"
        onPress={() => {
          navigation.navigate('NoBottomTab', {screen: 'Onboarding'});
        }}
      />
      <Button
        title="splash"
        onPress={() => {
          navigation.navigate('NoBottomTab', {screen: 'Splash'});
        }}
      />
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate('NoBottomTab', {screen: 'Login'});
        }}
      />
      <View style={styles.card}>
        <Text>HomeScreen</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
