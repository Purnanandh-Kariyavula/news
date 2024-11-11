import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Client, Account, ID } from 'appwrite';
import { useRouter } from 'expo-router';

const client = new Client()
    .setProject('67322c5c002c10ce2e0e')

const account = new Account(client);

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
    const handleRegister = async () => {
        try {
            const response = await account.create(ID.unique(), email, password, name);
            alert('Registration successful!');
            router.replace("/(tabs)")
            console.log(response);
        } catch (error) {
            alert('Registration failed.');
            console.error(error);
        }
    };

    const navigateToLogin = () => {
        router.push('/(starter)');
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
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
            <Button title="Register" onPress={handleRegister} />
            <TouchableOpacity onPress={navigateToLogin}>
                <Text style={styles.registerLink}>
                    Already have an account? Login here
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
