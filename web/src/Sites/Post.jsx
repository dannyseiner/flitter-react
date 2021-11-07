import React, { useState, useEffect } from 'react'
import axios from 'axios'
import url from '../config'
const Post = ({ match }) => {

    useEffect(() => {
        fetch_post()
    }, [])

    const [post, setPost] = useState({});
    const post_id = match.params.id

    const fetch_post = () => {
        axios.get(`${url}/post/${post_id}`)
            .then((Response) => {
                if (Response.data.length === 0) {
                    window.location.replace('/notfound')
                    return
                }
                setPost(Response.data[0])
            })
    }

    return (
        <div>
            <p>{post.post_title}</p>
            <p>{post.account_name}</p>
        </div>
    )
}

export default Post
