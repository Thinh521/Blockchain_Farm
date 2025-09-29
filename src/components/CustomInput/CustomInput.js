import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react';
import {TextInput, TouchableOpacity, View, Text} from 'react-native';
import styles from './CustomInput.styles';
import {EyeIcon, EyeOffIcon} from '../../assets/icons/index';

const Input = forwardRef(
  (
    {
      placeholder,
      keyboardType = 'default',
      placeholderTextColor = '#A8A8A9',
      style = {},
      containerStyle = {},
      inputStyle = {},
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      disabled = false,
      readonly = false,
      value,
      onChangeText,
      onFocus,
      onBlur,
      onSubmitEditing,
      isPassword = false,
      label,
      required = false,
      multiline = false,
      numberOfLines = 1,
      showCharacterCount = false,
      autoFocus = false,
      returnKeyType = 'done',
      testID,
      accessibilityLabel,
      clearButtonMode = 'never',
      onClear,
      showClearButton = false,
      error,
      isError = false,
      ...rest
    },
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear: () => inputRef.current?.clear(),
      isFocused: () => inputRef.current?.isFocused(),
    }));

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(prev => !prev);
    };

    const handleFocus = e => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = e => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleClear = () => {
      onChangeText?.('');
      onClear?.();
    };

    const showRightContent =
      isPassword || RightIcon || (showClearButton && value);

    const getContainerStyles = () => {
      const base = [
        styles.inputContainer,
        containerStyle,
      ];
      if (isFocused) base.push(styles.focusedContainer);
      if (disabled || readonly) base.push(styles.disabledContainer);
      if (isError) base.push(styles.errorContainer);
      return base;
    };

    const getInputStyles = () => [
      styles.input,
      styles.defaultInput,
      multiline && styles.multilineInput,
      inputStyle,
    ];

    return (
      <View style={[styles.inputGroup, style]} testID={testID}>
        {label && (
          <View style={styles.labelContainer}>
            <Text style={styles.label}>
              {label}
              {required && <Text style={styles.requiredMark}> *</Text>}
            </Text>
          </View>
        )}

        <View style={getContainerStyles()}>
          {LeftIcon && (
            <View style={styles.leftIconContainer}>
              {typeof LeftIcon === 'function' ? (
                <LeftIcon
                  style={[
                    styles.leftIcon,
                    isFocused && styles.focusedIcon,
                  ]}
                />
              ) : (
                React.cloneElement(LeftIcon, {
                  style: [
                    styles.leftIcon,
                    isFocused && styles.focusedIcon,
                    LeftIcon.props?.style,
                  ],
                })
              )}
            </View>
          )}

          <TextInput
            ref={inputRef}
            style={getInputStyles()}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            autoCapitalize="none"
            keyboardType={keyboardType}
            editable={!disabled && !readonly}
            secureTextEntry={isPassword && !isPasswordVisible}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSubmitEditing={onSubmitEditing}
            multiline={multiline}
            numberOfLines={numberOfLines}
            autoFocus={autoFocus}
            returnKeyType={returnKeyType}
            accessibilityLabel={accessibilityLabel || label}
            clearButtonMode={clearButtonMode}
            {...rest}
          />

          {showRightContent && (
            <View style={styles.rightContent}>
              {showClearButton && value && !isPassword && (
                <TouchableOpacity
                  onPress={handleClear}
                  style={styles.clearButton}
                  hitSlop={10}>
                  <Text style={styles.clearButtonText}>×</Text>
                </TouchableOpacity>
              )}

              {isPassword && !disabled && !readonly && (
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  style={styles.eyeButton}
                  hitSlop={10}
                  accessibilityLabel={
                    isPasswordVisible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'
                  }>
                  {isPasswordVisible ? (
                    <EyeIcon style={[styles.eyeIcon]} />
                  ) : (
                    <EyeOffIcon style={[styles.eyeIcon]} />
                  )}
                </TouchableOpacity>
              )}

              {RightIcon && !isPassword && (
                <View style={styles.rightIconContainer}>
                  <RightIcon
                    style={[
                      styles.rightIcon,
                      styles.defaultIcon,
                      isFocused && styles.focusedIcon,
                    ]}
                  />
                </View>
              )}
            </View>
          )}
        </View>

        {/* ✅ hiện error dưới input */}
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
      </View>
    );
  },
);

Input.displayName = 'Input';
export default Input;
