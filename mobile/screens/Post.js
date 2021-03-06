import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ScrollView, TouchableOpacity, Alert, Share, Text, TextInput, Image, Linking } from 'react-native';
import Footer from '../components/Footer';
import axios from "axios"
import config from '../config'
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';


const PostScreen = ({ route, navigation }) => {
    const [post] = useState({ ...route.params, render_user_image: route.params.profile_image_encoded.replace(/\s/g, '') })
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [userId, setUserId] = useState(0)
    const [postMenu, setPostMenu] = useState(false)
    const [covidAlert, setCovidAlert] = useState(false)



    const fadeAnim = useRef(new Animated.Value(-1000)).current
    const SlideValue = new Animated.Value(-1000)
    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false

        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: -1000,
            duration: 500,
            useNativeDriver: false

        }).start();
    };

    const slideIn = () => {
        Animated.timing(SlideValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false

        }).start();
    };

    const slideOut = () => {
        Animated.timing(SlideValue, {
            toValue: -1000,
            duration: 500,
            useNativeDriver: false

        }).start();
    };

    const [friends, setFriends] = useState([])

    useEffect(() => {
        getUser()
        loadComments()
        check_for_covid_info()
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

    const check_for_covid_info = () => {
        let title = check_for_covid_in_textt(post.post_title)
        let content = check_for_covid_in_textt(post.post_content)
        if (title || content) {
            setCovidAlert(true)
        }
    }

    const check_for_covid_in_textt = (txt) => {
        let tmp = txt.replace(/[^a-zA-Z ]/g, "")
        tmp = tmp.toLowerCase()
        tmp = tmp.replace(/[0-9]/g, "")
        tmp = tmp.replace(/\s/g, "")
        return tmp.includes("covid")
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
        }).then(response => {
            loadComments()
            setComment("")
        })


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

    const deleteComment = (id) => {
        Alert.alert(
            "Do you want to delete this comment?",
            "This action cannot be returned",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete", onPress: () => {
                        axios.post(`${config.restapi}/deletecomment`, {
                            commentId: id
                        })
                            .then(response => loadComments())

                    }
                }
            ]
        );
    }

    const renderFriends = friends.map((friend, i) => (
        <View key={i} style={{ width: "90%", left: "5%", padding: 10, backgroundColor: "white", borderRadius: 9, }}>
            <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", color: "#242445" }}
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
        <View key={comm.comment_id}>
            {comm.comment_author_id + "" === userId + "" ?
                <View style={styles.c_container}>
                    <Text style={styles.c_author}
                        onPress={() => navigation.navigate('Profile', comm.account_id)}>
                        {comm.account_name}</Text>
                    <Text style={styles.c_created}>{new Date(comm.comment_created).toLocaleDateString("en-US", config.date_format)}</Text>
                    <Text style={styles.c_text} onLongPress={() => deleteComment(comm.comment_id)}>{comm.comment_content}</Text>
                </View>
                :
                <View style={styles.c_container}>
                    <Text style={styles.c_author}
                        onPress={() => navigation.navigate('Profile', comm.account_id)}>
                        {comm.account_name}</Text>
                    <Text style={styles.c_created}>{new Date(comm.comment_created).toLocaleDateString("en-US", config.date_format)}</Text>
                    <Text style={styles.c_text}>{comm.comment_content}</Text>
                </View>
            }
        </View>

    ))
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    `${config.web_url}/publicpost/${post.post_id}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <View style={styles.container}>
            <Animated.View style={{ position: "absolute", top: SlideValue, left: 0, padding: 20, width: "100%", height: "100%", backgroundColor: "black", zIndex: 300 }}>
                <View style={{ position: "absolute", top: "30%", left: "16%", padding: 20, width: 150, height: 150, backgroundColor: "black", zIndex: 300 }}>
                    <QRCode
                        value={`${config.web_url}/publicpost/${post.post_id}`}
                        logoSize={40}
                        size={250}
                        logoBackgroundColor='transparent'
                        logo={require("../logo-nobg.png")}
                    />
                </View>
                <TouchableOpacity style={{ width: "70%", left: "15%", top: "70%", backgroundColor: "white", padding: 10, borderRadius: 100 }} onPress={() => slideOut()}>
                    <Text style={{ fontSize: 20, textAlign: "center" }}>Close</Text>
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{ width: "100%", height: "90%", backgroundColor: "#242445", position: "absolute", bottom: fadeAnim, zIndex: 10, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                <Text style={{ left: 30, top: 30, fontSize: 24, fontWeight: "500", color: "white" }}>Share with friends</Text>
                <Text style={{ position: "absolute", right: 0, margin: 20, fontSize: 30, fontWeight: "bold", color: "grey" }} onPress={() => fadeOut()}>X</Text>
                <ScrollView style={{ marginTop: 45 }}>{renderFriends}</ScrollView>
            </Animated.View>
            <ScrollView>
                <Text style={styles.postTitle}>{post.post_title}</Text>
                <Text style={styles.postCreated}>{new Date(post.post_created).toLocaleDateString("en-US", config.date_format)}</Text>
                {postMenu ?
                    <View style={styles.pmcontainer}>
                        <TouchableOpacity style={{ width: "50%" }} onPress={() => deletePost()}>
                            <Icon
                                type="font-awesome"
                                name="trash"
                                color="white"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: "50%" }} onPress={() => editPost()}>
                            <Icon
                                type="font-awesone"
                                name="edit"
                                color="white"
                            />
                        </TouchableOpacity>
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

                {covidAlert ?
                    <View style={{ width: "90%", left: "5%", padding: 10, backgroundColor: "#242445", marginTop: 30, borderRadius: 9 }}>
                        <Text style={{ fontWeight: "500", fontSize: 18, color: "white" }}>
                            <Icon type="font-awesome" name="warning" color="orange" style={{ paddingRight: 10, paddingLeft: 5 }} />
                            <Text style={{ fontSize: 18 }}>This post contains Covid-19 informations. To prevent disinformations please visit <Text onPress={() => Linking.openURL(`http://172.20.10.3:3000/covid`)} style={{ color: "#00aced" }}>trusted source</Text> </Text>
                        </Text>
                    </View> : <></>}
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
                        placeholderTextColor="lightgrey"
                        multiline
                    ></TextInput>

                    <View style={{ width: "90%", left: "12.5%", borderRadius: 9, backgroundColor: "#242445", padding: 10, marginTop: 20, flexDirection: "row" }}>
                        <TouchableOpacity style={{ width: "33.3%" }} onPress={() => sentComment()}>
                            <Icon type="font-awesome" name="paper-plane" color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: "33.3%" }}>
                            <Icon type="font-awesome" name="qrcode" color="white" onPress={() => slideIn()} onLongPress={() => onShare()} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: "33.3%" }} onPress={() => fadeIn()}>
                            <Icon type="font-awesome" name="share" color="white" />
                        </TouchableOpacity>
                        {/* <Text style={{ fontWeight: "500", fontSize: 18, paddingLeft: 10, top: 10, color: "#00aced" }} onPress={() => sentComment()}>Sent</Text> */}
                        {/* <Text style={{ fontWeight: "500", fontSize: 18, paddingRight: 10, alignSelf: "flex-end", top: -10, color: "#00aced" }} onPress={() => fadeIn()}>Share</Text> */}
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
        backgroundColor: "#242445",
        borderRadius: 9
    },
    pmcontainer: {
        marginLeft: "5%",
        padding: 10,
        width: "90%",
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: "#242445",
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
        backgroundColor: "#242445",
        borderRadius: 9,
        color: "white",
        fontSize: 16
    },
    c_author: {
        fontSize: 18,
        color: "white",
        fontWeight: "600",
    },
    c_created: {
        top: -20,
        alignSelf: "flex-end",
        color: "lightgrey"
    },
    c_text: {
        left: 10,
        color: "white",
        fontSize: 15,
    },
    container: {
        height: "100%",
    },
    postTitle: {
        fontSize: 30,
        textAlign: "center",
        marginTop: 20,
        color: "#242445",
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
        fontWeight: "500",
        color: "white",
        top: -37,
        textAlign: "center",
        fontSize: 30
    },
    postCreated: {
        textAlign: "center"
    },
    postHeader: {
        marginTop: 20,
        width: "90%",
        backgroundColor: "#242445",
        marginLeft: "5%",
        padding: 10,
        paddingBottom: 0,
        borderRadius: 9
    },
    postContent: {
        marginTop: 20,
        width: "90%",
        backgroundColor: "#242445",
        marginLeft: "5%",
        padding: 10,
        borderRadius: 9,
        marginBottom: 20,
    },
    postContentText: {
        fontSize: 20,
        padding: 4,
        color: "white",
    },

})

export default PostScreen;
