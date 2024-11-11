import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Client, Account } from 'appwrite';
import { router, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';

const client = new Client().setProject('67322c5c002c10ce2e0e');
const account = new Account(client);

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focusedInput, setFocusedInput] = useState('');
    const navigation = useNavigation();
    const router = useRouter();

    const navigateToRegister = () => {
        router.replace('/register');
    };

    const handleLogin = async () => {
        try {
            const response = await account.createEmailPasswordSession(email, password);
            alert("Successful login");
            console.log(response);
            router.replace("/(tabs)");
        } catch (error) {
            alert('Login failed. Please check your credentials.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <Text style={styles.title}>Login here</Text>
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
            <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot your password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToRegister}>
                <Text style={styles.registerLink}>Create new account</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>Or continue with</Text>
            <View style={styles.socialIcons}>
                <TouchableOpacity style={styles.iconButton}>
                    <Image source={{ uri: 'google-icon-url' }} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;

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
        marginBottom: 55,
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
    forgotPassword: {
        color: Colors.blue,
        textAlign: 'right',
        marginBottom: 20,
    },
    loginButton: {
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
    loginButtonText: {
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
    orText: {
        fontSize: 16,
        color: '#7f8c8d',
        textAlign: 'center',
        marginVertical: 20,
    },
    socialIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    iconButton: {
        marginHorizontal: 10,
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        width: 150,
        height: 50,
    },
    icon: {
        width: 24,
        height: 24,
    },
});
