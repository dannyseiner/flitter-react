import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, TextInput } from 'react-native';
import axios from 'axios'
import config from '../config'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const login = () => {
        axios.post(`${config.restapi}/login`, {
            email: username,
            password: password
        })
            .then(response => {
                if (response.data.length === 0) return
                _storeData(response.data[0])
            })
    }


    _storeData = async (data) => {
        try {
            await AsyncStorage.setItem(
                'user',
                JSON.stringify(data)
            );
        } catch (error) {
            // Error saving data
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
