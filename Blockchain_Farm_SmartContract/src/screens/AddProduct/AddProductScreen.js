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

import {storage} from '../../utils/storage/storage';
import api from '../../api/tokenApi';

const AddProductScreen = ({navigation, route}) => {
  const {farmCode} = route.params || {};
  const {isConnected} = useAppKitAccount();
  const {walletProvider} = useAppKitProvider();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateProductCode = () => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    return `PRO${randomDigits}`;
  };

  const [formData, setFormData] = useState({
    productCode: generateProductCode(),
    name: '',
    categoryName: '',
    quantity: '',
    price: '',
    description: '',
    images: null,
    detailImages: [],
  });

  // Update form data from route params
  useEffect(() => {
    if (route.params?.updatedFormData) {
      setFormData(prev => ({
        ...prev,
        ...route.params.updatedFormData,
        productCode:
          route.params.updatedFormData.productCode ||
          prev.productCode ||
          generateProductCode(),
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
      const newImages = Array.isArray(imageData) ? imageData : [imageData];
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], ...newImages],
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
    console.log('🔽 Bắt đầu submit form sản phẩm');

    if (
      !farmCode ||
      !formData.productCode ||
      !formData.name ||
      !formData.categoryName ||
      !formData.quantity ||
      !formData.price ||
      !formData.description ||
      !formData.images
    ) {
      showMessage({
        message: 'Lỗi',
        description:
          'Vui lòng điền đầy đủ các trường bắt buộc và chọn ít nhất 1 ảnh sản phẩm.',
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

      // Upload images
      const hasMainImage = formData.images && formData.images.uri;
      const hasDetailImages =
        formData.detailImages && formData.detailImages.length > 0;

      if (hasMainImage || hasDetailImages) {
        const formDataToSend = new FormData();
        formDataToSend.append('farmCode', farmCode);
        formDataToSend.append('productCode', formData.productCode);
        formDataToSend.append('accessToken', accessToken);

        if (hasMainImage) {
          formDataToSend.append('images', {
            uri: formData.images.uri,
            type: formData.images.type || 'image/jpeg',
            name: formData.images.name || 'product_image.jpg',
          });
        }

        if (hasDetailImages) {
          formData.detailImages.forEach((img, index) => {
            formDataToSend.append('images', {
              uri: img.uri,
              type: img.type || 'image/jpeg',
              name: img.name || `detail_image_${index}.jpg`,
            });
          });
        }

        const response = await api.post(`/api/products`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
          timeout: 60000,
        });

        if (response.data?.data?.images) {
          uploadedImages = response.data.data.images;
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

      const imageUrlString = uploadedImages.join(',');

      // registerProduct
      const tx = await contract.registerProduct(
        farmCode,
        formData.productCode,
        formData.name,
        formData.categoryName,
        Number(formData.quantity),
        Number(formData.price),
        formData.description,
        imageUrlString,
      );

      await tx.wait();

      // Update tx hash
      await api.put(
        `/api/products/txHash`,
        {
          productCode: formData.productCode,
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
        description: `Thêm sản phẩm thành công`,
        type: 'success',
        duration: 2000,
        onHide: () => {
          navigation.navigate('Categories', {
            farmCode,
            newProduct: {
              farmCode,
              productCode: formData.productCode,
              name: formData.name,
              categoryName: formData.categoryName,
              quantity: formData.quantity,
              price: formData.price,
              image: imageUrlString,
              description: formData.description,
            },
          });
        },
      });
    } catch (error) {
      console.error('Lỗi:', error);
      showMessage({
        message: 'Lỗi',
        description:
          error.reason || error.message || 'Đã xảy ra lỗi khi thêm sản phẩm.',
        type: 'danger',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      farmCode &&
      formData.productCode &&
      formData.name &&
      formData.categoryName &&
      formData.quantity &&
      formData.price &&
      formData.description &&
      formData.images &&
      isConnected &&
      walletProvider
    );
  };

  // Define menu items cho product
  const menuItems = [
    {
      title: 'Thông tin chung',
      description: 'tên sản phẩm, danh mục, số lượng, giá',
      isCompleted: data =>
        data.productCode &&
        data.name &&
        data.categoryName &&
        data.quantity &&
        data.price,
      fields: [
        {
          type: 'input',
          field: 'name',
          label: 'Tên sản phẩm',
          placeholder: 'Nhập tên sản phẩm',
        },
        {
          type: 'select',
          field: 'categoryName',
          label: 'Danh mục',
          options: ['Trái cây', 'Rau củ', 'Hoa'],
        },
        {
          type: 'input',
          field: 'quantity',
          label: 'Số lượng',
          placeholder: 'Nhập số lượng',
          keyboardType: 'numeric',
        },
        {
          type: 'input',
          field: 'price',
          label: 'Giá (VNĐ)',
          placeholder: 'Nhập giá (VNĐ)',
          keyboardType: 'numeric',
        },
      ],
    },
    {
      title: 'Mô tả',
      description: 'Mô tả sản phẩm',
      isCompleted: data => data.description.length > 0,
      fields: [
        {
          type: 'input',
          field: 'description',
          placeholder: 'Mô tả sản phẩm',
          multiline: true,
          numberOfLines: 4,
        },
      ],
    },
    {
      title: 'Hình ảnh sản phẩm chính',
      description: 'Tải lên ảnh chính của sản phẩm',
      isCompleted: data => data.images !== null,
      fields: [
        {
          type: 'image',
          field: 'images',
          imageType: 'single',
          placeholder: 'Chọn ảnh sản phẩm chính',
        },
      ],
    },
    {
      title: 'Hình ảnh chi tiết',
      description: 'Tải lên hình ảnh chi tiết sản phẩm',
      isCompleted: data => data.detailImages.length > 0,
      fields: [
        {
          type: 'image',
          field: 'detailImages',
          imageType: 'multiple',
        },
      ],
    },
  ];

  return (
    <>
      <Header
        title="Thêm nông sản"
        subtitle="Thêm & quản lí nông sản của nông trại"
        emoji="🌾"
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
        submitButtonText="Thêm sản phẩm"
      />
    </>
  );
};

export default AddProductScreen;
