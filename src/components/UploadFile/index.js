import React from 'react';
import { Button, StatusBar } from 'react-native';

import ImagePicker from 'react-native-image-picker';

import { imagePickerOptions } from '../../utils';

import { Container, Picture, Skeleton, ProgressBar } from '../../styles';
import { useUpload } from '../../hooks/useUpload';

const UploadFile = () => {
  const [{ downloadURL, uploading, progress }, monitorUpload] = useUpload();

  const uploadFile = () => {
    ImagePicker.launchImageLibrary(imagePickerOptions, imagePickerResponse => {
      const { didCancel, error } = imagePickerResponse;
      if (didCancel) {
        alert('Post canceled');
      } else if (error) {
        alert('An error occurred: ', error);
      } else {
        monitorUpload(imagePickerResponse);
      }
    });
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Button title="New Post" onPress={uploadFile} color="green" />
      {downloadURL && <Picture source={{ uri: downloadURL }} />}
      {uploading && (
        <>
          <Skeleton />
          <ProgressBar bar={progress} />
        </>
      )}
    </Container>
  );
};

export default UploadFile;
