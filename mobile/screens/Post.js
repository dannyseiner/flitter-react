import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ScrollView, Alert, Text, Button, TextInput, Image } from 'react-native';
import Footer from '../components/Footer';
import axios from "axios"
import config from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationRouteContext } from '@react-navigation/native';


const PostScreen = ({ route, navigation }) => {
    const [post, setPost] = useState({ ...route.params, render_user_image: route.params.profile_image_encoded.replace(/\s/g, '') })
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [userId, setUserId] = useState(0)
    const [postMenu, setPostMenu] = useState(false)

    const fadeAnim = useRef(new Animated.Value(-1000)).current

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false

        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: -1000,
            duration: 300,
            useNativeDriver: false

        }).start();
    };

    const [friends, setFriends] = useState([])

    useEffect(() => {
        getUser()
        loadComments()
    }, [])

    useEffect(() => {
        getFriends()
    }, [userId])

    const getUser = async () => {
        const id = await AsyncStorage.getItem("user")
        setUserId(id)
        if (post.post_author_id + "" === id + "") setPostMenu(true)
    }

    const getFriends = () => {
        if (userId === 0) return
        axios.get(`${config.restapi}/getfriendsstrict/${userId}`)
            .then(response => setFriends(response.data))
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // axios.get(`${config.restapi}/post/${post.post_id}`)
            //     .then(response => setPost({ ...response.data, render_user_image: route.params.profile_image_encoded.replace(/\s/g, '') }))
        });

        return unsubscribe;
    }, [navigation]);

    const sharePost = (data) => {
        axios.post(`${config.restapi}/sharePost`, {
            friendshipId: data.friendship,
            fromId: userId,
            postId: post.post_id
        }).then(response => fadeOut())
    }

    const loadComments = () => {
        axios.get(`${config.restapi}/post/${post.post_id}/comments`)
            .then(response => {
                setComments(response.data)
            })
    }

    const sentComment = () => {
        if (comment.length === 0) {
            Alert.alert("Please enter text before sending comment!")
            return
        }
        axios.post(`${config.restapi}/addComment`, {
            author_id: userId,
            post_id: post.post_id,
            comment_content: comment
        })
        loadComments()
        setComment("")

    }

    const editPost = () => {
        navigation.navigate("Create", post)
    }

    const deletePost = () => {
        Alert.alert(
            "Do you want to delete post?",
            "This action cannot be returned",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete", onPress: () => {
                        axios.post(`${config.restapi}/deletePost`, {
                            postId: post.post_id
                        })
                            .then(response => navigation.navigate("Home"))

                    }
                }
            ]
        );
    }

    const renderFriends = friends.map((friend, i) => (
        <View key={i} style={{ width: "90%", left: "5%", padding: 10, backgroundColor: "#00aced", borderRadius: 9, }}>
            <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", color: "white" }}
                onPress={() => sharePost({
                    from: friend.user1_id === userId ? friend.user2_id : friend.user1_id,
                    friendship: friend.id_friendship
                })}
            >
                {friend.user1_id + "" === userId + "" ? friend.user2_name : friend.user1_name}
            </Text>
        </View>
    ))

    const renderComments = comments.map((comm, i) => (
        <CommentBlock key={comm.comment_id} data={comm} navigation={navigation} />
    ))

    return (
        <View style={styles.container}>
            <Animated.View style={{ width: "100%", height: "90%", backgroundColor: "white", position: "absolute", bottom: fadeAnim, zIndex: 10 }}>
                <Text style={{ position: "absolute", right: 0, margin: 20, fontSize: 30, fontWeight: "bold", color: "black" }} onPress={() => fadeOut()}>X</Text>
                <ScrollView style={{ marginTop: 80 }}>{renderFriends}</ScrollView>
            </Animated.View>
            <ScrollView>
                <Text style={styles.postTitle}>{post.post_title}</Text>
                <Text style={styles.postCreated}>{new Date(post.post_created).toLocaleDateString("en-US", config.date_format)}</Text>
                {postMenu ?
                    <View style={styles.pmcontainer}>
                        <Text style={styles.pmtext} onPress={() => deletePost()}>Delete Post</Text>
                        <Text style={styles.pmtext2} onPress={() => editPost()}>Edit Post</Text>
                    </View> :
                    <></>}
                <View style={styles.postHeader}>
                    <Image
                        style={styles.profileImagse}
                        source={{
                            uri: post.render_user_image,
                        }}
                    />
                    <Text
                        title={post.account_name}
                        style={styles.postHeaderName}
                        onPress={() => navigation.navigate('Profile', post.account_id)}>
                        {post.account_name}
                    </Text>
                </View>
                <View style={styles.postContent}>
                    <Text style={styles.postContentText}>{post.post_content}</Text>
                </View>
                <View>
                    <TextInput
                        value={comment}
                        onChangeText={e => setComment(e)}
                        placeholder="Enter comment"
                        style={styles.c_comment}
                        onSubmitEditing={(event) => sentComment()}
                        multiline
                    ></TextInput>

                    <View style={{ width: "90%", left: "5%", borderRadius: 9, backgroundColor: "white", padding: 10, marginTop: 20, }}>
                        <Text style={{ fontWeight: "500", fontSize: 18, paddingLeft: 10, top: 10, color: "#00aced" }} onPress={() => sentComment()}>Sent</Text>
                        <Text style={{ fontWeight: "500", fontSize: 18, paddingRight: 10, alignSelf: "flex-end", top: -10, color: "#00aced" }} onPress={() => fadeIn()}>Share</Text>
                    </View>
                </View>
                {renderComments}
                <View style={{ height: 100 }}></View>
            </ScrollView>
            <Footer navigation={navigation} active="Home" />
        </View>
    );
}

