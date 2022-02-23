import React, { useState, useEffect } from 'react';
import config from '../config'
import axios from 'axios'
import { View, StyleSheet, Text, Button, Alert, TextInput } from 'react-native';
import Footer from '../components/Footer'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Create = ({ route, navigation }) => {
    const editData = route.params

    const [title, setTitle] = useState(editData !== undefined ? editData.post_title : "")
    const [text, setText] = useState(editData !== undefined ? editData.post_content : "")
    const [buttonText, setButtonText] = useState(editData !== undefined ? "Edit Post" : "Create Post")
    const [userId, setUserId] = useState(0)

    useEffect(() => {
        getUserId()
    }, [])

    const getUserId = async () => {
        const id = await AsyncStorage.getItem("user")
        setUserId(id)
    }
    const createPost = async () => {
        if (title.length === 0 || text.length === 0) return

        if (editData !== undefined) {
            if (title + "" === editData.post_title + "" && text + "" === editData.post_content) {
                Alert.alert("You must edit post before submit!")
                return
            }
            axios.post(`${config.restapi}/editpost`, {
                postId: editData.post_id,
                postTitle: title,
                postContent: text,
                accountId: editData.post_author_id
            }).then(response => Alert.alert("Post is updated"))
        } else {
            axios.post(`${config.restapi}/createpost`, {
                author: userId,
                title: title,
                text: text,
            })
                .then(response => {
                    alert("Post was created!")
                    setTimeout(() => {
                        navigation.navigate("Home")
                    }, 1000)
                })
        }
    }

    return (
        <View style={{ height: "100%" }}>
            <View style={{ height: "100%" }}>
                <TextInput
                    placeholder="Title"
                    style={styles.forminput}
                    value={title}
                    onChangeText={e => setTitle(e)}
                />
                <TextInput
                    multiline={true}
                    value={text}
                    onChangeText={e => setText(e)}
                    placeholder="Title"
                    style={styles.formTextarea}
                />
                <View
                    style={styles.button}>
                    <Text
                        style={{ textAlign: "center", fontWeight: "bold", fontSize: 15, color: "white" }}
                        onPress={() => createPost()}
                    >{buttonText}</Text>
                </View>
            </View>

            <Footer navigation={navigation} active={"Create"} />
        </View>
    );
}

const styles = StyleSheet.create({
    forminput: {
        width: "90%",
        left: "5%",
        backgroundColor: "white",
        color: "black",
        borderRadius: 9,
        fontSize: 20,
        marginTop: 30,
        padding: 20
    },
    button: {
        textAlign: "center",
        fontWeight: "bold",
        top: 30,
        backgroundColor: "#00aced",
        color: "#00aced",
        padding: 10,
        fontSize: 20,
        width: "40%",
        left: "30%",
        borderRadius: 10
    },
    formTextarea: {
        width: "90%",
        left: "5%",
        height: 200,
        backgroundColor: "white",
        color: "black",
        borderRadius: 9,
        fontSize: 20,
        marginTop: 30,
        padding: 20
    }
})

export default Create;
