import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Account, Client } from "appwrite";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors"; // Ensure Colors.blue is defined as your preferred shade of blue

const Page = () => {
  const client = new Client().setProject("67322c5c002c10ce2e0e");
  const account = new Account(client);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await account.getSession("current");
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, []);
  useEffect(() => {
    if (isAuthenticated === true) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated]);

  const handlePress = () => {
    router.replace("/(starter)");
  };

  if(!isAuthenticated && isAuthenticated != null){
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Image
          source={require("../assets/images/landing-icon.png")}
          style={styles.image}
        />
        <Text style={styles.title}>
          Invest in your personal growth{" "}
          <Text style={styles.highlight}>on the go</Text>
        </Text>
        <Text style={styles.subtitle}>
          Get the knowledge and insight you need to be a better you—anytime,
          anywhere.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const handlePress = () => {
    router.replace(isAuthenticated ? "/(tabs)" : "/(starter)");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Image
        source={require("../assets/images/landing-icon.png")}
        style={styles.image}
      />
      <Text style={styles.title}>
        Read News like a pro{"\n"}
        <Text style={styles.highlight}>on the go</Text>
      </Text>
      <Text style={styles.subtitle}>
        Get the knowledge and insight you need to be a better you—anytime,
        anywhere.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    padding: 16,
    paddingHorizontal:20
  },
  image: {
    width: 300, // Adjust width as needed
    height: 300,
    resizeMode: "contain",
    opacity: 0.9,
    borderRadius: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.blue, // Primary color
    textAlign: "left",
    marginBottom: 10,
  },
  highlight: {
    color: Colors.blue, // Make this a different color if you want emphasis
  },
  subtitle: {
    fontSize: 16,
    color: Colors.lightGrey,
    textAlign: "left",
    marginBottom: 30,
    paddingHorizontal: 20
  },
  button: {
    width: "100%",
    backgroundColor: Colors.blue, // Primary blue button color
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
