import {Camera} from 'react-native-vision-camera';

// Camera permission required
export async function requestCameraPermission() {
  try {
    const status = await Camera.requestCameraPermission();
    return status === 'authorized' || status === 'granted';
  } catch (error) {
    console.log('Camera permission error:', error);
    return false;
  }
}

// Check camera permission
export async function checkCameraPermission() {
  const status = await Camera.getCameraPermissionStatus();
  return status === 'authorized' || status === 'granted';
}
