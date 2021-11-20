import React, { useState, useEffect } from 'react'
import Post from '../Components/Post'
import Handler from '../Controllers/HomeHandler'

const Home = () => {
    const [createPostTitle, setCreatePostTitle] = useState("")
    const [posts, setPosts] = useState([])
    const [createPostText, setCreatePostText] = useState("")

    const getUser = sessionStorage.getItem('user')
    const user = JSON.parse(getUser)


    useEffect(() => {
        Handler.getPosts(setPosts)
    }, [])


    return (
        <div className="home-container box-shadow">
            <div className="create-post-container">
                <input stype="text" onChange={(e) => setCreatePostTitle(e.target.value)} placeholder="What's on your mind?" />
                <textarea onChange={e => setCreatePostText(e.target.value)} placeholder="Describe it"></textarea>
                <button onClick={() => Handler.createPost(user.account_id, createPostTitle, createPostText)}>Post</button>
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
