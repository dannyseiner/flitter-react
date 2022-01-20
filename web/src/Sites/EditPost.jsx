import React, { useState, useEffect } from 'react'
import axios from "axios"
import config from "../config"
const EditPost = ({ match }) => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [postTitle, setPostTitle] = useState("")
    const [postText, setPostText] = useState("")
    const [post, setPost] = useState({
        data: [
            {
            }
        ]
    })
    useEffect(() => {
        getPost()
    }, []);


    const updatePost = () => {
        axios.post(`${config.restapi}/editpost`, {
            postId: match.params.id,
            postTitle: postTitle,
            postContent: postText,
            accountId: user.account_id
        })
            .then(response => console.log(response))
    }

    const getPost = () => {
        axios.get(`${config.restapi}/post/${match.params.id}`)
            .then(response => {
                setPost(response)
                setPostTitle(response.data[0].post_title)
                setPostText(response.data[0].post_content)
                console.log(response.data[0].post_title)
                if (response.data[0].account_id !== user.account_id) {
                    document.location.replace('/notfound')
                }
            })
    }

    return (
        <div className='home-container'>
            <form className='insert-post box-shadow'>
                <h3>Edit post</h3>
                <div className="insert-port-form">
                    <input type="text" placeholder='Title' value={postTitle} className="insert-post-input" onChange={e => setPostTitle(e.target.value)} />
                    <textarea placeholder='Text' value={postText} className="insert-post-textarea" onChange={e => setPostText(e.target.value)}></textarea>
                    <div className="insert-custom-button">
                        <a className="white" href="#" onClick={() => updatePost()}>
                            <p><span className="bg"></span><span className="base"></span><span className="text">Edit</span></p>
                        </a>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default EditPost
