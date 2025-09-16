import React from 'react';
import {Button, Text, View} from 'react-native';
import styles from './Product.styles';
import {useNavigation} from '@react-navigation/core';

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
      <Button
        title="NewList"
        onPress={() => {
          navigation.navigate('NoBottomTab', {screen: 'NewList'});
        }}
      />
      <Button
        title="AllWishlistFarms"
        onPress={() => {
          navigation.navigate('NoBottomTab', {screen: 'AllWishlistFarms'});
        }}
      />
      <View style={styles.card}>
        <Text>ProductScreen</Text>
      </View>
    </View>
  );
};

export default ProductScreen;
