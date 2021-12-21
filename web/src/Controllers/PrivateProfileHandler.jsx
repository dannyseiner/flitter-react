import axios from 'axios'
import config from '../config'
const getUserData = (userId, setProfile) => {
    axios.get(`${config.restapi}/user/${userId}`)
        .then(response => setProfile(response))
}

const getUserPosts = (id, setPosts) => {
    axios.get(`${config.restapi}/userposts/${id}`)
        .then(response => {
            setPosts(response)
            console.log(response)
        })
}

const exporter = {
    getUserData,
    getUserPosts
}

export default exporter