import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import {
  useAppKitAccount,
  useDisconnect,
} from '@reown/appkit-ethers-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/core';
import {showMessage} from 'react-native-flash-message';

import Header from '../../components/Header/Header';
import Button from '../../components/CustomButton/CustomButton';
import {Arrow_Right_S_Icon} from '../../assets/icons';

import {scale} from '../../utils/scaling';
import styles from './FarmRegistration.styles';

const menuItems = [
  {
    id: 1,
    label: 'Đăng ký nông trại',
    icon: 'edit-3',
    colors: ['#f472b6', '#db2777'],
    description: 'Tạo và quản lý nông trại',
    screen: 'RegisterManage',
  },
  {
    id: 2,
    label: 'Nông trại của tôi',
    icon: 'sun',
    colors: ['#4ade80', '#16a34a'],
    description: 'Quản lý đất đai và cây trồng',
    screen: 'MyFarm',
  },
  {
    id: 3,
    label: 'Quy trình nông nghiệp',
    icon: 'feather',
    colors: ['#34d399', '#059669'],
    description: 'Theo dõi chu trình sản xuất',
  },
  {
    id: 4,
    label: 'Biểu đồ',
    icon: 'bar-chart-2',
    colors: ['#60a5fa', '#2563eb'],
    description: 'Thống kê và phân tích',
  },
  {
    id: 5,
    label: 'Thông tin phân bón',
    icon: 'package',
    colors: ['#fbbf24', '#f59e0b'],
    description: 'Quản lý dinh dưỡng cây trồng',
  },
];

const FarmRegistrationScreen = () => {
  const {isConnected} = useAppKitAccount();
  const {disconnect} = useDisconnect();
  const navigation = useNavigation();
  const [menuAnimations, setMenuAnimations] = useState([]);
  const logoScaleAnim = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(logoScaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 3,
      useNativeDriver: true,
    }).start();

    Animated.spring(buttonScaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 5,
      delay: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (isConnected) {
      const animations = menuItems.map(() => new Animated.Value(0));
      setMenuAnimations(animations);

      const animationPromises = animations.map((anim, index) =>
        Animated.spring(anim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          delay: index * 150,
          useNativeDriver: true,
        }),
      );

      Animated.stagger(100, animationPromises).start();
    }
  }, [isConnected]);

  const handleMenuPress = item => {
    if (item.screen) {
      navigation.navigate('NoBottomTab', {
        screen: item.screen,
      });
    } else {
      showMessage({
        message: `Chức năng "${item.label}" hiện đang được phát triển. Vui lòng quay lại sau.`,
        type: 'success',
      });
    }
  };

  const renderMenuScreen = () => (
    <ScrollView
      style={styles.menuScrollView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: scale(160)}}
      keyboardShouldPersistTaps="handled"
      bounces={true}>
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => {
          const animationValue = menuAnimations[index] || new Animated.Value(0);

          return (
            <Animated.View
              key={item.id}
              style={[
                styles.menuItemContainer,
                {
                  opacity: animationValue,
                  transform: [
                    {
                      translateY: animationValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                },
              ]}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuPress(item)}
                activeOpacity={0.9}>
                <View style={styles.menuContent}>
                  <LinearGradient colors={item.colors} style={styles.menuIcon}>
                    <Icon name={item.icon} size={24} color="white" />
                  </LinearGradient>
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuTitle}>{item.label}</Text>
                    <Text style={styles.menuDescription}>
                      {item.description}
                    </Text>
                  </View>
                </View>
                <View>
                  <Arrow_Right_S_Icon />
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      <Button.Main
        title="Ngắt kết nối"
        onPress={disconnect}
        textStyle={styles.bottomDisconnectText}
        style={styles.bottomDisconnectButton}
        iconLeft={<Icon name="log-out" size={20} color="#dc2626" />}
      />
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <Header
          title="Đăng ký & quản lí nông trại"
          subtitle="Đăng ký nông trại & quản lý các nông trại đã tạo"
          emoji="🏡"
        />
        {renderMenuScreen()}
      </View>
    </SafeAreaView>
  );
};

export default FarmRegistrationScreen;
