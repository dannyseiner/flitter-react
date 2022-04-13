import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Button, ScrollView, Animated, Platform, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from "axios"
import config from "../config"
import Footer from '../components/Footer';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';

const Editprofile = ({ navigation }) => {
    const [userId, setUserId] = useState(0)

    const [userData, setUserData] = useState({
        username: "",
        email: "dannyseiner@gmail.com",
        image: ""
    })

    useEffect(() => {
        (async () => {
            const getuserid = await AsyncStorage.getItem("user")
            setUserId(getuserid)
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                const { status2 } = await ImagePicker.requestCameraPermissionsAsync()()
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
                if (status2 !== "granted") {
                    alert("Sorry, we need camera permissions to make this work!")
                }
            }
        })();
    }, []);

    useEffect(() => {
        if (userId === 0) return
        getProfile()
    }, [userId])

    const fadeAnim = new Animated.Value(0)
    const spinValue = new Animated.Value(0);

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1000,
            duration: 300,
            useNativeDriver: false
        }).start();
    };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: false,
        }).start();
    };
    const spinAnim = () => {
        Animated.loop(Animated.timing(spinValue, {
            toValue: 1,
            duration: 800,
            useNativeDriver: false,
        })).start();
    }


    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.cancelled) {
            setUserData({ ...userData, image: result.base64 })
        }
    };


    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            base64: true,
            quality: 0
        })

        if (!result.cancelled) {
            setUserData({ ...userData, image: result.base64 })
        }
    }

    const getProfile = () => {
        axios.get(`${config.restapi}/user/${userId}`)
            .then(response => {
                setUserData({
                    username: response.data[0].account_name,
                    email: response.data[0].account_email,
                    image: ""
                })
            })
    }
    const saveSettings = () => {
        fadeIn()
        spinAnim()
        console.log("pressed")
        axios.post(`${config.restapi}/edituser`, {
            userId: userId,
            ...userData
        })
            .then(response => setTimeout(() => fadeOut(), 800))
    }

    return (
        <View style={{ height: "100%" }}>
            {/* OVERLAY */}
            <Animated.View style={{ width: "100%", height: fadeAnim, position: "absolute", top: 0, left: 0, opacity: 1, backgroundColor: "black", zIndex: 200 }}>
                <Animated.View style={{ transform: [{ rotate: spin }], marginTop: "80%" }}>
                    <Icon
                        type="font-awesome"
                        name="spinner"
                        color="white"
                        size={40}
                    />
                </Animated.View>

            </Animated.View>
            <ScrollView>
                <View style={styles.editsettings}>
                    <Text style={styles.edittext}>Username</Text>
                    <TextInput placeholder="name" placeholderTextColor="grey" value={userData.username} onChangeText={e => { setUserData({ ...userData, username: e }); console.log(userData) }} style={styles.editinput} />
                </View>
                <View style={styles.editsettings}>
                    <Text style={styles.edittext} onPress={() => Alert.alert("You can't change email!")}>Email</Text>
                    <TextInput placeholder="name" editable={false} value={userData.email} onChangeText={e => { setUserData({ ...userData, email: e }) }} style={styles.editinput} />
                </View>

                <View style={styles.editsettings}>
                    <Text style={styles.edittext} >Profile image</Text>
                    <Button title="Take photo" onPress={() => takePhoto()} color="white" />
                    <Button title="Import from gallery" onPress={pickImage} color="white" />
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.savesettings} onPress={() => saveSettings()}>
                <Icon
                    type="font-awesome"
                    name="save"
                    color="white"
                    style={{ marginTop: 15, }}
                    size={30}
                />
                {/* <Text style={styles.savesettingstext} >Save settings</Text> */}
            </TouchableOpacity>
            <Footer active="Settings" navigation={navigation} />
        </View>

    );
}

const styles = StyleSheet.create({
    editsettings: {
        width: "95%",
        backgroundColor: "#242445",
        padding: 15,
        marginTop: 10,
        left: "2.5%",
        borderRadius: 10,
    },
    editinput: {
        color: "white",
        padding: 5,
        marginTop: 5,
        fontSize: 15,
    },
    edittext: {
        fontSize: 17,
        color: "white",
        color: "lightgrey",
        fontWeight: "600"
    },

    savesettings: {
        padding: 10,
        borderRadius: 100,
        position: "absolute",
        zIndex: 10,
        top: "82%",
        height: 120,
        width: "30%",
        left: "35%",
        backgroundColor: "#242445"
    },
    savesettingstext: {
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
        color: "white"
    }
})

export default Editprofile;
