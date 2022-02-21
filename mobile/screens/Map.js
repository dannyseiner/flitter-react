import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, Alert, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
import config from '../config';
import openMap from 'react-native-open-maps';



const GOOGLE_MAPS_APIKEY = "AIzaSyChfA223jwm8F4SB2_TgIiBzikdLRPpyOc"
const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };

import io from "socket.io-client"
let global_date
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

    const [places, setPlaces] = useState([])
    const [userId, setUserId] = useState(0)
    const [userPlaces, setUserPlaces] = useState()
    const [pins, setPins] = useState([])
    const [selectedPlace, setSelectedPlace] = useState({
        place_id: 0,
        longtitude: 0,
        latitude: 0,
        show: false
    })
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
        console.log("map update")
        global_date = new Date()
        global_date.setHours(global_date.getHours() + 1);
        socket.emit("join_map", {
            location: location,
            userId: userId,
            last_update: global_date.toISOString().slice(0, 19).replace('T', ' ')
        })
        loadLocations()
    }, [location])


    useEffect(() => {
        socket.on("new_locations", (data) => {
            // setPins(data)
            loadLocations()
        })
    }, [socket])

    useEffect(() => {
        loadUser()
        loadLocations()
        loadPlaces()
        countUserPlaces()
    }, [])

    const loadPlaces = () => {
        axios.get(`${config.restapi}/places`)
            .then(response => { setPlaces(response.data) })
    }

    const countUserPlaces = () => {
        axios.get(`${config.restapi}/places/${userId}`)
            .then(reponse => setUserPlaces(reponse.data.length))
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

    const selectPlace = (place) => {
        console.log(location)
        if (selectedPlace.place_id === place.place_id) {
            openMap({ latitude: place.latitude, longitude: place.longitude, zoom: 20, provider: "google", travelType: "drive", navigate: true });
            // Linking.openURL(`https://www.google.com/maps/@${place.latitude},${place.longitude},14z`)

        } else {
            setSelectedPlace(place)
        }
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
        if (userPlaces === 3) {
            Alert.alert("You already have 3 places")
            return
        }
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
        <View key={i}>
            {plc.user_id + "" === userId + "" ?
                <Marker
                    onPress={() => selectPlace({ place_id: plc.place_id, latitude: plc.latitude, longitude: plc.longitude })}
                    coordinate={{ latitude: plc.latitude, longitude: plc.longitude }}
                    description={`Place created by ${plc.account_name}`}
                    title={plc.place_name}>
                    <View style={styles.myplace_container}>
                        <Text style={styles.place_text}>{plc.place_name}</Text>
                    </View>
                </Marker>
                :
                <Marker
                    onPress={() => selectPlace({ place_id: plc.place_id, latitude: plc.latitude, longitude: plc.longitude })}
                    coordinate={{ latitude: plc.latitude, longitude: plc.longitude }}
                    description={`Place created by ${plc.account_name}`}
                    title={plc.place_name}>
                    <View style={styles.place_container}>
                        <Text style={styles.place_text}>{plc.place_name}</Text>
                    </View>
                </Marker>
            }
        </View>
    ))

    const renderPeople = pins.map((pin, i) => (
        <PeopleBlock navigation={navigation} data={pin} key={i} userId={userId} />
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
                                onPress={() => selectPlace({ place_id: 1, latitude: params.latitude, longitude: params.longitude })}
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

const PeopleBlock = ({ data, userId, navigation }) => {
    const [lastActive, setLastActive] = useState("")
    const [selectedPlace, setSelectedPlace] = useState({
        place_id: 0,
        longtitude: 0,
        latitude: 0,
        show: false
    })
    const selectPlace = (place) => {
        if (selectedPlace.place_id === place.place_id) {
            openMap({ latitude: place.latitude, longitude: place.longitude, zoom: 20, provider: "google" });
            // Linking.openURL(`https://www.google.com/maps/@${place.latitude},${place.longitude},14z`)

        } else {
            setSelectedPlace(place)
        }
    }
    useEffect(() => {
        console.log(data.account_name)
        global_date = new Date()
        const date = new Date(data.last_update)
        var diffMs = (global_date - date); // milliseconds between now & Christmas
        var diffDays = Math.floor(diffMs / 86400000); // days
        var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

        if (diffDays === 0) {
            if (diffHrs === 0) {
                if (diffMins < 5) {
                    setLastActive("Active now")
                } else {
                    setLastActive(`Active ${diffMins} minutes ago`)
                }
            } else {
                setLastActive(`Active ${diffHrs} hours ago`)
            }
        } else {
            setLastActive(`Active ${diffDays} hours ago`)
        }
    }, []);
    return (
        <View >
            {data.account_id + "" === userId + "" ?
                <Marker
                    onPress={() => selectPlace({ place_id: data.user_id, latitude: data.latitude, longitude: data.longtitude, show: false })}
                    coordinate={{ latitude: data.latitude, longitude: data.longtitude }}
                    title={`${data.account_name}`}
                    description={lastActive}>
                    <View style={styles.mapmarkerUser}>
                        <Image
                            onLongPress={() => navigation.navigate("Profile", data.account_id)}
                            onPress={() => console.log("press")}
                            style={styles.image}
                            source={
                                {
                                    uri: data.render_image.replace(/\s/g, ''),
                                }}
                        />
                    </View>

                </Marker> :
                <Marker
                    onPress={() => selectPlace({ place_id: data.user_id, latitude: data.latitude, longitude: data.longtitude, show: false })}
                    coordinate={{ latitude: data.latitude, longitude: data.longtitude }}
                    title={`${data.account_name}`}
                    description={lastActive}>
                    <View style={styles.mapmarker}>
                        <Image
                            onLongPress={() => navigation.navigate("Profile", data.account_id)}

                            style={styles.image}
                            source={
                                {
                                    uri: data.render_image.replace(/\s/g, ''),
                                }}
                        />
                    </View>

                </Marker>
            }
        </View>
    )
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
        backgroundColor: "#00aced",
        padding: 2,
        borderRadius: 100,
    },
    mapmarker: {
        padding: 2,
        borderRadius: 100,
        backgroundColor: "#550bcc"
    },
    myplace_container: {
        padding: 5,
        borderRadius: 9,
        backgroundColor: "#00aced"
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
