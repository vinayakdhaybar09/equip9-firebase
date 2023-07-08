// not use in the app


import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from "expo-image-picker";
import s3 from '../config/awsConfig';


const Temp = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = async () => {
     if (!selectedImage) return;

     const { uri } = selectedImage;
     const response = await fetch(uri);
     const blob = await response.blob();

     const params = {
       Bucket: "equip9-testing",
       Key: "my-image.jpg",
       Body: blob,
       ACL: "public-read",
     };

     s3.upload(params, (err, data) => {
       if (err) {
         console.error(err);
       } else {
         console.log("Image uploaded successfully. Access URL:", data.Location);
         // You can save the 'data.Location' value to use as the image link.
       }
     });
    };

    const handleImagePicker = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access media library was denied.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        setSelectedImage(result.assets[0]);
      }
    };
  return (
    <View>
      <Button title="Pick Image" onPress={handleImagePicker} />
      {selectedImage && <Button title="Upload" onPress={handleImageUpload} />}
    </View>
  );
}

export default Temp

const styles = StyleSheet.create({})