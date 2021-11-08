import React, { useState, useEffect } from 'react'
import axios from 'axios'
import url from '../config'
import Post from '../Components/Post'
const Home = () => {

    useEffect(() => {
        axios.get(url + "/posts").then(json => { setPosts(json.data); console.log(json) })
    }, [])

    const [posts, setPosts] = useState([])

    return (
        <div className="home-container box-shadow">
            <ul className="timeline">
                {posts.map(post => (
                    <Post post={post} key={post.post_id} />
                ))}
            </ul>
        </div>

    )
}

export default Home
