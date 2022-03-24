import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Button, ScrollView, Platform, TextInput, StyleSheet } from 'react-native';
import axios from "axios"
import config from "../config"
import Footer from '../components/Footer';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
        axios.get(`${config.restapi}/getuser/`)
    }
    const saveSettings = () => {
        console.log("pressed")
        axios.post(`${config.restapi}/edituser`, {
            userId: userId,
            ...userData
        })
    }

    return (
        <View style={{ height: "100%" }}>
            <ScrollView>
                <View style={styles.editsettings}>
                    <Text style={styles.edittext}>Username</Text>
                    <TextInput placeholder="name" value={userData.username} onChangeText={e => { setUserData({ ...userData, username: e }); console.log(userData) }} style={styles.editinput} />
                </View>
                <View style={styles.editsettings}>
                    <Text style={styles.edittext} onPress={() => Alert.alert("You can't change email!")}>Email</Text>
                    <TextInput placeholder="name" editable={false} value={userData.email} onChangeText={e => { setUserData({ ...userData, email: e }) }} style={styles.editinput} />
                </View>

                <View style={styles.editsettings}>
                    <Text style={styles.edittext} >Profile image</Text>
                    <Button title="Take photo" onPress={() => takePhoto()} />
                    <Button title="Import from gallery" onPress={pickImage} />
                </View>

                <View style={styles.savesettings}>
                    <Text style={styles.savesettingstext} onPress={() => saveSettings()}>Save settings</Text>
                </View>


            </ScrollView>
            <Footer active="Settings" navigation={navigation} />
        </View>

    );
}

const styles = StyleSheet.create({
    editsettings: {
        width: "95%",
        backgroundColor: "white",
        padding: 10,
        marginTop: 10,
        left: "2.5%",
        borderRadius: 10,
    },
    editinput: {
        padding: 5,
        marginTop: 5,
        fontSize: 15,
    },
    edittext: {
        fontSize: 17,
        fontWeight: "600"
    },

    savesettings: {
        padding: 10,
        top: 20,
        borderRadius: 10,
        width: "95%",
        left: "2.5%",
        backgroundColor: "#00aced"
    },
    savesettingstext: {
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
        color: "white"
    }
})

export default Editprofile;
