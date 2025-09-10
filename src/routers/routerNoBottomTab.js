import LoginScreen from '../screens/Auth/Login/LoginScreen';
import LoginRequiredScreen from '../screens/Auth/LoginRequired/LoginRequiredScreen';
import OTPScreen from '../screens/Auth/OTP/OTPScreen';
import RegisterScreen from '../screens/Auth/Register/RegisterScreen';
import ChangePasswordScreen from '../screens/ChangePassword/ChangePasswordScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import RegisterManage from '../screens/RegisterManage/RegisterManage';
import SplashScreen from '../screens/Splash/SplashScreen';

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
      animation: 'fade',
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
];

export default routerNoBottomTab;
