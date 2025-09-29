import React, {useCallback} from 'react';
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
import TraceabilitySkeleton from '../../../components/CustomSkeleton/TraceabilitySkeleton';

import api from '../../../api/baseApi';

import styles from './TraceabilitySection.styles';
import {scale} from '../../../utils/scaling';

const TraceabilitySection = ({productCode, farmCode}) => {
  const navigation = useNavigation();

  const fetchTraceability = async () => {
    if (!productCode) return [];
    if (!productCode) return [];

    const rpcProvider = new ethers.JsonRpcProvider(RPC_URL);
    const contractRead = new ethers.Contract(
      CONTRACT_ADDRESS,
      contractArtifact.abi,
      rpcProvider,
    );

    const traceabilityResult =
      await contractRead.getCompleteProductTraceability(productCode);
    await contractRead.getCompleteProductTraceability(productCode);

    const hashResponse = await api.get(`/api/process/${productCode}`);
    const hashData = hashResponse.data?.process?.steps || [];
    const hashesOnly = hashData.map(step => step.txHash);

    const processData = traceabilityResult.slice(1, 6);

    const formattedData = processData.map((process, index) => {
      switch (index) {
        case 0:
          return {
            id: index,
            step: 'Bước 1',
            title: '🌱 Quy trình canh tác',
            date:
              process.sowingDate || process.plantingDate || 'Không xác định',
            location: process.source || 'Không xác định',
            responsible: 'Nông dân',
            status: 'Hoàn thành',
            images: [],
            hash: hashesOnly[index] || 'Không có mã hash',
            details: {
              nameProcess: process.nameProcess,
              source: process.source,
              plantingDate: process.plantingDate,
              sowingDate: process.sowingDate,
            },
          };
        case 1:
          return {
            id: index,
            step: 'Bước 2',
            title: '💊 Sử dụng thuốc bảo vệ thực vật',
            description: `Thuốc: ${process.nameMedicine}\nSố lượng: ${process.quantityMedicine}\nLoại: ${process.medicineType}`,
            date: process.medicineDate || 'Không xác định',
            location: 'Trang trại',
            responsible: 'Kỹ thuật viên',
            status: 'Hoàn thành',
            images: [],
            hash: hashesOnly[index] || 'Không có mã hash',
            details: {
              nameMedicine: process.nameMedicine,
              quantityMedicine: process.quantityMedicine,
              medicineDate: process.medicineDate,
              medicineType: process.medicineType,
            },
          };
        case 2:
          return {
            id: index,
            step: 'Bước 3',
            title: '🌿 Sử dụng phân bón',
            description: `Phân bón: ${process.nameFertilizer}\nSố lượng: ${process.quantityFertilizer}\nLoại: ${process.fertilizerType}`,
            date: process.fertilizerDate || 'Không xác định',
            location: 'Trang trại',
            responsible: 'Kỹ thuật viên',
            status: 'Hoàn thành',
            images: [],
            hash: hashesOnly[index] || 'Không có mã hash',
            details: {
              nameFertilizer: process.nameFertilizer,
              quantityFertilizer: process.quantityFertilizer,
              fertilizerDate: process.fertilizerDate,
              fertilizerType: process.fertilizerType,
            },
          };
        case 3:
          return {
            id: index,
            step: 'Bước 4',
            title: '🌾 Thu hoạch',
            description: `Ngày thu hoạch: ${process.harvestDate}\nSản lượng dự kiến: ${process.estimatedQuantity}\nSản lượng thực tế: ${process.actualQuantity}`,
            date: process.harvestDate || 'Không xác định',
            location: 'Trang trại',
            responsible: 'Đội thu hoạch',
            status: 'Hoàn thành',
            images: [],
            hash: hashesOnly[index] || 'Không có mã hash',
            details: {
              harvestDate: process.harvestDate,
              estimatedQuantity: process.estimatedQuantity,
              actualQuantity: process.actualQuantity,
              quality: process.quality,
            },
          };
        case 4:
          return {
            id: index,
            step: 'Bước 5',
            title: '🚚 Phân phối',
            description: `Nhà phân phối: ${process.distributorName}\nĐối tác: ${process.distributorPartner}\nPhương thức vận chuyển: ${process.transportMethod}`,
            date: process.distributionDate || 'Không xác định',
            location: process.distributorPartner || 'Không xác định',
            responsible: process.distributorName || 'Nhà phân phối',
            status: 'Hoàn thành',
            images: [],
            hash: hashesOnly[index] || 'Không có mã hash',
            details: {
              distributorName: process.distributorName,
              distributorPartner: process.distributorPartner,
              distributionDate: process.distributionDate,
              transportMethod: process.transportMethod,
            },
          };
        default:
          return {
            id: index,
            step: `Bước ${index + 1}`,
            title: 'Quy trình không xác định',
            description: 'Không có thông tin',
            date: 'Không xác định',
            location: 'Không xác định',
            responsible: 'Không xác định',
            status: 'Hoàn thành',
            images: [],
            hash: 'Không có mã hash',
          };
      }
    });

    return formattedData;
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

  const handleProcessPress = useCallback(() => {
    navigation.navigate('Process', {productCode, farmCode});
  }, [navigation, productCode, farmCode]);

  const getDetailLabel = key => {
    const labelMap = {
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
    return labelMap[key] || key;
  };

  const getStepIcon = (index, total) => {
    const icons = ['🌱', '🏪', '💧', '🌾', '📦', '🚚'];
    return icons[index % icons.length];
  };

  const getStatusColor = status => {
    switch (status?.toLowerCase()) {
      case 'hoàn thành':
      case 'completed':
        return '#10B981';
      case 'đang thực hiện':
      case 'in_progress':
        return '#F59E0B';
      case 'chờ xử lý':
      case 'pending':
        return '#6B7280';
      default:
        return '#10B981';
    }
  };

  const handleHashPress = hash => {
    if (hash && hash !== 'Không có mã hash') {
      const url = `https://zeroscan.org/tx/${hash}`;
      Linking.openURL(url).catch(err => console.log('Không thể mở URL:', err));
    }
  };

  const renderTraceabilityItem = ({item, index}) => {
    const isLast = index === traceabilityData.length - 1;

    return (
      <View style={styles.traceabilityItem}>
        <View style={styles.traceabilityTimeline}>
          <View
            style={[
              styles.timelineIcon,
              {backgroundColor: getStatusColor(item.status)},
            ]}>
            <Text style={styles.timelineIconText}>
              {getStepIcon(index, traceabilityData.length)}
            </Text>
          </View>
          {!isLast && <View style={styles.timelineLine} />}
        </View>

        <View style={styles.traceabilityContent}>
          <View style={styles.traceabilityCard}>
            <View style={styles.traceabilityHeader}>
              <Text style={styles.traceabilityStep}>{item.step}</Text>
              <View
                style={[
                  styles.statusBadge,
                  {backgroundColor: getStatusColor(item.status)},
                ]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>

            <Text style={styles.traceabilityTitle}>{item.title}</Text>

            <View>
              {item.details && Object.keys(item.details).length > 0 && (
                <View style={styles.additionalDetails}>
                  <Text style={styles.additionalDetailsTitle}>Chi tiết</Text>
                  {Object.entries(item.details).map(
                    ([key, value]) =>
                      value &&
                      value !== 'Không xác định' && (
                        <View key={key} style={styles.detailRow}>
                          <Text style={styles.detailLabel}>
                            • {getDetailLabel(key)}:{' '}
                          </Text>
                          <Text style={styles.detailValue} numberOfLines={1}>
                            {value}
                          </Text>
                        </View>
                      ),
                  )}
                </View>
              )}

              {item.description && (
                <View>
                  <Text style={styles.additionalDetailsTitle}>Mô tả</Text>
                  <Text style={styles.traceabilityDescription}>
                    {item.description}
                  </Text>
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

            {item.images && item.images.length > 0 && (
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
          <Text style={styles.emptyText}>Lỗi tải dữ liệu</Text>
          <Button.Main
            title="Thêm quy trình"
            style={{marginTop: scale(12)}}
            onPress={handleProcessPress}
          />
        </View>
      ) : traceabilityData.length === 0 ? (
        <View style={styles.emptyTraceability}>
          <Text style={styles.emptyText}>
            📋 Chưa có thông tin truy xuất nguồn gốc
          </Text>
          <Button.Main
            title="Thêm quy trình"
            style={{marginTop: 12}}
            onPress={handleProcessPress}
          />
        </View>
      ) : (
        <FlatList
          data={traceabilityData}
          renderItem={renderTraceabilityItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      )}
    </View>
  );
};

export default React.memo(TraceabilitySection);
