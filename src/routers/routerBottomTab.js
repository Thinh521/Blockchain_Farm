import {
  HomeTabIcon,
  NotificationTabIcon,
  ProductTabIcon,
  QrTabIcon,
  SettingTabIcon,
} from '../assets/icons';
import HomeScreen from '../screens/Home/HomeScreen';
import NotificationScreen from '../screens/Notification/NotificationScreen';
import ProductScreen from '../screens/Product/ProductScreen';
import QrScanScreen from '../screens/QrScan/QrScanScreen';
import SettingScreen from '../screens/Setting/SettingScreen';

export const getRouterBottomTab = t => [
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
  {
    name: 'Notification',
    component: NotificationScreen,
    label: 'Thông báo',
    Icon: NotificationTabIcon,
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
