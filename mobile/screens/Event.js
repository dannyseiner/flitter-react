import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Icon } from "react-native-elements"
import config from "../config"
import axios from "axios"

const Event = ({ route, navigation }) => {
    const [event, setEvent] = useState(route.params)
    const [userStatus, setUserStatus] = useState(false)



    return (
        <View style={styles.container}>
            <View style={styles.block}>
                <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "500" }}>
                    {event.name}
                </Text>
                <Text style={{ fontSize: 14, textAlign: "center", fontWeight: "500" }}>
                    {event.date}
                </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("ProfileBar", event.data.account_id)} style={styles.block}>
                <Text style={{ fontSize: 16 }}>{event.data.account_name}</Text>
            </TouchableOpacity>
            <View style={styles.block}>
                <Text style={{ fontSize: 16 }}>{event.data.event_description}</Text>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button1}>
                    <View style={styles.buttonTextContainer}>
                        <Icon
                            name="check"
                            type="font-awesome"
                            color="white"
                            style={{ flexDirection: "row", top: 2, }}
                        />
                        <Text style={styles.buttonText}>Going</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2}>
                    <View style={styles.buttonTextContainer}>
                        <Icon
                            name="bookmark"
                            type="font-awesome"
                            color="white"
                            style={{ flexDirection: "row", top: 2, }}
                        />
                        <Text style={styles.buttonText}>Save</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    block: {
        width: "95%",
        marginTop: 10,
        left: "2.5%",
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 9
    },
    footer: {
        position: 'absolute',
        flexDirection: "row",
        bottom: 30,
        width: "95%",
        left: '2.5%',
        borderRadius: 9,
    },
    button1: {
        width: "45%",
        left: "10%",
        backgroundColor: "grey",
        borderRadius: 9,
        height: 50,
        padding: 10,
    },
    button2: {
        width: "45%",
        left: "70%",
        backgroundColor: "#00aced",
        borderRadius: 9,
        height: 50,
        padding: 10,
    },
    buttonText: {
        flexDirection: "column",
        fontWeight: "600",
        top: -20,
        fontSize: 17,
        color: "white",
        left: 30,
    },
    buttonTextContainer: {
        left: "25%",
    }
})

export default Event;
