import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

const QrScanScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        setIsLoading(true);
        const status = await Camera.requestCameraPermission();
        console.log('Camera permission status:', status);

        if (status === 'authorized') {
          setHasPermission(true);
        } else if (status === 'denied') {
          setHasPermission(false);
          Alert.alert(
            'Quyền camera bị từ chối',
            'Vui lòng vào Settings để cấp quyền camera cho ứng dụng',
          );
        } else {
          setHasPermission(false);
        }
      } catch (error) {
        console.error('Error requesting camera permission:', error);
        setHasPermission(false);
      } finally {
        setIsLoading(false);
      }
    };

    requestCameraPermission();
  }, []);

  // Hiển thị loading khi đang xin quyền
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Đang xin quyền camera...</Text>
      </View>
    );
  }

  // Hiển thị loading khi chưa có thiết bị camera
  if (!device) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Đang tải camera...</Text>
      </View>
    );
  }

  // Hiển thị thông báo khi chưa có quyền
  if (!hasPermission) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Chưa cấp quyền camera</Text>
        <Text style={styles.subText}>
          Vui lòng vào Settings để cấp quyền camera cho ứng dụng
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        // Thêm các props này để tối ưu hiệu suất
        format={device.formats.find(
          format => format.videoWidth === 1920 && format.videoHeight === 1080,
        )}
        fps={30}
        // Để chuẩn bị cho việc scan QR code sau này
        frameProcessor={undefined} // Sẽ thêm frameProcessor để scan QR
      />

      {/* Overlay UI cho QR scanner */}
      <View style={styles.overlay}>
        <View style={styles.scanArea}>
          <View style={styles.scanFrame} />
        </View>
        <Text style={styles.instructionText}>
          Hướng camera vào mã QR để quét
        </Text>
      </View>
    </View>
  );
};

export default QrScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    color: '#CCCCCC',
    fontSize: 14,
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#00FF00',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  instructionText: {
    color: 'white',
    fontSize: 16,
    marginTop: 30,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
});
