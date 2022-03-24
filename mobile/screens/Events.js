import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Footer from "../components/Footer"
import axios from "axios"
import config from "../config"
const Events = ({ navigation }) => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        getEvents()
    }, [])

    const getEvents = () => {
        axios.get(`${config.restapi}/events`)
            .then(response => setEvents(response.data))
    }

    const renderEvents = events.map(evt => (
        <View style={styles.eventStyle}>
            <Text style={styles.eventTitle}>{evt.event_title}</Text>
            <Text style={styles.eventText}>{evt.event_description}</Text>
            <View style={{ marginTop: 5 }}>
                <Text style={styles.eventauthor}>{evt.author_id}</Text>
                <Text style={styles.eventdate}>{evt.event_date.split("T")[0]}</Text>
            </View>
        </View>
    ))

    return (
        <View>
            <ScrollView style={{ height: "100%" }}>
                {renderEvents}
            </ScrollView>
            <Footer navigation={navigation} active="Menu" />
        </View>
    );
}

const styles = StyleSheet.create({
    eventStyle: {
        width: "95%",
        left: "2.5%",
        backgroundColor: "white",
        marginTop: 10,
        borderRadius: 9,
        padding: 13,
    },
    eventTitle: {
        fontSize: 20,
        fontWeight: "500",
    },
    eventText: {
        paddingLeft: 5,
        fontSize: 15,
    },
    eventdate: {
        textAlign: "right",
        marginTop: -16
    }
})

export default Events;
