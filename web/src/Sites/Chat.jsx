import axios from 'axios'
import { useState, useEffect } from 'react'
import ChatContact from "../Components/ChatContact"
import Message from '../Components/Message'
import config from "../config"

const Chat = () => {
    let bool = false
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [chatRoom, setChatRoom] = useState({
        id: 0,
        username: "",
        image: "",
    })
    const [friends, setFriends] = useState([
        {}
    ])
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const getFriends = () => {
        axios.get(`${config.restapi}/getfriendsstrict/${user.account_id}`)
            .then(response => setFriends(response.data))
    }
    const renderFriends = friends.map((friend, i) => (
        <div key={i}
            onClick={() => {
                selectChatRoom({
                    id: friend.id_friendship,
                    username: user.account_id === friend.user1_id ? friend.user2_name : friend.user1_name,
                    image: user.account_id === friend.user1_id ? friend.user2_image_render : friend.user1_image_render,
                })
            }}
        >
            <ChatContact user={{
                id: user.account_id === friend.user1_id ? friend.user2_id : friend.user1_id,
                username: user.account_id === friend.user1_id ? friend.user2_name : friend.user1_name,
                image: user.account_id === friend.user1_id ? friend.user2_image_render : friend.user1_image_render,
                lastMessage: "Last messge",
                badge: 0,
            }}
            />
        </div>
    ))

    const getMessages = () => {
        if (chatRoom === 0) return
        axios.get(`${config.restapi}/getMessages/${chatRoom.id}`)
            .then(response => setMessages(response.data))
    }
    const selectChatRoom = (data) => {
        setChatRoom(data)
        getMessages()
    }
    const renderMessages = messages.map((msg, i) => (
        <Message data={msg} index={i} key={i} />
    ))
    const sentMessage = () => {
        if (message.length === 0) return
        axios.post(`${config.restapi}/sentMessage`, {
            roomId: chatRoom.id,
            fromId: user.account_id,
            message: message,
        })
    }
    useEffect(() => {
        getFriends()
    }, []);

    useEffect(() => {
        getMessages()

    }, [])

    return (
        <div style={{ minHeight: "100vh", top: "50px", position: "relative" }}>
            <div className="center">
                <div className="contacts">
                    <i className="fas fa-bars fa-2x"></i>
                    <h2>
                        Contacts
                    </h2>
                    {renderFriends}
                </div>
                <div className="chat">
                    {chatRoom.id !== 0 ?
                        <div className="contact bar">
                            <img className="pic" src={chatRoom.image} />
                            <div className="name">
                                {chatRoom.username}
                            </div>
                            <div className="seen">
                                Today at 12:56
                            </div>
                        </div> : ""}
                    <div className="messages" style={chatRoom.id === 0 ? { borderRadius: "16px" } : { borderRadius: "0px" }} id="chat">
                        {renderMessages}
                    </div>
                    <div className="input" style={chatRoom.id === 0 ? { display: "none" } : { display: "flex" }}>
                        <i className="fas fa-camera"></i>
                        <i className="far fa-laugh-beam"></i>
                        <input onChange={e => setMessage(e.target.value)} placeholder="Message..." type="text" />
                        <i className="fas fa-paper-plane" onClick={() => sentMessage()}></i>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Chat
