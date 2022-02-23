import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, ScrollView } from 'react-native';
import axios from 'axios'
import config from '../config'
import { Icon } from 'react-native-elements';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {

    const [posts, setPosts] = useState([])
    const [loadingStatus, setLoadingStatus] = useState(<ActivityIndicator size="large" style={{ marginTop: "40%", height: "50%" }} />)
    const [userId, setUserId] = useState(0)
    useEffect(() => {

        loadPosts()
    }, [])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadPosts()
        });

        return unsubscribe;
    }, [navigation]);

    const loadPosts = async () => {
        const getData = await AsyncStorage.getItem('user')
        setUserId(getData)
        axios.get(`${config.restapi}/postshome/${getData}`)
            .then(response => {
                setPosts(response.data)
                setLoadingStatus(<></>)
            })
    }


    return (
        <View style={styles.container}>
            {loadingStatus}

            <ScrollView
                style={styles.scroll}
                onScrollToTop={() => loadPosts()}>

                {posts.map((post, i) => (
                    <PostBlock data={post} userId={userId} navigation={navigation} key={post.post_id} />
                ))}

                <View style={{ height: 100 }}></View>
            </ScrollView>
            <View style={{ position: "absolute", fontSize: 20, top: "80%", right: 30, backgroundColor: "#00aced", width: 50, height: 50, borderRadius: "100%" }}>
                <Text onPress={() => navigation.navigate("Create")} style={{ fontSize: 25, color: "white", fontWeight: "bold", textAlign: "center", padding: 10 }}>+</Text>
            </View>
            <Footer navigation={navigation} active="Home" />
        </View>
    );
}


const PostBlock = ({ navigation, userId, data }) => {
    const [like, setLike] = useState("grey")
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
            .then(setLike(like === "grey" ? "#00aced" : "grey"))
        getPostStats()
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
                            color="black"
                            style={{ padding: 5, marginRight: 20, top: -5 }}
                        />
                        <Text style={{ color: "grey", textAlign: "right", marginTop: 3, fontWeight: "bold", fontSize: 20, left: -70 }}>{postStats.comments}</Text>
                    </>
                }
                <Icon
                    name="thumbs-up"
                    type="font-awesome"
                    color={like}
                    onPress={() => likePost(data.post_id)}
                />
                <Text style={{ color: "grey", textAlign: "right", marginTop: 3, fontWeight: "bold", fontSize: 20, left: -40 }}>{postStats.likes}</Text>
            </View>
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
        backgroundColor: "white",
        color: "black",
        paddingBottom: -10
    },
    postHeader: {
        top: -10,
        color: "black",
        left: 5,
        fontSize: 25,
        fontWeight: "bold"
    },
    postText: {
        top: -5,
        color: "black",
        left: 20,
        fontSize: 19,
        fontWeight: "400",
    },
    postDate: {
        color: "grey",
        fontWeight: "600",
        top: -10,
        left: "67%",
    },
    postAuthor: {
        color: "grey",
        fontWeight: "600",
        left: 10,
        fontSize: 15,
        top: 24,
    }
})

export default HomeScreen;
