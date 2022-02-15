import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import Footer from '../components/Footer';
import axios from "axios"
import config from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { findFocusedRoute } from '@react-navigation/native';

const Friends = ({ navigation }) => {
    const [friends, setFriends] = useState([])
    const [userId, setUserId] = useState(0)
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
        <FriendBlock key={i} navigation={navigation} data={{
            id: friend.user1_id === userId ? friend.user1_id : friend.user2_id,
            friendshipId: friend.friendship_id,
            image: friend.user1_id === userId ? friend.user1_image_render : friend.user2_image_render,
            name: friend.user1_id === userId ? friend.user1_name : friend.user2_name,
        }}
        />
    ))

    return (
        <View style={styles.container}>
            <View style={styles.spacer}></View>
            <ScrollView>
                {renderFriends}
            </ScrollView>
            <Footer navigation={navigation} active={"Friends"} />
        </View>
    );
}


const FriendBlock = ({ navigation, data }) => {
    return (
        <View style={styles.friendBlock}>
            <Text
                onPress={() => navigation.navigate("Profile", data.id)}>
                <Image
                    style={styles.friendImage}
                    source={{
                        uri: data.image.replace(/\s/g, ''),
                    }}
                />
            </Text>
            <Text
                style={styles.friendName}
                onPress={() => {
                    navigation.navigate("Chat", data.friendshipId)
                }}>{data.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    spacer: {
        height: 30,
    },
    friendBlock: {
        left: "20%",
    },
    friendImage: {
        width: 60,
        height: 60,
        borderRadius: 100
    },
    friendName: {
        fontSize: 20,
        left: 80,
        top: -43
    }
})

export default Friends;
