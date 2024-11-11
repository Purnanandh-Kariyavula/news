import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import newsCategoryList from "@/constants/Categories";
import { Colors } from "@/constants/Colors";

type Props = {};

const Categories = (props: Props) => {
  const scrollref = useRef<ScrollView>(null);
  const itemref = useRef<TouchableOpacity[] | null[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleCategorySelection = (index: number) => {
    const selected = itemref.current[index];
    setSelectedCategory(index);
    selected?.measure((x) => {
      scrollref.current?.scrollTo({ x: x, y: 0, animated: true });
    });
  };

  return (
    <View>
      <Text style={styles.title}>Trending Now</Text>
      <ScrollView
        ref={scrollref}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.itemwrapper}
      >
        {newsCategoryList.map((category, index) => {
          return (
            <TouchableOpacity
              ref={(el) => (itemref.current[index] = el)}
              key={index}
              style={styles.items}
              onPress={() => handleCategorySelection(index)}
            >
              <Text style={styles.itemtext}>{category.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "600",
    paddingBottom: 16,
    paddingLeft: 16,
  },
  itemwrapper: {
    gap: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  items: {
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  itemtext: {
    fontSize: 14,
    color: Colors.darkGrey,
    letterSpacing: 0.5,
  },
});
