import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SearchBar from "@/components/SearchBar";
import { Colors } from "@/constants/Colors";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import CheckBox from "@/components/CheckBox";
import useNewsCategories from "@/hooks/useNewsCategories";
import useNewsCountries from "@/hooks/useNewsContries";
import { useState } from "react";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const { newsCategories, toggleNewsCategory } = useNewsCategories();
  const { newsCountries, toggleNewsCountry } = useNewsCountries();
  const [serchQuery, setSerchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "900",
          }}
        >
          Discover
        </Text>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <SearchBar setSearchQuery={setSerchQuery} />

        <Text style={styles.title}>Categories</Text>
        <View style={styles.listContainer}>
          {newsCategories.map((item) => (
            <CheckBox
              key={item.id}
              label={item.title}
              checked={item.selected}
              onPress={() => {
                toggleNewsCategory(item.id);
                setCategory(item.slug);
              }}
            />
          ))}
        </View>

        <Text style={styles.title}>Countries</Text>
        <View style={styles.listContainer}>
          {newsCountries.map((item, index) => (
            <CheckBox
              key={index}
              label={item.name}
              checked={item.selected}
              onPress={() => {
                toggleNewsCountry(index);
                setCountry(item.code);
              }}
            />
          ))}
        </View>

        <Link
          href={{
            pathname: "/news/search",
            params: {
              query: serchQuery,
              category: category,
              country: country,
            },
          }}
          asChild
        >
          <TouchableOpacity style={styles.searchbtn}>
            <Text style={styles.searchbtnText}>Search</Text>
          </TouchableOpacity>
        </Link>
      </View>
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
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 12,
    marginBottom: 20,
  },
  searchbtn: {
    backgroundColor: Colors.blue,
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
  },
  searchbtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
