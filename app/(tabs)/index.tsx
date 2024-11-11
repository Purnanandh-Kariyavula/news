import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import BreakingNews from "@/components/BreakingNews";
import Categories from "@/components/Categories";
import { Ionicons } from "@expo/vector-icons";
import NewsList from "@/components/NewsList";

type Props = {};

const Page = (props: Props) => {
  const [Breakingnews, setBreakingnews] = useState([]);
  const [catNews, setCatNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBreakingNews();
  }, []);

  const onCatChange = async (category: string) => {
    try {
      if (!category) category = "top";
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_NEWS_API}&country=in&language=en&image=1&removeduplicate=1&size=10&category=${category}`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setCatNews(response.data.results);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_NEWS_API}&country=in&language=en&image=1&removeduplicate=1&size=5`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setBreakingnews(response.data.results);
        setCatNews(response.data.results);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <BreakingNews newslist={Breakingnews} />
          <Categories onCatChange={onCatChange} />
          <NewsList newslist={catNews} />
        </>
      )}
    </SafeAreaView>
  );
};

export default Page;

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
  title: {
    fontSize: 24,
    fontWeight: "900",
  },
  breakingnews: {},
});
