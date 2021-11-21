import axios from 'axios'
import config from '../config'

const getUserFromStorage = sessionStorage.getItem('user')
const user = JSON.parse(getUserFromStorage)

const loadUser = (username, setSeachedUser) => {
    if (user.account_name === username || username === "") return
    axios.get(`${config.restapi}/searchUser/${username}`)
        .then(response => { setSeachedUser(response.data); console.log(response.data) })
}


const serndFriendRequest = (target) => {

}

const exporter = {
    loadUser
}

export default exporter