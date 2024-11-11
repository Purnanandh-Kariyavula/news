import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Account, Client } from 'appwrite';
import { useRouter } from 'expo-router';

type Props = {};

const Page = (props: Props) => {
  const client = new Client().setProject('67322c5c002c10ce2e0e');
  const account = new Account(client);
  const router = useRouter();


  const handleSignOut = async () => {
    try {
      await account.deleteSession('current');  
      alert("Signed Out...")
      router.replace('/(starter)'); 
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f44336',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
