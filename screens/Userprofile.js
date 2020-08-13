import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";

const Userprofile = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/user/:id"
      );
    };
    return () => {
      cleanup;
    };
  }, [input]);
  return (
    <SafeAreaView>
      <View>
        <Text>Image</Text>
        <TextInput></TextInput>
        <TextInput></TextInput>
        <TextInput></TextInput>
        <TextInput></TextInput>
      </View>
    </SafeAreaView>
  );
};

export default Userprofile;

const styles = StyleSheet.create({});
