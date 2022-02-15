import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, Image, TextInput, Linking } from 'react-native';
import axios from 'axios'
import config from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Login = ({ navigation }) => {
    const [username, setUsername] = useState("dannyseiner")
    const [password, setPassword] = useState("admin")
    const [data, setData] = useState("")

    useEffect(() => {
        getMyStringValue()
    })

    const loadInBrowser = () => {
        Linking.openURL("http://172.20.10.3:3000").catch(err => console.error("Couldn't load page", err));
    };
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
                <Button
                    title="Log In"
                    style={styles.loginButton}
                    onPress={() => login()}
                />
            </View>
            <View style={styles.registerBlock}>
                <Text style={styles.registerText}
                    onPress={() => loadInBrowser()}>Create new account</Text>
            </View>
        </View>
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
        backgroundColor: "white"
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
        backgroundColor: "#F0F0F0",
    },
    input2: {
        width: "80%",
        left: 35,
        marginBottom: 20,
        color: "black",
        fontSize: 23,
        borderRadius: 9,
        backgroundColor: "#F0F0F0",
        padding: 10,
    },
    loginButton: {
        top: 30,
        width: "40%",
        backgroundColor: "#00aced",
        color: "red"
    },
    registerBlock: {
        backgroundColor: "#00aced",
        marginTop: 400,
        borderRadius: 30,
        height: 500,
        paddingTop: 20,
    },
    registerText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
    }
})

export default Login;
