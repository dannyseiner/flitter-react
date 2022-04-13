import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, ActivityIndicator, TouchableOpacity, StyleSheet, ScrollView, Image, Text, TextInput, Alert } from 'react-native';
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
    const [searchResult, setSearchResult] = useState([])
    const [loadingStatus, setLoadingStatus] = useState(<ActivityIndicator size="large" style={{ marginTop: "40%", height: "50%", marginBottom: 400 }} />)


    // ANIMATION
    const fadeAnim = useRef(new Animated.Value(1000)).current;

    const fadeIn1 = () => {
        Animated.timing(fadeAnim, {
            toValue: 80,
            duration: 400,
            useNativeDriver: false,
        }).start();
    };

    const fadeOut1 = () => {
        Animated.timing(fadeAnim, {
            toValue: 1000,
            duration: 400,
            useNativeDriver: false
        }).start();
    };

    useEffect(() => {
        loadFriends()
    }, [])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadFriends()
        });

        return unsubscribe;
    }, [navigation]);

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
        axios.post(`${config.restapi}/acceptfriend`, {
            user1: user1,
            user2: user2
        })
            .then(response => loadFriends())
    }

    const searchPeople = () => {
        axios.post(`${config.restapi}/searchUser`, {
            user: searchInput,
            userId: userId
        })
            .then(response => setSearchResult(response.data))
    }

    useEffect(() => {
        if (searchInput === "" || searchInput.length < 3) return
        searchPeople()
    }, [searchInput])
    const sendRequest = (target) => {
        if (target === 0) return
        if (target + "" === userId + "") return
        axios.post(`${config.restapi}/getuserfriendship`, {
            user1: userId,
            user2: target
        })
            .then(response => {
                if (response.data.length === 0) { // not found  
                    axios.post(`${config.restapi}/sentfriendrequest`, {
                        user1: userId,
                        user2: target
                    })
                    Alert.alert("Request send")

                } else if (response.data[0].friendship_status === 0) { // not accepted yet
                    Alert.alert("Request is pending!")
                } else { // friends
                    Alert.alert("This user is already your friend")
                }
                loadFriends()
            })
    }

    const renderFriends = friends.map((friend, i) => (
        <View key={i}>
            {friend.friendship_status === 1 ?
                <FriendBlock key={i} navigation={navigation} container={styles.friendBlock2} text={styles.friendName2} data={{
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
                    <FriendBlock key={i} container={styles.friendBlock} text={styles.friendName} navigation={navigation} data={{
                        userid: friend.user1_id + "" === userId + "" ? friend.user2_id : friend.user1_id,
                        friendshipId: friend.friendship_id,
                        image: friend.user1_id + "" === userId + "" ? friend.user2_image_render : friend.user1_image_render,
                        name: friend.user1_id + "" === userId + "" ? friend.user2_name : friend.user1_name,
                    }}
                    />
                    <View style={{ width: "100%", backgroundColor: "#242445", borderRadius: 9, padding: 10, marginTop: 20, }}>
                        {friend.user1_id + "" === userId + "" ?
                            <TouchableOpacity style={{ width: "100%", backgroundColor: "white", borderRadius: 10, padding: 8 }} onPress={() => deleteFriend(friend.user1_id, friend.user2_id)}>
                                <Icon type="font-awesome" name="trash" size={30} color="#242445" />
                            </TouchableOpacity>
                            :
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={{ width: "45%", backgroundColor: "white", padding: 8, borderRadius: 10, }}
                                    onPress={() => acceptFriend(friend.user1_id, friend.user2_id)}>
                                    <Icon type="font-awesome" name="check" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: "45%", marginLeft: "10%", backgroundColor: "white", padding: 8, borderRadius: 10, }} onPress={() => deleteFriend(friend.user1_id, friend.user2_id)}>
                                    <Icon type="font-awesome" name="trash" />
                                </TouchableOpacity>
                            </View>

                        }
                    </View>
                </View>
                : <></>}
        </View >
    ))

    const renderUsers = searchResult.map(usr => (
        <TouchableOpacity key={usr.account_id} style={{ width: "97%", left: "1.5%", backgroundColor: "white", padding: 8, borderRadius: 10, marginTop: 10, }} onPress={() => sendRequest(usr.account_id)}>
            <Text style={{ color: "black", fontWeight: "500", padding: 5, fontSize: 20, }}>{usr.account_name}</Text>
        </TouchableOpacity>
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
                        color="white"
                    />
                </TouchableOpacity>
                <ScrollView>
                    {menu ?

                        <View>
                            <TextInput
                                onChangeText={e => { setSearchInput(e), searchPeople(searchInput) }}
                                value={searchInput}
                                placeholder="Search people"
                                placeholderTextColor="grey"
                                style={{ fontSize: 22, backgroundColor: "white", width: "97%", left: "1.5%", marginTop: 40, padding: 20, borderRadius: 13, }} />
                            <ScrollView>
                                {renderUsers}
                            </ScrollView>
                        </View>



                        : renderRequests}
                </ScrollView>
            </Animated.View>
            <View style={{ width: "95%", left: "1%", flexDirection: "row", }}>
                <TouchableOpacity onPress={() => {
                    setMenu(true)
                    fadeIn1()
                }} style={{ width: "50%", top: 10, marginBottom: 30, backgroundColor: "#242445", padding: 15, borderRadius: 10 }}>
                    <Text
                        style={{ textAlign: "center", fontWeight: "600", fontSize: 18, color: "white" }}>
                        Add Friend
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setMenu(false)
                    fadeIn1()
                }} style={{ width: "50%", left: "3%", top: 10, marginBottom: 30, backgroundColor: "#242445", padding: 15, borderRadius: 10 }}>
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


const FriendBlock = ({ navigation, data, container, text }) => {
    return (
        <TouchableOpacity style={container} onPress={(() => navigation.navigate("Profile", data.userid))}>
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
                    style={text}
                    onLongPress={() => navigation.navigate("Profile", data.userid)}
                    onPress={data.redirect}>{data.name}</Text>
            </View>
        </TouchableOpacity>
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
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "#242445",
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
    friendBlock2: {
        left: "2.5%",
        top: 10,
        backgroundColor: "#242445",
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
        color: "#242445",
        fontWeight: "bold",
        fontSize: 20,
        left: 80,
        top: -43
    },
    friendName2: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        left: 80,
        top: -43
    }
})

export default Friends;
