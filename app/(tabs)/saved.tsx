import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { FlatList } from 'react-native';
import { NewsDataType } from '@/types'; // Adjust according to your project structure
import NewsItem from '@/components/NewsItem'; // Adjust if NewsItem is a separate component

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
          <FlatList
            data={bookmarkNews}
            keyExtractor={(_, index) => `list_items${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ index, item }) => (
              <Link href={`/news/${item.article_id}`} asChild key={index}>
                <TouchableOpacity>
                  <NewsItem item={item} />
                </TouchableOpacity>
              </Link>
            )}
          />
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
});
