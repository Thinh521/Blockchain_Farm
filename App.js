import '@walletconnect/react-native-compat';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import {AppKit} from '@reown/appkit-ethers-react-native';
import './src/Metamask/appkit';
import {WishlistProvider} from './src/context/WishlistContext';
import {useUser} from './src/hooks/useUser';

const queryClient = new QueryClient();

const AppContent = () => {
  const {data, isLoading, error} = useUser();

  if (isLoading) return null;
  if (error) {
    console.log('Lỗi load user:', error.message);
  }

  return (
    <NavigationContainer>
      <AppKit />
      <FlashMessage position="top" />
      <AppNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <WishlistProvider>
              <AppContent />
            </WishlistProvider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
