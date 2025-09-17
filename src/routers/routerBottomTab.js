import {useAppKitAccount} from '@reown/appkit-ethers-react-native';
import {
  FarmTabIcon,
  Heart_Line_Icon,
  HomeTabIcon,
  NewTabIcon,         
  QrTabIcon,
  SettingTabIcon,
} from '../assets/icons';
import FarmRegistrationScreen from '../screens/FarmRegistration/FarmRegistrationScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import QrScanScreen from '../screens/QrScan/QrScanScreen';
import SettingScreen from '../screens/Setting/SettingScreen';
import WishListScreen from '../screens/WishList/WishListScreen';
import NewScreen from '../screens/New/NewScreen';

export const getRouterBottomTab = t => {
  const {isConnected} = useAppKitAccount();

  return [
    {
      name: 'Home',
      component: HomeScreen,
      label: 'Trang chủ',
      Icon: HomeTabIcon,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'New',
      component: NewScreen,
      label: 'Tin tức',
      Icon: NewTabIcon,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'QrScan',
      component: QrScanScreen,
      label: 'Quét QR',
      Icon: QrTabIcon,
      options: {headerShown: false},
    },
    isConnected
      ? {
          name: 'FarmRegistration',
          component: FarmRegistrationScreen,
          label: 'Quản lí nông trại',
          Icon: FarmTabIcon,
          options: {headerShown: false},
        }
      : {
          name: 'WishList',
          component: WishListScreen,
          label: 'Yêu thích',
          Icon: Heart_Line_Icon,
          options: {headerShown: false},
        },
    {
      name: 'Setting',
      component: SettingScreen,
      label: 'Cài đặt',
      Icon: SettingTabIcon,
      options: {
        headerShown: false,
      },
    },
  ];
};
