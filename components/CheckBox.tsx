import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type Props = {
  label: string;
  checked: boolean;
  onPress: () => void;
};

const CheckBox = ({ label, checked, onPress }: Props) => {
  const rnAnimatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(checked ? Colors.blue : "tansparent", {
        duration: 150,
      }),
      borderColor: withTiming(checked ? Colors.blue : Colors.black, {
        duration: 150,
      }),
      paddingLeft: 16,
      paddingRight: checked ? 10 : 16,
    };
  }, [checked]);
  const rnTextStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(checked ? Colors.blue : Colors.black, {
        duration: 150,
      }),
    };
  }, [checked]);

  return (
    <Animated.View
      style={[styles.container, rnAnimatedContainerStyle]}
      onTouchEnd={onPress}
      layout={LinearTransition.springify().mass(0.8)}
    >
      <Animated.Text style={[styles.label, rnTextStyle]}>{label}</Animated.Text>
      {checked && (
        <Animated.View
          style={styles.iconWrapper}
          entering={FadeIn.duration(350)}
          exiting={FadeOut}
        >
          <AntDesign name="checkcircle" size={14} color={Colors.blue} />
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.black,
    paddingVertical: 8,
    borderRadius: 32,
  },
  label: {
    color: Colors.blue,
    fontSize: 14,
  },
  iconWrapper: {
    marginLeft: 8,
    height: 14,
    width: 14,
  },
});
