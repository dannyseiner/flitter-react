import axios from 'axios'
import config from '../config'

const getUserFromStorage = sessionStorage.getItem('user')
const user = JSON.parse(getUserFromStorage)

const loadUser = (username, setSeachedUser) => {
    if (user.account_name === username || username === "") return
    axios.get(`${config.restapi}/searchUser/${username}`)
        .then(response => setSeachedUser(response.data))
}

const correctName = (name, name2) => user.account_name === name ? name2 : name
const correctId = (id, id2) => user.account_id === id ? id2 : id

const sendFriendRequest = (target, setSentStatus) => {
    axios.post(`${config.restapi}/getuserfriendship`, {
        user1: user.account_id,
        user2: target
    })
        .then(response => {
            if (response.data.length === 0) { // not found  
                axios.post(`${config.restapi}/sentfriendrequest`, {
                    user1: user.account_id,
                    user2: target
                })
                setSentStatus({
                    class: "request-sent request-bar",
                    text: "Request sent"
                })
                window.location.replace('/friends')

            } else if (response.data[0].friendship_status === 0) { // not accepted yet
                setSentStatus({
                    class: "request-notaccapted request-bar",
                    text: "Request is pending"
                })
            } else { // friends
                setSentStatus({
                    class: "request-already request-bar",
                    text: "Already friend"
                })
            }

        })
}

const acceptFriend = (user1, user2) => {
    axios.post(`${config.restapi}/acceptfriend`, {
        user1: user1,
        user2: user2
    }).then(response => window.location.replace('/friends'))
}

const deleteFriend = (user1, user2) => {
    console.log(user1, user2)
    axios.post(`${config.restapi}/removefriend`, {
        user1: user1,
        user2: user2
    })
        .then(response => console.log(response))
    window.location.replace('/friends')
}


const getUserFriends = (setUserFriends) => {
    axios.get(`${config.restapi}/getfriends/${user.account_id}`)
        .then(response => setUserFriends(response.data))
}


const exporter = {
    loadUser,
    sendFriendRequest,
    getUserFriends,
    correctName,
    correctId,
    acceptFriend,
    deleteFriend
}

export default exporter