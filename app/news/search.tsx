import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import React, { useEffect } from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";

const search = () => {
  const { query, category, country } = useLocalSearchParams<{
    query: string;
    category: string;
    country: string;
  }>();

  useEffect(() => {
    getNews();
  }, []);

  type NewsItem = {
    article_id: string;
    title: string;
    description: string;
    source_icon: string;
    source_name: string;
    image_url: string;
  };

  const [news, setNews] = React.useState<NewsItem[]>([]);
  const [isLoading, setisLoading] = React.useState(false);

  const getNews = async () => {
    try {
      setisLoading(true);
      let q = query ? query : "news";
      let cat = category ? category : "top";
      let co = country ? country : "in";
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_NEWS_API}&country=${co}&category=${cat}&q=${q}&language=en&image=1&removeduplicate=1&size=10`;
      const response = await axios.get(URL);
      setNews(response.data.results);
      setisLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "900",
              }}
            >
              Search Results
            </Text>
          </View>
          <View>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <View style={{ paddingHorizontal: 16 }}>
                {news.map((item, index) => (
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
              </View>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
  
};

export default search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
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
