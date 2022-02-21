import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, Alert } from 'react-native';
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


const Map = ({ route, navigation }) => {
    const params = route.params
    console.log(params)

    const [places, setPlaces] = useState([])
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
        console.log("MAP UPDATED [join_map]")
        console.log(location)
        socket.emit("join_map", {
            location: location,
            userId: userId,
        })
    }, [location])


    useEffect(() => {
        socket.on("new_locations", (data) => {
            console.log("NEW LOCATION")
            setPins(data)

        })
    }, [socket])

    useEffect(() => {
        loadUser()
        loadLocations()
        loadPlaces()
    }, [])

    const loadPlaces = () => {
        axios.get(`${config.restapi}/places`)
            .then(response => { setPlaces(response.data) })
    }

    const loadLocations = () => {
        axios.get(`${config.restapi}/locations`)
            .then(response => setPins(response.data))
    }

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


    const addNewMark = (coords) => {
        const tmp_location = {
            "latitude": coords.latitude,
            "latitudeDelta": 0.0922,
            "longitude": coords.longitude,
            "longitudeDelta": 0.0421,
        }
        Alert.prompt(
            "Create place",
            `Enter name for place`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: text => {
                        axios.post(`${config.restapi}/createplace`, {
                            user_id: userId,
                            place_name: text,
                            ...tmp_location
                        })
                        loadPlaces()
                    }
                }
            ]
        )
    }

    const renderPlaces = places.map((plc, i) => (
        <Marker
            key={i}
            coordinate={{ latitude: plc.latitude, longitude: plc.longitude }}
            description={`Place created by ${plc.account_name}`}
            title={plc.place_name}>
            <View style={styles.place_container}>
                <Text style={styles.place_text}>{plc.place_name}</Text>
            </View>
        </Marker>
    ))

    const renderPeople = pins.map((pin, i) => (
        <View key={i}>
            {pin.account_id + "" === userId + "" ?
                <Marker
                    key={i}
                    coordinate={{ latitude: pin.latitude, longitude: pin.longtitude }}
                    title={`${pin.account_name}`}
                    description={"Active"}>
                    <View style={styles.mapmarkerUser}>
                        <Image
                            style={styles.image}
                            source={
                                {
                                    uri: pin.render_image.replace(/\s/g, ''),
                                }}
                        />
                    </View>

                </Marker> :
                <Marker
                    key={i}
                    coordinate={{ latitude: pin.latitude, longitude: pin.longtitude }}
                    title={`${pin.account_name}`}
                    description={"Active"}>
                    <View style={styles.mapmarker}>
                        <Image
                            style={styles.image}
                            source={
                                {
                                    uri: pin.render_image.replace(/\s/g, ''),
                                }}
                        />
                    </View>

                </Marker>
            }
        </View>
    ))


    return (
        <View style={styles.container}>
            {userData.username === "" ? <></> :
                <MapView style={styles.map} initialRegion={location}
                    onLongPress={e => addNewMark(e.nativeEvent.coordinate)}>
                    {params === undefined ?
                        <>
                            {renderPeople}
                            {renderPlaces}
                        </>
                        : <>
                            <Marker
                                coordinate={{ latitude: params.latitude, longitude: params.longitude }}
                                description={`Place created by ${params.account_name}`}
                                title={params.place_name}>
                                <View style={styles.place_container}>
                                    <Text style={styles.place_text}>{params.place_name}</Text>
                                </View>
                            </Marker>
                        </>}

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
    image: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    mapmarkerUser: {
        backgroundColor: "cyan",
        padding: 2,
        borderRadius: 100,
    },
    mapmarker: {
        padding: 2,
        borderRadius: 100,
        backgroundColor: "#550bcc"
    },
    place_container: {
        padding: 5,
        borderRadius: 9,
        backgroundColor: "#550bcc"
    },
    place_text: {
        fontWeight: "bold",
        color: "white"
    },

    maptext: {
        color: "white",
        fontWeight: "bold"
    }
})

export default Map;
