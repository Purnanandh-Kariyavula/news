import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const search = () => {
  const { query, category, country } = useLocalSearchParams<{
    query: string;
    category: string;
    country: string;
  }>();
  return (
    <View>
      <Text>
        Query: {query}
        {"\n"}
        Category: {category}
        {"\n"}
        Country: {country}
      </Text>
    </View>
  );
};

export default search;

const styles = StyleSheet.create({});
