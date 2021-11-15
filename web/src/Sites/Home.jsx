import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../config'
import Post from '../Components/Post'
const Home = () => {
    const [createPostTitle, setCreatePostTitle] = useState("")
    const [createPostText, setCreatePostText] = useState("")

    const getUser = sessionStorage.getItem('user')
    const user = JSON.parse(getUser)

    useEffect(() => {
        axios.get(config.restapi + "/posts").then(json => setPosts(json.data))
    }, [])


    const createPost = () => {
        axios.post(`${config.restapi}/createPost`, {
            title: createPostTitle,
            content: createPostText,
            author_id: user.account_id
        })
            .then(response => window.location.replace(`post/${response.data[0].post_id}`))
    }

    const [posts, setPosts] = useState([])

    return (
        <div className="home-container box-shadow">
            <div className="create-post-container">
                <input stype="text" onChange={(e) => setCreatePostTitle(e.target.value)} placeholder="What's on your mind?" />
                <textarea onChange={e => setCreatePostText(e.target.value)} placeholder="Describe it"></textarea>
                <button onClick={() => createPost()}>Post</button>
            </div>
            <ul className="timeline">
                {posts.map(post => (
                    <Post post={post} key={post.post_id} />
                ))}
            </ul>
        </div>

    )
}

export default Home
