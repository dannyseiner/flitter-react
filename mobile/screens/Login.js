import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text, Image, TextInput, Linking } from 'react-native';
import axios from 'axios'
import config from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = ({ navigation }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [registerBlockEvt, setRegisterBlockEvt] = useState(false)
    const [registerText, setRegisterText] = useState("Create new account")

    // ANIMATED
    const slideAnim = useRef(new Animated.Value(400)).current;

    const slideIn = () => {
        Animated.timing(slideAnim, {
            toValue: -280,
            duration: 500,
            useNativeDriver: false

        }).start();
    };

    const slideOut = () => {
        Animated.timing(slideAnim, {
            toValue: 400,
            duration: 500,
            useNativeDriver: false
        }).start();
    };



    useEffect(() => {
        getMyStringValue()
    })

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
                if (response.data.length === 0) {
                    alert("Wrong username password! Please try again")
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
                navigation.navigate('Home')
            }
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <View style={styles.backgroundClass}>
            <Image
                style={styles.image}
                source={{
                    uri: "https://us.123rf.com/450wm/konstantinks/konstantinks1503/konstantinks150300237/37926587-letter-f-in-orange-circle-on-white-background-vector-illustration-%C5%93.jpg?ver=6"
                }}
            />
            <View style={styles.form}>
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
        top: 150,
    },
    image: {
        top: 80,
        height: 140,
        width: 140,
        left: 130,
    },
    input: {
        width: "80%",
        marginBottom: 20,
        left: 35,
        fontSize: 23,
        margin: "auto",
        padding: 10,
        borderRadius: 9,
        color: "black",
        backgroundColor: "white",
    },
    input2: {
        width: "80%",
        left: 35,
        marginBottom: 20,
        color: "black",
        fontSize: 23,
        borderRadius: 9,
        backgroundColor: "white",
        padding: 10,
    },
    loginBlock: {
        borderRadius: 9,
        backgroundColor: "#00aced",
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
        backgroundColor: "#00aced",
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
