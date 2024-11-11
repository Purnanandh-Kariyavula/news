import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { NewsDataType } from "@/types";

type Props = {
  newslist: NewsDataType[];
};

const NewsList = ({ newslist }: Props) => {
  return (
    <ScrollView style={styles.container}>
      {newslist.map((news, index) => (
        <TouchableOpacity key={index} style={styles.newscard}>
          <View style={styles.textContainer}>
            <Text style={styles.newstitle} numberOfLines={2}>
              {news.title}
            </Text>
            <Text style={styles.newsdesc} numberOfLines={1}>
              {news.description}
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={{ uri: news.image_url }} style={styles.image} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default NewsList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  newscard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  textContainer: {
    flex: 3,
    paddingRight: 30,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  newstitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  newsdesc: {
    fontSize: 12,
    color: "#333",
  },
});
