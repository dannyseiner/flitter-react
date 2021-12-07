import React, { useEffect, useState } from 'react'
import ProfileHandler from '../Controllers/PublicProfileHandler'
import Post from '../Components/Post'
const PublicProfile = ({ match }) => {
    const [profile, setProfile] = useState({
        data: [{}]
    });
    const [posts, setPosts] = useState({
        data: []
    })
    const [stats, setStats] = useState({
        data: []
    })

    useEffect(() => {
        ProfileHandler.get_user_data(match.params.id, setProfile)
        ProfileHandler.get_user_posts(match.params.id, setPosts)
        ProfileHandler.get_user_stats(match.params.id, setStats)
    }, []);

    return (
        <div className="profile-container">
            <div className="profile-header  " >
                <div className='profile-header-image'>
                    <img src={profile.data[0].decoded_image} className="profile-header-image" />
                </div>
                <h1>{profile.data[0].account_name}</h1>
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
            </div>

            <div className="">
                {posts.data.map(post =>
                    <div key={post.post_id}>
                        <Post post={post} postStyle={{ width: "100%" }} profileImage={profile.data[0].decoded_image} />
                    </div>
                )}
            </div>
        </div >
    )
}

export default PublicProfile
