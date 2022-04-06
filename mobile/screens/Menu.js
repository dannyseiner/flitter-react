import React, { useState, useEffect } from 'react';
import { Share, View, ScrollView, TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import config from "../config"
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
const Menu = ({ navigation }) => {
    const [userId, setUserId] = useState(0)
    const [location, setLocation] = useState(false)

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        const id = await AsyncStorage.removeItem('user')
        setUserId(id)
    }

    const singOut = async () => {

    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Share your account with friends!',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View>
            <View style={{
                marginTop: 10,
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: "95%",
                left: "1.5%"
            }}>
                {/* TOP MNEU  */}
                <View style={{ width: "95%", left: "2.5%", marginTop: 10, flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => onShare()} style={styles.topMenuBlock}>
                        <Icon
                            type="font-awesome"
                            name="location-arrow"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topMenuBlock}>
                        <Icon
                            type="font-awesome"
                            name="cog"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topMenuBlock}>
                        <Icon
                            type="font-awesome"
                            name="apple"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topMenuBlock}>
                        <Icon
                            type="font-awesome"
                            name="sign-out"
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.blockcontainer} onPress={() => navigation.navigate("Events")}>
                    <Icon
                        type="font-awesome"
                        name="list"
                    />
                    <Text
                        style={styles.blocktext}>Events</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.blockcontainer} onPress={() => navigation.navigate("Calendar")}>
                    <Icon
                        type="font-awesome"
                        name="calendar"
                    />
                    <Text

                        style={styles.blocktext}>Calendar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.blockcontainer} onPress={() => navigation.navigate("Calendar")}>
                    <Icon
                        type="font-awesome"
                        name="bookmark"
                    />
                    <Text

                        style={styles.blocktext}>Saved</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Maps")}
                    style={styles.blockcontainer}>
                    <Icon
                        type="font-awesome"
                        name="map"
                    />
                    <Text
                        style={styles.blocktext}>Maps</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.blockcontainer} onPress={() => navigation.navigate("EditProfile")}>
                    <Icon
                        type="font-awesome"
                        name="user"
                    />
                    <Text
                        style={styles.blocktext}
                    >Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.blockcontainer} onPress={() => { Linking.openURL(`${config.restapi}/covid`) }}>
                    <Icon
                        type="font-awesome"
                        name="warning"
                    />
                    <Text
                        style={styles.blocktext}
                    >Covid-19 News</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.blockcontainer} onPress={() => navigation.navigate("Support")}>
                    <Icon
                        type="font-awesome"
                        name="info"
                    />
                    <Text
                        style={styles.blocktext}
                    >Support</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.blockcontainer} onPress={() => navigation.navigate("Privacy")}>
                    <Icon
                        type="font-awesome"
                        name="lock"
                    />
                    <Text
                        style={styles.blocktext}
                    >Privacy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.blockcontainer} onPress={() => navigation.navigate("Api")}>
                    <Icon
                        type="font-awesome"
                        name="server"
                    />
                    <Text
                        style={styles.blocktext}
                    >API</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.blockcontainer} onPress={() => navigation.navigate("Settings")}>
                    <Icon
                        type="font-awesome"
                        name="cog"
                    />
                    <Text
                        style={styles.blocktext}
                    >Settings</Text>
                </TouchableOpacity>

                <View style={{ width: "100%", alignItems: "stretch", flexDirection: "column", display: "flex" }}>
                    <TouchableOpacity style={styles.blockcontainer} onPress={() => navigation.navigate("Pages")}>
                        <Icon
                            type="font-awesome"
                            name="archive"
                        />
                        <Text
                            style={styles.blocktext}
                        >Pages</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.blockcontainer} onPress={() => singOut()}>
                        <Icon
                            type="font-awesome"
                            name="sign-out"
                            color="red"
                        />
                        <Text
                            style={styles.blocktext}
                        >Sign Out</Text>
                    </TouchableOpacity>

                </View>
                <TouchableOpacity style={styles.blockcontainerLong} onPress={() => navigation.navigate("MarketPlace")}>
                    <Icon
                        style={{ marginTop: 40, }}
                        type="font-awesome"
                        name="shopping-cart"

                    />
                    <Text
                        style={styles.blocktext}
                    >MarketPlace</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    blockcontainer: {
        width: "48%",
        borderRadius: 9,
        display: "flex",
        marginTop: 10,
        marginLeft: "2%",
        backgroundColor: "white",
        padding: 20,
    },
    blockcontainerLong: {
        width: "48%",
        borderRadius: 9,
        display: "flex",
        marginLeft: "2%",
        backgroundColor: "white",
        padding: 20,
        left: 197,
        marginTop: -182,
        height: 180,
    },
    blocktext: {
        textAlign: "center",
        fontWeight: "500",
        fontSize: 15,
        padding: 2,
    },
    topMenuBlock: {
        padding: 4,
        backgroundColor: "white",
        marginRight: "2.5%",
        width: "23.5%",
        borderRadius: 10
    },
})

export default Menu;
