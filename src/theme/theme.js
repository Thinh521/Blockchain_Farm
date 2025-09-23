import {scale} from '../utils/scaling';

export const Colors = {
  primary: '#059669',
  secondary: '#10b981',
  background: '#F9FAFB',
  gray: '#6B7280',
  white: '#FFFFFF',
  black: '#000000',
  red: '#FF0000',
  border: '#D6D6D6',
  border_2: '#E5E7EB',
  title: '#212121',
  green: '#059669',
  inputText: 'A8A8A9',
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
  black: '900',
};

export const Shadows = {
  // Nhẹ, dùng cho button, icon nhỏ
  light: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  // Trung bình, dùng cho card
  medium: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 4,
  },

  // Nổi bật, dùng cho modal, bottom sheet
  dark: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
    elevation: 8,
  },

  // Siêu nổi, dùng cho floating button
  strong: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.3,
    shadowRadius: 6.27,
    elevation: 12,
  },

  // Mịn, nhẹ và lan toả
  soft: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
};
