import axios from 'axios'
import url from '../config'

const get_user_friends = (userId, setFriends) => {
    axios.get(`${url}/user/${userId}/messages`)
        .then(response => {
            let return_data = []
            setFriends(response)
        })
}

const exporter = {
    get_user_friends
}

export default exporter