import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import styles from './style';

export default function AuthScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSignIn = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
        } catch (error) {
            Alert.alert('Sign-in Failed', error.message);
        }
        setLoading(false);
    };

    const handleSignUp = async () => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(
                FIREBASE_AUTH,
                email,
                password
            );
            const user = userCredential.user;
            await setDoc(doc(FIREBASE_DB, 'users', user.uid), {
                email: user.email,
                createdAt: new Date().toISOString(),
            });
        } catch (error) {
            Alert.alert('Sign-up Failed', error.message);
        }
        setLoading(false);
    };

    return (
        <LinearGradient
            colors={['#E3FDFD', '#FEFEFE']}
            style={styles.gradientBackground}
        >
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.innerContainer}>
                        <Text style={styles.header}>
                            {isSignUp ? 'Create an Account' : 'Sign In'}
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#3A506B"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#3A506B"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <TouchableOpacity
                            style={[styles.buttonContainer, loading && { opacity: 0.7 }]}
                            onPress={isSignUp ? handleSignUp : handleSignIn}
                            disabled={loading}
                        >
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>
                                    {isSignUp ? 'Sign Up' : 'Sign In'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsSignUp((prev) => !prev)}>
                            <Text style={styles.toggleText}>
                                {isSignUp
                                    ? 'Already have an account? Sign In'
                                    : "Don't have an account? Sign Up"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}
