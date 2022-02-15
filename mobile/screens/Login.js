import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, TextInput } from 'react-native';
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
        <View>
            <Text style={styles.header}>F</Text>
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
    input: {
        width: "100%",
        marginBottom: 20,
        textAlign: "center",
        fontSize: 23,
        padding: 2,
    },
    input2: {
        width: "100%",
        marginBottom: 20,
        textAlign: "center",
        fontSize: 23,
        padding: 2,
    },
    loginButton: {
        top: 20
    }
})

export default Login;
