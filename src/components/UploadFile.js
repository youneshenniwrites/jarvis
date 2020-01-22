import React from 'react';
import { Button, StatusBar } from 'react-native';

import ImagePicker from 'react-native-image-picker';

import { imagePickerOptions, register } from '../utils';

import { Container, Picture, Skeleton, ProgressBar } from '../styles';
import { useUpload } from '../hooks';

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
      <Button
        title="Register"
        onPress={() => register('ggg@gmail.com', 'cambridge2020')}
        color="blue"
      />
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
