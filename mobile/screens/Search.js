import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Text } from 'react-native';
import config from "../config"
import axios from "axios"

const Search = ({ route, navigation }) => {
    const [posts, setPosts] = useState([])
    const params = route.params

    useEffect(() => {
        searchPosts()
    }, [])

    const searchUsers = () => {
    }

    const searchPosts = () => {
        axios.get(`${config.restapi}/postbyname/${params}`)
            .then(response => setPosts(response.data))
    }

    const renderPosts = posts.map(post => (
        <TouchableOpacity style={styles.box} key={post.post_id} onPress={() => navigation.navigate("Post", post)}>
            <Text style={styles.boxusername}>{post.account_name}</Text>
            <Text style={styles.boxtitle}>{post.post_title}</Text>
            <Text style={styles.boxdate}>{new Date(post.post_created).toLocaleDateString("en-US", config.date_format)}</Text>
        </TouchableOpacity>
    ))
    return (
        <View>
            <ScrollView style={styles.container}>
                {posts.length === 0 ? <View style={{ top: 20, width: "95%", left: "2.5%", backgroundColor: "white", borderRadius: 10, padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: "500%", textAlign: "center" }}>No posts we're found!</Text>
                </View> : renderPosts}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },
    box: {
        width: "95%",
        left: "2.5%",
        padding: 13,
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 10,
    },
    boxtitle: {
        fontSize: 18,
        width: "60%",
        top: -20,
        fontWeight: "500",
        padding: 3,
        color: "black"
    },
    boxusername: {
        textAlign: "right",
        fontSize: 15,
        color: "lightgrey"
    },
    boxdate: {
        textAlign: "right",
        fontSize: 15,
        marginTop: -20,
        color: "lightgrey"
    }
})

export default Search;
