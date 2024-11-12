import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ScrollView,Image } from 'react-native';
import { NewsDataType } from '@/types'; // Adjust according to your project structure
import { Colors } from "@/constants/Colors";

type Props = {};

const Page = (props: Props) => {
  const [bookmarkNews, setBookmarkNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBookmark();
  }, []);

  const fetchBookmark = async () => {
    const token = await AsyncStorage.getItem("bookmarkNews");
    const res = token ? JSON.parse(token) : null;

    if (res) {
      const queryString = res.join(',');
      try {
        const response = await axios.get(`https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_NEWS_API}&id=${queryString}`);
        const news = response.data.results;
        setBookmarkNews(news);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    } else {
      setBookmarkNews([]);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView>
              {bookmarkNews.map((item, index) => (
                <Link href={`/news/${item.article_id}`} asChild key={index}>
                  <TouchableOpacity style={styles.newscard}>
                    <View style={styles.textContainer}>
                      <Text style={styles.newstitle} numberOfLines={2}>
                        {item.title}
                      </Text>
                      <Text style={styles.newsdesc} numberOfLines={1}>
                        {item.description}
                      </Text>
                      <View style={styles.sources}>
                        <Image
                          source={{ uri: item.source_icon }}
                          style={styles.sicon}
                        />
                        <Text style={styles.newsdesc}>{item.source_name}</Text>
                      </View>
                    </View>
                    <View style={styles.imageContainer}>
                      <Image
                        source={{ uri: item.image_url }}
                        style={styles.image}
                      />
                    </View>
                  </TouchableOpacity>
                </Link>
              ))}
            </ScrollView>
        )}
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
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
