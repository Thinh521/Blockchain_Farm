import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const setOnboarding = (key, value) => {
  storage.set(key, value);
};

export const getOnboarding = key => {
  return storage.getBoolean(key);
};

export const resetOnboarding = key => {
  storage.delete(key);
};
