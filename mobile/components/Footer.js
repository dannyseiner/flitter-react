import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated, TouchableOpacity, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import axios from "axios"
import config from "../config"

const Footer = ({ navigation, active }) => {
    const [userId, setUserId] = useState(0)
    const [user, setUser] = useState({
        decoded_image: "",
        account_name: "",
    })

    const getUserFromDB = () => {
        axios.get(`${config.restapi}/user/${userId}`)
            .then(response => setUser(response.data[0]))
    }

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        if (userId === 0) return
        getUserFromDB()
    }, [userId])

    const getUser = async () => {
        const id = await AsyncStorage.getItem("user")
        setUserId(id)
    }
    const animDuration = 400
    const slideAnim = useRef(new Animated.Value(-500)).current
    const fadeAnim = useRef(new Animated.Value(-1000)).current
    // FADE ANIM 
    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: animDuration,
            useNativeDriver: false,
        }).start(() => {
            slideIn()
        })
    }
    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: -1000,
            duration: animDuration,
            useNativeDriver: false,
        }).start()
    }
    // SLIDE ANIM 
    const slideIn = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: animDuration,
            useNativeDriver: false,
        }).start();
    };
    const slideOut = () => {
        Animated.timing(slideAnim, {
            toValue: -500,
            duration: animDuration,
            useNativeDriver: false,
        }).start(() => fadeOut());
    };

    return (
        <>
            {/* BACKGROUND EFFECT */}
            <Animated.View style={{
                position: "absolute", top: fadeAnim, left: 0,
                width: "100%", height: "100%", backgroundColor: "black", opacity: 0.9,
            }}></Animated.View>

            <Animated.View style={{ position: "absolute", right: slideAnim, zIndex: 300, width: "100%", height: "100%", top: 0, }}>
                <View style={styles.container}>
                    <View style={styles.leftmenu}>
                        <View style={{ height: "27%" }}></View>
                        <TouchableOpacity style={styles.leftmenublock} onPress={() => navigation.navigate("Profile", userId)}>
                            <Icon
                                type="font-awesome"
                                name="user"
                                color="#832ad4"
                                size={40}
                                style={styles.leftmenuicon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.leftmenublock} onPress={() => navigation.navigate("Maps")}>
                            <Icon
                                type="font-awesome"
                                name="map"
                                color="#e9bf33"
                                size={40}
                                style={styles.leftmenuicon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.leftmenublock} onPress={() => navigation.navigate("Maps")}>
                            <Icon
                                type="font-awesome"
                                name="warning"
                                color="#ed666f"
                                size={40}
                                style={styles.leftmenuicon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.leftmenublock} onPress={() => navigation.navigate("Settings")}>
                            <Icon
                                type="font-awesome"
                                style={styles.leftmenuicon}
                                name="cog"
                                size={40}
                                color="#ace093"
                            />
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={[styles.leftmenublock, { marginTop: 250 }]}>
                            <Icon
                                type="font-awesome"
                                style={styles.leftmenuicon}
                                name="sign-out"
                                color="danger"
                            />
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.rightmenu}>
                        <TouchableOpacity style={styles.closeblock} onPress={() => slideOut()}>
                            <Icon
                                type="font-awesome"
                                name="arrow-right"
                                style={styles.closeicon}
                            />
                        </TouchableOpacity>
                        <ScrollView style={{ marginLeft: 5, flexDirection: "column", height: "92%", marginTop: -20, }}>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={[styles.rightmenubox]} onPress={() => navigation.navigate("Friends")}>
                                    <Icon
                                        type="font-awesome"
                                        color="white"
                                        name="users"
                                        style={styles.rightmenuiconbox}
                                    />
                                    <Text style={[styles.rightmenutext]}>Friends</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.rightmenubox,]} onPress={() => navigation.navigate("MarketPlace")}>
                                    <Icon
                                        type="font-awesome"
                                        color="white"
                                        name="shopping-cart"
                                        style={styles.rightmenuiconbox}
                                    />
                                    <Text style={[styles.rightmenutext]}>Market</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={[styles.rightmenubox,]} onPress={() => navigation.navigate("Calendar")}>
                                    <Icon
                                        type="font-awesome"
                                        color="white"
                                        name="calendar"
                                        style={styles.rightmenuiconbox}
                                    />
                                    <Text style={[styles.rightmenutext]}>Calendar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.rightmenubox,]} onPress={() => navigation.navigate("Events")}>
                                    <Icon
                                        type="font-awesome"
                                        color="white"
                                        name="list"
                                        style={styles.rightmenuiconbox}
                                    />
                                    <Text style={[styles.rightmenutext]}>Events</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={[styles.rightmenubox,]} onPress={() => navigation.navigate("Support")}>
                                    <Icon
                                        type="font-awesome"
                                        color="white"
                                        name="support"
                                        style={styles.rightmenuiconbox}
                                    />
                                    <Text style={[styles.rightmenutext]}>Support</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.rightmenubox,]} onPress={() => navigation.navigate("Privacy")}>
                                    <Icon
                                        type="font-awesome"
                                        color="white"
                                        name="lock"
                                        style={styles.rightmenuiconbox}
                                    />
                                    <Text style={[styles.rightmenutext]}>Privacy</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={[styles.rightmenubox,]} onPress={() => navigation.navigate("Pages")}>
                                    <Icon
                                        type="font-awesome"
                                        color="white"
                                        name="archive"
                                        style={styles.rightmenuiconbox}
                                    />
                                    <Text style={[styles.rightmenutext]}>Pages</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.rightmenubox,]} onPress={() => navigation.navigate("Saved")}>
                                    <Icon
                                        type="font-awesome"
                                        color="white"
                                        name="bookmark"
                                        style={styles.rightmenuiconbox}
                                    />
                                    <Text style={[styles.rightmenutext]}>Saved</Text>
                                </TouchableOpacity>
                            </View>

                            {/* 
                            <TouchableOpacity style={[styles.rightmenublock, { marginTop: -30 }]} onPress={() => navigation.navigate("Friends")}>
                                <Icon
                                    type="font-awesome"
                                    color="#00aced"
                                    name="users"
                                    style={styles.rightmenuicon}
                                />
                                <Text style={[styles.rightmenutext]}>Friends</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.rightmenublock} onPress={() => navigation.navigate("MarketPlace")}>
                                <Icon
                                    color="#00aced"
                                    type="font-awesome"
                                    name="shopping-cart"
                                    style={styles.rightmenuicon}
                                />
                                <Text style={styles.rightmenutext}>MarketPlace</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.rightmenublock} onPress={() => navigation.navigate("Privacy")}>
                                <Icon
                                    color="#00aced"
                                    type="font-awesome"
                                    name="lock"
                                    style={[styles.rightmenuicon, { paddingLeft: 0 }]}
                                />
                                <Text style={styles.rightmenutext}>Privacy</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.rightmenublock} onPress={() => navigation.navigate("Privacy")}>
                                <Icon
                                    color="#00aced"
                                    type="font-awesome"
                                    name="warning"
                                    style={styles.rightmenuicon}
                                />
                                <Text style={styles.rightmenutext}>Covid-21</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.rightmenublock} onPress={() => navigation.navigate("Calendar")}>
                                <Icon
                                    color="#00aced"
                                    type="font-awesome"
                                    name="calendar"
                                    style={styles.rightmenuicon}
                                />
                                <Text style={styles.rightmenutext}>Calendar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.rightmenublock} onPress={() => navigation.navigate("Events")}>
                                <Icon
                                    color="#00aced"
                                    type="font-awesome"
                                    name="list"
                                    style={styles.rightmenuicon}
                                />
                                <Text style={styles.rightmenutext}>Events</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.rightmenublock} onPress={() => navigation.navigate("Api")}>
                                <Icon
                                    color="#00aced"
                                    type="font-awesome"
                                    name="server"
                                    style={styles.rightmenuicon}
                                />
                                <Text style={styles.rightmenutext}>Api</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.rightmenublock} onPress={() => navigation.navigate("Pages")}>
                                <Icon
                                    color="#00aced"
                                    type="font-awesome"
                                    name="archive"
                                    style={styles.rightmenuicon}
                                />
                                <Text style={styles.rightmenutext}>Pages</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.rightmenublock} onPress={() => navigation.navigate("Saved")}>
                                <Icon
                                    color="#00aced"
                                    type="font-awesome"
                                    name="bookmark"
                                    style={styles.rightmenuicon}
                                />
                                <Text style={styles.rightmenutext}>Bookmarks</Text>
                            </TouchableOpacity> */}
                        </ScrollView>
                        <TouchableOpacity style={styles.profilebar} >
                            <Image
                                style={styles.image}
                                source={
                                    {
                                        uri: user.decoded_image.replace(/\s/g, ''),
                                    }}
                            />
                            <Text style={styles.username}>{user.account_name}</Text>
                        </TouchableOpacity>
                        <View style={styles.footerblock}>
                            <Text style={styles.footertext}>iOS 15.4.1</Text>
                            <Text style={styles.footertext2}>Build 1948320</Text>
                        </View>
                    </View>
                </View>
            </Animated.View>


            <View style={footer.footerContainer}>
                <Block navigation={navigation} active={active} rotate={[
                    { rotateX: "30deg" },
                    { rotateZ: "20deg" }
                ]} style={{ borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }} options={{
                    name: "book",
                    type: "font-awesome",
                    text: "Home"
                }} />
                <Block navigation={navigation} rotate={[
                    { rotateX: "40deg" },
                    { rotateZ: "-30deg" }
                ]} active={active} options={{
                    name: "user",
                    type: "font-awesome",
                    text: "Profile"
                }} />
                <Block navigation={navigation} rotate={[
                    { rotateX: "50deg" },
                    { rotateZ: "20deg" }
                ]} active={active} options={{
                    name: "users",
                    type: "font-awesome",
                    text: "Friends"
                }} />
                <Block navigation={navigation} rotate={[
                    { rotateX: "-50deg" },
                    { rotateZ: "-40deg" }
                ]} active={active} options={{
                    name: "bell",
                    type: "font-awesome",
                    text: "Notifications"
                }} />


                <TouchableOpacity style={[footer.footerBlock, { borderTopRightRadius: 15, borderBottomRightRadius: 15 }]} rotate={[
                    { rotateX: "30deg" },
                    { rotateZ: "20deg" }
                ]} onPress={() => fadeIn()}>
                    <Icon
                        name="bars"
                        style={{ marginTop: 10 }}
                        type="font-awesome"
                        color='#00aced' />
                </TouchableOpacity>
            </View>
            <View style={{ width: "10%", backgroundColor: "#00aced", borderTopRightRadius: 100, top: -30, right: "100%", }}></View>
        </>

    )
}

