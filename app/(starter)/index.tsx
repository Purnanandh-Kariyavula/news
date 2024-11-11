import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Client, Account } from 'appwrite';
import { router, useRouter } from 'expo-router';

const client = new Client()
    .setProject('67322c5c002c10ce2e0e')

const account = new Account(client);

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const router = useRouter();

    const navigateToRegister = () => {
        router.push('/register');
    };

    const handleLogin = async () => {
        try {
            const response = await account.createEmailPasswordSession(email, password);
            alert("Successfull login")
            console.log(response);
            router.replace("/(tabs)")
        } catch (error) {
            alert('Login failed. Please check your credentials.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <TouchableOpacity onPress={navigateToRegister}>
                <Text style={styles.registerLink}>
                    Don't have an account? Register here
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    message: {
        marginTop: 20,
        textAlign: 'center',
        color: 'red',
    },
    registerLink: {
        marginTop: 20,
        textAlign: 'center',
        color: '#1E90FF',
    },
});
