import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import axios from "axios"
import config from "../config"
import Footer from "../components/Footer"
const Notifications = ({ navigation }) => {
    const [userId, setUserId] = useState(0)
    const [notifications, setNotifications] = useState([])
    useEffect(() => {
        (async () => {
            const getuserid = await AsyncStorage.getItem("user")
            setUserId(getuserid)
        })
    }, [])


    const getNotifications = () => {
        axios.post(`${config.restapi}/userNotifications`, {
            accountId: userId
        }).then(response => console.log(response.data))
    }

    const renderNotifications = notifications.map(() => (
        <Text>ass</Text>
    ))

    return (
        <View>
            <ScrollView style={{ height: "100%" }}>
                <View style={styles.notificationblock}>
                    <Text style={styles.notificationcreated}>10.10.2002</Text>
                    <Text style={styles.notificationtext}>Randon Text</Text>
                </View>
            </ScrollView>
            <Footer active="Notifications" navigation={navigation} />
        </View>

    );
}

const styles = StyleSheet.create({
    notificationblock: {
        marginTop: 10,
        padding: 13,
        borderRadius: 11,
        width: "95%",
        left: "2.5%",
        backgroundColor: "white"
    },
    notificationtext: {
        fontSize: 18,
        fontWeight: "600",
        width: "50%",
        top: -10,
    },
    notificationcreated: {
        textAlign: "right"
    }
})

export default Notifications;
