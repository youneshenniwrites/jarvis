import { Platform } from 'react-native';

import storage from '@react-native-firebase/storage';

export const FireBaseStorage = storage();

export const imagePickerOptions = {
  noData: true,
};

const getFileLocalPath = response => {
  const { path, uri } = response;
  return Platform.OS === 'android' ? path : uri;
};

const createStorageReferenceToFile = response => {
  const { fileName } = response;
  return FireBaseStorage.ref(fileName);
};

export const uploadFileToFireBase = response => {
  const fileSource = getFileLocalPath(response);
  const storageRef = createStorageReferenceToFile(response);
  return storageRef.putFile(fileSource);
};

export const uploadProgress = ratio => Math.round(ratio * 100);
