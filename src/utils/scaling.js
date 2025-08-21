import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

export const isTablet = width >= 600 || Platform.isPad;

const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

// Định nghĩa kích thước cơ sở cho các thiết bị
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 852;

export const scale = size =>
  (isTablet
    ? longDimension / guidelineBaseHeight
    : shortDimension / guidelineBaseWidth) * size;
