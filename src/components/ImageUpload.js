import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { S3 } from "aws-sdk";
import { useNavigation } from "@react-navigation/native";
// import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const S3_BUCKET = "equip9-testing";
const REGION = "ap-south-1";

AWS.config.update({
  accessKeyId: "AKIA3KZVK3RM6V72UAHV",
  secretAccessKey: "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",
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const ImageUpload = ({ route }) => {
  const navigation = useNavigation();
  const { imageUri } = route.params;
  console.log(imageUri);
  const [uploadImageLink, setUploadImageLink] = useState(null);
  const [progress, setProgress] = useState(0);
  console.log(uploadImageLink);

  const uploadFile = () => {
    const params = {
      // ACL: "public-read",
      Body: imageUri,
      Bucket: S3_BUCKET,
      Key: "profile",
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err,data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data)
          // const imageUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${file.name}`;
          // console.log(imageUrl);
        }
      });
  };

  // const client = new S3Client({})

  // const handleGetLink = async ()=>{
  //   const command = new GetObjectCommand({
  //     Bucket: S3_BUCKET,
  //     Key: "AKIA3KZVK3RM6V72UAHV",
  //   });

  // try {
  //   const response = await client.send(command);
  //   // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
  //   const str = await response.Body.transformToString();
  //   console.log(str);
  // } catch (err) {
  //   console.error(err);
  // }
  // }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: imageUri }} />
      <TouchableOpacity style={styles.uploadBtn} onPress={uploadFile}>
        <Text style={styles.uploadBtnText}>Upload Image</Text>
      </TouchableOpacity>

      <Text style={styles.uploadBtnText} onPress={handleGetLink}>
        get Link
      </Text>

      <Text>Native SDK File Upload Progress is {progress}%</Text>
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "60%",
    // height: 300,
    aspectRatio: 1,
    // resizeMode: "contain",
    backgroundColor: "red",
  },
  uploadBtn: {
    padding: 20,
    marginTop: 80,
    backgroundColor: "black",
    color: "white",
    borderRadius: 10,
  },
  uploadBtnText: {
    color: "white",
    fontSize: 18,
  },
});
