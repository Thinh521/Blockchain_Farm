import LoginScreen from '../screens/Auth/Login/LoginScreen';
import LoginRequiredScreen from '../screens/Auth/LoginRequired/LoginRequiredScreen';
import RegisterScreen from '../screens/Auth/Register/RegisterScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
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
    name: 'Profile',
    component: ProfileScreen,
    hasLayout: false,
    options: {
      title: 'Cập nhật hồ sơ',
      headerShown: false,
      animation: 'fade',
    },
  },
];

export default routerNoBottomTab;
