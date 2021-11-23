import React, { useState, useEffect } from 'react'
import Post from '../Components/Post'
import Handler from '../Controllers/HomeHandler'
import { Link } from 'react-router-dom'
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


            <div className="timeline">
                {posts.map(post => (
                    <Post post={post} key={post.post_id} />
                ))}
            </div>
            <div className="create-post" >
                <Link to='/createpost'>
                    <i className="fas fa-plus"></i>
                </Link>
            </div>
        </div >

    )
}

export default Home