const Block = ({ navigation, menu, active, options, style, rotate }) => {
    const [userId, setUserId] = useState(0)
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
                <>
                    <View style={[footer.active, style ? style : "",]}>
                        <View style={[{ width: "65%", left: "17.5%", height: 55, backgroundColor: "#00aced", borderStyle: "solid", borderWidth: 5, borderColor: "#f2f2f2", borderRadius: 20, position: "absolute", zIndex: 40000, top: -25 }, {
                            transform: rotate
                        }]}>
                            <Icon
                                name={options.name}
                                type={options.type}
                                style={{ marginTop: 10, left: 1, }}
                                color='white' />
                        </View>
                        <Text style={[footer.activeText, { marginTop: 30, }]}>
                            {options.text === "Notifications" ? "News" : options.text}
                        </Text>
                    </View>
                </> :
                <View style={[footer.footerBlock, style ? style : ""]}>
                    {options.text === "Profile" ?
                        <Icon
                            name={options.name}
                            type={options.type}
                            style={{ marginTop: 10 }}
                            onPress={() => menu === true ? "" : navigation.navigate("Profile", userId)}
                            color='#00aced' />
                        :
                        <Icon
                            name={options.name}
                            type={options.type}
                            style={{ marginTop: 10 }}
                            onPress={() => menu === true ? "" : navigation.navigate(options.text)}
                            color='#00aced' />
                    }
                    {/* <Text style={footer.footerText}>{options.text}</Text> */}

                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    blurbackground: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "black",
    },
    container: {
        width: "85%",
        height: "100%",
        position: "absolute",
        right: 0,
        top: 0,
        backgroundColor: "white",
        color: "black",
        zIndex: 301,
        flexDirection: "row"
    },
    usertab: {
        flexDirection: "row",
        width: "50%",
        left: "10%",
        marginTop: 20,
        marginBottom: 20,
    },
    leftmenu: {
        backgroundColor: "#372c38",
        height: "100%",
        borderStyle: "solid",
        borderColor: "black",
        // borderRightWidth: 1,
        width: "20%",
        flexDirection: "column"
    },
    rightmenubox: {
        width: "45%",
        margin: 5,
        padding: 5,
        borderRadius: 15,
        flexDirection: "column",
    },
    closemenu: {
        width: "80%",
        left: "10%",
        borderRadius: 100,
        height: 55,
        marginTop: 20,
        marginBottom: 180,
    },
    closeicon: {
        marginTop: 15,
        left: 1,
        color: "red"
    },
    closeblock: {
        width: 50,
        alignSelf: "flex-end"
    },
    rightmenu: {
        width: "80%",
        height: "100%",
        backgroundColor: "white",
        flexDirection: "column"
    },
    leftmenublock: {
        marginTop: 25,
        width: "70%",
        left: "15%",
        borderRadius: 100,
        height: 50,
    },
    subleftmenublock: {
        marginTop: 25,
        width: "70%",
        left: "15%",
        borderRadius: 100,
        height: 50,
    },
    leftmenuicon: {
        marginTop: 13,
        color: "black",
        width: "100%",
    },
    rightmenublock: {
        flexDirection: "row",
        width: "80%",
        left: "2.5%",
        padding: 10,
        marginBottom: 5,
    },
    subrightmenublock: {
        flexDirection: "row",
        width: "80%",
        left: "3%",
        padding: 10,
        marginBottom: 5,
    },
    rightmenuicon: {
        color: "black",
        width: 30,
        left: 0,
    },
    rightmenuiconbox: {
        padding: 16,
        left: "25%",
        width: "50%",
        borderRadius: 100,
        backgroundColor: "#242445",
        marginTop: 11,
        marginBottom: 5,
    },
    rightmenutext: {
        fontSize: 16,
        color: "black",
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 5
    },
    footerblock: {
        position: 'absolute',
        bottom: 15,
        // backgroundColor: "#f5f5f5",
        width: "90%",
        left: "5%",
        borderRadius: 10,
        flexDirection: "row",
        padding: 14,
    },
    footertext2: {
        marginLeft: "30%",

    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 10,
    },
    profilebar: {
        position: "absolute",
        bottom: 65,
        width: "80%",
        left: "15%",
        borderRadius: 10,
        flexDirection: "row"
    },
    username: {
        fontSize: 20,
        paddingTop: 15,
        paddingLeft: "5%",
    }
})

const footer = StyleSheet.create({
    footerContainer: {
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        left: 0,
        width: "100%",
        height: 80,
        backgroundColor: "#242445",
        zIndex: 200,
        flexDirection: "row"

    },
    footerBlock: {
        width: "20%",
        height: 80,
        paddingTop: 15,
        backgroundColor: "#242445",
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
        backgroundColor: "#242445",
    },
    activeText: {
        fontSize: 14,
        color: "white",
        textAlign: "center",
        fontWeight: "bold"
    }
})

export default Footer;
