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
        getUser()
    }, [])

    useEffect(() => {
        getNotifications()
    }, [userId])

    const getUser = async () => {
        const getuserid = await AsyncStorage.getItem("user")
        setUserId(getuserid)
    }

    const getNotifications = () => {
        axios.post(`${config.restapi}/userNotifications`, {
            accountId: userId
        }).then(response => setNotifications(response.data))
    }

    const renderNotifications = notifications.map((not) => (
        <View style={styles.notificationblock} key={not.not_id}>
            <Text style={styles.notificationcreated}>{not.not_created}</Text>
            <Text style={styles.notificationtext}>{not.not_header}</Text>
        </View>
    ))

    return (
        <View>
            <ScrollView style={{ height: "100%" }}>
                {renderNotifications}
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
        backgroundColor: "#242445"
    },
    notificationtext: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
        width: "50%",
        top: -10,
    },
    notificationcreated: {
        textAlign: "right",
        color: "lightgrey"
    }
})

export default Notifications;
