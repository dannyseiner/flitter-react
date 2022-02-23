import React, { useState, useEffect } from 'react';
import { View, Button, Text, Switch, StyleSheet, ScrollView } from 'react-native';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from "../config"

const Settings = ({ navigation }) => {
    const [userId, setUserId] = useState(0)
    const [location, setLocation] = useState(true)

    useEffect(() => {
        getUser()
    }, [])
    useEffect(() => {
        locationHandler()

    }, [userId])

    useEffect(() => {
        console.log("loc: " + location)
        updateLocation()
    }, [location])
    const getUser = async () => {
        const id = await AsyncStorage.getItem("user")
        setUserId(id)
    }
    const locationHandler = () => {
        if (userId === 0) return
        console.log(`${config.restapi}/location/${userId}`)
        axios.get(`${config.restapi}/location/${userId}`)
            .then(response => {
                setLocation(response.data[0].active + "" === 1 + "" ? true : false)
            })
    }
    const updateLocation = () => {
        console.log(location)
        axios.post(`${config.restapi}/locationstatus`, {
            userId: userId,
            status: location + "" === true + "" ? 1 : 0
        })
            .then(resposne => {
            })

    }

    const singOut = async () => {
        try {
            await AsyncStorage.removeItem('user')
            navigation.navigate("Login")
        } catch (e) {
        }
    }
    return (
        <View>
            <ScrollView style={styles.container}>
                <Text style={{ marginBottom: 20 }}></Text>

                <SetingsBlock data={{ name: "Private Profile" }} checked />

                <View style={styles.containerBlock}>
                    <Text style={styles.textBlock}>Fliter Maps</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#00aced" }}
                        style={{ alignSelf: 'flex-end', top: -10 }}
                        value={location}
                        onValueChange={e => {
                            setLocation(e)
                        }}
                    />
                </View>


                <Button
                    title="Sign out"
                    onPress={() => singOut()}
                />
            </ScrollView>
            <Footer active="Settings" navigation={navigation} />
        </View>
    );
}

const SetingsBlock = ({ data, checked = false }) => {
    const [state, setState] = useState(checked)

    const updateStatus = () => {

    }

    return (
        <View style={styles.containerBlock}>
            <Text style={styles.textBlock}>{data.name}</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#00aced" }}
                style={{ alignSelf: 'flex-end', top: -10 }}
                onValueChange={e => setState(e)}
                value={state}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    containerBlock: {
        width: "90%",
        left: "5%",
        padding: 10,
        backgroundColor: "white",
        marginBottom: 20,
        borderRadius: 9
    },
    textBlock: {
        color: "black",
        left: 10,
        fontSize: 17,
        top: 14,
        fontWeight: "600"
    }
})

export default Settings;
