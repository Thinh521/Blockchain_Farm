import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Animated,
  StatusBar,
} from 'react-native';
import {
  useAppKitAccount,
  useDisconnect,
} from '@reown/appkit-ethers-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import {Colors} from '../../theme/theme';
import styles from './FarmRegistration.styles';
import {Arrow_Right_S_Icon} from '../../assets/icons';
import {useNavigation} from '@react-navigation/core';
import {showMessage} from 'react-native-flash-message';

const menuItems = [
  {
    id: 1,
    label: 'Đăng ký nông trại',
    icon: 'edit-3',
    colors: ['#f472b6', '#db2777'],
    description: 'Tạo và quản lý thông tin nông trại mới',
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
    icon: 'leaf',
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
      showsVerticalScrollIndicator={false}>
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

      <View style={styles.bottomDisconnect}>
        <TouchableOpacity
          style={styles.bottomDisconnectButton}
          onPress={disconnect}>
          <Icon name="log-out" size={20} color="#dc2626" />
          <Text style={styles.bottomDisconnectText}>Ngắt kết nối</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.green} barStyle="light-content" />
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Đăng ký & quản lí nông trại</Text>
          <Text style={styles.headerSubtitle}>
            Đăng ký nông trại mới và quản lý các nông trại đã tạo
          </Text>
        </View>
        {renderMenuScreen()}
      </View>
    </SafeAreaView>
  );
};

export default FarmRegistrationScreen;
