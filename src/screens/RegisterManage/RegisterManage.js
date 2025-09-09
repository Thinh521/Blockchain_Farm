import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  Modal,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {ethers} from 'ethers';
import {
  AppKitButton,
  useAppKitAccount,
  useAppKitProvider,
} from '@reown/appkit-ethers-react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Images from '../../assets/images/images';
import {CONTRACT_ADDRESS} from '@env';
import styles from './Style';
import contractArtifact from '../Smart Conctract/contractABI.json';
import {storage} from '../../utils/storage/storage';
import api from '../../api/baseApi';
import {getUserApi} from '../../api/userApi';

const RegisterManage = ({navigation}) => {
  const {address, isConnected} = useAppKitAccount();
  const {walletProvider} = useAppKitProvider();

  // State cho modal ví
  const [showWalletModal, setShowWalletModal] = useState(false);
  // State cho trạng thái mở/rút gọn của các section
  const [activeSections, setActiveSections] = useState([]);

  const generateFarmCode = () => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    return `FARM${randomDigits}`;
  };

  const [formData, setFormData] = useState({
    fullname: '',
    nameFarm: '',
    email: '',
    phone: '',
    description: '',
    country: '',
    addressInfo: '',
    area: '',
    kycImage: null,
    farmImages: [],
    farmCode: generateFarmCode(),
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = await storage.getString('accessToken');
        if (!accessToken) {
          throw new Error('Không tìm thấy accessToken');
        }

        // Sử dụng getUserApi từ userApi
        const response = await getUserApi(accessToken);
        console.log('response', response);
        if (response?.user) {
          const userData = response.user;

          setFormData(prev => ({
            ...prev,
            fullname: userData.fullName || prev.fullName,
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
      }
    };

    fetchUserData();
  }, []); // Chạy một lần khi component mount

  useEffect(() => {
    if (!isConnected) {
      setShowWalletModal(true);
    } else {
      setShowWalletModal(false);
    }
  }, [isConnected]);

  const toggleSection = index => {
    setActiveSections(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index],
    );
  };

  const handleImagePick = (type, index = null) => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const image = response.assets[0];
        if (type === 'kyc') {
          setFormData(prev => ({...prev, kycImage: image}));
        } else if (type === 'farm') {
          setFormData(prev => ({
            ...prev,
            farmImages:
              index !== null
                ? prev.farmImages.map((img, i) => (i === index ? image : img))
                : [...prev.farmImages, image],
          }));
        }
      }
    });
  };

  const handleSubmit = async () => {
  console.log('🔽 Bắt đầu submit form');
  console.log('👉 Dữ liệu form:', formData);

  if (
    !formData.fullname ||
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
    setShowWalletModal(true);
    return;
  }

  try {
    const accessToken = await storage.getString('accessToken');
    if (!accessToken) {
      throw new Error('Không tìm thấy accessToken');
    }

    let uploadedImages = [];

    const hasKycImage = formData.kycImage && formData.kycImage.uri;
    const hasFarmImages = formData.farmImages && formData.farmImages.length > 0;

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
      console.log('response', response.data);

      if (response.data?.images && Array.isArray(response.data.images)) {
        uploadedImages = response.data.images.filter(Boolean); 
      } else {
        throw new Error('API không trả về URL ảnh hợp lệ');
      }
    }

    const provider = new ethers.BrowserProvider(walletProvider);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      contractArtifact.abi,
      signer,
    );

    // gọi smart contract với mảng string
    const tx = await contract.registerFarm(
      formData.farmCode,
      formData.nameFarm,
      (await storage.getString('id')) || 'USER123',
      formData.fullname,
      formData.email,
      formData.phone,
      formData.description,
      formData.location || 'Unknown',
      Number(formData.area) || 1000,
      uploadedImages, // 👈 truyền thẳng mảng
    );

    await tx.wait();

    // cập nhật txHash về backend
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
    });
    showMessage({
      message: 'Lỗi',
      description:
        error.reason || error.message || 'Đã xảy ra lỗi khi đăng ký farm.',
      type: 'danger',
    });
  }
};


  const isCompleted = sectionIndex => {
    switch (sectionIndex) {
      case 0:
        return (
          formData.fullname &&
          formData.nameFarm &&
          formData.phone &&
          formData.email &&
          formData.farmCode
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

  const getCompletionStatus = () => {
    const completedSections = [0, 1, 2, 3, 4].filter(index =>
      isCompleted(index),
    );
    return `${completedSections.length}/5 sections completed`;
  };

  const menuItems = [
    {
      title: 'General information',
      description: 'fullname, farm name, phone, email',
      content: (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={formData.fullname}
            onChangeText={text => setFormData({...formData, fullname: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Farm Name"
            value={formData.nameFarm}
            onChangeText={text => setFormData({...formData, nameFarm: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={formData.phone}
            onChangeText={text => setFormData({...formData, phone: text})}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={text => setFormData({...formData, email: text})}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Farm Code"
            value={formData.farmCode}
            editable={false}
          />
        </View>
      ),
    },
    {
      title: 'Description',
      description: 'Farm description and cultivation methods',
      content: (
        <View style={styles.formContainer}>
          <TextInput
            style={[styles.input, {height: 100}]}
            placeholder="Farm Description"
            value={formData.description}
            onChangeText={text => setFormData({...formData, description: text})}
            multiline
          />
        </View>
      ),
    },
    {
      title: 'Location and area',
      description: 'Location, area',
      content: (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={formData.location}
            onChangeText={text => setFormData({...formData, location: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Area (m²)"
            value={formData.area}
            onChangeText={text => setFormData({...formData, area: text})}
            keyboardType="numeric"
          />
        </View>
      ),
    },
    {
      title: 'Image KYC owner farm',
      description: 'Upload owner identification image',
      content: (
        <View style={styles.formContainer}>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => handleImagePick('kyc')}>
            <Text style={styles.imageButtonText}>
              {formData.kycImage ? 'Replace KYC Image' : 'Upload KYC Image'}
            </Text>
          </TouchableOpacity>
          {formData.kycImage && (
            <Image
              source={{uri: formData.kycImage.uri}}
              style={styles.previewImage}
            />
          )}
        </View>
      ),
    },
    {
      title: 'Detail image farm',
      description: 'Upload farm detail images',
      content: (
        <View style={styles.formContainer}>
          {formData.farmImages.map((img, index) => (
            <View key={index} style={styles.imagePreviewContainer}>
              <Image source={{uri: img.uri}} style={styles.previewImage} />
              <TouchableOpacity
                style={styles.replaceImageButton}
                onPress={() => handleImagePick('farm', index)}>
                <Text style={styles.imageButtonText}>Replace</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => handleImagePick('farm')}>
            <Text style={styles.imageButtonText}>Add Farm Image</Text>
          </TouchableOpacity>
        </View>
      ),
    },
  ];

  const WalletModal = () => (
    <Modal
      visible={showWalletModal && !isConnected}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowWalletModal(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Connect Your Wallet</Text>
          <Text style={styles.modalDescription}>
            Please connect your wallet to continue with farm registration
          </Text>
          <AppKitButton balance="show" />
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setShowWalletModal(false)}>
            <Text style={styles.modalCloseText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  if (!isConnected) {
    return (
      <ImageBackground source={Images.bg} style={{flex: 1}} resizeMode="cover">
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#4CAF50" barStyle="light-content" />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Register for farm management</Text>
            <TouchableOpacity onPress={() => setShowWalletModal(true)}>
              <Icon name="notifications" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <WalletModal />
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={Images.bg} style={{flex: 1}} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#4CAF50" barStyle="light-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Register for farm management</Text>
          <TouchableOpacity onPress={() => setShowWalletModal(true)}>
            <Icon name="notifications" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{getCompletionStatus()}</Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${
                    ([0, 1, 2, 3, 4].filter(index => isCompleted(index))
                      .length /
                      5) *
                    100
                  }%`,
                },
              ]}
            />
          </View>
        </View>

        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {menuItems.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={[
                    styles.menuItem,
                    isCompleted(index) && styles.menuItemCompleted,
                  ]}
                  onPress={() => toggleSection(index)}
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
                    <Icon
                      name={
                        activeSections.includes(index)
                          ? 'expand-less'
                          : 'expand-more'
                      }
                      size={24}
                      color="#FF6B35"
                    />
                  </View>
                </TouchableOpacity>
                {activeSections.includes(index) && (
                  <View style={styles.collapsibleContent}>{item.content}</View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.submitContainer}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              [0, 1, 2, 3, 4].filter(index => isCompleted(index)).length < 5
                ? {backgroundColor: '#ccc'}
                : {},
            ]}
            onPress={handleSubmit}
            disabled={
              [0, 1, 2, 3, 4].filter(index => isCompleted(index)).length < 5
            }>
            <Text style={styles.submitButtonText}>Create Farm</Text>
          </TouchableOpacity>
          <Text style={styles.submitNote}>
            Complete all sections and connect wallet to create your farm
          </Text>
        </View>

        <Modal
          visible={showWalletModal && isConnected}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowWalletModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Wallet Information</Text>
              <AppKitButton balance="show" />
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowWalletModal(false)}>
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RegisterManage;
