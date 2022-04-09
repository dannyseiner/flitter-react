import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import config from "../config"
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
const Menu = ({ navigation }) => {

    const singOut = async () => {
        try {
            await AsyncStorage.removeItem('user')
            navigation.navigate("Login")
        } catch (e) {
        }
    }

    return (
        <View>
            <View style={{
                marginTop: 10,
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: "95%",
                left: "1.5%"
            }}>
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
})

export default Menu;