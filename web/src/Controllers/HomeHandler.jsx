import axios from 'axios'
import config from '../config'

const user = JSON.parse(sessionStorage.getItem('user'))

const createPost = (userId, title, content) => {
    axios.post(`${config.restapi}/createPost`, {
        title: title,
        content: content,
        author_id: userId
    })
        .then(response => window.location.replace(`post/${response.data[0].post_id}`))
}


const getPosts = (setPosts) => {
    axios.get(`${config.restapi}/postshome/${user.account_id}`).then(response => {
        if (response.data === "") setPosts([])
        else setPosts(response.data)
    })
}

const exporter = {
    getPosts,
    createPost
}

export default exporter