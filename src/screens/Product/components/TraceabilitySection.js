import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
  Linking,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ethers} from 'ethers';
import {CONTRACT_ADDRESS, RPC_URL} from '@env';
import contractArtifact from '../../SmartConctract/contractABI.json';
import api from '../../../api/tokenApi';
import styles from './TraceabilitySection.styles';
import TraceabilitySkeleton from '../../../components/CustomSkeleton/TraceabilitySkeleton';
import Button from '../../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {getUser} from '../../../utils/storage/authStorage';

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

  // ✅ Kiểm tra quyền được thêm quy trình
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

      const traceabilityResult = await contractRead.getAllProcesses(productCode);

      const processLabels = [
        'Gieo trồng',
        'Phun thuốc',
        'Bón phân',
        'Thu hoạch',
        'Phân phối',
      ];

      const formattedProcesses = [];

      for (let i = 0; i < 5; i++) {
        const processArray = traceabilityResult[i];
        if (processArray && processArray.length > 0) {
          for (let j = 0; j < processArray.length; j++) {
            const p = processArray[j];
            if (p && Object.keys(p).length > 0) {
              const values = Object.values(p);
              let formattedProcess = { stepName: processLabels[i] };

              switch (i) {
                case 0:
                  formattedProcess = {
                    ...formattedProcess,
                    nameProcess: 'Quy trình Canh tác',
                    detail: values[0],
                    location: values[2],
                    date: values[3],
                    images: Array.isArray(values[4]) ? values[4] : [],
                  };
                  break;
                case 1:
                  formattedProcess = {
                    ...formattedProcess,
                    nameProcess: 'Quy trình Phun thuốc',
                    nameMedicine: values[0],
                    location: values[1],
                    date: values[2],
                    medicineType: values[3],
                    images: Array.isArray(values[5]) ? values[5] : [],
                  };
                  break;
                case 2:
                  formattedProcess = {
                    ...formattedProcess,
                    nameProcess: 'Quy trình Bón phân',
                    nameFertilizer: values[0],
                    location: values[1],
                    date: values[2],
                    fertilizerType: values[3],
                    images: Array.isArray(values[6]) ? values[6] : [],
                  };
                  break;
                case 3:
                  formattedProcess = {
                    ...formattedProcess,
                    nameProcess: 'Quy trình Thu hoạch',
                    date: values[0],
                    estimatedQuantity: values[1],
                    actualQuantity: values[2],
                    quality: values[3],
                    images: Array.isArray(values[5]) ? values[5] : [],
                  };
                  break;
                case 4:
                  formattedProcess = {
                    ...formattedProcess,
                    nameProcess: 'Quy trình Vận chuyển',
                    distributorName: values[0],
                    distributorPartner: values[1],
                    date: values[2],
                    transportMethod: values[3],
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
    setSelectedImages(images);
    setImageModalVisible(true);
  };

  const handleAddProcess = () => {
    navigation.navigate('Process', {productCode, farmCode});
  };

  if (loading) return <TraceabilitySkeleton count={5} />;

  if (error) {
    return (
      <View style={styles.centerContainer}>
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
          {processes.map((process, index) => (
            <View key={index} style={styles.processCard}>
              <View style={styles.processHeader}>
                <View
                  style={[
                    styles.iconContainer,
                    {backgroundColor: processColors[index] || '#999'},
                  ]}>
                  <Icon
                    name={processIcons[index] || 'help-circle'}
                    size={24}
                    color="#fff"
                  />
                </View>
                <View style={styles.processHeaderText}>
                  <Text style={styles.stepLabel}>Bước {index + 1}</Text>
                  <Text style={styles.processTitle}>{process.nameProcess}</Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Hoàn thành</Text>
                </View>
              </View>

              <View style={styles.detailsSection}>
                <Text style={styles.sectionTitle}>Chi tiết</Text>
                {process.location && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailBullet}>• Khu vực:</Text>
                    <Text style={styles.detailText}>{process.location}</Text>
                  </View>
                )}
                {process.date && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailBullet}>• Ngày thực hiện:</Text>
                    <Text style={styles.detailText}>{process.date}</Text>
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

              {hashes[index] && (
                <TouchableOpacity
                  style={styles.hashContainer}
                  onPress={() =>
                    Linking.openURL(`https://zeroscan.org/tx/${hashes[index]}`)
                  }>
                  <Text style={styles.hashLabel}>Mã hash:</Text>
                  <Text style={styles.hashValue}>
                    {formatHash(hashes[index])}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* ✅ Nút thêm quy trình (khi chưa đủ 5) */}
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

      {/* Modal ảnh */}
      <Modal
        visible={imageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setImageModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ảnh xác nhận</Text>
              <TouchableOpacity onPress={() => setImageModalVisible(false)}>
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScrollView}>
              {selectedImages.map((uri, index) => (
                <Image
                  key={index}
                  source={{uri}}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TraceabilityProcess;
