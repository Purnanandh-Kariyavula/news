import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { Account, Client } from 'appwrite';
import { useRouter } from 'expo-router';

type Props = {}

const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets();
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
    <>
      <Stack.Screen options={{ headerShown: false }}/>
      <View style={[styles.container, {paddingTop: safeTop + 20}]}>
        <Text>Settings Screen</Text>
        <TouchableOpacity style={styles.itemBtm}>
          <Text style={styles.itenBtmTxt}>About</Text>
          <MaterialIcons name='arrow-forward-ios' size={16} color={Colors.lightGrey} ></MaterialIcons>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text>Settings Screen</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </>
    
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  itemBtm:{
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:Colors.white,
    paddingHorizontal:16,
    paddingVertical:20
  },
  itenBtmTxt:{
    fontSize:14,
    fontWeight:'500',
    color:Colors.black
  },
  signOutButton: {
    marginTop: 20,
    backgroundColor: '#f44336',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
})