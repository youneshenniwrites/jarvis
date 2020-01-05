import { Platform } from 'react-native';

import storage from '@react-native-firebase/storage';

export const imagePickerOptions = {
  noData: true,
  allowEditing: true,
};

export const FireBaseStorage = storage();

export const uploadFileToFireBase = imagePickerResponse => {
  const { fileName, path, uri } = imagePickerResponse;
  const fileSource = Platform.OS === 'android' ? path : uri;
  const storageRef = FireBaseStorage.ref(fileName);
  return storageRef.putFile(fileSource);
};

export const uploadProgress = ratio => Math.round(ratio * 100);
