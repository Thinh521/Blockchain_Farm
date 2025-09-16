import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {ethers} from 'ethers';
import {
  useAppKitAccount,
  useAppKitProvider,
} from '@reown/appkit-ethers-react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CONTRACT_ADDRESS} from '@env';
import styles from './Style';
import contractArtifact from '../SmartConctract/contractABI.json';
import {storage} from '../../utils/storage/storage';
import api from '../../api/baseApi';
import {getUserApi} from '../../api/userApi';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Button from '../../components/CustomButton/CustomButton';
import Input from '../../components/CustomInput/CustomInput';

const RegisterManage = ({navigation, route}) => {
  const {address, isConnected} = useAppKitAccount();
  const {walletProvider} = useAppKitProvider();

  const [activeSection, setActiveSection] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateFarmCode = () => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    return `FARM${randomDigits}`;
  };

  const [formData, setFormData] = useState({
    fullName: '',
    nameFarm: '',
    email: '',
    phone: '',
    description: '',
    location: '',
    area: '',
    kycImage: null,
    farmImages: [],
    farmCode: generateFarmCode(),
  });

  // Fetch user data using getUserApi
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = await storage.getString('accessToken');
        if (!accessToken) {
          throw new Error('Không tìm thấy accessToken');
        }

        const response = await getUserApi(accessToken);
        if (response?.user) {
          const userData = response.user;

          console.log('Fetched user data:', userData);

          setFormData(prev => ({
            ...prev,
            fullName: userData.fullName || prev.fullName,
            phone: userData.phone || prev.phone,
            email: userData.email || prev.email,
          }));
        } else {
          throw new Error('API không trả về dữ liệu hợp lệ');
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
        showMessage({
          message: 'Lỗi',
          description: 'Không thể lấy thông tin người dùng. Vui lòng thử lại.',
          type: 'danger',
        });
      } finally {
        setLoadingUserData(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (route.params?.updatedFormData) {
      setFormData(prev => ({
        ...prev,
        ...route.params.updatedFormData,
        farmCode:
          route.params.updatedFormData.farmCode ||
          prev.farmCode ||
          generateFarmCode(),
      }));
    }

    if (walletProvider) {
      const handleSessionRequest = sessionId => {
        console.log('Xử lý session request:', sessionId);
      };
      return () => {
        // walletProvider.off('session_request', handleSessionRequest);
      };
    }
  }, [route.params?.updatedFormData, walletProvider]);

  const handleMenuItemPress = sectionIndex => {
    setActiveSection(activeSection === sectionIndex ? null : sectionIndex);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const selectImage = type => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel || response.error) return;

      if (response.assets && response.assets[0]) {
        const imageData = response.assets[0];

        if (type === 'kyc') {
          setFormData(prev => ({
            ...prev,
            kycImage: imageData,
          }));
        } else if (type === 'farm') {
          setFormData(prev => ({
            ...prev,
            farmImages: [...prev.farmImages, imageData],
          }));
        }
      }
    });
  };

  const removeFarmImage = index => {
    setFormData(prev => ({
      ...prev,
      farmImages: prev.farmImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    console.log('🔽 Bắt đầu submit form');
    console.log('👉 Dữ liệu form:', formData);

    if (
      !formData.fullName ||
      !formData.nameFarm ||
      !formData.phone ||
      !formData.email ||
      !formData.farmCode
    ) {
      showMessage({
        message: 'Lỗi',
        description: 'Vui lòng điền đầy đủ các trường bắt buộc trong form',
        type: 'danger',
      });
      return;
    }

    if (!isConnected || !walletProvider) {
      showMessage({
        message: 'Lỗi',
        description: 'Vui lòng kết nối ví trước!',
        type: 'danger',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const accessToken = await storage.getString('accessToken');
      if (!accessToken) {
        throw new Error('Không tìm thấy accessToken');
      }

      let uploadedImages = [];

      const hasKycImage = formData.kycImage && formData.kycImage.uri;
      const hasFarmImages =
        formData.farmImages && formData.farmImages.length > 0;

      if (hasKycImage || hasFarmImages) {
        const formDataToSend = new FormData();
        formDataToSend.append('farmCode', formData.farmCode);
        formDataToSend.append('accessToken', accessToken);

        if (hasKycImage) {
          formDataToSend.append('images', {
            uri: formData.kycImage.uri,
            type: formData.kycImage.type || 'image/jpeg',
            name: formData.kycImage.name || 'kyc_image.jpg',
          });
        }

        if (hasFarmImages) {
          formData.farmImages.forEach((img, index) => {
            formDataToSend.append('images', {
              uri: img.uri,
              type: img.type || 'image/jpeg',
              name: img.name || `farm_image_${index}.jpg`,
            });
          });
        }

        const response = await api.post(`/api/farms`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
          timeout: 60000,
        });
        console.log('Response from API:', response.data);

        if (response.data?.images && Array.isArray(response.data.images)) {
          uploadedImages = response.data.images.filter(Boolean);
        } else {
          throw new Error('API không trả về URL ảnh hợp lệ');
        }
      }

      // Kiểm tra walletProvider trước khi tạo provider
      if (!walletProvider) {
        throw new Error('Wallet provider is not available');
      }
      const provider = new ethers.BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      console.log('Signer retrieved:', signer);

      // Kiểm tra ABI
      if (!contractArtifact.abi) {
        throw new Error('Contract ABI is undefined');
      }
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractArtifact.abi,
        signer,
      );

      const tx = await contract.registerFarm(
        formData.farmCode,
        (await storage.getString('userId')) || 'USER123',
        formData.nameFarm,
        formData.fullName,
        formData.email,
        formData.phone,
        formData.description,
        formData.location || 'Unknown',
        Number(formData.area) || 1000,
        uploadedImages,
      );

      await tx.wait();
      console.log('Transaction hash:', tx.hash);

      await api.put(
        `/api/farms/farmCode/txHash`,
        {
          farmCode: formData.farmCode,
          txHash: tx.hash,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      showMessage({
        message: 'Thành công',
        description: `Đăng ký farm thành công`,
        type: 'success',
        duration: 2000,
        onHide: () => {
          navigation.navigate('Auth', {screen: 'MyFarm'});
        },
      });
    } catch (error) {
      console.error('❌ Lỗi tổng thể khi xử lý:', {
        message: error.message,
        reason: error.reason,
        code: error.code,
        stack: error.stack,
      });
      showMessage({
        message: 'Lỗi',
        description:
          error.reason || error.message || 'Đã xảy ra lỗi khi đăng ký farm.',
        type: 'danger',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCompleted = sectionIndex => {
    switch (sectionIndex) {
      case 0:
        return (
          formData.fullName &&
          formData.nameFarm &&
          formData.phone &&
          formData.email
        );
      case 1:
        return formData.description.length > 0;
      case 2:
        return formData.location && formData.area;
      case 3:
        return formData.kycImage !== null;
      case 4:
        return formData.farmImages.length > 0;
      default:
        return false;
    }
  };

  const menuItems = [
    {
      title: 'Thông tin chung',
      description: 'Họ và tên, tên trang trại, điện thoại, email',
    },
    {
      title: 'Mô tả',
      description: 'Mô tả trang trại và phương pháp canh tác',
    },
    {
      title: 'Vị trí và diện tích',
      description: 'Vị trí, diện tích trang trại',
    },
    {
      title: 'Hình ảnh xác thực chủ trang trại',
      description: 'Tải lên hình ảnh định danh chủ sở hữu',
    },
    {
      title: 'Chi tiết hình ảnh trang trại',
      description: 'Tải lên hình ảnh chi tiết trang trại',
    },
  ];

  // Render form sections
  const renderFormSection = sectionIndex => {
    if (activeSection !== sectionIndex) return null;

    switch (sectionIndex) {
      case 0:
        return (
          <View style={styles.formSection}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Họ và tên</Text>
             <Input
                placeholder="Nhập họ và tên"
                value={formData.fullName}
                onChangeText={text => handleInputChange('fullName', text)}
                editable={!loadingUserData}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tên trang trại</Text>
           <Input 
                placeholder="Nhập tên trang trại"
                value={formData.nameFarm}
                onChangeText={text => handleInputChange('nameFarm', text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Điện thoại</Text>
              <View style={styles.phoneInputContainer}>
                <Input
                  style={styles.phoneInput}
                  placeholder="Nhập số điện thoại"
                  value={formData.phone}
                  onChangeText={text => handleInputChange('phone', text)}
                  keyboardType="phone-pad"
                  editable={!loadingUserData}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
             <Input
                placeholder="Nhập email"
                value={formData.email}
                onChangeText={text => handleInputChange('email', text)}
                keyboardType="email-address"
                editable={!loadingUserData}
              />
            </View>
          </View>
        );

      case 1:
        return (
          <View style={styles.formSection}>
            <Input
              placeholder="Mô tả trang trại và phương pháp canh tác"
              value={formData.description}
              onChangeText={text => handleInputChange('description', text)}
              multiline={true}
              numberOfLines={4}
            />
          </View>
        );

      case 2:
        return (
          <View style={styles.formSection}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Vị trí</Text>
              <Input
                placeholder="Nhập vị trí trang trại"
                value={formData.location}
                onChangeText={text => handleInputChange('location', text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Diện tích (m²)</Text>
              <Input
                placeholder="Nhập diện tích trang trại"
                value={formData.area}
                onChangeText={text => handleInputChange('area', text)}
                keyboardType="numeric"
              />
            </View>
          </View>
        );

      case 3:
        return (
          <View style={styles.formSection}>
            {formData.kycImage ? (
              <View style={styles.imagePreviewContainer}>
                <Image
                  source={{uri: formData.kycImage.uri}}
                  style={styles.imagePreview}
                />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => handleInputChange('kycImage', null)}>
                  <Icon name="close" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => selectImage('kyc')}>
                <Icon name="photo-camera" size={40} color="#999" />
                <Text style={styles.uploadText}>
                  Nhập để chọn ảnh để tải lên
                </Text>
              </TouchableOpacity>
            )}
          </View>
        );

      case 4:
        return (
          <View style={styles.formSection}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.farmImagesContainer}>
                {formData.farmImages.map((image, index) => (
                  <View key={index} style={styles.farmImageContainer}>
                    <Image
                      source={{uri: image.uri}}
                      style={styles.farmImagePreview}
                    />
                    <TouchableOpacity
                      style={styles.removeFarmImageButton}
                      onPress={() => removeFarmImage(index)}>
                      <Icon name="close" size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                ))}

                <TouchableOpacity
                  style={styles.addFarmImageButton}
                  onPress={() => selectImage('farm')}>
                  <Icon name="add" size={30} color="#999" />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        );

      default:
        return null;
    }
  };

  // Check if form is valid and wallet is connected
  const isFormValid = () => {
    return (
      formData.fullName &&
      formData.nameFarm &&
      formData.phone &&
      formData.email &&
      formData.farmCode &&
      isConnected &&
      walletProvider
    );
  };

  return (
    <View style={styles.whiteBackground}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.green} barStyle="light-content" />

        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {menuItems.map((item, index) => (
              <View key={index} style={styles.menuItemContainer}>
                <TouchableOpacity
                  style={[
                    styles.menuItem,
                    isCompleted(index) && styles.menuItemCompleted,
                    activeSection === index && styles.menuItemActive,
                  ]}
                  onPress={() => handleMenuItemPress(index)}
                  activeOpacity={0.7}>
                  <View style={styles.menuItemLeft}>
                    <Text style={styles.menuItemText}>{item.title}</Text>
                    <Text style={styles.menuItemDescription}>
                      {item.description}
                    </Text>
                  </View>
                  <View style={styles.menuItemRight}>
                    {isCompleted(index) && (
                      <Icon
                        name="check-circle"
                        size={20}
                        color="#4CAF50"
                        style={{marginRight: 8}}
                      />
                    )}
                    <Icon name={item.icon} size={24} color="#FF6B35" />
                    <Icon
                      name={
                        activeSection === index
                          ? 'keyboard-arrow-up'
                          : 'keyboard-arrow-down'
                      }
                      size={20}
                      color="#666"
                    />
                  </View>
                </TouchableOpacity>
                {renderFormSection(index)}
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.submitContainer}>
          <Button.Main 
            title={isSubmitting ? "Đang xử lý..." : "Xác nhận"}
            onPress={handleSubmit}
            disabled={!isFormValid() || isSubmitting}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default RegisterManage;