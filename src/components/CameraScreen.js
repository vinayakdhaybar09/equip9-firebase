import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState, useEffect, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  Camera,
  CameraType,
  requestCameraPermissionsAsync,
  requestMicrophonePermissionsAsync,
  getCameraPermissionsAsync,
  getMicrophonePermissionsAsync,
} from "expo-camera";
import { useNavigation } from "@react-navigation/native";

export default function CameraScreen({ setOpenCamera, setGalleryImage, setHandleSwitch }) {
  const navigation = useNavigation();
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState("off");

  const cameraRef = useRef();

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    await requestCameraPermissionsAsync();
    await requestMicrophonePermissionsAsync();
  };

  const getPermissions = async () => {
    const cameraPermission = await getCameraPermissionsAsync();
    const microphonePermission = await getMicrophonePermissionsAsync();

    return cameraPermission.granted && microphonePermission.granted;
  };

  if (!getPermissions()) {
    return Alert.alert(
      "Permissions required!",
      "You need to provide the permissions to access the camera",
      [{ text: "got it" }]
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const swithFlashMode = () => {
    setFlashMode(flashMode === "off" ? "on" : "off");
  };

  const takePicture = async () => {
    const { uri } = await cameraRef?.current.takePictureAsync();
    setGalleryImage(uri);
    setOpenCamera(false);
    setHandleSwitch(false)
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={type}
        flashMode={flashMode}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <MaterialIcons name="flip-camera-android" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <MaterialCommunityIcons
              name="camera-iris"
              size={50}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={swithFlashMode}>
            <Ionicons
              name={flashMode === "off" ? "ios-flash-outline" : "flash-sharp"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    height: 100,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    // margin: 64,
    backgroundColor: "grey",
  },
});
