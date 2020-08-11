import React, { useState } from "react";
import axios from "axios";
import { StyleSheet, Text, View, AsyncStorage, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        { email: email, password: password }
      );
      if (response.data.token) {
        const token = response.data.token;
        AsyncStorage.setItem("token", token);
        setToken(token);
      } else {
        alert("Utilisateur inconnu. Veuillez créer un compte");
      }
    } catch (e) {
      alert("an error occurred");
    }
  };
  return (
    <SafeAreaView>
      <View>
        <Image source={require("../assets/Vector.png")}></Image>
      </View>
      <View>
        <TextInput
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <Text>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
