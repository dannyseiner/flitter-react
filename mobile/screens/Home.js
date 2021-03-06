import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, TextInput, Animated, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';
import axios from 'axios'
import config from '../config'
import { Icon } from 'react-native-elements';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = ({ navigation }) => {

    const [posts, setPosts] = useState([])
    const [loadingStatus, setLoadingStatus] = useState(<ActivityIndicator size="large" style={{ marginTop: "40%", height: "50%" }} />)
    const [userId, setUserId] = useState(0)
    const [search, setSearch] = useState("")

    // ANIMATED 
    const fadeAnim = useRef(new Animated.Value(0)).current
    const indexAnim = useRef(new Animated.Value(0)).current
    const rotateAnim = useRef(new Animated.Value(0)).current
    const [isOpen, setIsOpen] = useState(false)


    const animationhandler = () => {
        if (isOpen) {
            fadeOut()
            setIsOpen(false)
        } else {
            fadeIn()
            setIsOpen(true)
        }
    }
    const fadeIn = () => {
        Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true
        }).start(() => {
            rotateAnim.setValue(0);
        });
        Animated.timing(fadeAnim, {
            toValue: 0.8,
            duration: 800,
            useNativeDriver: true
        }).start()
        Animated.timing(indexAnim, {
            toValue: 40,
            duration: 800,
            useNativeDriver: true,
        }).start()


    };

    const fadeOut = () => {
        Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start(() => {
            rotateAnim.setValue(0);
        });
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
        }).start()
        Animated.timing(indexAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true
        }).start()

    }


    const xInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    const animatedStyles = {
        transform: [{ rotate: xInterpolate }],
    };

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
            <Animated.View style={isOpen === false ? { opacity: 0 } : { opacity: 1, backgroundColor: "white", top: 20, borderRadius: 10, position: "absolute", zIndex: 150, width: "95%", left: "2.5%", height: 60, }}>
                <TextInput
                    onSubmitEditing={e => search === "" ? animationhandler() : navigation.navigate("Search", search)}
                    onChangeText={e => setSearch(e)}
                    style={{ fontSize: 20, padding: 5, top: 15, width: "95%", left: "2.5%", position: "absolute" }}
                    placeholder="Search posts and people" />
            </Animated.View>
            <Animated.View style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, backgroundColor: "black", opacity: fadeAnim, zIndex: indexAnim }}>

            </Animated.View>
            <ScrollView
                style={{ top: 0 }}
                onScrollToTop={() => loadPosts()}>

                {posts.map((post, i) => (
                    <PostBlock data={post} userId={userId} navigation={navigation} key={post.post_id} />
                ))}

                <View style={{ height: 100 }}></View>
            </ScrollView>
            <TouchableOpacity style={{ position: "absolute", fontSize: 20, top: -30, right: -30, backgroundColor: "#242445", width: 80, height: 80, borderRadius: "100%" }}
                onPress={() => navigation.navigate("Create")} >
                <Icon
                    style={{ fontSize: 25, marginTop: 25, marginLeft: -15, color: "white", fontWeight: "bold", textAlign: "center", padding: 10 }}
                    type="font-awesome"
                    size={30}
                    color="white"
                    name="plus"
                />
            </TouchableOpacity>
            <Animated.View style={[animatedStyles, { position: "absolute", fontSize: 20, top: "84%", right: "37.5%", backgroundColor: "#242445", width: "25%", height: 120, zIndex: 50, borderRadius: "100%" }]}>
                <TouchableOpacity
                    onPress={() => animationhandler()} >
                    <Icon
                        style={[{ fontSize: 25, top: 10, color: "white", fontWeight: "bold", textAlign: "center", padding: 10 }]}
                        type="font-awesome"
                        color="white"
                        name={isOpen ? "times" : "search"}
                    />
                </TouchableOpacity>
            </Animated.View>
            <Footer navigation={navigation} active="Home" />
        </View >
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
            if (response.data.isliked) setLike("#372c38")
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
            .then(setLike(like === "grey" ? "#372c38" : "grey"))
        getPostStats()
    }
    return (
        <>
            <View style={styles.postContainer}>
                <View style={{ width: 6, height: "100%", borderBottomLeftRadius: 20, borderTopLeftRadius: 20, backgroundColor: "#242445", position: "absolute", top: 0 }}></View>
                <View style={{ padding: 15 }}>
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
                                    color="grey"
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
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    postContainer: {
        width: "95%",
        marginTop: 10,
        left: "2.5%",
        borderRadius: 12,
        backgroundColor: "white",
        color: "black",
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
