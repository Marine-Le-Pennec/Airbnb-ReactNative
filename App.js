import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";

// React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackView } from "@react-navigation/stack";

// Bottom navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens imports
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Card from "./screens/Card";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
// function MyTabs() {
//   return (
//     <NavigationContainer>
//       {" "}
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={Home}></Tab.Screen>
//         {/* <Tab.Screen></Tab.Screen> */}
//         {/* <Tab.Screen name="Profile"></Tab.Screen> */}
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

export default function App() {
  const userToken = AsyncStorage.getItem("token");
  const [token, setToken] = useState(userToken || null);
  const [user, setUser] = useState("");

  return (
    <NavigationContainer>
      {!token ? (
        <Stack.Navigator>
          <Stack.Screen name="Login">
            {() => <Login setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen name="Signup">
            {() => <Signup setToken={setToken} setUser={setUser} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
          <Stack.Screen name="Card" component={Card}></Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
