import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routerNoBottomTab from '../routers/routerNoBottomTab';

const Stack = createNativeStackNavigator();

export default function NoBottomTab() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      })}>
      {routerNoBottomTab.map(
        ({name, component, options, hasLayout = false}) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
            options={options}
          />
        ),
      )}
    </Stack.Navigator>
  );
}
