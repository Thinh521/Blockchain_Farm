import React from 'react';
import {TouchableOpacity, Text, View, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from './CustomButton.styles';

// Hàm xử lý sự kiện nhấn chung
const createHandlePress = (onPress, disabled, loading) => () => {
  if (disabled || loading) return;
  onPress?.();
};

// Main Button Component
const ButtonMain = ({
  title,
  onPress,
  iconLeft,
  iconRight,
  disabled = false,
  loading = false,
  style,
  textStyle,
  testID,
  accessibilityLabel,
  hapticFeedback = false,
  ...props
}) => {
  const handlePress = createHandlePress(onPress, disabled, loading);

  const buttonStyles = [
    styles.baseButton,
    disabled && styles.disabledButton,
    style,
  ];

  const textStyles = [
    styles.baseText,
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={handlePress}
      disabled={disabled || loading}
      testID={testID}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
      accessibilityState={{disabled: disabled || loading}}
      activeOpacity={0.7}
      {...props}>
      <View style={styles.buttonContent}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={styles.baseText.color}
            style={styles.loadingIndicator}
          />
        ) : (
          <>
            {iconLeft && (
              <View style={[styles.iconWrapper, styles.iconLeft]}>
                {iconLeft}
              </View>
            )}
            {title && (
              <Text style={textStyles} numberOfLines={1}>
                {title}
              </Text>
            )}
            {iconRight && (
              <View style={[styles.iconWrapper, styles.iconRight]}>
                {iconRight}
              </View>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Text Button Component
const ButtonText = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
  testID,
  accessibilityLabel,
  ...props
}) => {
  const handlePress = createHandlePress(onPress, disabled, loading);

  const buttonStyles = [
    styles.textButtonContainer,
    disabled && styles.disabledTextButton,
    style,
  ];

  const textStyles = [
    styles.textButtonText,
    disabled && styles.disabledTextButtonText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={handlePress}
      disabled={disabled || loading}
      testID={testID}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
      accessibilityState={{disabled: disabled || loading}}
      activeOpacity={0.7}
      {...props}>
      {loading ? (
        <ActivityIndicator size="small" color={styles.textButtonText.color} />
      ) : (
        <Text style={textStyles} numberOfLines={1}>
          {title}
        </Text>
      )}
</TouchableOpacity>
  );
};

// Icon Button Component
const ButtonIcon = ({
  onPress,
  icon,
  disabled = false,
  loading = false,
  style,
  testID,
  accessibilityLabel,
  backgroundColor = styles.iconButton.backgroundColor,
  ...props
}) => {
  const handlePress = createHandlePress(onPress, disabled, loading);

  const buttonStyles = [
    styles.iconButton,
    {
      backgroundColor: disabled
        ? styles.disabledButton.backgroundColor
        : backgroundColor,
    },
    style,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={handlePress}
      disabled={disabled || loading}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{disabled: disabled || loading}}
      activeOpacity={0.7}
      {...props}>
      <View style={styles.iconContainer}>
        {loading ? (
          <ActivityIndicator size="small" color={styles.textButtonText.color} />
        ) : (
          icon
        )}
      </View>
    </TouchableOpacity>
  );
};

// Image Button Component
const ButtonImg = ({
  onPress,
  img,
  disabled = false,
  loading = false,
  style,
  imageStyle,
  testID,
  accessibilityLabel,
  placeholder,
  resizeMode = 'contain',
  backgroundColor = styles.imgButton.backgroundColor,
  ...props
}) => {
  const handlePress = createHandlePress(onPress, disabled, loading);

  const buttonStyles = [
    styles.imgButton,
    {
      backgroundColor: disabled
        ? styles.disabledButton.backgroundColor
        : backgroundColor,
    },
    style,
  ];

  const imageStyles = [imageStyle];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={handlePress}
      disabled={disabled || loading}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{disabled: disabled || loading}}
      activeOpacity={0.7}
      {...props}>
      {loading ? (
        <ActivityIndicator size="small" color={styles.textButtonText.color} />
      ) : img ? (
        <FastImage
          source={typeof img === 'string' ? {uri: img} : img}
          style={imageStyles}
          resizeMode={
            FastImage.resizeMode[resizeMode] || FastImage.resizeMode.contain
          }
        />
      ) : (
        placeholder && <View style={imageStyles}>{placeholder}</View>
      )}
    </TouchableOpacity>
  );
};

// Enhanced Button object
const Button = {
  Main: ButtonMain,
  Text: ButtonText,
  Icon: ButtonIcon,
  Image: ButtonImg,
};

export default Button;

export {ButtonMain, ButtonText, ButtonIcon, ButtonImg};