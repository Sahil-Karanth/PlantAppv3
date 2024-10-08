import { Image, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalStyles from '../styles/styles';

// firebase imports
import { storage, db } from '../FirebaseConfig';
import { ref as ref_storage, getDownloadURL } from "firebase/storage";
import { ref as ref_db, update } from "firebase/database";

export default function ImageScreen({ navigation }) {

  const [imageURL, setImageURL] = useState('');
  const [imageNotFound, setImageNotFound] = useState(false);

  useEffect(() => {
    
    const fetchImage = async () => {
    
      try{
        const storageRef = ref_storage(storage, 'latest_image.jpg');
        const url = await getDownloadURL(storageRef);
        console.log(url);
        setImageURL(url);
      } catch (error) {
        
        if (error.code === 'storage/object-not-found') {
          console.log("No image found");
          setImageNotFound(true);
        } else {
          console.log("Error fetching image: ", error);
        }
      }
    }

    try {

      // first tell the pi to take a picture
      const dbRef = ref_db(db);

      update(dbRef, {
          camera_app_signal: true,
      });

      console.log("signal sent to pi to take a picture");
      

      // then fetch the image taken
      fetchImage();

    } catch (error) {
      console.log("error fetching image: ", error);
    }

    return () => {
      const dbRef = ref_db(db);
      update(dbRef, {
          camera_app_signal: false,
      });
    }

  }, []);

  return (
      
    <View style={[styles.container, GlobalStyles.container]}>
      {imageNotFound ? (
        <Text style={GlobalStyles.text}>No image found</Text>
      ) : !imageURL ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Image
          style={styles.image}
          source={{ uri: imageURL }}
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







