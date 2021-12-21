import React, { useState, useEffect } from 'react'
import ProfileHandler from '../Controllers/PrivateProfileHandler'
import Post from '../Components/Post'
const Profile = () => {
    const user = JSON.parse(sessionStorage.getItem("user"))
    const [profile, setProfile] = useState({
        data: [{}]
    })
    const [posts, setPosts] = useState({
        data: [{}]
    })

    useEffect(() => {
        ProfileHandler.getUserData(user.account_id, setProfile)
        ProfileHandler.getUserPosts(user.account_id, setPosts)
    }, [])
    console.log("posts", posts)


    const [status] = useState(
        user.account_role === 2 ?
            {
                display: "block",
                message: "admin"
            } : {
                display: "none",
                message: ""
            }
    );


    return (
        <div className="profile-container">
            <div className="profile-header  " >
                <h1>{profile.data[0].account_name}</h1>
                <div className='profile-header-image'>
                    <img src={profile.data[0].decoded_image} className="profile-header-image" />
                </div>

                <div className="profile-social-stats profile-card box-shadow">
                    <div className="profile-stats-container">
                        <div className="stat-box">
                            <p className="stat-type">Friends</p>
                            <p className="stat-value">1 403</p>
                        </div>
                        <div className="stat-box">
                            <p className="stat-type">Posts</p>
                            <p className="stat-value">13</p>
                        </div>
                        <div className="stat-box">
                            <p className="stat-type">Liked</p>
                            <p className="stat-value">1 590</p>
                        </div>
                    </div>
                </div>

                <div className="profile-info profile-card box-shadow">
                    <div className="profile-info-item">
                        <p><i className="profile-info-icon fas fa-envelope"></i>dannyseiner@gmail.com</p>
                    </div>
                    <div className="profile-info-item">
                        <p><i className="profile-info-icon fas fa-birthday-cake"></i> 30.10.2002</p>
                    </div>
                    <div className="profile-info-item">
                        <p><i className="profile-info-icon fas fa-map-pin"></i> CzechRepublic</p>
                    </div>
                </div>
            </div>
            <div>
                {posts.data.map((post, i) =>
                    <div key={i}>
                        <Post post={post} postStyle={{ width: "100%" }} profileImage={profile.data[0].decoded_image} />
                    </div>
                )}
            </div>
        </div >
    )
}

export default Profile
