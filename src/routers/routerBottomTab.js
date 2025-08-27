import {HomeTabIcon, ProductTabIcon, SettingTabIcon} from '../assets/icons';
import {Colors, FontSizes, FontWeights} from '../theme/theme';
import HomeScreen from '../screens/Home/HomeScreen';
import ProductScreen from '../screens/Product/ProductScreen';
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
    name: 'Setting',
    component: SettingScreen,
    label: 'Cài đặt',
    Icon: SettingTabIcon,
    options: {
      headerShown: false,
    },
  },
];
