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
import NewsListScreen from '../screens/News/NewsListScreen';
import NewsScreen from '../screens/News/NewsScreen';
import EditNewsScreen from '../screens/News/EditNewsScreen';
import AllWishlistFarmsScreen from '../screens/AllWishlistFarms/AllWishlistFarmsScreen';

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
      title: 'Đăng ký farm',
      headerShown: false,
      animation: 'fade',
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
    name: 'AllWishlistFarms',
    component: AllWishlistFarmsScreen,
    hasLayout: false,
    options: {
      title: 'Tất cả nông trại',
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
    name: 'NewList',
    component: NewsListScreen,
    hasLayout: false,
    options: {
      title: 'Tin tức',
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
    name: 'News',
    component: NewsScreen,
    hasLayout: false,
    options: {
      title: 'Tạo tin tức',
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
    name: 'EditNews',
    component: EditNewsScreen,
    hasLayout: false,
    options: {
      title: 'Chỉnh sửa tin tức',
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
];

export default routerNoBottomTab;
