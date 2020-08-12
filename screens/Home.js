import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import axios from "axios";
const Tab = createBottomTabNavigator();

import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function Home() {
  const navigation = useNavigation();
  //States
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupération des données
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://airbnb-api.herokuapp.com/api/room?city=paris"
      );
      setData(response.data.rooms);
      // console.log(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: "pink" }}>
          <Image source={require("../assets/Rolling-1s-200px.gif")}></Image>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FF495A" }}>
          <View>
            <View>
              <Text style={styles.title}>MonAirbnb</Text>
            </View>
            <FlatList
              data={data}
              keyExtractor={(item) => {
                // console.log("data : ", data);
                return String(item);
              }}
              renderItem={({ item }) => {
                // console.log("log item: ", item);

                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      navigation.navigate("Card", { infos: item });
                    }}
                  >
                    <View style={styles.cards}>
                      <Image
                        style={{
                          width: 330,
                          height: 215,
                        }}
                        source={{ uri: item.photos[0] }}
                      ></Image>
                      <Text>{item.price} €</Text>
                      <View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <View>
                            <View>
                              <Text style={{ fontSize: 16, lineHeight: 18 }}>
                                {item.title.substr(0, 29) + "..."}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                              }}
                            >
                              <Text>{item.ratingValue}</Text>
                              <Text style={{ color: "#BBBBBB", fontSize: 17 }}>
                                {item.reviews} avis
                              </Text>
                            </View>
                          </View>
                          <View>
                            <Image
                              style={{
                                width: 70,
                                height: 70,
                                borderRadius: 400 / 2,
                              }}
                              source={{ uri: item.user.account.photos[0] }}
                            />
                          </View>
                        </View>

                        <Text
                          style={{
                            width: 330,
                            height: 0,
                            borderWidth: 1,
                            borderColor: "#BBBBBB",
                          }}
                        ></Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              }}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    marginTop: 45,
    marginBottom: 27,
  },
  cards: { backgroundColor: "white", alignItems: "center", paddingTop: 20 },
});
