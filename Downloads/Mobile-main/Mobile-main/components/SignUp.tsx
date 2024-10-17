import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { auth, createUserWithEmailAndPassword } from '../firebase';

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<SignUpScreenNavigationProp>();

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigation.navigate('Welcome');
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                alert('Failed to sign up: ' + error.message);
            } else {
                console.error('An unknown error occurred.');
                alert('Failed to sign up: An unknown error occurred.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastrar</Text>
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
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkContainer}>
                <Text style={styles.link}>Já tem uma conta? Faça login!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Cadastrar-se</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        color: 'black',
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
        alignSelf: 'stretch',
        backgroundColor: '#ffffff',
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#4146B6',
        padding: 15,
        borderRadius: 4,
        alignSelf: 'stretch',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    linkContainer: {
        alignSelf: 'stretch',
        alignItems: 'flex-end',
        marginBottom: 15,
    },
    link: {
        color: 'black',
        textAlign: 'right',
        fontWeight: 'normal',
    },
});

export default SignUp;
