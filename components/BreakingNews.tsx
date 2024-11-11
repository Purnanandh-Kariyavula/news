import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SliderItem from "@/components/SliderItem";
import { NewsDataType } from "@/types";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Pagination from "@/components/Pagination";

type Props = {
  newslist: Array<NewsDataType>;
};

const BreakingNews = ({ newslist }: Props) => {
  const [data, setdata] = useState(newslist);
  const [paf, setpaf] = useState(0);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<NewsDataType>>();

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breaking News</Text>
      <View>
        <Animated.FlatList
          ref={ref}
          data={data}
          keyExtractor={(_, index) => `list_items${index}`}
          renderItem={({ item, index }) => (
            <SliderItem slideItem={item} index={index} scrollX={scrollX} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToAlignment="center"
          onScroll={onScrollHandler}
          scrollEventThrottle={16}
        />
        <Pagination items={data} PaginationIndex={paf} scrollX={scrollX} />
      </View>
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 18,
    fontWeight: "600",
    paddingBottom: 16,
    paddingLeft: 16,
  },
});
