import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from 'react-native';
import {ethers} from 'ethers';
import {CONTRACT_ADDRESS} from '@env';
import contractArtifact from '../SmartConctract/contractABI.json';
import {showMessage} from 'react-native-flash-message';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import api from '../../api/tokenApi';
import styles from './ProcessSreen.style';
import {
  useAppKitAccount,
  useAppKitProvider,
} from '@reown/appkit-ethers-react-native';
import PlantingProcessForm from './component/PlantingProcessForm';
import SprayingProcessForm from './component/SprayingProcessForm';
import FertilizingProcessForm from './component/FertilizingProcessForm';
import HarvestingProcessForm from './component/HarvestingProcessForm';
import TransportationProcessForm from './component/TransportationProcessForm';
import ProgressIndicator from './component/ProgressIndicator';
import {getUser} from '../../utils/storage/authStorage';

const ProcessScreen = ({route}) => {
  const {isConnected} = useAppKitAccount();
  const {walletProvider} = useAppKitProvider();
  const {productCode} = route.params || {};
  const [currentStep, setCurrentStep] = useState(1);
  const [txHash, setTxHash] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const stepNameMap = {
    1: 'planting',
    2: 'spraying',
    3: 'fertilizing',
    4: 'harvesting',
    5: 'transportation',
  };

  const accessToken = getUser().accessToken;
  console.log('accessToken', accessToken);

  // fetch step từ backend
  const fetchProcess = async () => {
    try {
      const res = await api.get(`/api/process/${productCode}`);
      const steps = res.data?.process?.steps || [];

      // tìm step có hash cao nhất
      let lastHashedIndex = -1;
      steps.forEach((s, i) => {
        if (s.txHash) {
          lastHashedIndex = i;
        }
      });

      if (lastHashedIndex === -1) {
        // chưa có step nào -> bắt đầu từ 1
        setCurrentStep(1);
      } else if (lastHashedIndex === steps.length - 1) {
        // tất cả đã có hash -> completed
        setIsCompleted(true);
      } else {
        // bước tiếp theo là +1
        setCurrentStep(lastHashedIndex + 2);
      }
    } catch (err) {
      console.log('Lỗi fetch process:', err);
    }
  };

  useEffect(() => {
    if (productCode) {
      fetchProcess();
    }
  }, [productCode]);

  // gửi txHash về backend
  const sendToBackend = async (txHash, currentStep) => {
    try {
      const stepName = stepNameMap[currentStep];
      const payload = {productCode, stepName, txHash};

      await api.post(`/api/process/step`, payload, {
        headers: {Authorization: `Bearer ${accessToken}`},
      });

      showMessage({
        message: 'Thành công',
        description: `${stepName} thành công!`,
        type: 'success',
      });
    } catch (error) {
      console.error('Backend error:', error);
      showMessage({
        message: 'Lỗi',
        description: `Không thể gửi dữ liệu đến backend: ${error.message}`,
        type: 'danger',
      });
    }
  };

  // lấy contract instance
  const getContract = useCallback(async () => {
    if (!isConnected || !walletProvider) {
      throw new Error('Wallet not connected');
    }

    const provider = new ethers.BrowserProvider(walletProvider);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, contractArtifact.abi, signer);
  }, [isConnected, walletProvider]);

  // xử lý transaction theo step
  const executeBlockchainTransaction = async (
    contract,
    currentStep,
    formData,
  ) => {
    let tx;

    switch (currentStep) {
      case 1:
        tx = await contract.addFarmingProcess(
          productCode,
          formData.detail , 
          formData.nameProcess,
          formData.source,
          formData.plantingDate,
          formData.imageUrl, 
        );
        break;
      case 2:
        tx = await contract.addMedicine(
          productCode,
          formData.nameMedicine,
          formData.quantityMedicine,
          formData.medicineDate,
          formData.medicineType,
          formData.applicationMethod,
          formData.imageUrl,
        );
        break;

      case 3:
        tx = await contract.addFertilizer(
          productCode,
          formData.nameFertilizer,
          formData.quantityFertilizer,
          formData.fertilizerDate,
          formData.fertilizerType,
          formData.applicationMethod,
          formData.expectedEffect,
          formData.imageUrl,
        );
        break;

      case 4:
        tx = await contract.addHarvest(
          productCode,
          formData.harvestDate,
          formData.estimatedQuantity,
          formData.actualQuantity,
          formData.quality,
          formData.harvestMethod,
          formData.imageUrl, 
        );
        break;

      case 5:
        tx = await contract.addDistribution(
          productCode,
          formData.distributorName,
          formData.distributorPartner,
          formData.distributionDate,
          formData.transportMethod,
          formData.storageConditions,
          formData.imageUrl,
        );
        break;

      default:
        throw new Error('Invalid step');
    }

    return tx;
  };

  // submit form
  const handleFormSubmit = async formData => {
    console.log('formData', formData);

    if (!productCode) {
      showMessage({
        message: 'Lỗi',
        description: 'Không có productCode!',
        type: 'danger',
      });
      return;
    }

    if (!isConnected || !walletProvider) {
      showMessage({
        message: 'Lỗi',
        description: 'Vui lòng kết nối ví!',
        type: 'danger',
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // === 1. Upload ảnh lên backend ===
      let imageUrl = [];

      if (formData.images && formData.images.length > 0) {
        const uploadData = new FormData();
        uploadData.append('productCode', productCode);
        uploadData.append('stepName', stepNameMap[currentStep]);

        formData.images.forEach((image, index) => {
          console.log('image', image);

          const imageUri = typeof image === 'string' ? image : image.uri;

          uploadData.append('images', {
            uri: imageUri,
            type: image.type || 'image/jpeg',
            name: image.fileName || `image_${index}.jpg`,
          });
        });

        console.log('📤 Uploading images to backend...', uploadData);
        const uploadRes = await api.post('/api/process/upload', uploadData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
          timeout: 120000,
        });

        imageUrl = uploadRes.data?.imageUrl || [];
        console.log('✅ Ảnh đã upload Cloudinary:', imageUrl);
      }

      // === 2. Kết nối contract ===
      const contract = await getContract();

      // === 3. Thực thi giao dịch blockchain ===
      const tx = await executeBlockchainTransaction(contract, currentStep, {
        ...formData,
        imageUrl,
      });

      console.log('⏳ Đang chờ xác nhận giao dịch...');
      const receipt = await tx.wait(); 

      const hash = receipt?.hash || tx?.hash;
      setTxHash(hash);
      console.log('✅ Transaction Hash:', hash);

      // === 4. Gửi hash về backend ===
      await sendToBackend(hash, currentStep);

      // === 5. Cập nhật tiến trình ===
      if (currentStep < 5) setCurrentStep(prev => prev + 1);
      else setIsCompleted(true);

      showMessage({
        message: 'Thành công!',
        description: `Bước ${currentStep} đã hoàn tất!`,
        type: 'success',
      });
    } catch (error) {
      console.log('❌ Lỗi khi xử lý quy trình:', error);
      setError(error);
      showMessage({
        message: 'Lỗi',
        description: error.message || 'Giao dịch thất bại',
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // render form
  const renderForm = () => {
    const stepTitles = {
      1: 'Quy trình trồng trọt',
      2: 'Quy trình sử dụng thuốc',
      3: 'Quy trình phân bón',
      4: 'Quy trình thu hoạch',
      5: 'Quy trình phân phối',
    };

    const stepIcons = {1: '🌱', 2: '💊', 3: '🌿', 4: '🌾', 5: '🚚'};

    return (
      <View style={styles.formContainer}>
        <View style={styles.stepHeader}>
          <Text style={styles.stepIcon}>{stepIcons[currentStep]}</Text>
          <Text style={styles.stepTitle}>{stepTitles[currentStep]}</Text>
        </View>

        {currentStep === 1 && (
          <PlantingProcessForm onSubmit={handleFormSubmit} />
        )}
        {currentStep === 2 && (
          <SprayingProcessForm onSubmit={handleFormSubmit} />
        )}
        {currentStep === 3 && (
          <FertilizingProcessForm onSubmit={handleFormSubmit} />
        )}
        {currentStep === 4 && (
          <HarvestingProcessForm onSubmit={handleFormSubmit} />
        )}
        {currentStep === 5 && (
          <TransportationProcessForm onSubmit={handleFormSubmit} />
        )}
      </View>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.green} barStyle="light-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {isCompleted ? (
          <View style={styles.statusContainer}>
            <Text style={styles.successText}>🎉 Quy trình đã hoàn thành!</Text>
          </View>
        ) : (
          <>
            <ProgressIndicator currentStep={currentStep} />
            {renderForm()}

            {isLoading && (
              <View style={styles.statusContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.loadingText}>Đang xử lý...</Text>
              </View>
            )}

            {error && (
              <View style={[styles.statusContainer, styles.errorContainer]}>
                <Text style={styles.errorText}>❌ Lỗi: {error.message}</Text>
              </View>
            )}

            {txHash && (
              <View style={[styles.statusContainer, styles.successContainer]}>
                <Text style={styles.successText}>✅ Giao dịch thành công!</Text>
                <Text style={styles.hashText}>
                  TX: {txHash.substring(0, 10)}...
                </Text>
              </View>
            )}
          </>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </>
  );
};

export default ProcessScreen;
