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
          }
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
    <SafeAreaView>
      <View>
        <Text>Rejoignez-nous!</Text>
        <View>
          <TextInput
            autoCapitalize="none"
            placeholder="email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          ></TextInput>
          <TextInput
            placeholder="username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
          ></TextInput>
          <TextInput
            placeholder="name"
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          ></TextInput>
          <TextInput
            placeholder="présentez-vous en quelques mots..."
            value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
          ></TextInput>
          <TextInput
            secureTextEntry={true}
            placeholder="mot de passe"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          ></TextInput>
          <TextInput
            secureTextEntry={true}
            placeholder="confirmez le mot de passe"
            value={checkPassword}
            onChangeText={(text) => {
              setCheckPassword(text);
            }}
          ></TextInput>
        </View>
        <View>
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
            <Text>Déjà un compte ? Se connecter</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({});
