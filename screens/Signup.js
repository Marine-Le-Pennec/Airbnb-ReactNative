import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AsyncStorage,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";

const Signup = ({ setToken, setUser }) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !username || !name || !description || !password) {
      alert("Veuillez remplir tous les champs");
    } else if (password !== checkPassword) {
      alert("Mots de passe non identiques");
    } else {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/sign_up",
          {
            email: email,
            username: username,
            name: name,
            description: description,
            password: password,
          },
          { headers: { "Content-Type": "application/json" } }
        );

        if (!response.data.token) {
          alert("Utilisateur déjà enregistré!");
        } else {
          const token = response.data.token;
          AsyncStorage.setItem("token", token);
          console.log("log de response de signup: ", response.data);
          setToken(token);
          setUser(response.data.id);
          alert("Bienvenue sur Airbnb!");
          navigation.navigate("Home");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#F35960", flex: 1 }}>
      <View>
        <Text style={styles.title}>Rejoignez-nous!</Text>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="email"
            placeholderTextColor="#E7AFB1"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="username"
            placeholderTextColor="#E7AFB1"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="name"
            placeholderTextColor="#E7AFB1"
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          ></TextInput>
          <TextInput
            style={styles.description}
            multiline={true}
            placeholder="présentez-vous en quelques mots..."
            placeholderTextColor="#E7AFB1"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
          ></TextInput>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="mot de passe"
            placeholderTextColor="#E7AFB1"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          ></TextInput>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="confirmez le mot de passe"
            placeholderTextColor="#E7AFB1"
            value={checkPassword}
            onChangeText={(text) => {
              setCheckPassword(text);
            }}
          ></TextInput>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.submit}>
            <Text style={styles.textSubmit} onPress={handleSubmit}>
              S'inscrire
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.signupButton}>
              Déjà un compte ? Se connecter
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginTop: 51,
    marginBottom: 65,
  },
  input: {
    marginBottom: 30,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderColor: "white",
    width: 320,
    borderBottomColor: "white",
    color: "white",
    fontSize: 16,
    lineHeight: 18,
  },
  description: {
    width: 318,
    height: 117,
    borderWidth: 1,
    borderColor: "white",
    marginBottom: 35,
    color: "white",
    padding: 10,
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
    // textAlign: "center",
    alignItems: "center",
  },
  signupButton: {
    color: "white",
    textAlign: "center",
    marginTop: 43,
  },
});
