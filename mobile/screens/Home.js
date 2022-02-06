import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import axios from 'axios'
import config from '../config'
import { Icon } from 'react-native-elements';
import footer from '../footer'

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



            <View style={footer.footer}>
                <View style={footer.footerBlock}>
                    <Icon
                        name='search'
                        type="font-awesome"
                        color='#00aced' />
                    <Text style={footer.footerText}>Find</Text>
                </View>
                <View style={footer.footerBlock}>
                    <Icon
                        name='user'
                        type="font-awesome"
                        color='#00aced'
                        title="Go to post"
                        onPress={() => navigation.navigate('Profile')}
                    />
                    <Text style={footer.footerText}>Profile</Text>
                </View>
                <View style={footer.footerBlock}>
                    <Icon
                        name='users'
                        type="font-awesome"
                        color='#00aced' />
                    <Text style={footer.footerText}>Friends</Text>
                </View>
                <View style={footer.footerBlock}>
                    <Icon
                        name='cog'
                        type="font-awesome"
                        color='#00aced' />
                    <Text style={footer.footerText}>Settings</Text>
                </View>
            </View>
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
        marginBottom: 100
    }
})

export default HomeScreen;
