import axios from 'axios'
import config from '../config'

const createPost = (userId, title, content) => {
    axios.post(`${config.restapi}/createPost`, {
        title: title,
        content: content,
        author_id: userId
    })
        .then(response => window.location.replace(`post/${response.data[0].post_id}`))
}


const getPosts = (setPosts) => {
    axios.get(config.restapi + "/posts").then(json => setPosts(json.data))
}

const exporter = {
    getPosts,
    createPost
}

export default exporter