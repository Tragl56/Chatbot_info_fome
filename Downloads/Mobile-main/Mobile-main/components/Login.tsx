import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { auth, signInWithEmailAndPassword } from '../firebase';
import { useAuth } from '../AuthContext';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const { currentUser } = useAuth();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('Welcome');
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                alert('Failed to login: ' + error.message);
            } else {
                console.error('An unknown error occurred.');
                alert('Failed to login: An unknown error occurred.');
            }
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
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.linkContainer}>
                <Text style={styles.link}>Não tem uma conta? Cadastre-se!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
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
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    linkContainer: {
        alignSelf: 'stretch',
        alignItems: 'flex-end',
        marginBottom: 25,
    },
    link: {
        color: 'black',
        textAlign: 'right',
    },
});

export default Login;
