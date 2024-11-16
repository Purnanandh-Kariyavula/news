import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { Account, Client, Query } from 'appwrite';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar'
import { Databases } from 'react-native-appwrite'

const Page = () => {
  const { top: safeTop } = useSafeAreaInsets();
  const client = new Client().setProject('67322c5c002c10ce2e0e');
  const account = new Account(client);
  const DatabaseId= '67361fcc001c83196a2c';
  const CollectionId ='67361fd7002a76aa2a69';
  const databases = new Databases(client);
  const router = useRouter();

  // State to hold user details
  const [userName, setUserName] = useState('');
  const [userMail, setUserMail] = useState('');

  const handleSignOut = async () => {
    try {
      await account.deleteSession('current');
      alert("Signed Out...")
      router.replace('/(starter)');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
        try {
            const userSession = await account.get();
            const userId = userSession.$id;
            const result = await databases.listDocuments(
              DatabaseId,
              CollectionId,
              [
                Query.equal('userId', userId)
              ]
            );
            if (result.documents.length > 0) {
              const userDocument = result.documents[0];   
              setUserName(userDocument.name); // Update state
              setUserMail(userDocument.user_mail); // Update state
              console.log("userName: ", userDocument.name);
              console.log("Mail ID: ", userDocument.user_mail);
          }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    fetchUserDetails();
}, []);

  return (
    <>
    <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }}/>
      <View style={[styles.container, { paddingTop: safeTop + 20 }]}>

        <Text style={styles.heading}>Settings</Text>
        
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatar} />
            <TouchableOpacity style={styles.editIcon}>
              <MaterialIcons name='edit' size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{userName || 'Loading...'}</Text>
          <Text style={styles.profilePhone}>{userMail || 'Loading...'}</Text>
        </View>

        {/* Settings Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.itemBtm}>
            <Text style={styles.itemBtmTxt}>About</Text>
            <MaterialIcons name='arrow-forward-ios' size={16} color={Colors.lightGrey} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemBtm}>
            <Text style={styles.itemBtmTxt}>Send Feedback</Text>
            <MaterialIcons name='arrow-forward-ios' size={16} color={Colors.lightGrey} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemBtm}>
            <Text style={styles.itemBtmTxt}>Privacy Policy</Text>
            <MaterialIcons name='arrow-forward-ios' size={16} color={Colors.lightGrey} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemBtm}>
            <Text style={styles.itemBtmTxt}>Terms of Use</Text>
            <MaterialIcons name='arrow-forward-ios' size={16} color={Colors.lightGrey} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignOut} style={styles.itemBtm}>
            <Text style={[styles.itemBtmTxt, { color: 'red' }]}>Sign Out</Text>
            <MaterialIcons name='logout' size={16} color={'red'} />
          </TouchableOpacity>
        </View>
        
      </View>
    </>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.background
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.black,
    marginBottom: 20,
    textAlign: 'left',
    paddingLeft:15
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.lightGrey,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'blue',
    borderRadius: 20,
    padding: 4,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: Colors.black,
  },
  profilePhone: {
    fontSize: 14,
    color: Colors.darkGrey,
  },
  optionsContainer: {
    marginTop: 20,
  },
  itemBtm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  itemBtmTxt: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
  },
});
