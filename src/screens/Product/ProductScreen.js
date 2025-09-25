import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {ethers} from 'ethers';
import {CONTRACT_ADDRESS} from '@env';
import contractArtifact from '../SmartConctract/contractABI.json';
import Images from '../../assets/images/images';
import api from '../../api/baseApi';
import QRCode from 'react-native-qrcode-svg';
import styles from './ProductScreen.style';
import {QrTabIcon} from '../../assets/icons';

const RPC_URL = 'https://rpc.zeroscan.org';

const TraceabilitySection = React.memo(({productCode}) => {
  const [traceabilityData, setTraceabilityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hashes, setHashes] = useState([]);

  const fetchTraceability = useCallback(async () => {
    if (!productCode) return;
    try {
      setLoading(true);

      const rpcProvider = new ethers.JsonRpcProvider(RPC_URL);
      const contractRead = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractArtifact.abi,
        rpcProvider,
      );

      const traceabilityResult =
        await contractRead.getCompleteProductTraceability(productCode);

      const hashResponse = await api.get(`/api/process/${productCode}`);
      const hashData = hashResponse.data?.process?.steps || [];

      const hashesOnly = hashData.map(step => step.txHash);

      setHashes(hashesOnly);

      const processData = traceabilityResult.slice(1, 6);

      const formattedData = processData.map((process, index) => {
        console.log(`\nProcess ${index + 1}:`, process);

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
      setTraceabilityData(formattedData);
    } catch (err) {
      console.log('Error fetching traceability:', err);
    } finally {
      setLoading(false);
    }
  }, [productCode]);

  useEffect(() => {
    fetchTraceability();
  }, [fetchTraceability]);

  const getDetailLabel = key => {
    const labelMap = {
      // Farming Process
      nameProcess: 'Tên giống',
      source: 'Nguồn gốc',
      plantingDate: 'Ngày trồng',
      sowingDate: 'Ngày gieo',

      // Medicine Usage
      nameMedicine: 'Tên thuốc',
      quantityMedicine: 'Số lượng thuốc',
      medicineDate: 'Ngày sử dụng thuốc',
      medicineType: 'Loại thuốc',

      // Fertilizer Usage
      nameFertilizer: 'Tên phân bón',
      quantityFertilizer: 'Số lượng phân bón',
      fertilizerDate: 'Ngày bón phân',
      fertilizerType: 'Loại phân bón',

      // Harvest Information
      harvestDate: 'Ngày thu hoạch',
      estimatedQuantity: 'Sản lượng dự kiến',
      actualQuantity: 'Sản lượng thực tế',
      quality: 'Chất lượng',

      // Distribution
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

  // Hàm xử lý nhấn vào mã hash
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
            <View style={styles.traceabilityDetails}>
              {/* Hiển thị mã hash */}
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
                                       
              {/* Hiển thị thông tin chi tiết dựa trên từng quy trình */}
              {item.details && Object.keys(item.details).length > 0 && (
                <View style={styles.additionalDetails}>
                  <Text style={styles.additionalDetailsTitle}>Chi tiết:</Text>
                  {Object.entries(item.details).map(
                    ([key, value]) =>
                      value &&
                      value !== 'Không xác định' && (
                        <View key={key} style={styles.detailRow}>
                          <Text style={styles.detailLabel}>
                            • {getDetailLabel(key)}:
                          </Text>
                          <Text style={styles.detailValue}>{value}</Text>
                        </View>
                      ),
                  )}
                </View>
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
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Truy xuất nguồn gốc</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#10B981" />
        ) : (
          <Text style={styles.sectionSubtitle}>
            {traceabilityData.length} quy trình
          </Text>
        )}
      </View>

      {loading ? (
        <View style={styles.traceabilityLoading}>
          <ActivityIndicator size="large" color="#10B981" />
          <Text style={styles.loadingText}>
            Đang tải quy trình truy xuất...
          </Text>
        </View>
      ) : traceabilityData.length === 0 ? (
        <View style={styles.emptyTraceability}>
          <Text style={styles.emptyText}>
            📋 Chưa có thông tin truy xuất nguồn gốc
          </Text>
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
});

const RelatedProducts = React.memo(
  ({farmCode, currentProductCode, navigation}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRelatedProducts = useCallback(async () => {
      if (!farmCode || !currentProductCode) return;
      try {
        setLoading(true);
        // 1. Backend: lấy danh sách productCode
        const backendRes = await api.get(`/api/farms/${farmCode}/products`);
        const backendCodes = (backendRes.data?.data || []).map(
          p => p.productCode,
        );

        // 2. SC: lấy danh sách sản phẩm
        const rpcProvider = new ethers.JsonRpcProvider(RPC_URL);
        const contractRead = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractArtifact.abi,
          rpcProvider,
        );
        const productsData = await contractRead.getProductByFarmCode(farmCode);

        // 3. Format + lọc theo backend
        const formattedProducts = productsData
          .filter(
            p =>
              p.productCode !== currentProductCode &&
              backendCodes.includes(p.productCode),
          )
          .slice(0, 10)
          .map(p => ({
            farmCode: p.farmCode,
            productCode: p.productCode,
            categoryName: p.categoryName,
            name: p.name,
            quantity: p.quantity,
            price: p.price,
            image:
              typeof p.image === 'string'
                ? p.image
                    .split(/[,|]/)
                    .map(url => url.trim())
                    .filter(Boolean)
                : [],
            description: p.description,
          }));
        setProducts(formattedProducts);
      } catch (err) {
        console.log('Error fetching related products:', err);
      } finally {
        setLoading(false);
      }
    }, [farmCode, currentProductCode]);

    useEffect(() => {
      fetchRelatedProducts();
    }, [fetchRelatedProducts]);

    const handleProductPress = useCallback(
      item => navigation.navigate('Product', {productCode: item.productCode}),
      [navigation],
    );

    const renderRelatedProduct = ({item}) => {
      const imageSource =
        item.image?.length > 0 ? {uri: item.image[0]} : Images.bg;
      return (
        <TouchableOpacity
          style={styles.relatedCard}
          onPress={() => handleProductPress(item)}
          activeOpacity={0.8}>
          <View style={styles.relatedImageContainer}>
            <Image
              source={imageSource}
              style={styles.relatedImage}
              resizeMode="cover"
            />
            <View style={styles.relatedBadge}>
              <Text style={styles.relatedBadgeText}>{item.categoryName}</Text>
            </View>
          </View>
          <View style={styles.relatedContent}>
            <Text style={styles.relatedName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.relatedPrice}>{item.price}</Text>
            <Text style={styles.relatedStock}>
              Còn {item.quantity} sản phẩm
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sản phẩm cùng trang trại</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#10B981" />
          ) : (
            <Text style={styles.sectionSubtitle}>
              {products.length} sản phẩm
            </Text>
          )}
        </View>
        {loading ? (
          <Text style={styles.loadingText}>Đang tải sản phẩm...</Text>
        ) : products.length === 0 ? (
          <Text style={styles.emptyText}>
            Chưa có sản phẩm khác từ trang trại này
          </Text>
        ) : (
          <FlatList
            data={products}
            renderItem={renderRelatedProduct}
            keyExtractor={item => item.productCode}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.relatedList}
            ItemSeparatorComponent={() => <View style={{width: 12}} />}
          />
        )}
      </View>
    );
  },
);

const ProductScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {productCode} = route.params || {};
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showQRModal, setShowQRModal] = useState(false);
  const [hashes, setHashes] = useState([]);

  useEffect(() => {
    const fetchHashes = async () => {
      try {
        const hashResponse = await api.get(`/api/process/${productCode}`);
        const hashData = hashResponse.data?.process?.steps || [];

        const hashesOnly = hashData.slice(0, 5).map(step => ({
          name: step.stepName,
          hash: step.txHash,
        }));
        setHashes(hashesOnly);

        console.log('Hashes only:', hashesOnly);
      } catch (err) {
        console.error('Lỗi fetch hashes:', err);
      }
    };

    if (productCode) {
      fetchHashes();
    }
  }, [productCode]);

  // 🔹 tạo giá trị QR
  const qrValue = useMemo(() => {
    if (!product) return '';
    return JSON.stringify({
      productCode: product.productCode,
      hashes: hashes || [],
    });
  }, [product, hashes]);

  const fetchProduct = useCallback(async () => {
    if (!productCode) return;
    try {
      setIsLoading(true);
      const rpcProvider = new ethers.JsonRpcProvider(RPC_URL);
      const contractRead = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractArtifact.abi,
        rpcProvider,
      );
      const productData = await contractRead.getProduct(productCode);

      const images =
        typeof productData[7] === 'string'
          ? productData[7]
              .split(/[,|]/)
              .map(url => url.trim())
              .filter(Boolean)
          : [];

      setProduct({
        farmCode: productData[0],
        productCode: productData[1],
        categoryName: productData[2],
        name: productData[3],
        quantity: productData[4],
        price: productData[5],
        description: productData[6],
        image: images,
      });
    } catch (err) {
      console.log('Error fetch product:', err);
    } finally {
      setIsLoading(false);
    }
  }, [productCode]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleQRPress = useCallback(() => {
    setShowQRModal(true);
  }, []);

  const closeQRModal = useCallback(() => {
    setShowQRModal(false);
  }, []);

  const renderImageGallery = useMemo(() => {
    if (!product?.image || product.image.length === 0) {
      return (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>📷 Không có hình ảnh</Text>
        </View>
      );
    }

    return (
      <View style={styles.galleryContainer}>
        <Image
          source={{uri: product.image[selectedImageIndex]}}
          style={styles.mainImage}
          resizeMode="cover"
        />
        <View style={styles.imageCounter}>
          <Text style={styles.imageCounterText}>
            {selectedImageIndex + 1}/{product.image.length}
          </Text>
        </View>

        {product.image.length > 1 && (
          <FlatList
            data={product.image}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={[
                  styles.thumbnail,
                  selectedImageIndex === index && styles.selectedThumbnail,
                ]}
                onPress={() => setSelectedImageIndex(index)}
                activeOpacity={0.8}>
                <Image
                  source={{uri: item}}
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.thumbnailContainer}
            ItemSeparatorComponent={() => <View style={{width: 8}} />}
          />
        )}
      </View>
    );
  }, [product?.image, selectedImageIndex]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#10B981" />
        <Text style={styles.loadingMainText}>
          Đang tải chi tiết sản phẩm...
        </Text>
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.errorText}>⚠️ Không tìm thấy sản phẩm</Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.primaryButtonText}>Quay lại</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {renderImageGallery}

        <View style={styles.productInfo}>
          <View style={styles.productHeader}>
            <Text style={styles.productTitle}>{product.name}</Text>
            <TouchableOpacity style={styles.qrBadge} onPress={handleQRPress}>
              <QrTabIcon />
            </TouchableOpacity>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>{product.price}/kg</Text>
            <Text
              style={[
                styles.stockText,
                {color: product.quantity > 0 ? '#10B981' : '#EF4444'},
              ]}>
              {product.quantity > 0 ? `Còn ${product.quantity} kg` : 'Hết hàng'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mô tả sản phẩm</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <TraceabilitySection productCode={product.productCode} />
        

        <RelatedProducts
          farmCode={product.farmCode}
          currentProductCode={product.productCode}
          navigation={navigation}
        />

        {/* Modal hiển thị mã QR lớn */}
        <Modal
          visible={showQRModal}
          transparent
          animationType="fade"
          onRequestClose={closeQRModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Quét mã QR để xem truy xuất</Text>
              <QRCode
                value={qrValue}
                size={200}
                backgroundColor="#ffffff"
                color="#000000"
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeQRModal}>
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductScreen;
