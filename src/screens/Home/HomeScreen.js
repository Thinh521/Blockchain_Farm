import React from 'react';
import {Button, Text, View} from 'react-native';
import styles from './Home.styles';
import {useNavigation} from '@react-navigation/core';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.contaiber}>
      <Button
        title="LoginRequired"
        onPress={() => {
          navigation.navigate('NoBottomTab', {screen: 'LoginRequired'});
        }}
      />
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate('NoBottomTab', {screen: 'Login'});
        }}
      />
      <Button
        title="OTP"
        onPress={() => {
          navigation.navigate('NoBottomTab', {screen: 'OTP'});
        }}
      />
      <Button
        title="Farm"
        onPress={() => {
          navigation.navigate('NoBottomTab', {screen: 'RegisterManage'});
        }}
      />
       <Button
        title="Admin"
        onPress={() => {
          navigation.navigate('NoBottomTab', {screen: 'Admin'});
        }}
      />
      <View style={styles.card}>
        <Text>HomeScreen</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
