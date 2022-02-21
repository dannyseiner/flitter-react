import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, Button, Text } from 'react-native';
import Footer from '../components/Footer';
import axios from "axios"
import config from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Icon } from 'react-native-elements';

const Friends = ({ navigation }) => {
    const [friends, setFriends] = useState([])
    const [userId, setUserId] = useState(0)
    const [menu, setMenu] = useState("Friends")
    useEffect(() => {
        loadFriends()
    }, [])

    const loadFriends = async () => {
        const userid = await AsyncStorage.getItem('user')
        setUserId(userid)
        axios.get(`${config.restapi}/getfriends/${userid}`)
            .then(response => {
                setFriends(response.data)
            })
    }

    const renderFriends = friends.map((friend, i) => (
        <View key={i}>
            {friend.friendship_status === 1 ?
                <FriendBlock key={i} navigation={navigation} data={{
                    userid: friend.user1_id === userId ? friend.user2_id : friend.user1_id,
                    friendshipId: friend.friendship_id,
                    image: friend.user1_id === userId ? friend.user1_image_render : friend.user2_image_render,
                    name: friend.user1_id === userId ? friend.user1_name : friend.user2_name,
                    redirect: () => navigation.navigate("Chat", friend.id_friendship)
                }}
                />
                : <></>}
        </View>

    ))

    const renderRequests = friends.map((friend, i) => (
        <View key={i}>
            {friend.friendship_status === 0 ?
                <FriendBlock key={i} navigation={navigation} data={{
                    userid: friend.user1_id + "" === userId + "" ? friend.user2_id : friend.user1_id,
                    friendshipId: friend.friendship_id,
                    image: friend.user1_id + "" === userId + "" ? friend.user2_image_render : friend.user1_image_render,
                    name: friend.user1_id + "" === userId + "" ? friend.user2_name : friend.user1_name,
                    redirect: () => navigation.navigate("Profile", friend.user1_id === userId ? friend.user2_id : friend.user1_id)
                }}
                />
                : <></>}
        </View>
    ))

    return (
        <View style={styles.container}>
            <View style={styles.spacer}></View>
            <Text
                style={styles.header}
            >{menu}

                <Icon
                    name="align-justify"
                    type="font-awesome"
                    style={{ marginLeft: 16 }}
                    onPress={() => setMenu(menu === "Friends" ? "Requests" : "Friends")}

                    color='#00aced' />
            </Text>
            <ScrollView>
                {menu === "Friends" ? renderFriends : renderRequests}
            </ScrollView>
            <Text style={styles.headerText}>Requests</Text>

            <Footer navigation={navigation} active={"Friends"} />
        </View>
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
                    onPress={data.redirect}>{data.name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    menubutton: {
        position: "absolute",
        left: 300,
        top: 10,
    },
    header: {
        fontSize: 25,
        left: 35,
        top: -15,
    },
    spacer: {
        height: 30,
    },
    friendBlock: {
        left: "5%",
        top: 10,
        backgroundColor: "white",
        width: "90%",
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
