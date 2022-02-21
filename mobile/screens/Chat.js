import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import io from "socket.io-client"
import axios from "axios"
import config from "../config"
import AsyncStorage from '@react-native-async-storage/async-storage';

const connectionConfig = {
    jsonp: false,
    reconnection: true,
    reconnectionDelay: 100,
    reconnectionAttempts: 5000,
    transports: ['websocket']
};
const socket = io.connect(`http://${config.socket}`, connectionConfig)


const Chat = ({ route, navigation }) => {
    const params = route.params
    const scrollViewRef = useRef();


    const [currentMessage, setCurrentMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [userId, setUserId] = useState(0)
    const [evtClass, setEvtClass] = useState({ input: styles.input, spacer: false })

    const getUserId = async () => {
        const getData = await AsyncStorage.getItem('user')
        setUserId(getData)
    }

    useEffect(() => {
        getUserId()
        getMessages()
        socket.emit("join_room", params)

    }, [userId])

    useEffect(() => {
        getMessages()
    }, [userId])

    useEffect(() => {
        console.log("ACCESS")
        socket.on("receive_message", (data) => {
            console.log("RECEVE_MESSAGE")
            // setMessages(data)
            getMessages()
        })
    }, [socket])

    const getMessages = () => {
        axios.get(`${config.restapi}/getMessages/${params}`)
            .then(response => setMessages(response.data))
    }

    const sentMessage = () => {
        if (currentMessage.length === 0) return
        socket.emit("send_message", {
            roomId: params,
            fromId: userId,
            message: currentMessage
        })
        getMessages()
        setCurrentMessage("")
    }

    const renderMessages = messages.map(((msg, i) => (
        <View key={msg.message_id}>
            {i % 10 === 0 ?
                <View style={styles.messagesent}>
                    <Text style={{ textAlign: "center" }}>{new Date(msg.created).toLocaleDateString("en-US", config.date_format)}</Text>
                </View>
                : <></>}
            {msg.from_id + "" === userId + "" ?
                <View style={styles.MymessageContainer}>
                    <Text style={styles.MymessageText}>
                        {msg.message}
                    </Text>
                </View>
                :
                <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>
                        {msg.message}
                    </Text>
                </View>
            }
        </View>
    )))

    return (
        <View style={{ backgroundColor: "white" }}>
            <View style={styles.container}>
                <View style={{ height: 40 }}></View>
                <ScrollView
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}

                >
                    {renderMessages}
                    {evtClass.spacer ? <View style={{ height: 300 }}></View> : <></>}
                </ScrollView>
                <TextInput
                    onFocus={() => setEvtClass({ input: styles.inputFocused, spacer: true })}
                    onBlur={() => setEvtClass({ input: styles.input, spacer: false })}
                    value={currentMessage}
                    onChangeText={e => setCurrentMessage(e)}
                    placeholder="Message"
                    onSubmitEditing={(event) => sentMessage()}
                    style={evtClass.input} placeholer="message" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    messageContainer: {
        backgroundColor: '#000000',
        alignSelf: 'flex-start',
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        left: 10,
        marginBottom: 20
    },
    messagesent: {
        padding: 10,
        color: "black",
        backgroundColor: "#F0F0F0",
        textAlign: "center",
        width: "40%",
        left: "30%",
        marginBottom: 20,
        borderRadius: 10,
    },
    messageText: {
        color: "white",
        fontSize: 20,
        padding: 10,
    },
    MymessageContainer: {
        backgroundColor: '#00aced',
        alignSelf: 'flex-start',
        borderRadius: 20,
        borderBottomRightRadius: 0,
        right: 10,
        alignSelf: 'flex-end',
        marginBottom: 20
    },
    MymessageText: {
        color: "white",
        fontSize: 20,
        padding: 10,
    },
    sentbutton: {
        left: 150,
        top: 20
    },
    input: {
        bottom: 20,
        borderRadius: 12,
        height: 55,
        padding: 10,
        fontSize: 16,
        margin: "2.5%",
        backgroundColor: "#F0F0F0"
    },
    inputFocused: {
        bottom: 300,
        borderRadius: 12,
        height: 55,
        padding: 10,
        fontSize: 16,
        margin: "2.5%",
        backgroundColor: "#F0F0F0"
    }
})

export default Chat;
