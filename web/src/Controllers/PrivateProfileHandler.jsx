import axios from 'axios'
import config from '../config'
const getUserData = (userId, setProfile) => {
    axios.get(`${config.restapi}/user/${userId}`)
        .then(response => setProfile(response))
}

const exporter = {
    getUserData
}

export default exporter