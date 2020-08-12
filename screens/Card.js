import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Card = ({ route }) => {
  // Passage de props
  const { infos } = route.params;

  return (
    <SafeAreaView style={{ backgroundColor: "#F35960", flex: 1 }}>
      <View>
        <Text style={styles.title}>Room</Text>
        <View style={{ backgroundColor: "white" }}>
          <ScrollView>
            <View>
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
            </View>
          </ScrollView>

          <View>
            <View>
              <Text>{infos.price}</Text>
              <Text>{infos.title}</Text>
              <View>
                <Text>{infos.ratingValue}</Text>
                <Text></Text>
              </View>
            </View>
            <Image></Image>
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
