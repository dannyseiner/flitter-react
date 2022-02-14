import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import axios from 'axios'
import config from '../config'
import { Icon } from 'react-native-elements';
import Footer from '../components/Footer';

const HomeScreen = ({ navigation }) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {

        loadPosts()
    }, [])


    const loadPosts = () => {
        axios.get(`${config.restapi}/posts`)
            .then(response => setPosts(response.data))
    }


    return (
        <View>
            <ScrollView style={styles.scroll}>
                {posts.map(post => (
                    <View key={post.post_id} style={styles.postContainer}>
                        <Text
                            title="Go to post"
                            onPress={() => navigation.navigate('Post', post)}
                            style={styles.postTitle}>{post.post_title}</Text>
                        <Text style={styles.postAuthor}>{post.account_name}</Text>
                        <Text style={styles.postCreated}>{new Date(post.post_created).toLocaleDateString("en-US", config.date_format)}</Text>
                    </View>
                ))}
            </ScrollView>



            <Footer navigation={navigation} active="Home" />
        </View>
    );
}

const styles = StyleSheet.create({
    postTitle: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
    },
    postContainer: {
        margin: 30
    },
    postAuthor: {
        textAlign: "right",
        fontSize: 17
    },
    postCreated: {
        top: -17,
        fontSize: 17
    },
    scoll: {
        paddingBottom: 200
    }
})

export default HomeScreen;
