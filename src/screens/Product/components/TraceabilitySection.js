import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
  Linking,
  Modal,
  ActivityIndicator,
} from 'react-native';

import {ethers} from 'ethers';
import {CONTRACT_ADDRESS, RPC_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ExpandableText from './ExpandableText';
import contractArtifact from '../../SmartConctract/contractABI.json';
import Button from '../../../components/CustomButton/CustomButton';
import TraceabilitySkeleton from '../../../components/CustomSkeleton/TraceabilitySkeleton';

import api from '../../../api/tokenApi';
import {getUser} from '../../../utils/storage/authStorage';

import styles from './TraceabilitySection.styles';

const TraceabilityProcess = ({productCode, farmCode, userId}) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [processes, setProcesses] = useState([]);
  const [hashes, setHashes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const navigation = useNavigation();
  const storedUser = getUser();
  const user = storedUser?.userId ?? null;

  const canAddProcess = useMemo(() => {
    return user && userId && user === userId;
  }, [user, userId]);

  const processIcons = {
    0: 'seed',
    1: 'sprout',
    2: 'factory',
    3: 'warehouse',
    4: 'truck-delivery',
  };

  const processColors = {
    0: '#4CAF50',
    1: '#8BC34A',
    2: '#FFC107',
    3: '#FF9800',
    4: '#2196F3',
  };

  const processLabels = [
    'Gieo trồng',
    'Phun thuốc',
    'Bón phân',
    'Thu hoạch',
    'Phân phối',
  ];

  useEffect(() => {
    fetchTraceabilityData();
  }, []);

  const fetchTraceabilityData = async () => {
    try {
      setLoading(true);
      setError(null);

      const hashResponse = await api.get(`/api/process/${productCode}`);
      const hashesOnly =
        hashResponse.data?.process?.steps?.map(step => step.txHash) || [];
      setHashes(hashesOnly);

      const rpcProvider = new ethers.JsonRpcProvider(RPC_URL);
      const contractRead = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractArtifact.abi,
        rpcProvider,
      );

      const traceabilityResult = await contractRead.getAllProcesses(
        productCode,
      );

      const formattedProcesses = [];

      for (let i = 0; i < 5; i++) {
        const processArray = traceabilityResult[i];
        if (processArray && processArray.length > 0) {
          for (let j = 0; j < processArray.length; j++) {
            const p = processArray[j];
            if (p && Object.keys(p).length > 0) {
              const values = Object.values(p);

              let formattedProcess = {
                stepName: processLabels[i],
                timestamp:
                  Number(values[values.length - 1]) || Date.now() / 1000,
              };

              switch (i) {
                case 0:
                  formattedProcess = {
                    ...formattedProcess,
                    nameProcess: 'Quy trình Canh tác',
                    detail: values[0] || 'Không có mô tả',
                    stepName: values[1] || processLabels[i],
                    location: values[2] || 'Không rõ địa điểm',
                    date: values[3] || 'Không có ngày',
                    images: Array.isArray(values[4]) ? values[4] : [],
                  };
                  break;

                case 1:
                  formattedProcess = {
                    ...formattedProcess,
                    nameMedicine: values[0],
                    nameProcess: 'Quy trình Phun thuốc',
                    location: values[1],
                    date: values[2] || 'Không có ngày',
                    medicineType: values[3] || '',
                    applicationMethod: values[4] || '',
                    images: Array.isArray(values[5]) ? values[5] : [],
                  };
                  break;

                case 2:
                  formattedProcess = {
                    ...formattedProcess,
                    nameFertilizer: values[0],
                    nameProcess: 'Quy trình Bón phân',
                    location: values[1],
                    date: values[2] || 'Không có ngày',
                    fertilizerType: values[3] || '',
                    applicationMethod: values[4] || '',
                    expectedEffect: values[5] || '',
                    images: Array.isArray(values[6]) ? values[6] : [],
                  };
                  break;

                case 3:
                  formattedProcess = {
                    ...formattedProcess,
                    nameProcess: 'Quy trình Thu hoạch',
                    date: values[0] || 'Không có ngày',
                    estimatedQuantity: values[1],
                    actualQuantity: values[2],
                    quality: values[3],
                    harvestMethod: values[4] || '',
                    images: Array.isArray(values[5]) ? values[5] : [],
                  };
                  break;

                case 4:
                  formattedProcess = {
                    ...formattedProcess,
                    nameProcess: 'Quy trình Vận chuyển',
                    distributorName: values[0],
                    distributorPartner: values[1],
                    date: values[2] || 'Không có ngày',
                    transportMethod: values[3] || '',
                    storageConditions: values[4] || '',
                    images: Array.isArray(values[5]) ? values[5] : [],
                  };
                  break;
              }

              formattedProcesses.push(formattedProcess);
            }
          }
        }
      }

      if (formattedProcesses.length === 0) {
        setError('Chưa có quy trình nào được ghi nhận.');
      }

      setProcesses(formattedProcesses);
    } catch (error) {
      setError('Hiện chưa có thông tin truy xuất nguồn gốc');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchTraceabilityData();
  };

  const formatHash = hash => {
    if (!hash) return 'N/A';
    return `${hash.slice(0, 6)}...${hash.slice(-10)}`;
  };

  const openImageModal = images => {
    if (!images || !Array.isArray(images) || images.length === 0) {
      Alert.alert('Thông báo', 'Không có ảnh để hiển thị!');
      return;
    }
    setSelectedImages(images);
    setImageModalVisible(true);
  };

  const handleAddProcess = () => {
    navigation.navigate('Process', {productCode, farmCode});
  };

  const renderProcessItem = (process, index) => {
    const hash = hashes[index] || null;
    const icon = processIcons[index] || 'help-circle';
    const color = processColors[index] || '#9E9E9E';

    return (
      <View key={index} style={styles.processCard}>
        {/* Header với icon và status */}
        <View style={styles.processHeader}>
          <View style={[styles.iconContainer, {backgroundColor: color}]}>
            <Icon name={icon} size={24} color="#fff" />
          </View>
          <View style={styles.processHeaderText}>
            <Text style={styles.stepLabel}>Bước {index + 1}</Text>
            <Text style={styles.processTitle}>{process.nameProcess}</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Hoàn thành</Text>
          </View>
        </View>

        {/* Chi tiết */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Chi tiết</Text>

          {process.stepName && index === 0 && (
            <View style={styles.detailItem}>
              <Text style={styles.detailBullet}>• Tên giống:</Text>
              <Text style={styles.detailText}>{process.stepName}</Text>
            </View>
          )}

          {process.nameMedicine && (
            <View style={styles.detailItem}>
              <Text style={styles.detailBullet}>• Tên thuốc:</Text>
              <Text style={styles.detailText}>{process.nameMedicine}</Text>
            </View>
          )}

          {process.medicineType && (
            <View style={styles.detailItem}>
              <Text style={styles.detailBullet}>• Loại thuốc:</Text>
              <Text style={styles.detailText}>{process.medicineType}</Text>
            </View>
          )}

          {process.nameFertilizer && (
            <View style={styles.detailItem}>
              <Text style={styles.detailBullet}>• Tên phân bón:</Text>
              <Text style={styles.detailText}>{process.nameFertilizer}</Text>
            </View>
          )}

          {process.fertilizerType && (
            <View style={styles.detailItem}>
              <Text style={styles.detailBullet}>• Loại phân:</Text>
              <Text style={styles.detailText}>{process.fertilizerType}</Text>
            </View>
          )}

          {process.location && (
            <View style={styles.detailItem}>
              <Text style={styles.detailBullet}>
                {index === 0 ? '• Nguồn gốc:' : '• Số lượng:'}
              </Text>
              <Text style={styles.detailText}>{process.location}</Text>
            </View>
          )}

          {process.date && (
            <View style={styles.detailItem}>
              <Text style={styles.detailBullet}>
                {index === 0
                  ? '• Ngày trồng:'
                  : index === 1
                  ? '• Ngày phun thuốc:'
                  : index === 2
                  ? '• Ngày bón phân:'
                  : index === 3
                  ? '• Ngày thu hoạch:'
                  : '• Ngày phân phối:'}
              </Text>
              <Text style={styles.detailText}>{process.date}</Text>
            </View>
          )}

          {process.applicationMethod && (
            <View style={styles.detailItem}>
              <Text style={styles.detailBullet}>• Phương pháp:</Text>
              <ExpandableText text={process.applicationMethod} />
            </View>
          )}

          {process.expectedEffect && (
            <View style={styles.detailItem}>
              <Text style={styles.detailBullet}>• Hiệu quả:</Text>
              <ExpandableText text={process.expectedEffect} />
            </View>
          )}

          {process.estimatedQuantity && (
            <View style={styles.detailItem}>
              <Text style={styles.detailBullet}>• Sản lượng dự kiến:</Text>
              <Text style={styles.detailText}>
                {process.estimatedQuantity}/kg
              </Text>
            </View>
          )}

          {process.actualQuantity && (
            <View style={styles.detailItem}>
              <Text style={styles.detailBullet}>• Sản lượng thực tế:</Text>
              <Text style={styles.detailText}>{process.actualQuantity}/kg</Text>
            </View>
          )}

          {process.harvestMethod && (
            <View style={styles.detailItem}>
              <Text style={styles.detailBullet}>• Phương pháp:</Text>
              <ExpandableText text={process.harvestMethod} />
            </View>
          )}

          {process.quality && (
            <View style={styles.detailItem}>
              <Text style={styles.detailBullet}>• Chất lượng:</Text>
              <Text style={styles.detailText}>{process.quality}</Text>
            </View>
          )}

          {process.distributorName && (
            <View style={styles.detailItem}>
              <Text style={styles.detailBullet}>• Nhà phân phối:</Text>
              <Text style={styles.detailText}>{process.distributorName}</Text>
            </View>
          )}

          {process.distributorPartner && (
            <View style={styles.detailItem}>
              <Text style={styles.detailBullet}>• Đối tác phân phối:</Text>
              <Text style={styles.detailText}>
                {process.distributorPartner}
              </Text>
            </View>
          )}

          {process.transportMethod && (
            <View style={styles.detailItem}>
              <Text style={styles.detailBullet}>• Phương thức vận chuyển:</Text>
              <Text style={styles.detailText}>{process.transportMethod}</Text>
            </View>
          )}

          {process.storageConditions && (
            <View style={styles.detailItem}>
              <Text style={styles.detailBullet}>• Bảo quản:</Text>
              <Text style={styles.detailText}>{process.storageConditions}</Text>
            </View>
          )}

          {process.detail && (
            <View style={styles.detailItem}>
              <Text style={styles.detailBullet}>• Chi tiết:</Text>
              <ExpandableText text={process.detail} />
            </View>
          )}
        </View>

        {process.images && process.images.length > 0 && (
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => openImageModal(process.images)}>
            <Icon name="image-outline" size={20} color="#2196F3" />
            <Text style={styles.imageButtonText}>Ảnh xác nhận</Text>
          </TouchableOpacity>
        )}

        {hash && (
          <TouchableOpacity
            style={styles.hashContainer}
            onPress={() => Linking.openURL(`https://zeroscan.org/tx/${hash}`)}>
            <Text style={styles.hashLabel}>Mã hash:</Text>
            <Text style={styles.hashValue}>{formatHash(hash)}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (loading) return <TraceabilitySkeleton count={5} />;

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.errorText}>{error}</Text>
        {canAddProcess && (
          <Button.Main title="Thêm quy trình" onPress={handleAddProcess} />
        )}
      </View>
    );
  }

  if (processes.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Icon name="package-variant" size={64} color="#999" />
        <Text style={styles.emptyText}>Chưa có thông tin truy xuất</Text>
        <Text style={styles.emptySubText}>
          Sản phẩm này chưa có quy trình nào
        </Text>
        {canAddProcess && (
          <Button.Main title="Thêm quy trình" onPress={handleAddProcess} />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Truy xuất nguồn gốc</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2196F3']}
            tintColor="#2196F3"
          />
        }>
        <View style={styles.timeline}>
          {processes.map((process, index) => renderProcessItem(process, index))}
        </View>

        {canAddProcess && processes.length < 5 && (
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Button.Main title="Thêm quy trình" onPress={handleAddProcess} />
          </View>
        )}

        <View style={styles.footer}>
          <Icon name="information" size={20} color="#666" />
          <Text style={styles.footerText}>
            Tất cả thông tin được xác thực trên blockchain
          </Text>
        </View>
      </ScrollView>

      <Modal
        visible={imageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setImageModalVisible(false)}
        presentationStyle="overFullScreen">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Ảnh xác nhận ({selectedImages.length} ảnh)
              </Text>
              <TouchableOpacity
                onPress={() => setImageModalVisible(false)}
                style={{padding: 5}}>
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <ScrollView
              style={styles.modalScrollView}
              contentContainerStyle={{padding: 10, alignItems: 'center'}}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}>
              {selectedImages.length > 0 ? (
                selectedImages.map((uri, index) => (
                  <View
                    key={index}
                    style={{alignItems: 'center', marginBottom: 15}}>
                    <Image
                      source={{uri: uri || ''}}
                      style={styles.modalImage}
                      resizeMode="contain"
                    />
                    <Text style={{fontSize: 12, color: '#666', marginTop: 5}}>
                      Ảnh {index + 1}
                    </Text>
                  </View>
                ))
              ) : (
                <View style={{alignItems: 'center', padding: 20}}>
                  <Icon name="image-off" size={64} color="#999" />
                  <Text style={{color: '#999', textAlign: 'center'}}>
                    Không có ảnh nào
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TraceabilityProcess;
