import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Post = ({ match }) => {

    useEffect(() => {
        fetch_post()
    }, [])

    const [post, setPost] = useState({});
    const post_id = match.params.id

    const fetch_post = () => {
        axios.get(`http://localhost:3001/post/${post_id}`)
            .then((Response) => setPost(Response.data[0]))
    }


    return (
        <div>
            <p>{post.post_title}</p>
            <p>{post.account_name}</p>
        </div>
    )
}

export default Post
