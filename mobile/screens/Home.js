import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import axios from 'axios'
import config from '../config'
import { Icon } from 'react-native-elements';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {

        loadPosts()
    }, [])


    const loadPosts = async () => {
        const getData = await AsyncStorage.getItem('user')
        axios.get(`${config.restapi}/postshome/${getData}`)
            .then(response => setPosts(response.data))
    }


    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                {posts.map((post, i) => (
                    <PostBlock data={post} navigation={navigation} key={post.post_id} />
                ))}
                <View style={{ height: 100 }}></View>
            </ScrollView>

            <Footer navigation={navigation} active="Home" />
        </View>
    );
}


const PostBlock = ({ navigation, data }) => {
    return (
        <View style={styles.postContainer}>
            <Text onPress={() => navigation.navigate("Post", data)} style={styles.postHeader}>{data.post_title}</Text>
            <Text style={styles.postText}>{data.post_content}</Text>

            <Text style={styles.postDate}>{new Date(data.post_created).toLocaleDateString("en-US", config.date_format)}</Text>
            <Text style={styles.postAuthor} onPress={() => navigation.navigate("Profile", data.post_author_id)}>{data.account_name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    postContainer: {
        width: "90%",
        left: "5%%",
        marginTop: 15,
        padding: 15,
        borderRadius: 12,
        backgroundColor: "black",
        color: "white",
    },
    postHeader: {
        top: 5,
        color: "white",
        left: 5,
        fontSize: 25,
        fontWeight: "bold"
    },
    postText: {
        top: 5,
        color: "white",
        left: 20,
        fontSize: 19,
        fontWeight: "400",
    },
    postDate: {
        color: "white",
        fontWeight: "600",
        top: 23,
        left: "67%",
    },
    postAuthor: {
        color: "white",
        fontWeight: "600",
        left: 10,
        fontSize: 15,
        top: 5,
    }
})

export default HomeScreen;
