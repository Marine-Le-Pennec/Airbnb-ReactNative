import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, AsyncStorage, Image } from "react-native";

// React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackView } from "@react-navigation/stack";

// Screens imports
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";

const Stack = createStackNavigator();

export default function App() {
  const userToken = AsyncStorage.getItem("token");
  const [token, setToken] = useState(userToken || null);
  const [user, setUser] = useState("");

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login">
          {() => <Login setToken={setToken} />}
        </Stack.Screen>
        <Stack.Screen name="Signup">
          {() => <Signup setToken={setToken} setUser={setUser} />}
        </Stack.Screen>

        <Stack.Screen name="Home" component={Home}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
