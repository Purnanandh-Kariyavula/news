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

type Props = {
  onCatChange: (category: string) => void;
};

const Categories = ({ onCatChange }: Props) => {
  const scrollref = useRef<ScrollView>(null);
  const itemref = useRef<TouchableOpacity[] | null[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleCategorySelection = (index: number) => {
    const selected = itemref.current[index];
    setSelectedCategory(index);
    selected?.measure((x) => {
      scrollref.current?.scrollTo({ x: x - 20, y: 0, animated: true });
    });
    onCatChange(newsCategoryList[index].slug);
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
        {newsCategoryList.map((category, index) => (
          <TouchableOpacity
            ref={(el) => (itemref.current[index] = el)}
            key={index}
            style={[
              styles.items,
              selectedCategory === index && styles.selectedItem,
            ]}
            onPress={() => handleCategorySelection(index)}
          >
            <Text
              style={[
                styles.itemtext,
                selectedCategory === index && styles.selitemtext,
              ]}
            >
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
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
    paddingHorizontal: 10,
    alignItems: "center",
  },
  items: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 10,
    backgroundColor: "#ddd",
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  selectedItem: {
    backgroundColor: Colors.blue, // Highlight color for selected item
  },
  selitemtext: {
    fontSize: 14,
    color: Colors.white,
  },
  itemtext: {
    fontSize: 14,
    color: Colors.darkGrey,
    letterSpacing: 0.5,
  },
});
