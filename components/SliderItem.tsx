import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  slideItem: NewsDataType;
  index: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get("screen");

const SliderItem = ({ slideItem, index, scrollX }: Props) => {
  const rnStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.9, 1, 0.9],
      Extrapolation.CLAMP
    );

    const translateX = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [-width * 0.15, 0, width * 0.15],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.7, 1, 0.7],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateX }, { scale }],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[styles.itemwrap, rnStyle]}
      key={slideItem.article_id}
    >
      <Image source={{ uri: slideItem.image_url }} style={styles.image} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.background}
      >
        <View style={styles.sources}>
          <Image source={{ uri: slideItem.source_icon }} style={styles.sicon} />
          <Text style={styles.sname}>{slideItem.source_name}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {slideItem.title}
        </Text>
      </LinearGradient>
    </Animated.View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemwrap: {
    width: width * 0.8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: width * 0.05,
  },
  image: {
    width: width - 90, // Full width of the reduced card
    height: 100,
    borderRadius: 20,
  },
  background: {
    padding: 10,
    paddingTop: 10,
    position: "absolute",
    width: width - 90,
    height: 100,
    borderRadius: 20,
  },
  title: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
  },
  sicon: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginRight: 8,
  },
  sname: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  sources: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
});
