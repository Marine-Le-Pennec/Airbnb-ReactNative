import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
const Signup = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View>
        <Text>Signup</Text>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({});
