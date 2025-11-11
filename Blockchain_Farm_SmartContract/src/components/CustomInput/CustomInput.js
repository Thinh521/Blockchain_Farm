import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react';
import {TextInput, TouchableOpacity, View, Text, Platform} from 'react-native';
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
      type = 'text',
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
    const [showPicker, setShowPicker] = useState(false);
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

    const handlePress = () => {
      if (type === 'date') {
        setShowPicker(true);
      }
    };

    const onChangeDate = (event, selectedDate) => {
      setShowPicker(false);
      if (selectedDate) {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        onChangeText?.(formattedDate);
      }
    };

    const showRightContent =
      isPassword || RightIcon || (showClearButton && value);

    const getContainerStyles = () => {
      const base = [styles.inputContainer, containerStyle];
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

        <TouchableOpacity
          activeOpacity={type === 'date' ? 0.8 : 1}
          onPress={type === 'date' ? () => setShowPicker(true) : undefined}>
          <View style={getContainerStyles()}>
            {LeftIcon && (
              <View style={styles.leftIconContainer}>
                {typeof LeftIcon === 'function' ? (
                  <LeftIcon
                    style={[styles.leftIcon, isFocused && styles.focusedIcon]}
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
              editable={type === 'date' ? false : !disabled && !readonly}
              secureTextEntry={isPassword && !isPasswordVisible}
              value={value}
              onChangeText={type === 'date' ? undefined : onChangeText}
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
        </TouchableOpacity>

        {/* ✅ hiện error dưới input */}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {showPicker && type === 'date' && (
          <DateTimePicker
            value={value ? new Date(value) : new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) {
                const formatted = selectedDate.toISOString().split('T')[0];
                onChangeText?.(formatted);
              }
            }}
          />
        )}
      </View>
    );
  },
);

Input.displayName = 'Input';
export default Input;
