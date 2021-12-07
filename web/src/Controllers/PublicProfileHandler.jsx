import axios from 'axios'
import config from '../config'
const get_user_data = (id, setProfile) => {
    axios.get(config.restapi + "/user/" + id)
        .then((response => {
            if (response.data.status === false) {
                window.location.replace("/notfound")
                return
            }
            setProfile(response)
        }))
}

const get_user_posts = (id, setPosts) => {
    axios.get(`${config.restapi}/userposts/${id}`)
        .then(response => {
            setPosts(response)
        })
}

const get_user_stats = (id, setStats) => {
    axios.get(`${config.restapi}/userstats/${id}`)
        .then(response => console.log(response.data))
}

const exporter = {
    get_user_data,
    get_user_posts,
    get_user_stats
}

export default exporter