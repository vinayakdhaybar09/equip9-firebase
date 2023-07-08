import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import CameraScreen from "../components/CameraScreen";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const Screen1 = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [galleryImage, setGalleryImage] = useState(null);
  const [openCamera, setOpenCamera] = useState(false);
  const [handleSwitch, setHandleSwitch] = useState(false);

  const pickImage = async () => {
    setVisible(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      // console.log(result.assets[0].uri);
      setGalleryImage(result.assets[0].uri);
      setHandleSwitch(false);
      // navigation.navigate("screen1");
    }
  };

  const handleUploadImage = async () => {
    const storage = getStorage();
    const storageRef = ref(storage, "profile");

    uploadBytes(storageRef, galleryImage)
      .then((snapshot) => {
        console.log("Uploaded a file!");
        Alert.alert("Successfull.!", "Profile image successfully uploaded.");
        setHandleSwitch(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {openCamera === false ? (
        <View style={styles.screen1Container}>
          <Text style={styles.logo}>EQUIP9</Text>
          <View style={styles.profileContainer}>
            {galleryImage === null ? (
              <Feather
                name="user"
                size={80}
                color="black"
                style={styles.profileIcon}
              />
            ) : (
              <Image style={styles.image} source={{ uri: galleryImage }} />
            )}
          </View>
          {galleryImage != null ? (
            <TouchableOpacity
              style={[
                styles.profileBtn,
                { backgroundColor: handleSwitch === true ? "gray" : "black" },
              ]}
              onPress={handleUploadImage}
              disabled={handleSwitch}
            >
              <Text style={styles.profileBtnText}>Upload</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <TouchableOpacity
            style={styles.profileBtn}
            onPress={() => {
              setVisible(true);
            }}
          >
            <Text style={styles.profileBtnText}>
              {galleryImage === null ? "Add Photo" : "Update"}
            </Text>
          </TouchableOpacity>
          {handleSwitch === true ? (
            <TouchableOpacity
              style={styles.profileBtn}
              onPress={() => {
                navigation.navigate("screen2", { galleryImage });
              }}
            >
              <Text style={styles.profileBtnText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <Modal
            isVisible={visible}
            style={styles.modalContainer}
            onBackdropPress={() => {
              setVisible(false);
            }}
          >
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  setVisible(false);
                  setOpenCamera(true);
                  // navigation.navigate("cameraScreen");
                }}
              >
                <Ionicons name="camera-outline" size={24} color="black" />
                <Text>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtn} onPress={pickImage}>
                <FontAwesome name="photo" size={24} color="black" />
                <Text>Gallery</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      ) : (
        <CameraScreen
          setOpenCamera={setOpenCamera}
          setGalleryImage={setGalleryImage}
          setHandleSwitch={setHandleSwitch}
        />
      )}
    </>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  screen1Container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
  },
  logo: {
    fontWeight: "800",
    fontSize: 20,
    marginTop: 10,
  },
  profileContainer: {
    width: 180,
    height: 180,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgrey",
    marginTop: 100,
    borderRadius: 30,
  },
  profileBtn: {
    width: 140,
    paddingVertical: 12,
    marginTop: 50,
    backgroundColor: "black",
    color: "white",
    borderRadius: 10,
  },
  profileBtnText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  modalContainer: {
    width: "100%",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  modalView: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    gap: 10,
  },
  modalBtn: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 30,
  },
});
