import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Login = ({ setToken }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        { email: email, password: password }
      );
      console.log("le data du login=", response.data);
      if (response.data.token) {
        const token = response.data.token;
        AsyncStorage.setItem("token", token);
        setToken(token);
        alert("Ravis de vous voir de retour!");
        navigation.navigate("Home");
      } else {
        alert("Utilisateur inconnu. Veuillez créer un compte");
      }
    } catch (e) {
      alert("an error occurred");
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#F35960", flex: 1 }}>
      <View style={styles.header}>
        <Image
          style={{ width: 100 }}
          source={require("../assets/Vector.png")}
        ></Image>
      </View>
      <View style={{ alignItems: "center" }}>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
          <Text style={styles.textSubmit}>Se connecter</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text style={styles.signupButton}>Pas de compte ? S'inscrire</Text>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  header: {
    marginTop: 109,
    marginBottom: 129,
    width: "100%",
    alignItems: "center",
  },
  input: {
    marginBottom: 59,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderColor: "white",
    width: 320,
    borderBottomColor: "white",
    color: "white",
    fontSize: 16,
    lineHeight: 18,
  },
  submit: {
    width: 190,
    height: 65,
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  textSubmit: {
    fontSize: 24,
    color: "#F35960",
  },
  signupButton: {
    color: "white",
    textAlign: "center",
    marginTop: 43,
  },
});
