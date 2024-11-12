import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { icon } from "@/constants/Icons";
import { Colors } from "@/constants/Colors";

const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  label,
}: {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  routeName: string;
  label: string;
}) => {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarBtn}
    >
      {/* Apply blue color to icon when focused */}
      {icon[routeName]({
        color: isFocused ? Colors.blue : Colors.tabIconDefault,
        fill: isFocused ? Colors.blue : Colors.tabIconDefault,
        focused: isFocused,
      })}
      <Text
        style={[
          styles.tabLabel,
          { color: isFocused ? Colors.blue : Colors.tabIconDefault },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  tabbarBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  tabLabel: {
    fontSize: 12,
  },
});
