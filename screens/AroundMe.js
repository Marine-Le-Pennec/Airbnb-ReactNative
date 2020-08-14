import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";

const AroundMe = () => {
  const [location, setLocation] = useState({});

  const getLocation = async () => {
    const { status } = await Location.getCurrentPositionAsync();
    if (status !== "granted") {
      alert("Veuillez accepter cette option pour utiliser la localisation");
    } else {
      const location = await Location.requestPermissionsAsync();
      console.log(location);
      setLocation(location);

      const response = await axios.get(
        `https://airbnb-api.herokuapp.com/api/room/around?latitude${location.coords.latitude}&longitude${location.coord.longitude}`
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default AroundMe;

const styles = StyleSheet.create({});
