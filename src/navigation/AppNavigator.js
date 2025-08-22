import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import NoBottomTab from './NoBottomTab';
import SplashScreen from '../screens/Splash/SplashScreen';
import {
  getOnboarding,
} from '../utils/storage/onboardingStorage';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';

const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const done = getOnboarding('onboarding');
      setIsOnboarded(done || false);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isOnboarded]);

  useEffect(() => {
    const checkOnboarding = setInterval(() => {
      const done = getOnboarding('onboarding');
      if (done && !isOnboarded) {
        setIsOnboarded(true);
      }
    }, 500);

    return () => clearInterval(checkOnboarding);
  }, [isOnboarded]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {!isOnboarded ? (
        <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : (
        <RootStack.Screen name="BottomTab" component={BottomTab} />
      )}
      <RootStack.Screen name="NoBottomTab" component={NoBottomTab} />
    </RootStack.Navigator>
  );
};

export default AppNavigator;
