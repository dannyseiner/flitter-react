import React, { useState, useEffect } from 'react'
import Post from '../Components/Post'
import Handler from '../Controllers/HomeHandler'
import { Link } from 'react-router-dom'
import config from '../config'
import axios from 'axios'
const Home = () => {
    const [createPostTitle, setCreatePostTitle] = useState("")
    const [posts, setPosts] = useState([])
    const [createPostText, setCreatePostText] = useState("")
    const [friends, setFriends] = useState({
        data: []
    })
    const getUser = sessionStorage.getItem('user')
    const user = JSON.parse(getUser)


    useEffect(() => {
        Handler.getPosts(setPosts)
        get_friends()
    }, [])




    const get_friends = () => {
        axios.get(`${config.restapi}/getfriendsstrict/${user.account_id}`)
            .then(response => setFriends(response))
    }
    const renderFriends = friends.data.map(friendship => (
        <div className="friend-tab-container" key={friendship.id_friendship}>
            <div className="tooltip">
                <Link to={friendship.user1_id === user.account_id ? `profile/${friendship.user2_id}` : `profile/${friendship.user1_id}`}>
                    <img src={friendship.user1_id === user.account_id ? friendship.user2_image_render : friendship.user1_image_render} className="friend-tab-image" />
                    <p className="tooltiptext">{friendship.user1_id === user.account_id ? friendship.user2_name : friendship.user1_name}</p>
                </Link>
            </div>
        </div >
    ))

    const renderPosts = posts.map(post => (
        <Post post={post} key={post.post_id} />
    ))

    return (
        <div className="home-container">
            <div className="timeline">
                <div className="friend-list-container">
                    {friends.data.length === 0 ? <p style={{ padding: "15px", textAlign: "center" }}>You don't have friends :(</p> : renderFriends}
                </div>
                {posts.length === 0 ? <div>
                    <h1>You dont have any posts to show</h1>
                </div> : renderPosts}
                <div className="friend-list-container" style={{ padding: "10px", textAlign: "center" }}>
                    <h4>No more posts to show</h4>
                    <p>You can find more people and posts in <Link to='/'>explore</Link> tab</p>
                </div>
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
