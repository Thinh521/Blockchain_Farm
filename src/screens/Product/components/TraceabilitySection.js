import React, {useCallback, useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import {ethers} from 'ethers';
import {CONTRACT_ADDRESS, RPC_URL} from '@env';
import {useQuery} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/core';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Button from '../../../components/CustomButton/CustomButton';
import contractArtifact from '../../SmartConctract/contractABI.json';
import {useFocusEffect} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import TraceabilitySkeleton from '../../../components/CustomSkeleton/TraceabilitySkeleton';
import api from '../../../api/baseApi';
import styles from './TraceabilitySection.styles';
import {scale} from '../../../utils/scaling';
import {getUser} from '../../../utils/storage/authStorage';

const STEP_CONFIG = [
  {
    title: 'Quy trình canh tác',
    icon: '🌱',
    responsible: 'Nông dân',
    detailKeys: ['nameProcess', 'source', 'plantingDate', 'sowingDate'],
    dateKey: ['sowingDate', 'plantingDate'],
    locationKey: 'source',
  },
  {
    title: 'Sử dụng thuốc bảo vệ thực vật',
    icon: '💊',
    detailKeys: [
      'nameMedicine',
      'quantityMedicine',
      'medicineDate',
      'medicineType',
    ],
    dateKey: 'medicineDate',
    locationKey: null,
  },
  {
    title: 'Sử dụng phân bón',
    icon: '🌿',
    detailKeys: [
      'nameFertilizer',
      'quantityFertilizer',
      'fertilizerDate',
      'fertilizerType',
    ],
    dateKey: 'fertilizerDate',
    locationKey: null,
  },
  {
    title: 'Thu hoạch',
    icon: '🌾',
    detailKeys: [
      'harvestDate',
      'estimatedQuantity',
      'actualQuantity',
      'quality',
    ],
    dateKey: 'harvestDate',
    locationKey: null,
  },
  {
    title: 'Phân phối',
    icon: '🚚',
    detailKeys: [
      'distributorName',
      'distributorPartner',
      'distributionDate',
      'transportMethod',
    ],
    dateKey: 'distributionDate',
    locationKey: 'distributorPartner',
    responsibleKey: 'distributorName',
  },
];

const DETAIL_LABELS = {
  nameProcess: 'Tên giống',
  source: 'Nguồn gốc',
  plantingDate: 'Ngày trồng',
  sowingDate: 'Ngày gieo',
  nameMedicine: 'Tên thuốc',
  quantityMedicine: 'Số lượng thuốc',
  medicineDate: 'Ngày sử dụng thuốc',
  medicineType: 'Loại thuốc',
  nameFertilizer: 'Tên phân bón',
  quantityFertilizer: 'Số lượng phân bón',
  fertilizerDate: 'Ngày bón phân',
  fertilizerType: 'Loại phân bón',
  harvestDate: 'Ngày thu hoạch',
  estimatedQuantity: 'Sản lượng dự kiến',
  actualQuantity: 'Sản lượng thực tế',
  quality: 'Chất lượng',
  distributorName: 'Nhà phân phối',
  distributorPartner: 'Đối tác',
  distributionDate: 'Ngày phân phối',
  transportMethod: 'Phương thức vận chuyển',
};

const TraceabilitySection = ({productCode, farmCode, userId}) => {
  const queryClient = useQueryClient();

  const navigation = useNavigation();

  const storedUser = getUser();
  const user = storedUser.userId;
  const canAddProcess = useMemo(() => {
    return user && userId && user === userId;
  }, [user, userId]);

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries(['traceability', productCode]);
    }, [queryClient, productCode]),
  );

  const hasProcessData = process =>
    Object.values(process).some(value => value && value !== '');

  const fetchTraceability = async () => {
    if (!productCode) return [];

    const rpcProvider = new ethers.JsonRpcProvider(RPC_URL);
    const contractRead = new ethers.Contract(
      CONTRACT_ADDRESS,
      contractArtifact.abi,
      rpcProvider,
    );

    const traceabilityResult =
      await contractRead.getCompleteProductTraceability(productCode);
    const hashResponse = await api.get(`/api/process/${productCode}`);
    const hashesOnly =
      hashResponse.data?.process?.steps?.map(step => step.txHash) || [];

    const processData = traceabilityResult.slice(1, 6);

    return processData
      .map((process, index) => {
        if (!hasProcessData(process)) return null;

        const config = STEP_CONFIG[index];

        const details = Object.fromEntries(
          config.detailKeys
            .filter(key => process[key])
            .map(key => [key, process[key]]),
        );

        return {
          id: index,
          step: `Bước ${index + 1}`,
          title: config.title,
          status: 'Hoàn thành',
          hash: hashesOnly[index] || 'Không có mã hash',
          details: Object.keys(details).length > 0 ? details : null,
          icon: config.icon,
        };
      })
      .filter(Boolean);
  };

  const {
    data: traceabilityData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['traceability', productCode],
    queryFn: fetchTraceability,
    enabled: !!productCode,
  });
  const showAddButton = useMemo(
    () => traceabilityData.length < 5 && traceabilityData.length > 0,
    [traceabilityData.length],
  );

  const handleProcessPress = useCallback(() => {
    navigation.navigate('Process', {productCode, farmCode});
  }, [navigation, productCode, farmCode]);

  const handleHashPress = useCallback(hash => {
    if (hash && hash !== 'Không có mã hash') {
      Linking.openURL(`https://zeroscan.org/tx/${hash}`).catch(err =>
        console.log('Không thể mở URL:', err),
      );
    }
  }, []);

  const getStatusColor = status => {
    const colors = {
      'hoàn thành': '#10B981',
      completed: '#10B981',
      'đang thực hiện': '#F59E0B',
      in_progress: '#F59E0B',
      'chờ xử lý': '#6B7280',
      pending: '#6B7280',
    };
    return colors[status?.toLowerCase()] || '#10B981';
  };

  const renderTraceabilityItem = ({item, index}) => {
    const isLast = index === traceabilityData.length - 1;
    const statusColor = getStatusColor(item.status);

    return (
      <View style={styles.traceabilityItem}>
        <View style={styles.traceabilityTimeline}>
          <View style={[styles.timelineIcon, {backgroundColor: statusColor}]}>
            <Text style={styles.timelineIconText}>{item.icon}</Text>
          </View>
          {!isLast && <View style={styles.timelineLine} />}
        </View>

        <View style={styles.traceabilityContent}>
          <View style={styles.traceabilityCard}>
            <View style={styles.traceabilityHeader}>
              <Text style={styles.traceabilityStep}>{item.step}</Text>
              <View
                style={[styles.statusBadge, {backgroundColor: statusColor}]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>

            <Text style={styles.traceabilityTitle}>{item.title}</Text>

            <View>
              {item.details && (
                <View style={styles.additionalDetails}>
                  <Text style={styles.additionalDetailsTitle}>Chi tiết</Text>
                  {Object.entries(item.details).map(([key, value]) => (
                    <View key={key} style={styles.detailRow}>
                      <Text style={styles.detailLabel}>
                        • {DETAIL_LABELS[key] || key}:{' '}
                      </Text>
                      <Text style={styles.detailValue} numberOfLines={1}>
                        {value}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {item.hash && (
                <TouchableOpacity onPress={() => handleHashPress(item.hash)}>
                  <Text
                    style={styles.hashText}
                    numberOfLines={1}
                    ellipsizeMode="middle">
                    Mã hash: <Text style={styles.hashLink}>{item.hash}</Text>
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {item.images?.length > 0 && (
              <View style={styles.traceabilityImages}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {item.images.map((image, imgIndex) => (
                    <Image
                      key={imgIndex}
                      source={{uri: image}}
                      style={styles.traceabilityImage}
                      resizeMode="cover"
                    />
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Truy xuất nguồn gốc</Text>
        {isLoading ? (
          <SkeletonPlaceholder borderRadius={16} speed={1000}>
            <SkeletonPlaceholder.Item width={80} height={14} />
          </SkeletonPlaceholder>
        ) : (
          <Text style={styles.sectionSubtitle}>
            {traceabilityData.length} quy trình
          </Text>
        )}
      </View>

      {isLoading ? (
        <TraceabilitySkeleton count={4} />
      ) : isError ? (
        <View style={styles.emptyTraceability}>
          <Text style={styles.emptyText}>Chưa cập nhật quy trình</Text>
          {canAddProcess && (
            <Button.Main
              title="Thêm quy trình"
              style={{marginTop: scale(12)}}
              onPress={handleProcessPress}
            />
          )}
        </View>
      ) : traceabilityData.length === 0 ? (
        <View style={styles.emptyTraceability}>
          <Text style={styles.emptyText}>
            📋 Chưa có thông tin truy xuất nguồn gốc
          </Text>
          {canAddProcess && (
            <Button.Main
              title="Thêm quy trình"
              style={{marginTop: 12}}
              onPress={handleProcessPress}
            />
          )}
        </View>
      ) : (
        <>
          <FlatList
            data={traceabilityData}
            renderItem={renderTraceabilityItem}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
          {showAddButton && canAddProcess && (
            <View style={styles.emptyTraceability}>
              <Button.Main
                title="Thêm quy trình"
                onPress={handleProcessPress}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default React.memo(TraceabilitySection);
