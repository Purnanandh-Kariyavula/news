import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import Animated, { SharedValue } from "react-native-reanimated";

type Props = {
  items: Array<NewsDataType>;
  PaginationIndex: number;
  scrollX: SharedValue<number>;
};

const Pagination = ({ items, PaginationIndex, scrollX }: Props) => {
  return (
    <View style={styles.container}>
      {items.map((_, index) => {
        return <Animated.View style={styles.dot} key={index}/>;
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    backgroundColor: "#033",
    height: 8,
    width: 8,
    marginHorizontal: 2,
    borderRadius: 8,
  },
});
