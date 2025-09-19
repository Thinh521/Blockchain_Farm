import React, {useEffect, useRef, useCallback} from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CommonActions} from '@react-navigation/native';
import {FontSizes, FontWeights, Shadows, Colors} from '../../theme/theme';
import {scale} from '../../utils/scaling';
import {getUser} from '../../utils/storage/authStorage';

const CustomTabBar = ({state, descriptors, navigation, config = {}}) => {
  const insets = useSafeAreaInsets();
  const visible = useRef(new Animated.Value(1)).current;
  const iconScales = useRef(
    state.routes.map(() => new Animated.Value(1)),
  ).current;

  const {
    activeColor = '#10b981',
    inactiveColor = '#10b981',
    backgroundColor = '#fff',
    centerActiveColor = '#10b981',
    centerInactiveColor = '#fff',
    tabHeight = 76,
    centerButtonSize = 60,
    iconSize = 24,
    iconAnimationScale = 1.3,
    animationDuration = 250,
    hideOnKeyboard = true,
    onPress = () => {},
    onLongPress = () => {},
  } = config;

  const animateIcons = useCallback(
    newIndex => {
      const animations = iconScales.map((scale, index) =>
        Animated.timing(scale, {
          toValue: index === newIndex ? iconAnimationScale : 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      );
      Animated.parallel(animations).start();
    },
    [iconAnimationScale, iconScales, animationDuration],
  );

  const handlePressIn = useCallback(
    index => {
      Animated.timing(iconScales[index], {
        toValue: iconAnimationScale * 1.1,
        duration: animationDuration / 1.5,
        useNativeDriver: true,
      }).start();
    },
    [iconAnimationScale, iconScales, animationDuration],
  );

  const handlePressOut = useCallback(
    (index, isFocused) => {
      Animated.timing(iconScales[index], {
        toValue: isFocused ? iconAnimationScale : 1,
        duration: animationDuration,
        useNativeDriver: true,
      }).start();
    },
    [iconAnimationScale, iconScales, animationDuration],
  );

  useEffect(() => {
    animateIcons(state.index);
  }, [state.index, animateIcons]);

  useEffect(() => {
    if (!hideOnKeyboard) return;

    const showEvent =
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const hideEvent =
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

    const showListener = Keyboard.addListener(showEvent, () =>
      Animated.timing(visible, {
        toValue: 0,
        duration: animationDuration * 2,
        useNativeDriver: true,
      }).start(),
    );
    const hideListener = Keyboard.addListener(hideEvent, () =>
      Animated.timing(visible, {
        toValue: 1,
        duration: animationDuration * 2,
        useNativeDriver: true,
      }).start(),
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, [hideOnKeyboard, animationDuration]);

  const tabBarHeight = tabHeight + insets.bottom;

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: tabBarHeight,
      backgroundColor,
      borderTopWidth: 0.5,
      borderTopColor: '#CCC',
      ...Shadows.medium,
      transform: [
        {
          translateY: visible.interpolate({
            inputRange: [0, 1],
            outputRange: [tabBarHeight, 0],
          }),
        },
      ],
      zIndex: 100,
    },
    content: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    tabItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    tabLabel: {
      marginTop: 4,
      fontSize: FontSizes.xsmall,
      fontWeight: FontWeights.medium,
      color: inactiveColor,
    },
    activeLabel: {
      color: activeColor,
    },
    badgeContainer: {
      position: 'absolute',
      top: -8,
      left: '20%',
      backgroundColor: '#FF3B30',
      borderRadius: scale(999),
      minWidth: scale(18),
      height: scale(18),
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scale(6),
      zIndex: 1,
    },
    badgeText: {
      textAlign: 'center',
      color: Colors.white,
      fontSize: FontSizes.xsmall,
      fontWeight: FontWeights.semiBold,
    },
    iconContainer: {
      position: 'relative',
    },
  });

  const handleTabPress = (index, route) => {
    const user = getUser();
    const isHome = route.name === 'Home';
    const isQrScan = route.name === 'QrScan';

    if (!user && !isHome && !isQrScan) {
      navigation.navigate('NoBottomTab', {
        screen: 'LoginRequired',
      });
      return;
    }

    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (state.index !== index && !event.defaultPrevented) {
      navigation.dispatch({
        ...CommonActions.navigate({name: route.name, merge: true}),
        target: state.key,
      });
    }

    onPress(index, route);
    animateIcons(index);
  };

  return (
    <Animated.View
      style={styles.container}
      pointerEvents={visible.__getValue() ? 'auto' : 'none'}>
      <View style={styles.content} accessibilityRole="tablist">
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const {options} = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const Icon = options.tabBarCustomIcon ?? (() => null);

          const isCenter = route.name === 'QrScan';

          const handlePress = () => handleTabPress(index, route);

          const handleLongPress = () => {
            navigation.emit({type: 'tabLongPress', target: route.key});
            onLongPress(index, route);
          };

          if (isCenter) {
            return (
              <TouchableOpacity
                key={route.key}
                style={{
                  position: 'relative',
                  top: -20,
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  backgroundColor: focused
                    ? centerActiveColor
                    : centerInactiveColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={handlePress}>
                <Icon
                  size={32}
                  style={{color: focused ? Colors.white : activeColor}}
                />
              </TouchableOpacity>
            );
          }

          const buttonProps = {
            accessibilityRole: 'button',
            accessibilityLabel:
              options.tabBarAccessibilityLabel ?? `${label} tab`,
            activeOpacity: 0.8,
            onPress: handlePress,
            onLongPress: handleLongPress,
            onPressIn: () => handlePressIn(index),
            onPressOut: () => handlePressOut(index, focused),
          };

          const icon = (
            <Animated.View style={{transform: [{scale: iconScales[index]}]}}>
              <Icon
                style={{color: focused ? activeColor : inactiveColor}}
                focused={focused}
                size={iconSize}
              />
            </Animated.View>
          );

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={handlePress}>
              <View style={styles.iconContainer}>
                <Animated.View
                  style={{transform: [{scale: iconScales[index]}]}}>
                  <Icon
                    size={24}
                    style={{color: focused ? activeColor : inactiveColor}}
                  />
                </Animated.View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
};

export default CustomTabBar;
