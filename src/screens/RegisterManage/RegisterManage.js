import React, {useState, useEffect} from 'react';
import {showMessage} from 'react-native-flash-message';
import {ethers} from 'ethers';
import {
  useAppKitAccount,
  useAppKitProvider,
} from '@reown/appkit-ethers-react-native';
import {CONTRACT_ADDRESS} from '@env';
import contractArtifact from '../SmartConctract/contractABI.json';
import FormWizard from '../../components/FormWizard/FormWizard';
import Header from '../../components/Header/Header';
import api from '../../api/tokenApi';
import {useUser} from '../../hooks/useUser';
import {storage} from '../../utils/storage/storage';


const RegisterManage = ({navigation, route}) => {
  const {isConnected} = useAppKitAccount();
  const {walletProvider} = useAppKitProvider();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {data: user} = useUser();

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

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName || prev.fullName,
        phone: user.phone || prev.phone,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  // Update form data from route params
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
  }, [route.params?.updatedFormData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

const handleImageSelect = (field, imageData, type) => {
  if (type === 'single') {
    setFormData(prev => ({
      ...prev,
      [field]: imageData,
    }));
  } else if (type === 'multiple') {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), ...imageData], // thêm ...imageData
    }));
  }
};


  const handleImageRemove = (field, index = null) => {
    if (index === null) {
      setFormData(prev => ({
        ...prev,
        [field]: null,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = async () => {
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

      // Upload images if any
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

        if (response.data?.images && Array.isArray(response.data.images)) {
          uploadedImages = response.data.images.filter(Boolean);
        }
      }

      // Blockchain transaction
      const provider = new ethers.BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractArtifact.abi,
        signer,
      );
      const tx = await contract.registerFarm(
        formData.farmCode,
        formData.fullName,
        formData.nameFarm,
        (await storage.getString('userId')) || 'USER123',
        formData.email,
        formData.phone,
        formData.description,
        formData.location || 'Unknown',
        Number(formData.area) || 1000,
        uploadedImages,
      );

      await tx.wait();

      // Update tx hash
      await api.put(
        `/api/farms/txHash`,
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
        description: `Đăng ký nông trại thành công`,
        type: 'success',
        duration: 3000,
        onHide: () => {
          navigation.navigate('NoBottomTab', {screen: 'MyFarm'});
        },
      });
    } catch (error) {
      console.log('Lỗi:', error || error.reason || error.message);
      showMessage({
        message: 'Lỗi',
        description: 'Đã xảy ra lỗi khi đăng ký farm.',
        type: 'danger',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

  // Define menu items với validation logic
  const menuItems = [
    {
      title: 'Thông tin chung',
      description: 'Họ và tên, tên trang trại, điện thoại, email',
      isCompleted: data =>
        data.fullName && data.nameFarm && data.phone && data.email,
      fields: [
        {
          type: 'input',
          field: 'fullName',
          label: 'Họ và tên',
          placeholder: 'Nhập họ và tên',
        },
        {
          type: 'input',
          field: 'nameFarm',
          label: 'Tên trang trại',
          placeholder: 'Nhập tên trang trại',
        },
        {
          type: 'input',
          field: 'phone',
          label: 'Điện thoại',
          placeholder: 'Nhập số điện thoại',
          keyboardType: 'phone-pad',
        },
        {
          type: 'input',
          field: 'email',
          label: 'Email',
          placeholder: 'Nhập email',
          keyboardType: 'email-address',
        },
      ],
    },
    {
      title: 'Mô tả',
      description: 'Mô tả trang trại và phương pháp canh tác',
      isCompleted: data => data.description.length > 0,
      fields: [
        {
          type: 'input',
          field: 'description',
          placeholder: 'Mô tả trang trại và phương pháp canh tác',
          multiline: true,
          numberOfLines: 4,
        },
      ],
    },
    {
      title: 'Vị trí và diện tích',
      description: 'Vị trí, diện tích trang trại',
      isCompleted: data => data.location && data.area,
      fields: [
        {
          type: 'input',
          field: 'location',
          label: 'Vị trí',
          placeholder: 'Nhập vị trí trang trại',
        },
        {
          type: 'input',
          field: 'area',
          label: 'Diện tích (m²)',
          placeholder: 'Nhập diện tích trang trại',
          keyboardType: 'numeric',
        },
      ],
    },
    {
      title: 'Hình ảnh xác thực chủ trang trại',
      description: 'Tải lên hình ảnh định danh chủ sở hữu',
      isCompleted: data => data.kycImage !== null,
      fields: [
        {
          type: 'image',
          field: 'kycImage',
          imageType: 'single',
          placeholder: 'Nhấn để chọn ảnh để tải lên',
        },
      ],
    },
    {
      title: 'Chi tiết hình ảnh trang trại',
      description: 'Tải lên hình ảnh chi tiết trang trại',
      isCompleted: data => data.farmImages.length > 0,
      fields: [
        {
          type: 'image',
          field: 'farmImages',
          imageType: 'multiple',
        },
      ],
    },
  ];

  return (
    <>
      <Header
        title="Đăng ký nông trại"
        subtitle="Đăng ký & quản lí nông trại của bạn"
        emoji="🏡"
        showBack={true}
      />

      <FormWizard
        menuItems={menuItems}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onImageSelect={handleImageSelect}
        onImageRemove={handleImageRemove}
        isSubmitting={isSubmitting}
        isFormValid={isFormValid}
        submitButtonText="Xác nhận"
      />
    </>
  );
};

export default RegisterManage;
