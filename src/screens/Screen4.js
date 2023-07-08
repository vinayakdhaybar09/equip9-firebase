import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "../../firebase/FirebaseConfig";
import { getDistance, getPreciseDistance } from "geolib";
import { useNavigation } from "@react-navigation/native";

const Screen4 = () => {
  const navigation = useNavigation();
  const [dbData, setDbData] = useState();
  const [distance, setDistance] = useState("");

  useEffect(() => {
    getDoc(doc(database, "coordinates", "points"))
      .then((res) => {
        setDbData(res?.data());
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleGetDistance = () => {
    const dis = getDistance(
      {
        latitude: dbData?.firstLatitude,
        longitude: dbData?.firstLongitude,
      },
      { latitude: dbData?.lastLatitude, longitude: dbData?.lastLongitude }
    );
    setDistance(dis);
  };

  const handleHome = async () => {
    await updateDoc(doc(database, "coordinates", "points"), {
      firstLatitude: "",
      firstLongitude: "",
      lastLatitude: "",
      lastLongitude: "",
    })
      .then(() => {
        navigation.navigate("screen1");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.screen4Container}>
      <Text style={styles.distTitle}>Distance between</Text>
      <Text style={styles.coTitle}>Starting co-ordinates</Text>
      <View>
        <Text>Lat : {dbData?.firstLatitude}</Text>
        <Text>Long : {dbData?.firstLongitude}</Text>
      </View>
      <Text style={styles.coTitle}>Final co-ordinates</Text>
      <View>
        <Text>Lat : {dbData?.lastLatitude}</Text>
        <Text>Long : {dbData?.lastLongitude}</Text>
      </View>
      <TouchableOpacity style={styles.getDistBtn} onPress={handleGetDistance}>
        <Text style={styles.getDistBtnText}>Get Distance</Text>
      </TouchableOpacity>
      <View style={styles.coOutputContainer}>
        <Text style={styles.coOutput}>{(distance / 1000).toFixed(2)} km</Text>
        <Text style={{ textAlign: "center" }}>or</Text>
        <Text style={styles.coOutput}>{(distance * 0.000621371).toFixed(2)} miles</Text>
      </View>
      <TouchableOpacity onPress={handleHome}>
        <Text style={styles.homeBtn}>Home Page</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Screen4;

const styles = StyleSheet.create({
  screen4Container: {
    flex: 1,
    backgroundColor: "white",
    gap: 30,
    alignItems: "center",
    padding: 12,
    // justifyContent: "center",
  },
  getDistBtn: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 50,
    backgroundColor: "black",
    color: "white",
    borderRadius: 10,
  },
  getDistBtnText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  distTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  coTitle: {
    color: "gray",
  },
  coOutputContainer: {
    gap: 10,
  },
  coOutput: {
    // color:"blue",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  homeBtn: {
    justifyContent: "flex-end",
    marginTop: 30,
    color: "skyblue",
  },
});
