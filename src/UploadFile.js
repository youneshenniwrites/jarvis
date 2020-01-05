import React, { useState } from 'react';
import { Button, StatusBar } from 'react-native';

import ImagePicker from 'react-native-image-picker';

import {
  imagePickerOptions,
  uploadFileToFireBase,
  uploadProgress,
} from './utils';
import { Container, Picture, Skeleton, ProgressBar } from './style';

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

  const postNewFile = () => {
    ImagePicker.launchImageLibrary(imagePickerOptions, response => {
      if (response.didCancel) {
        alert('Post canceled');
      } else if (response.error) {
        alert('An error occurred: ', response.error);
      } else {
        const uploadTask = uploadFileToFireBase(response);
        monitorFileUpload(uploadTask);
      }
    });
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Button title="New Post" onPress={postNewFile} color="green" />
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
