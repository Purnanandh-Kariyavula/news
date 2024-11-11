import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Account, Client } from "appwrite";

const Page = () => {

  const client = new Client()
    .setProject('67322c5c002c10ce2e0e')

  const account = new Account(client)
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await account.getSession("current");
        setIsAuthenticated(true); // User is authenticated
        console.log("User is signed in:", response);
      } catch (error) {
        
      }
    };
    checkAuthStatus();
  }, []);

  const checkSignInStatus = () =>{
    if(isAuthenticated){
      router.replace("/(tabs)")
    }
    else{
      router.replace("/(starter)")
    }
  }

  if (isAuthenticated === null) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <Text>Welcome Page</Text>
      <TouchableOpacity onPress={checkSignInStatus}>
        <Text>Get Strated</Text>
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
  },
});
