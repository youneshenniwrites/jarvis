import React, { useState } from 'react';
import { Button, StatusBar } from 'react-native';

import ImagePicker from 'react-native-image-picker';

import {
  imagePickerOptions,
  uploadFileToFireBase,
  uploadProgress,
} from '../../utils';
import { Container, Picture, Skeleton, ProgressBar } from '../../styles';

const UploadFile = () => {
  const [upload, setUpload] = useState({
    loading: false,
    progress: 0,
  });
  const [imageURI, setImageURI] = useState(null);

  const monitorFileUpload = task => {
    task.on('state_changed', snapshot => {
      const progress = uploadProgress(
        snapshot.bytesTransferred / snapshot.totalBytes
      );
      switch (snapshot.state) {
        case 'running':
          setImageURI(null);
          setUpload({ loading: true, progress });
          break;
        case 'success':
          snapshot.ref.getDownloadURL().then(downloadURL => {
            setImageURI({ uri: downloadURL });
            setUpload({ loading: false });
          });
          break;
        default:
          break;
      }
    });
  };

  const uploadFile = () => {
    ImagePicker.launchImageLibrary(imagePickerOptions, imagePickerResponse => {
      const { didCancel, error } = imagePickerResponse;
      if (didCancel) {
        alert('Post canceled');
      } else if (error) {
        alert('An error occurred: ', error);
      } else {
        const uploadTask = uploadFileToFireBase(imagePickerResponse);
        monitorFileUpload(uploadTask);
      }
    });
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Button title="New Post" onPress={uploadFile} color="green" />
      {imageURI && <Picture source={imageURI} />}
      {upload.loading && (
        <>
          <Skeleton />
          <ProgressBar bar={upload.progress} />
        </>
      )}
    </Container>
  );
};

export default UploadFile;
