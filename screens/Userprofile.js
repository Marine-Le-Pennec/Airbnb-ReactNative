import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  AsyncStorage,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import * as ImagePicker from "expo-image-picker";

import axios from "axios";

const Userprofile = ({ token }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  //   const [user, setUser] = useState("");

  //   const id = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem("id", id);
  //       if (value !== null) {
  //         setUser(value);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  useEffect(() => {
    const fetchData = async () => {
      //   console.log("user id : ", user);
      //   console.log("token : ", token);
      try {
        const id = await AsyncStorage.getItem("id");
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/user/" + id,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (e) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);
  return isLoading ? (
    <Text>chargement</Text>
  ) : (
    <SafeAreaView>
      <View style={{}}>
        <Text>Image</Text>
        <Text>{data.name}</Text>
        <Text>{data.email}</Text>
        <Text>{data.username}</Text>
        <Text>{data.description}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Userprofile;

const styles = StyleSheet.create({});
