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
                <div className="friend-list-container">
                    <div className="friend-tab-container">
                        <img src="https://pbs.twimg.com/profile_images/1429998870453489668/ULnm0BME.jpg" className="friend-tab-image" />
                    </div>
                    <div className="friend-tab-container">
                        <img src="https://pbs.twimg.com/profile_images/1429998870453489668/ULnm0BME.jpg" className="friend-tab-image" />
                    </div>
                    <div className="friend-tab-container">
                        <img src="https://pbs.twimg.com/profile_images/1429998870453489668/ULnm0BME.jpg" className="friend-tab-image" />
                    </div>
                    <div className="friend-tab-container">
                        <img src="https://pbs.twimg.com/profile_images/1429998870453489668/ULnm0BME.jpg" className="friend-tab-image" />
                    </div>
                    <div className="friend-tab-container">
                        <img src="https://pbs.twimg.com/profile_images/1429998870453489668/ULnm0BME.jpg" className="friend-tab-image" />
                    </div>
                    <div className="friend-tab-container">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/OOjs_UI_icon_info.svg/1200px-OOjs_UI_icon_info.svg.png" className="friend-tab-image" />
                    </div>
                    <div className="friend-tab-container">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/OOjs_UI_icon_info.svg/1200px-OOjs_UI_icon_info.svg.png" className="friend-tab-image" />
                    </div>
                    <div className="friend-tab-container">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/OOjs_UI_icon_info.svg/1200px-OOjs_UI_icon_info.svg.png" className="friend-tab-image" />
                    </div>

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
