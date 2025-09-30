import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {ethers} from 'ethers';
import {CONTRACT_ADDRESS} from '@env';
import contractArtifact from '../SmartConctract/contractABI.json';
import {StatusBar} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import api from '../../api/tokenApi';
import styles from './ProcessSreen.style';
import {
  useAppKitAccount,
  useAppKitProvider,
} from '@reown/appkit-ethers-react-native';

// Import các components
import PlantingProcessForm from './component/PlantingProcessForm';
import SprayingProcessForm from './component/SprayingProcessForm';
import FertilizingProcessForm from './component/FertilizingProcessForm';
import HarvestingProcessForm from './component/HarvestingProcessForm';
import TransportationProcessForm from './component/TransportationProcessForm';
import ProgressIndicator from './component/ProgressIndicator';
import {storage} from '../../utils/storage/storage';
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
  const STEP_KEY = `process_step_${productCode}`;


  useEffect(() => {
    const savedStep = storage.getString(STEP_KEY);
    if (savedStep) {
      if (savedStep === 'completed') {
        setIsCompleted(true);
      } else {
        const stepNumber = Number(savedStep);
        if (!isNaN(stepNumber)) {
          setCurrentStep(stepNumber);
        }
      }
    }
  }, [productCode]);

  const stepNameMap = {
    1: 'planting',
    2: 'spraying',
    3: 'fertilizing',
    4: 'harvesting',
    5: 'transportation',
  };

  const accessToken = getUser().accessToken;

  // Gửi mã hash về backend
  const sendToBackend = async (txHash, currentStep) => {
    try {
      const stepName = stepNameMap[currentStep];
      const payload = {
        productCode,
        stepName,
        txHash,
      };

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

  // Lấy contract instance
  const getContract = useCallback(async () => {
    if (!isConnected || !walletProvider) {
      throw new Error('Wallet not connected');
    }

    const provider = new ethers.BrowserProvider(walletProvider);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, contractArtifact.abi, signer);
  }, [isConnected, walletProvider]);

  // Xử lý blockchain transaction cho từng step
  const executeBlockchainTransaction = async (contract, currentStep, formData) => {
    let tx;

    switch (currentStep) {
      case 1:
        tx = await contract.addFarmingProcess(
          productCode,
          formData.nameProcess,
          formData.source,
          formData.plantingDate,
          formData.sowingDate,
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
        );
        break;

      default:
        throw new Error('Invalid step');
    }

    return tx;
  };

  // Xử lý submit từ form
  const handleFormSubmit = async (formData) => {

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
        description: 'Vui lòng kết nối ví trước khi thực hiện!',
        type: 'danger',
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Lấy contract instance
      const contract = await getContract();

      // Thực hiện transaction với dữ liệu từ form
      const tx = await executeBlockchainTransaction(contract, currentStep, formData);

      // Đợi transaction được confirm
      await tx.wait();
      const txHash = tx.hash;
      setTxHash(txHash);
      console.log('🔗 Transaction Hash:', txHash);

      // Gửi hash về backend
      await sendToBackend(txHash, currentStep);

      // Chuyển step hoặc hoàn thành
      if (currentStep < 5) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        storage.set(STEP_KEY, String(nextStep));
        setTxHash(null);
      } else {
        storage.set(STEP_KEY, 'completed');
        setIsCompleted(true);
        showMessage({
          message: 'Hoàn thành',
          description: 'Tất cả quy trình đã được thêm thành công!',
          type: 'success',
          duration: 2000,
        });
      }
    } catch (error) {
      console.error('❌ Lỗi:', error);
      setError(error);
      showMessage({
        message: 'Lỗi',
        description:
          error.reason || error.message || 'Đã xảy ra lỗi không xác định.',
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Render form theo step
  const renderForm = () => {
    const stepTitles = {
      1: 'Quy trình trồng trọt',
      2: 'Quy trình sử dụng thuốc',
      3: 'Quy trình phân bón',
      4: 'Quy trình thu hoạch',
      5: 'Quy trình phân phối',
    };

    const stepIcons = {
      1: '🌱',
      2: '💊',
      3: '🌿',
      4: '🌾',
      5: '🚚',
    };

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

            {/* Status Messages */}
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