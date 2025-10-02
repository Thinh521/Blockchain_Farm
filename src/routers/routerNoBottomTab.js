import ForgotPasswordScreen from '../screens/ForgotPassword/ForgotPasswordScreen';
import LoginScreen from '../screens/Auth/Login/LoginScreen';
import LoginRequiredScreen from '../screens/Auth/LoginRequired/LoginRequiredScreen';
import OTPScreen from '../screens/Auth/OTP/OTPScreen';
import RegisterScreen from '../screens/Auth/Register/RegisterScreen';
import ResetPasswordScreen from '../screens/ResetPassword/ResetPasswordScreen';
import ChangePasswordScreen from '../screens/ChangePassword/ChangePasswordScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import RegisterManage from '../screens/RegisterManage/RegisterManage';
import SplashScreen from '../screens/Splash/SplashScreen';
import FarmDetailScreen from '../screens/FarmDetail/FarmDetailScreen';
import AllFarmsScreen from '../screens/Home/components/AllFarmsScreen';
import {Colors} from '../theme/theme';
import ManageScreen from '../screens/Manage/ManageScreen';
import MyFarmScreen from '../screens/MyFarm/MyFarmScreen';
import WishListScreen from '../screens/WishList/WishListScreen';
import AddMewsScreen from '../screens/New/AddNewsScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import AddProductScreen from '../screens/AddProduct/AddProductScreen';
import ProductScreen from '../screens/Product/ProductScreen';
import AllNewsScreen from '../screens/New/AllNewsScreen';
import ProcessScreen from '../screens/Process/ProcessSreen';
import CategoryListScreen from '../screens/CategoryList/CategoryListScreen';

const routerNoBottomTab = [
  {
    name: 'Onboarding',
    component: OnboardingScreen,
    hasLayout: false,
    options: {
      title: 'Giới thiệu',
      headerShown: false,
      animation: 'fade',
    },
  },
  {
    name: 'Login',
    component: LoginScreen,
    hasLayout: false,
    options: {
      title: 'Đăng nhập',
      headerShown: false,
      animation: 'slide_from_left',
    },
  },
  {
    name: 'Register',
    component: RegisterScreen,
    hasLayout: false,
    options: {
      title: 'Đăng ký',
      headerShown: false,
      animation: 'slide_from_right',
    },
  },
  {
    name: 'Splash',
    component: SplashScreen,
    hasLayout: false,
    options: {
      title: 'Đăng ký',
      headerShown: false,
      animation: 'fade',
    },
  },
  {
    name: 'LoginRequired',
    component: LoginRequiredScreen,
    hasLayout: false,
    options: {
      title: 'Kiểm tra đăng nhập',
      headerShown: false,
      animation: 'fade',
    },
  },
  {
    name: 'OTP',
    component: OTPScreen,
    hasLayout: false,
    options: {
      title: 'Kiểm tra đăng nhập',
      headerShown: false,
      animation: 'slide_from_left',
    },
  },
  {
    name: 'Profile',
    component: ProfileScreen,
    hasLayout: false,
    options: {
      title: 'Cập nhật hồ sơ',
      headerShown: false,
      animation: 'fade',
    },
  },
  {
    name: 'ChangePassword',
    component: ChangePasswordScreen,
    hasLayout: false,
    options: {
      title: 'Đổi mật khẩu',
      headerShown: false,
      animation: 'fade',
    },
  },
  {
    name: 'RegisterManage',
    component: RegisterManage,
    hasLayout: false,
    options: {
      title: 'Đăng ký quản lý nông trại',
      headerShown: false,
    },
  },
  {
    name: 'ForgotPassword',
    component: ForgotPasswordScreen,
    hasLayout: false,
    options: {
      title: 'Quên mật khẩu',
      headerShown: false,
      animation: 'slide_from_left',
    },
  },
  {
    name: 'ResetPassword',
    component: ResetPasswordScreen,
    hasLayout: false,
    options: {
      title: 'Thay đổi mật khẩu',
      headerShown: false,
      animation: 'slide_from_left',
    },
  },
  {
    name: 'FarmDetail',
    component: FarmDetailScreen,
    hasLayout: false,
    options: {
      title: 'Chi tiết nông trại',
      headerShown: false,
      animation: 'slide_from_bottom',
    },
  },
  {
    name: 'AllFarms',
    component: AllFarmsScreen,
    hasLayout: false,
    options: {
      title: 'Tất cả nông trại',
      headerShown: false,
    },
  },
  {
    name: 'Manage',
    component: ManageScreen,
    hasLayout: false,
    options: {
      title: 'Quản lí nông trại',
      headerShown: false,
    },
  },
  {
    name: 'MyFarm',
    component: MyFarmScreen,
    hasLayout: false,
    options: {
      title: 'Nông trại của tôi',
      headerShown: false,
    },
  },
  {
    name: 'WishList',
    component: WishListScreen,
    hasLayout: false,
    options: {
      title: 'Nông trại yêu thích',
      headerShown: false,
    },
  },
  {
    name: 'AddMewsScreen',
    component: AddMewsScreen,
    hasLayout: false,
    options: {
      title: 'Thêm tin tức',
      headerShown: false,
    },
  },
  {
    name: 'Categories',
    component: CategoriesScreen,
    hasLayout: false,
    options: {
      title: 'Danh mục nông sản',
      headerShown: false,
    },
  },
  {
    name: 'Product',
    component: ProductScreen,
    hasLayout: false,
    options: {
      title: 'Thêm sản phẩm',
      headerShown: false,
    },
  },
  {
    name: 'AllNews',
    component: AllNewsScreen,
    hasLayout: false,
    options: {
      title: 'Tất cả tin tức',
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.green,
      },
      headerTintColor: Colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 18,
      },
    },
  },
  {
    name: 'AddProduct',
    component: AddProductScreen,
    hasLayout: false,
    options: {
      title: 'Thêm sản phẩm',
      headerShown: false,
    },
  },
  {
    name: 'Process',
    component: ProcessScreen,
    hasLayout: false,
    options: {
      title: 'Thêm quy trình',
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.green,
      },
      headerTintColor: Colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 18,
      },
    },
  },
  {
    name: 'CategoryList',
    component: CategoryListScreen,
    hasLayout: false,
    options: {
      headerShown: false,
    },
  },
];

export default routerNoBottomTab;
