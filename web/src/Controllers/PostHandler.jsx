import axios from 'axios'
import url from '../config'


const get_post = (postId, setPost, setComments) => {
    axios.get(`${url}/post/${postId}`)
        .then(response => {
            setPost(response.data[0])
            get_comments(postId, setComments)
        })
}

const get_comments = (id, setComments) => {
    axios.get(`${url}/post/${id}/comments`)
        .then(response => {
            setComments(response)
        })
}

const add_comment = (postId, authorId, comment, setComment) => {
    axios.post(`${url}/addComment`, {
        post_id: postId,
        author_id: authorId,
        comment_content: comment,
    })
        .then(response => setComment(""))
}


const functions = {
    get_post,
    add_comment
}
export default functions
