import { Platform } from 'react-native';

import storage from '@react-native-firebase/storage';

export const FireBaseStorage = storage();

export const imagePickerOptions = {
  noData: true,
};

export const getPercentage = ratio => Math.round(ratio * 100);

export const generateRandomString = () =>
  Math.random()
    .toString(36)
    .slice(3);

const getFileLocalPath = response => {
  const { path, uri } = response;
  return Platform.OS === 'android' ? path : uri;
};

const createStorageReferenceToFile = response => {
  const { fileName } = response;
  const id = generateRandomString();
  return FireBaseStorage.ref(`images/${id}-${fileName}`);
};

export const uploadFileToFireBase = response => {
  const fileSource = getFileLocalPath(response);
  const storageRef = createStorageReferenceToFile(response);
  return storageRef.putFile(fileSource);
};
