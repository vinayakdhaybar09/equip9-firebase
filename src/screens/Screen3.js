import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { database } from "../../firebase/FirebaseConfig.js";
import { useNavigation, useRoute } from "@react-navigation/native";

const Screen3 = ({route}) => {
  const navigation = useNavigation();
  const { galleryImage } = route.params;
  // console.log(galleryImage);
  const [lastLatitude, setLastLatitude] = useState("");
  const [lastLongitude, setLastLongitude] = useState("");
  const [nextBtnEnable, setNextBtnEnable] = useState(false);
  const [loader, setLoader] = useState(false);

 

  useEffect(() => {
    getDoc(doc(database, "coordinates","points"))
      .then((res) => {
        // console.log(res.data());
        setLastLatitude(res?.data()?.lastLatitude);
        setLastLongitude(res?.data()?.lastLongitude);

      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handlePress = async () => {
    setLoader(true);
    await updateDoc(doc(database, "coordinates", "points"), {
      lastLatitude: lastLatitude,
      lastLongitude: lastLongitude,
    })
      .then(() => {
        Alert.alert("Successfull", "Co-ordinates successfully uploaded");
        setNextBtnEnable(true);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  const handleNextBtn = () => {
    navigation.navigate("screen4");
  };

  return (
    <View style={styles.screen2Container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.image}
          source={{
            uri: galleryImage,
          }}
        />
      </View>
      <Text style={styles.title}>Finish co-ordinates</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Enter Latitude</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.inputBox}
          value={lastLatitude}
          placeholder="00.0000000000"
          onChangeText={(e) => setLastLatitude(e)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Enter Longitude</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.inputBox}
          value={lastLongitude}
          placeholder="00.0000000000"
          onChangeText={(e) => setLastLongitude(e)}
        />
      </View>

      <View style={styles.pointsBtnContainer}>
        <TouchableOpacity style={styles.pointsBtn} onPress={handlePress}>
          {loader === true ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.pointsBtnText}>Save</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.pointsBtn,
            { backgroundColor: nextBtnEnable === true ? "black" : "gray" },
          ]}
          disabled={nextBtnEnable === false ? true : false}
          onPress={handleNextBtn}
        >
          <Text style={styles.pointsBtnText}>Calculate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Screen3;

const styles = StyleSheet.create({
  screen2Container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
  },
  profileContainer: {
    width: 180,
    height: 180,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgrey",
    marginTop: 50,
    borderRadius: 20,
  },
  image: {
    width: "94%",
    aspectRatio: 1,
    borderRadius:20
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 50,
    gap: 10,
    width: "80%",
  },
  inputLabel: {
    color: "gray",
  },
  inputBox: {
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  pointsBtnContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 50,
  },
  pointsBtn: {
    paddingVertical: 16,
    width: 120,
    marginTop: 80,
    backgroundColor: "black",
    color: "white",
    borderRadius: 10,
  },
  pointsBtnText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});
