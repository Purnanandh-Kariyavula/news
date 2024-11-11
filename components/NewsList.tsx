import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

type Props = {
  newslist: NewsDataType[];
};

const NewsList = ({ newslist }: Props) => {
  return (
    <View style={styles.container}>
      {newslist.map((news, index) => (
        <Link key={index} href={`/news/${news.article_id}`} asChild>
          <TouchableOpacity key={index} style={styles.newscard}>
            <View style={styles.textContainer}>
              <Text style={styles.newstitle} numberOfLines={2}>
                {news.title}
              </Text>
              <Text style={styles.newsdesc} numberOfLines={1}>
                {news.description}
              </Text>
              <View style={styles.sources}>
                <Image
                  source={{ uri: news.source_icon }}
                  style={styles.sicon}
                />
                <Text style={styles.newsdesc}>{news.source_name}</Text>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <Image source={{ uri: news.image_url }} style={styles.image} />
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
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
    flex: 2,
    paddingRight: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  newstitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  newsdesc: {
    fontSize: 12,
    color: Colors.lightGrey,
  },
  sicon: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 20,
    marginRight: 8,
  },
  sources: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
});
