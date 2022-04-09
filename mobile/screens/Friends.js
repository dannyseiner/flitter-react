import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, ActivityIndicator, TouchableOpacity, StyleSheet, ScrollView, Image, Text, TextInput } from 'react-native';
import Footer from '../components/Footer';
import axios from "axios"
import { Icon } from "react-native-elements"
import config from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Friends = ({ navigation }) => {
    const [friends, setFriends] = useState([])
    const [userId, setUserId] = useState(0)
    const [menu, setMenu] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const [loadingStatus, setLoadingStatus] = useState(<ActivityIndicator size="large" style={{ marginTop: "40%", height: "50%", marginBottom: 400 }} />)


    // ANIMATION
    const fadeAnim = useRef(new Animated.Value(1000)).current;

    const fadeIn1 = () => {
        Animated.timing(fadeAnim, {
            toValue: 80,
            duration: 400
        }).start();
    };

    const fadeOut1 = () => {
        Animated.timing(fadeAnim, {
            toValue: 1000,
            duration: 400
        }).start();
    };

    useEffect(() => {
        loadFriends()
    }, [])

    const loadFriends = async () => {
        const userid = await AsyncStorage.getItem('user')
        setUserId(userid)
        axios.get(`${config.restapi}/getfriends/${userid}`)
            .then(response => {
                setFriends(response.data)
                setLoadingStatus(<></>)
            })
    }

    const deleteFriend = (user1, user2) => {
        axios.post(`${config.restapi}/removefriend`, {
            user1: user1,
            user2: user2
        })
            .then(response => loadFriends())
    }

    const acceptFriend = (user1, user2) => {
        console.log("s")
        axios.post(`${config.restapi}/acceptfriend`, {
            user1: user1,
            user2: user2
        })
            .then(response => loadFriends())
    }

    const renderFriends = friends.map((friend, i) => (
        <View key={i}>
            {friend.friendship_status === 1 ?
                <FriendBlock key={i} navigation={navigation} data={{
                    userid: friend.user1_id + "" === userId + "" ? friend.user2_id : friend.user1_id,
                    friendshipId: friend.friendship_id,
                    image: friend.user1_id + "" === userId + "" ? friend.user2_image_render : friend.user1_image_render,
                    name: friend.user1_id + "" === userId + "" ? friend.user2_name : friend.user1_name,
                    redirect: () => navigation.navigate("Chat", friend.id_friendship)
                }}
                />
                : <></>}
        </View>

    ))

    // 1 SENDER
    const renderRequests = friends.map((friend, i) => (
        <View key={i}>
            {friend.friendship_status === 0 ?
                <View>
                    <FriendBlock key={i} navigation={navigation} data={{
                        userid: friend.user1_id + "" === userId + "" ? friend.user2_id : friend.user1_id,
                        friendshipId: friend.friendship_id,
                        image: friend.user1_id + "" === userId + "" ? friend.user2_image_render : friend.user1_image_render,
                        name: friend.user1_id + "" === userId + "" ? friend.user2_name : friend.user1_name,
                    }}
                    />
                    <View style={{ width: "95%", left: "2.5%", backgroundColor: "white", borderRadius: 9, height: 40, padding: 10, marginTop: 20, }}>
                        {friend.user1_id + "" === userId + "" ?
                            <Text style={{ fontSize: 18, textAlign: "center", color: "red" }}>Delete</Text>
                            :
                            <View>
                                <Text style={{ fontSize: 18, paddingLeft: 10, color: "red" }} onPress={() => deleteFriend(friend.user1_id, friend.user2_id)}>Delete</Text>
                                <Text style={{ fontSize: 18, paddingRight: 10, alignSelf: "flex-end", top: -20, color: "#00aced" }} onPress={() => acceptFriend(friend.user1_id, friend.user2_id)}>Accept</Text>
                            </View>
                        }
                    </View>
                </View>
                : <></>}
        </View>
    ))

    return (
        <View style={styles.container}>
            {loadingStatus}
            <Animated.View style={[
                styles.popup,
                {
                    top: fadeAnim,
                }]
            }>
                <TouchableOpacity
                    onPress={() => fadeOut1()}
                    style={{ width: 50, position: "absolute", right: 10, top: 10, zIndex: 200, }}
                >
                    <Icon
                        type="font-awesome"
                        name="close"
                        color="red"
                    />
                </TouchableOpacity>
                <ScrollView>
                    {menu ?

                        <View>
                            <TextInput
                                onChangeText={e => setSearchInput(e)}
                                value={searchInput}
                                placeholder="Search people"
                                style={{ fontSize: 20, backgroundColor: "white", marginTop: 40, padding: 14, borderRadius: 13, }} />
                            <TouchableOpacity style={{ width: "40%", left: "30%", backgroundColor: "white", borderRadius: 10, padding: 15, marginTop: 20, }}>
                                <Text style={{ textAlign: "center", fontWeight: "500", fontSize: 16 }}>Send request</Text>
                            </TouchableOpacity>
                        </View>



                        : renderRequests}
                </ScrollView>
            </Animated.View>
            <View style={{ width: "95%", left: "1%", flexDirection: "row", }}>
                <TouchableOpacity onPress={() => {
                    setMenu(true)
                    fadeIn1()
                }} style={{ width: "50%", top: 10, marginBottom: 30, backgroundColor: "#00aced", padding: 15, borderRadius: 10 }}>
                    <Text
                        style={{ textAlign: "center", fontWeight: "600", fontSize: 18, color: "white" }}>
                        Add Friend
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setMenu(false)
                    fadeIn1()
                }} style={{ width: "50%", left: "3%", top: 10, marginBottom: 30, backgroundColor: "#00aced", padding: 15, borderRadius: 10 }}>
                    <Text
                        style={{ textAlign: "center", fontWeight: "600", fontSize: 18, color: "white" }}>
                        Requests
                    </Text>
                </TouchableOpacity>
            </View>
            <Text
                style={styles.header}
            >
                Friends
            </Text>
            <ScrollView>
                {renderFriends}
            </ScrollView>
            <Footer navigation={navigation} active={"Friends"} />
        </View >
    );
}


const FriendBlock = ({ navigation, data }) => {
    return (
        <View style={styles.friendBlock}>
            <View style={{ top: 15 }}>
                <Text
                    onPress={data.redirect}>
                    <Image
                        style={styles.friendImage}
                        source={{
                            uri: data.image.replace(/\s/g, ''),
                        }}
                    />
                </Text>
                <Text
                    style={styles.friendName}
                    onLongPress={() => navigation.navigate("Profile", data.userid)}
                    onPress={data.redirect}>{data.name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    popup: {
        position: "absolute",
        zIndex: 900,
        width: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: "#00aced",
        height: "100%",
        padding: 20,
    },
    menubutton: {
        position: "absolute",
        left: 300,
        top: 10,
    },
    header: {
        width: "100%",
        fontSize: 25,
        left: 35,
    },
    spacer: {
        height: 30,
    },
    friendBlock: {
        left: "2.5%",
        top: 10,
        backgroundColor: "white",
        width: "95%",
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    friendImage: {
        width: 60,
        height: 60,
        borderRadius: 100
    },
    friendName: {
        fontSize: 20,
        color: "black",
        left: 80,
        top: -43
    }
})

export default Friends;
