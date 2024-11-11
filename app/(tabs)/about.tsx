// about.jsx

import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

const EditProfile = () => {
  const { top: safeTop } = useSafeAreaInsets();
  const [name, setName] = useState("Romina");
  const [email, setEmail] = useState("gmail@example.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveChanges = () => {
    alert("Changes Saved!");
  };

  return (
    <>
      {/* Adds a back button and title to the header */}
      <Stack.Screen options={{ headerShown: true, title: "About", headerBackTitle: "Back" }}/>
      <View style={[styles.container, { paddingTop: safeTop + 20 }]}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.heading}>Your Profile</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name:</Text>
            <TextInput 
              style={styles.input} 
              value={name} 
              onChangeText={setName} 
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email:</Text>
            <TextInput 
              style={styles.input} 
              value={email} 
              onChangeText={setEmail} 
              keyboardType="email-address"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Change Password:</Text>
            <TextInput 
              style={styles.input} 
              value={password} 
              onChangeText={setPassword} 
              secureTextEntry 
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password:</Text>
            <TextInput 
              style={styles.input} 
              value={confirmPassword} 
              onChangeText={setConfirmPassword} 
              secureTextEntry 
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 20,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    fontSize: 16,
    color: Colors.black,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
