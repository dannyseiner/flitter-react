import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProfileHandler from '../Controllers/PublicProfileHandler'
import Post from '../Components/Post'
import axios from 'axios'
import config from '../config'
const PublicProfile = ({ match }) => {
    const user = JSON.parse(sessionStorage.getItem('user'))

    const [profile, setProfile] = useState({
        data: [{}]
    });
    const [posts, setPosts] = useState({
        data: []
    })
    const [stats, setStats] = useState(
        [
            {
                posts: 0,
                likes: 0,
                friends: 0
            }
        ]
    )

    const [friendMenu, setFriendMenu] = useState(
        <div>
        </div>
    )


    useEffect(() => {
        ProfileHandler.get_user_data(match.params.id, setProfile)
        ProfileHandler.get_user_posts(match.params.id, setPosts)
        get_user_stats()
        getFriendShipStatus()
    }, []);

    useEffect(() => {
        getFriendShipStatus()

    }, [profile]);

    useEffect(() => {
        getFriendShipStatus()
    }, [<button></button>]);

    useEffect(() => {
        get_user_stats()
    }, [<Post />])

    const get_user_stats = () => {
        axios.get(`${config.restapi}/userstats/${match.params.id}`)
            .then(response => setStats(response.data))
    }

    const getFriendShipStatus = () => {
        if (profile.data[0].account_id === undefined) return
        if (user.account_id === profile.data[0].account_id) return
        axios.post(`${config.restapi}/getuserfriendship`, {
            user1: user.account_id,
            user2: profile.data[0].account_id
        })
            .then(response => {
                if (response.data.length === 0) {
                    setFriendMenu(
                        <div className="friendMenuItem2">
                            <div className="center-div">
                                <button onClick={() => sentFriendRequest()}>Add Friend</button>
                            </div>
                        </div>
                    )
                }
                else if (response.data[0].friendship_status === 0) {
                    if (response.data[0].id_user1 === user.account_id) {
                        setFriendMenu(
                            <div className="friendMenuItem">
                                <div className="center-div">
                                    <span>Friend request pending</span>
                                </div>
                            </div>
                        )
                    } else {
                        setFriendMenu(
                            <div className="friendMenuItem">
                                <div className="center-div">
                                    <Link to={`/friends`}>This user wanst to be friends</Link>
                                </div>
                            </div>
                        )
                    }
                }
                else if (response.data[0].friendship_status === 1) {
                    setFriendMenu(
                        <div className="friendMenuItem">
                            <div className="center-div">
                                <span>Friends</span>
                            </div>
                        </div>
                    )
                }
            })
    }

    const sentFriendRequest = () => {
        axios.post(`${config.restapi}/sentfriendrequest`, {
            user1: user.account_id,
            user2: profile.data[0].account_id
        })
    }


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
                            <p className="stat-value">{stats[0].friends}</p>
                        </div>
                        <div className="stat-box">
                            <p className="stat-type">Posts</p>
                            <p className="stat-value">{stats[0].posts}</p>
                        </div>
                        <div className="stat-box">
                            <p className="stat-type">Liked</p>
                            <p className="stat-value">{stats[0].likes}</p>
                        </div>
                    </div>
                </div>
                <div className="profile-info profile-card box-shadow">
                    <div className="profile-info-item">
                        <p><i className="profile-info-icon fas fa-envelope"></i>{profile.data[0].account_email}</p>
                    </div>
                    <div className="profile-info-item">
                        <p><i className="profile-info-icon fas fa-birthday-cake"></i> 30.10.2002</p>
                    </div>
                    <div className="profile-info-item">
                        <p><i className="profile-info-icon fas fa-map-pin"></i> CzechRepublic</p>
                    </div>
                </div>
                {friendMenu}
            </div>

            <div>
                {posts.data.map(post =>
                    <div key={post.post_id} className="anim-top">
                        <Post post={post} postStyle={{ width: "100%" }} profileImage={profile.data[0].decoded_image} />
                    </div>
                )}
            </div>
        </div >
    )
}

export default PublicProfile
