import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Client, Account, ID } from 'appwrite';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { Databases } from 'react-native-appwrite';

const client = new Client()
  .setProject('67322c5c002c10ce2e0e');
const account = new Account(client);
const databases = new Databases(client);

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focusedInput, setFocusedInput] = useState('');
    const router = useRouter();
    const DatabaseId= '67361fcc001c83196a2c';
    const CollectionId ='67361fd7002a76aa2a69';

    const handleRegister = async () => {
        try {
            const response = await account.create(ID.unique(), email, password, name);
            const userId = response.$id;
            alert('Registration successful!');
            await storeUserDetails(userId);
            router.replace("/(tabs)");
            console.log(response);
        } catch (error) {
            alert('Registration failed.');
            console.error(error);
        }
    };

    const storeUserDetails = async (userId: string) => {
        try {
            const userData = {
                name: name,
                user_mail: email,
                userId:userId,
            };
            await databases.createDocument(
                DatabaseId,    
                CollectionId,    
                ID.unique(),              
                userData,  
                ["role:guests"]               
            );
    
            console.log('User details stored successfully!');
        } catch (error) {
            console.log('Error storing user details:', error.message);
        }
      };

    const navigateToLogin = () => {
        router.replace('/(starter)');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <Text style={styles.title}>Create Account</Text>
            <TextInput
                style={[styles.input, focusedInput === 'name' && styles.inputFocused]}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput('')}
            />
            <TextInput
                style={[styles.input, focusedInput === 'email' && styles.inputFocused]}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput('')}
            />
            <TextInput
                style={[styles.input, focusedInput === 'password' && styles.inputFocused]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput('')}
            />
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToLogin}>
                <Text style={styles.registerLink}>
                    Already have an account
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.blue,
        marginBottom: 85,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: '#F1F4FF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputFocused: {
        borderColor: Colors.blue,
        borderWidth: 2,
    },
    registerButton: {
        height: 50,
        borderRadius: 12,
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerLink: {
        fontSize: 16,
        color: Colors.blue,
        textAlign: 'center',
        marginTop: 10,
    },
});
