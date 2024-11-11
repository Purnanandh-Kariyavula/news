import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { NewsDataType } from "@/types";
import { Linking, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";

type Props = {};

const NewsDetails = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState<NewsDataType | null>(null);
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    const getNews = async () => {
      try {
        const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_NEWS_API}&id=${id}`;
        const response = await axios.get(URL);
        if (response && response.data) {
          setNews(response.data.results[0]); // Assuming the response has the news object at the first index
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getNews();
  }, [id]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!news) {
    return <Text>News not found.</Text>;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "News Details",
          headerShown: false,
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: news.image_url }} style={styles.image} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{news.title}</Text>
          <Text style={styles.description}>{news.description}</Text>

          <View style={styles.metaContainer}>
            <Text style={styles.metaText}>Source: {news.source_name}</Text>
            <Text style={styles.metaText}>
              Published on: {new Date(news.pubDate).toLocaleDateString()}
            </Text>
            <Text style={styles.metaText}>
              Keywords:{" "}
              {news.keywords?.length
                ? news.keywords.join(", ")
                : "No keywords available"}
            </Text>
          </View>
          <Text style={styles.link}>
            <TouchableOpacity
              onPress={() => Linking.openURL(news.link)}
              style={styles.fullArticleButton}
            >
              <Text style={styles.linkText}>Read Full Article Here</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  // Add to bookmark functionality
                }}
                style={[styles.iconButton, styles.bookmarkButton]}
              >
                <Text style={styles.iconText}>🔖</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // Like functionality
                }}
                style={[styles.iconButton, styles.likeButton]}
              >
                <Text style={styles.iconText}>❤️</Text>
              </TouchableOpacity>
            </View>
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  contentContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  metaContainer: {
    marginBottom: 20,
  },
  metaText: {
    fontSize: 14,
    color: "#888",
  },
  link: {
    fontSize: 16,
    color: "#007BFF",
  },
  linkText: {
    fontWeight: "bold",
    color: "#fff",
  },
  fullArticleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.blue,
    padding: 16,
    borderRadius: 15,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  iconButton: {
    padding: 16,
    backgroundColor: Colors.background,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 5,
  },
  bookmarkButton: {
    flexBasis: "25%", // 1/4th of the row
  },
  likeButton: {
    flexBasis: "25%", // 1/4th of the row
  },
  iconText: {
    fontSize: 20,
  },
});