const CommentBlock = ({ data, navigation }) => {
    return (
        <View style={styles.c_container}>
            <Text style={styles.c_author}
                onPress={() => navigation.navigate('Profile', data.account_id)}>
                {data.account_name}</Text>
            <Text style={styles.c_created}>{new Date(data.comment_created).toLocaleDateString("en-US", config.date_format)}</Text>
            <Text style={styles.c_text}>{data.comment_content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    c_container: {
        width: "90%",
        marginLeft: "5%",
        marginTop: 10,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 9
    },
    pmcontainer: {
        marginLeft: "5%",
        padding: 10,
        width: "90%",
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: "white",
        borderRadius: 9
    },
    pmtext: {
        fontSize: 18,
        marginLeft: "5%",
        fontWeight: "500",
        color: "red"
    },
    pmtext2: {
        fontSize: 18,
        fontWeight: "500",
        marginLeft: "35%",
        color: "#00aced"
    },
    c_comment: {
        width: "90%",
        padding: 20,
        left: "5%",
        height: 100,
        backgroundColor: "white",
        borderRadius: 9,
        fontSize: 16
    },
    c_author: {
        fontSize: 18,
        fontWeight: "600",
    },
    c_created: {
        top: -20,
        alignSelf: "flex-end"
    },
    c_text: {
        left: 10,
        fontSize: 15,
    },
    container: {
        height: "100%",
    },
    postTitle: {
        fontSize: 30,
        textAlign: "center",
        marginTop: 20,
        fontWeight: "bold"
    },
    profileImagse: {
        width: 60,
        height: 60,
        top: 10,
        borderRadius: 100,
        left: "5%"
    },
    postHeaderName: {
        textAlign: "center",
        right: -30,
        top: -37,
        fontSize: 30
    },
    postCreated: {
        textAlign: "center"
    },
    postHeader: {
        marginTop: 30,
        width: "90%",
        backgroundColor: "white",
        marginLeft: "5%",
        padding: 10,
        paddingBottom: 0,
        borderRadius: 9
    },
    postContent: {
        marginTop: 30,
        width: "90%",
        backgroundColor: "white",
        marginLeft: "5%",
        padding: 10,
        borderRadius: 9,
        marginBottom: 20,
    },
    postContentText: {
        fontSize: 20
    },

})

export default PostScreen;
