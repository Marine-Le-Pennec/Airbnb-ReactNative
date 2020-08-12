import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import MapView from "react-native-maps";

const Card = ({ route }) => {
  // Passage de props
  const { infos } = route.params;
  console.log(infos.city.loc);

  //   Map
  const markers = infos.loc;
  //   console.log("marker sont: ", markers[1]);

  // Demander localisation

  return (
    <SafeAreaView style={{ backgroundColor: "#F35960", flex: 1 }}>
      <View>
        <Text style={styles.title}>Room</Text>
        <View
          style={{
            backgroundColor: "white",
            height: "100%",
          }}
        >
          <View>
            <ScrollView>
              <FlatList
                horizontal={true}
                data={infos.photos}
                keyExtractor={(item) => {
                  return String(item);
                }}
                renderItem={({ item }) => {
                  return (
                    <Image
                      style={{ width: 374, height: 244, marginRight: 20 }}
                      source={{ uri: item }}
                    />
                  );
                }}
              ></FlatList>
            </ScrollView>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text>{infos.price}</Text>
                <Text>{infos.title}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ marginRight: 30 }}>{infos.ratingValue}</Text>
                  <Text>{infos.reviews} avis</Text>
                </View>
              </View>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 400 / 2,
                }}
                source={{ uri: infos.user.account.photos[0] }}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ padding: 10, fontSize: 16, lineHeight: 24 }}>
                {infos.description}
              </Text>
              <MapView
                style={{ width: 330, height: 119 }}
                initialRegion={{
                  latitude: infos.city.loc[1],
                  longitude: infos.city.loc[0],
                  latitudeDelta: 0.07,
                  longitudeDelta: 0.07,
                }}
              >
                <MapView.Marker
                  coordinate={{
                    latitude: markers[1],
                    longitude: markers[0],
                  }}
                />
              </MapView>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Card;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    // marginTop: 45,
    marginBottom: 27,
  },
});
