import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SegmentedControlIOSComponent } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
import config from '../config';
import io from "socket.io-client"

const connectionConfig = {
    jsonp: false,
    reconnection: true,
    reconnectionDelay: 100,
    reconnectionAttempts: 5000,
    transports: ['websocket']
};
const socket = io.connect(`http://${config.socket}`, connectionConfig)


const Map = ({ navigation }) => {
    const [userId, setUserId] = useState(0)
    const [pins, setPins] = useState([])
    const [userData, setUserData] = useState({
        account_name: "",
        decoded_image: ""
    })
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });

    useEffect(() => {
        socket.emit("join_map", {
            location: location,
            userId: userId,
        })

    }, [location])

    useEffect(() => {
        socket.on("new_locations", (data) => {
            console.log("NEW LOCATION")
            console.log(data)
            setPins(data)
        })
    }, [socket])

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = async () => {
        const userId = await AsyncStorage.getItem("user")
        setUserId(userId)
        axios.get(`${config.restapi}/user/${userId}`)
            .then(response => setUserData(response.data))
    }
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        })();
    }, []);



    return (
        <View style={styles.container}>
            {userData.username === "" ? <></> :
                <MapView style={styles.map} initialRegion={location} >
                    {pins.map((pin, i) => (
                        <Marker
                            key={i}
                            // onPress={() => console.log(userData.account_name)}
                            coordinate={{ latitude: pin.location.latitude, longitude: pin.location.longitude }}
                            // image={
                            //     { uri: userData.decoded_image.replace(/\s/g, '') }}
                            title={"Flitter user"}
                            description={"Active"}
                        />
                    ))}


                </MapView>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: "100%",
        height: "100%"
    },
})

export default Map;
