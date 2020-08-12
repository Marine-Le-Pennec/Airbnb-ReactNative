import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

export default function App() {
  const [token, setToken] = useState(Token || null);
  const [user, setUser] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const Token = async (token) => {
    if (token) {
      AsyncStorage.setItem("token", token);
    } else {
      AsyncStorage.removeItem("token");
    }

    Token(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const getToken = await AsyncStorage.getItem("token");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setToken(token);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : token === null ? (
        <Stack.Navigator>
          <Stack.Screen name="Login">
            {() => <Login setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen name="Signup">
            {() => <Signup setToken={setToken} setUser={setUser} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // <Stack.Navigator>
        //   <Stack.Screen name="Home" component={Home}></Stack.Screen>
        //   <Stack.Screen name="Card" component={Card}></Stack.Screen>
        // </Stack.Navigator>
        <Stack.Navigator>
          <Stack.Screen
            name="Tab"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: "tomato",
                  inactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="HomeScreen"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen name="Home" component={Home}></Stack.Screen>
                      <Stack.Screen name="Card" component={Card}></Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
