import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text, Alert, Image, TextInput, Linking } from 'react-native';
import axios from 'axios'
import config from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';



const Login = ({ navigation }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [registerBlockEvt, setRegisterBlockEvt] = useState(false)
    const [registerText, setRegisterText] = useState("Create new account")

    // ANIMATED
    const slideAnim = useRef(new Animated.Value(330)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start(() => {
            fadeOut()
        });
    };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            delay: 3000,
            useNativeDriver: false
        }).start();
    };

    const slideIn = () => {
        Animated.timing(slideAnim, {
            toValue: -280,
            duration: 500,
            useNativeDriver: false

        }).start();
    };

    const slideOut = () => {
        Animated.timing(slideAnim, {
            toValue: 330,
            duration: 500,
            useNativeDriver: false
        }).start();
    };


    const onFaceId = async () => {
        try {
            // Checking if device is compatible
            const isCompatible = await LocalAuthentication.hasHardwareAsync();

            if (!isCompatible) {
                throw new Error('Your device isn\'t compatible.')
            }

            // Checking if device has biometrics records
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();

            if (!isEnrolled) {
                navigation.navigate('Home')
                return
            }

            // Authenticate user
            const auth = await LocalAuthentication.authenticateAsync({
                promptMessage: "Log into Flitter"
            });
            console.log('Authenticated', 'Welcome back !')
            if (auth.success) {
                navigation.navigate('Home')
            } else {
                navigator.navigate("Login")
            }

        } catch (error) {
            console.log('An error as occured', error?.message);
        }
    };





    useEffect(() => {
        getMyStringValue()
    }, [])

    const loadInBrowser = () => {
        Linking.openURL("http://172.20.10.3:3000").catch(err => console.error("Couldn't load page", err));
    };

    const registerBlockEvent = () => {
        if (!registerBlockEvt) {
            slideIn()
            setRegisterBlockEvt(true)
            setRegisterText("Log into account")
        } else {
            slideOut()
            setRegisterText("Create new account")
            setRegisterBlockEvt(false)
        }
    }
    const login = () => {
        axios.post(`${config.restapi}/login`, {
            email: username,
            password: password
        })
            .then(response => {
                if (response.data.status === false) {
                    console.log("failed");
                    fadeIn()
                    return
                }
                console.log(response.data[0].account_id)
                setStringValue(`${response.data[0].account_id}`)
                navigation.navigate('Home')

            })
    }




    const setStringValue = async (data) => {
        try {
            await AsyncStorage.setItem('user', data)
        } catch (e) {
            console.log(e)
        }
    }

    const getMyStringValue = async () => {
        try {
            const getData = await AsyncStorage.getItem('user')
            if (getData !== null) {
                onFaceId()
            }
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <View style={styles.backgroundClass}>

            <Image
                style={styles.image}
                source={require("../logo-nobg.png")}
            />
            <View style={styles.form}>
                <Animated.View style={{ width: "80%", backgroundColor: "red", top: -20, padding: 10, height: 50, left: "10%", borderRadius: 10, opacity: fadeAnim }}>
                    <Text style={{ fontSize: 20, textAlign: "center", color: "white", fontWeight: "bold", padding: 3 }}>Wrong username or password!</Text>
                </Animated.View>
                <TextInput
                    style={styles.input}
                    placeholder="Username or Email"
                    onChangeText={val => setUsername(val)}
                    value={username}
                />
                <TextInput
                    style={styles.input2}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={val => setPassword(val)}
                    value={password}
                />
                <View style={styles.loginBlock}>
                    <Text
                        style={styles.loginButton}
                        onPress={() => login()}>
                        Log In
                    </Text>
                </View>

            </View>
            <Animated.View
                useNativeDriver={true}
                style={[
                    styles.registerBlock,
                    {
                        top: slideAnim
                    }
                ]}
            >
                <Text style={styles.registerText}
                    onPress={() => registerBlockEvent()}>{registerText}</Text>
                <Text style={{ padding: 10, marginTop: 40, fontWeight: "600", color: "lightgrey", fontSize: 18 }}>
                    You can register new account <Text onPress={() => loadInBrowser()} style={{ color: "white", fontWeight: "bold", fontSize: 19 }}>here</Text>
                </Text>
            </Animated.View>
        </View >
    );
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        marginTop: "50%",
        marginBottom: 20,
        fontSize: 30,
        fontFamily: "Arial",
        textAlign: "center"
    },
    backgroundClass: {
    },
    form: {
        top: 130,
    },
    image: {
        top: 80,
        height: 170,
        width: "50%",
        left: "25%",
    },
    input: {
        width: "80%",
        marginBottom: 20,
        left: "10%",
        fontSize: 23,
        margin: "auto",
        padding: 10,
        borderRadius: 9,
        color: "black",
        backgroundColor: "white",
    },
    input2: {
        width: "80%",
        left: "10%",
        marginBottom: 20,
        color: "black",
        fontSize: 23,
        borderRadius: 9,
        backgroundColor: "white",
        padding: 10,
    },
    loginBlock: {
        borderRadius: 9,
        backgroundColor: "#242445",
        width: "50%",
        left: "25%",
    },
    loginButton: {
        textAlign: "center",
        fontSize: 20,
        padding: 10,
        color: "white",
        fontWeight: "700",
    },
    registerBlock: {
        backgroundColor: "#242445",
        height: 800,
        borderRadius: 30,
        width: "100%",
        padding: 20,
    },
    registerText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
    }
})

export default Login;