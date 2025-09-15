import {useAppKitAccount} from '@reown/appkit-ethers-react-native';
import {
  FarmTabIcon,
  Heart_Line_Icon,
  HomeTabIcon,
  ProductTabIcon,
  QrTabIcon,
  SettingTabIcon,
} from '../assets/icons';
import FarmRegistrationScreen from '../screens/FarmRegistration/FarmRegistrationScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import ProductScreen from '../screens/Product/ProductScreen';
import QrScanScreen from '../screens/QrScan/QrScanScreen';
import SettingScreen from '../screens/Setting/SettingScreen';
import WishListScreen from '../screens/WishList/WishListScreen';

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
      name: 'Product',
      component: ProductScreen,
      label: 'Sản phẩm',
      Icon: ProductTabIcon,
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
