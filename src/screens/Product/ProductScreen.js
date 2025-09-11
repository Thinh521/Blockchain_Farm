import React from 'react';
import {Button, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import styles from './Product.styles';

const ProductScreen = () => {
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
        title="FarmDetail"
        onPress={() => {
          navigation.navigate('NoBottomTab', {screen: 'FarmDetail'});
        }}
      />
      <Button
        title="Farm"
        onPress={() => {
          navigation.navigate('NoBottomTab', {screen: 'RegisterManage'});
        }}
      />
      <View style={styles.card}>
        <Text>ProductScreen</Text>
      </View>
    </View>
  );
};

export default ProductScreen;
