import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, Text, Button } from 'react-native';
import Footer from '../components/Footer';
import { Icon } from 'react-native-elements';
import axios from "axios"
import config from "../config"
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = ({ route, navigation }) => {
    const params = route.params
    const [userId, setUserId] = useState(0)
    const [posts, setPosts] = useState([])
    const [data, setData] = useState({
        decoded_image: ""
    })
    useEffect(() => {
        getPosts()
        if (params === undefined) {
            getLoggedUser(null)
        } else {
            getLoggedUser(params)
        }
        console.log(posts)
    }, [])
    const getLoggedUser = async (id) => {
        try {
            const getData = await AsyncStorage.getItem('user')
            setUserId(getData)
            axios.get(`${config.restapi}/user/${id === null ? getData : id}`)
                .then(response => setData(response.data[0]))
        } catch (e) {
            console.log(e)
        }
    }

    const getPosts = () => {
        axios.get(`${config.restapi}/userposts/${userId}`)
            .then(response => setPosts(response.data))
    }
    const renderPosts = posts.map(post => (
        <PostBlock navigation={navigation} userId={userId} data={post} />
    ))

    return (
        <View style={styles.container}>
            <ScrollView>
                {data.decoded_image === undefined ? <></> : data.decoded_image === "" ? <></> :
                    <Image
                        style={styles.image}
                        source={
                            {
                                uri: data.decoded_image.replace(/\s/g, ''),
                            }}
                    />}
                <Text style={styles.name}>{data.account_name}</Text>
                <Text style={{ textAlign: "center" }}>{data.account_email}</Text>
                <Text style={{ top: 20, left: 20, fontSize: 20, fontWeight: '600' }}>Posts</Text>
                {renderPosts}
            </ScrollView>
            {params === undefined ? <Footer navigation={navigation} active={"Profile"} /> : <Footer navigation={navigation} active={"Friends"} />}
        </View>
    );
}



const PostBlock = ({ navigation, userId, data }) => {
    const [like, setLike] = useState("white")
    const [postStats, setPostStats] = useState({
        likes: 0,
        comments: 0
    })
    useEffect(() => {
        getPostStats()
        isPostLiked()
    }, [])

    useEffect(() => {
        getPostStats()
    }, [like])
    const isPostLiked = () => {
        axios.post(`${config.restapi}/isliked`, {
            postId: data.post_id,
            accId: userId
        }).then(response => {
            if (response.data.isliked) setLike("#00aced")
        })
    }

    const getPostStats = () => {
        axios.get(`${config.restapi}/postStats/${data.post_id}`)
            .then(response => setPostStats({
                likes: response.data.likes[0].count === 0 ? "" : response.data.likes[0].count,
                comments: response.data.comments[0].count === 0 ? "" : response.data.comments[0].count
            }))
    }
    const likePost = (id) => {
        axios.post(`${config.restapi}/likePost`, {
            postId: id,
            accId: userId
        })
            .then(setLike(like === "white" ? "#00aced" : "white"))
    }
    return (
        <View style={styles.postContainer}>
            <Text style={styles.postDate}>{new Date(data.post_created).toLocaleDateString("en-US", config.date_format)}</Text>
            <Text onPress={() => navigation.navigate("Post", data)} style={styles.postHeader}>{data.post_title}</Text>
            <Text style={styles.postText}>{data.post_content}</Text>
            <Text style={styles.postAuthor} onPress={() => navigation.navigate("Profile", data.post_author_id)}>{data.account_name}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignSelf: "flex-end", paddingBottom: 15 }}>
                {postStats.comments === "" ? <></> :
                    <>
                        <Icon
                            name="comments"
                            type="font-awesome"
                            color="white"
                            style={{ padding: 5, marginRight: 20, top: -5 }}
                        />
                        <Text style={{ color: "white", textAlign: "right", marginTop: 3, fontWeight: "bold", fontSize: 20, left: -70 }}>{postStats.comments}</Text>
                    </>
                }
                <Icon
                    name="thumbs-up"
                    type="font-awesome"
                    color={like}
                    onPress={() => likePost(data.post_id)}
                />
                <Text style={{ color: "white", textAlign: "right", marginTop: 3, fontWeight: "bold", fontSize: 20, left: -40 }}>{postStats.likes}</Text>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    name: {
        fontSize: 28,
        textAlign: "center",
        marginTop: 20,
    },
    image: {
        marginTop: 40,
        width: 100,
        height: 100,
        borderRadius: 100,
        left: "39%"
    },
    container: {
        height: "100%"
    }

})

export default Profile;
