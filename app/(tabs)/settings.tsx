import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { Account, Client } from 'appwrite';
import { useRouter } from 'expo-router';

type Props = {}

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
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
          <Text style={styles.profileName}>Kariyavula Purnanandh</Text>
          <Text style={styles.profilePhone}>+91 9347757722</Text>
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