import axios from 'axios'
import config from '../config'

const get_post = (postId, setPost, setComments) => {
    axios.get(`${config.restapi}/post/${postId}`)
        .then(response => {
            if (response.data.status === 404) {
                window.location.replace('/notfound')
            }
            setPost(response.data[0])
            get_comments(postId, setComments)
        })
}

const get_comments = (id, setComments) => {
    axios.get(`${config.restapi}/post/${id}/comments`)
        .then(response => {
            setComments(response)
        })
}

const add_comment = (postId, authorId, comment, setComment) => {
    axios.post(`${config.restapi}/addComment`, {
        post_id: postId,
        author_id: authorId,
        comment_content: comment,
    })
        .then(response => setComment(""))
}


const like_comment = (postId, accountId, setLikedPost) => {
    axios.post(`${config.restapi}/likePost`, {
        postId: parseInt(postId),
        accountId: accountId
    })
        .then(response => {
            if (response.data.status === "liked") setLikedPost("heart is-active")
            else setLikedPost("heart")
        })
}



const functions = {
    get_post,
    get_comments,
    add_comment,
    like_comment,
}
export default functions
