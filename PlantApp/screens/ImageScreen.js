import { Image, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalStyles from '../styles/styles';

// firebase imports
import { storage } from '../FirebaseConfig';
import { ref, getDownloadURL } from "firebase/storage";

export default function ImageScreen({ navigation }) {

  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    
    const fetchImage = async () => {
      const storageRef = ref(storage, 'rpi_test_image.jpg');
      const url = await getDownloadURL(storageRef);
      console.log(url);
      setImageURL(url);
    }

    try {
      fetchImage();
    } catch (error) {
      console.log("error fetching image: ", error);
    }

  }, []);

  return (
      <View style={[GlobalStyles.container, styles.container]}>
        {!imageURL ? (
          <ActivityIndicator size="xl" color="#0000ff" />
        ) : (
          <Image
            source={{ uri: imageURL }}
            style={styles.image}

          />
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    aspectRatio: 1,
  }

});




