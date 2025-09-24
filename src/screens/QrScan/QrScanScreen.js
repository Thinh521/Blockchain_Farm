import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity, Alert} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {useCodeScanner} from 'react-native-vision-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator';
import Clipboard from '@react-native-clipboard/clipboard';
import styles from './QrScan.styles';
import Button from '../../components/CustomButton/CustomButton';
import LoadingOverlay from '../../components/CustomLoading/LoadingOverlay';
import {useNavigation} from '@react-navigation/native';

const QrScanScreen = () => {
  const [scannedCode, setScannedCode] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const device = useCameraDevice('back');
  const navigation = useNavigation();

  const scanner = useCodeScanner({
    codeTypes: ['qr'],
   onCodeScanned: codes => {
  if (codes.length > 0) {
    const code = codes[0];
    const value = code.value || code.rawValue || code.displayValue;

    if (value) {
      try {
        const data = JSON.parse(value); // parse JSON
        const productCode = data.productCode;

        setScannedCode(productCode);
        setModalVisible(false);

        navigation.navigate('NoBottomTab', {
          screen: 'Product',
          params: { productCode },
        });
      } catch (err) {
        // nếu QR chỉ chứa productCode (string đơn giản) thì fallback
        console.log('QR không phải JSON, dùng value trực tiếp');
        setScannedCode(value);
        setModalVisible(false);

        navigation.navigate('NoBottomTab', {
          screen: 'Product',
          params: { productCode: value },
        });
      }
    }
  }
    },
  });

  // Select images and decode QR code
  const pickImageAndScan = async () => {
    try {
      const result = await launchImageLibrary({mediaType: 'photo'});
      if (result.assets && result.assets.length > 0) {
        const {uri} = result.assets[0];
        if (!uri) return;

        const response = await RNQRGenerator.detect({uri});
        if (response.values && response.values.length > 0) {
          setScannedCode(response.values[0]);
          setModalVisible(true);
        } else {
          Alert.alert('Thông báo', 'Không tìm thấy QR Code trong ảnh này');
        }
      }
    } catch (error) {
      console.error('Lỗi decode QR:', error);
    }
  };

  if (device == null) {
    return <LoadingOverlay />;
  }

  return (
    <View style={{flex: 1}}>
      <Camera
        style={{flex: 1}}
        device={device}
        isActive={!modalVisible}
        codeScanner={scanner}
      />
      <View style={styles.overlay}>
        <View style={styles.header}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Quét mọi mã QR</Text>
            <Text style={styles.subtitle}>Đặt mã QR vào khung để quét</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.frame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerButton}>
            <TouchableOpacity style={styles.button} onPress={pickImageAndScan}>
              <Ionicons name="image-outline" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.footerText}>Ảnh có sẵn</Text>
          </View>
          <View style={styles.footerButton}>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="time-outline" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.footerText}>Gần đây</Text>
          </View>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={{width: 24}} />
              <Text style={styles.modalTitle}>Kết quả QR Code</Text>
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContentWrapper}>
              <Text style={styles.modalContent}>{scannedCode}</Text>
            </View>
            <Button.Main
              title="Sao chép"
              style={styles.copyButton}
              onPress={() => {
                Clipboard.setString(scannedCode || '');
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default QrScanScreen;
