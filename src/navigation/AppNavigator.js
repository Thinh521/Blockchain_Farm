import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import NoBottomTab from './NoBottomTab';

const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="BottomTab" component={BottomTab} />
      <RootStack.Screen name="NoBottomTab" component={NoBottomTab} />
    </RootStack.Navigator>
  );
};

export default AppNavigator;
