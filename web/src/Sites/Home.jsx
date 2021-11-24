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

    const renderPosts = posts.map(post => (
        <Post post={post} key={post.post_id} />
    ))

    return (
        <div className="home-container">
            <div className="timeline">
                {posts.length === 0 ? <div>
                    <h1>You dont have any posts to show</h1>
                </div> : renderPosts}
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
