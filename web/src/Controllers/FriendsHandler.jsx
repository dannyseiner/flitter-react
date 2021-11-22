import axios from 'axios'
import config from '../config'

const getUserFromStorage = sessionStorage.getItem('user')
const user = JSON.parse(getUserFromStorage)

const loadUser = (username, setSeachedUser) => {
    if (user.account_name === username || username === "") return
    axios.get(`${config.restapi}/searchUser/${username}`)
        .then(response => setSeachedUser(response.data))
}


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


const getUserFriends = (setUserFriends) => {
    axios.get(`${config.restapi}/getfriends/${user.account_id}`)
        .then(response => setUserFriends(response.data))
}


const exporter = {
    loadUser,
    sendFriendRequest,
    getUserFriends
}

export default exporter