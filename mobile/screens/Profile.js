import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Image, ScrollView, StyleSheet, Alert, Text, Button } from 'react-native';
import Footer from '../components/Footer';
import { Icon } from 'react-native-elements';
import axios from "axios"
import config from "../config"
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = ({ route, navigation }) => {
    const params = route.params
    const [userId, setUserId] = useState(0)
    const [loadingStatus, setLoadingStatus] = useState(<ActivityIndicator size="large" style={{ marginTop: "40%", height: "50%", marginBottom: 300 }} />)
    const [posts, setPosts] = useState([])
    const [places, setPlaces] = useState([])

    const [data, setData] = useState({
        decoded_image: ""
    })

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getPosts()
            loadPlaces()
            setLoadingStatus(<></>)
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (params === undefined) {
            getLoggedUser(null)
        } else {
            getLoggedUser(params)
        }
        getPosts()
        loadPlaces()
    }, [])
    const getLoggedUser = async (id) => {
        const getData = await AsyncStorage.getItem('user')
        setUserId(getData)
        console.log(userId)
        axios.get(`${config.restapi}/user/${id === null ? getData : id}`)
            .then(response => setData(response.data[0]))
    }

    const getPosts = () => {
        axios.get(`${config.restapi}/userposts/${params}`)
            .then(response => {
                setPosts(response.data)
                setLoadingStatus(<></>)
            })
    }

    const loadPlaces = () => {
        axios.get(`${config.restapi}/places/${params}`)
            .then(response => setPlaces(response.data))
    }
    const deletePlace = id => {
        Alert.alert(
            "Delete place",
            "Do you want to permanently delete this place?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => {
                        axios.post(`${config.restapi}/deleteplace`, {
                            placeId: id
                        }).then(response => loadPlaces())
                    },
                },
            ])
    }


    const renderPosts = posts.map(post => (
        <PostBlock key={post.post_id} navigation={navigation} userId={userId} data={post} />
    ))
    const renderPlaces = places.map((plc, i) => (
        <View key={i}
            style={styles.placecontainer}>

            {plc.user_id + "" === userId + "" ?
                <Text style={styles.placetext}
                    onLongPress={() => deletePlace(plc.place_id)}
                    onPress={place => navigation.navigate("Maps", { longitude: plc.longitude, latitude: plc.latitude, account_name: plc.account_name, place_name: plc.place_name })}
                >{plc.place_name}</Text>
                :
                <Text style={styles.placetext}
                    onPress={place => navigation.navigate("Maps", { longitude: plc.longitude, latitude: plc.latitude, account_name: plc.account_name, place_name: plc.place_name })}
                >{plc.place_name}</Text>
            }
        </View >
    ))


    return (
        <View style={styles.container}>
            {loadingStatus}
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
                <Text style={{ fontSize: 18, left: 20, marginTop: 20, marginBottom: 10, fontWeight: "500" }}>Places</Text>
                {renderPlaces}
                <Text style={{ fontSize: 18, left: 20, marginTop: 20, marginBottom: 10, fontWeight: "500" }}>Posts</Text>
                {renderPosts}
                <View style={{ height: 100 }}></View>
            </ScrollView>
            {params === undefined ? <Footer navigation={navigation} active={"Profile"} /> : <Footer navigation={navigation} active={"Profile"} />}
        </View>
    );
}



const PostBlock = ({ navigation, userId, data, deleteFce }) => {
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
    }
    return (
        <View style={styles.postContainer}>
            <Text style={styles.postDate}>{new Date(data.post_created).toLocaleDateString("en-US", config.date_format)}</Text>
            <Text onPress={() => navigation.navigate("Post", data)} style={styles.postHeader}>{data.post_title}</Text>
            <Text style={styles.postText}>{data.post_content}</Text>
            <Text style={styles.postAuthor}>{data.account_name}</Text>
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
    )
}


const styles = StyleSheet.create({
    placecontainer: {
        width: "90%",
        padding: 10,
        left: "5%",
        backgroundColor: "white",
        marginBottom: 20,
        borderRadius: 9
    },
    placetext: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "500"
    },
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

export default Profile;
