import {Platform} from 'react-native';
import {scale} from '../utils/scaling';

export const Colors = {
  primary: '#F83758',
  secondary: '#F55B07',
  background: '#F5F5F5',
  gray: '#A8A8A9',
  white: '#FFFFFF',
  green: '#10b981',
  headerBack: '#50CFA1',
  black: '#000000',
  red: '#FF0000',
  overlay: 'rgba(156, 102, 102, 0.4)',
  border: '#D6D6D6',
  border_2: '#b0ffce',
  border_3: '#E6EDFF',
  greenText: '#2E7D32',
  title: '#212121',
  grayText: '#333333',
  grayText_2: '#4a5568',
  grayText_3: '#9ca3af',
  grayText_4: '#666',
  blueText: '#2A7DFF',
};

export const FontSizes = {
  xsmall: scale(10),
  small: scale(12),
  medium: scale(14),
  regular: scale(16),
  semiLarge: scale(18),
  large: scale(20),
  xlarge: scale(22),
  xxlarge: scale(24),
  huge: scale(26),
};

export const FontWeights = {
  thin: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
};

export const Shadows = {
  light: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: '#4c63d2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  heavy: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  extraHeavy: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  dropdown: {
    ...Platform.select({
      android: {elevation: 5},
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
    }),
  },
};

export const lightTheme = {
  mode: 'light',
  background: '#FFFFFF',
  text: '#000000',
  primary: Colors.primary,
  secondary: '#4392F9',
  card: '#F5F5F5',
  border: '#E0E0E0',
  icon: '#333333',
  shadow: 'rgba(0, 0, 0, 0.1)',
  loadingBackground: 'rgba(255,255,255,0.9)',
};

export const darkTheme = {
  mode: 'dark',
  background: '#121212',
  text: '#FFFFFF',
  primary: Colors.primary,
  secondary: '#4392F9',
  card: '#1E1E1E',
  border: '#333333',
  icon: '#FFFFFF',
  shadow: 'rgba(255, 255, 255, 0.1)',
  loadingBackground: 'rgba(0,0,0,0.8)',
};
