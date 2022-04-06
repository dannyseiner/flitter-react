import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import axios from "axios"
import config from "../config"

const Footer = ({ navigation, active }) => {



    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        const id = await AsyncStorage.getItem("user")
    }


    return (
        <>
            <View style={[{ width: "10%", backgroundColor: "#e6e6e6", height: 100, position: "absolute", top: "86%", }, { transform: [{ rotate: "-45deg" }] }]}></View>
            <View style={[{ width: "10%", backgroundColor: "#e6e6e6", height: 100, right: 0, position: "absolute", top: "86%", }, { transform: [{ rotate: "45deg" }] }]}></View>

            <View style={footer.footerContainer}>
                <Block navigation={navigation} active={active} options={{
                    name: "book",
                    type: "font-awesome",
                    text: "Home"
                }} />
                <Block navigation={navigation} active={active} options={{
                    name: "user",
                    type: "font-awesome",
                    text: "Profile"
                }} />
                <Block navigation={navigation} active={active} options={{
                    name: "users",
                    type: "font-awesome",
                    text: "Friends"
                }} />
                <Block navigation={navigation} active={active} options={{
                    name: "bell",
                    type: "font-awesome",
                    text: "Notifications"
                }} />
                <Block navigation={navigation} active={active} options={{
                    name: "bars",
                    type: "font-awesome",
                    text: "Menu"
                }} />

            </View>
            <View style={{ width: "10%", backgroundColor: "cyan", borderTopRightRadius: 100, top: -30, right: "100%", }}></View>

        </>

    )
}

const Block = ({ navigation, active, options }) => {
    const [userId, setUserId] = useState(0)
    const [blockStyle, setBlocKStyle] = useState(footer.footerBlock)
    const [blockStyleActive, setBlocKStyleActive] = useState(footer.active)
    const loadUser = async () => {
        const data = await AsyncStorage.getItem("user")
        setUserId(data)
    }
    useEffect(() => {
        loadUser()
    }, []);

    return (
        <>
            {active === options.text ?
                <View style={blockStyleActive}>
                    <Icon
                        name={options.name}
                        style={{ marginTop: 10 }}
                        type={options.type}
                        onPress={() => navigation.navigate(options.text)}
                        color='white' />
                    <Text style={footer.activeText}>
                        {options.text === "Notifications" ? "News" : options.text}
                    </Text>
                </View> :
                <View style={blockStyle}>
                    {options.text === "Profile" ?
                        <Icon
                            name={options.name}
                            type={options.type}
                            style={{ marginTop: 10 }}
                            onPress={() => navigation.navigate("Profile", userId)}
                            color='#00aced' />
                        :
                        <Icon
                            name={options.name}
                            type={options.type}
                            style={{ marginTop: 10 }}
                            onPress={() => navigation.navigate(options.text)}
                            color='#00aced' />
                    }
                    {/* <Text style={footer.footerText}>{options.text}</Text> */}

                </View>
            }
        </>
    )
}
const footer = StyleSheet.create({
    footerContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 80,
        backgroundColor: "cyan",
        zIndex: 200,
        flexDirection: "row"

    },
    footerBlock: {
        width: "20%",
        height: 80,
        paddingTop: 15,
        backgroundColor: "white",
        color: "white",
        textAlign: "center",
    },
    footerBlockWithoutMap: {
        width: "20%",
        left: 0,
        height: 80,
        paddingTop: 15,
        backgroundColor: "white",
        color: "white",
        textAlign: "center"
    },
    footerText: {
        color: "#00aced",
        textAlign: "center",
        fontWeight: "bold"
    },
    active: {
        width: "20%",
        height: 80,
        paddingTop: 15,
        color: "white",
        textAlign: "center",
        backgroundColor: "#00aced",
    },
    activeText: {
        fontSize: 14,
        color: "white",
        textAlign: "center",
        fontWeight: "bold"
    }
})

export default Footer;
