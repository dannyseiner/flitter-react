import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Handler from '../Controllers/FriendsHandler'
const Friends = () => {

    useEffect(() => {
        Handler.getUserFriends(setUserFriends)
    }, []);
    const userJson = sessionStorage.getItem('user')
    const user = JSON.parse(userJson)
    const [searchUser, setSearchUser] = useState([])
    const [userFriends, setUserFriends] = useState([])
    const [sentStatus, setSentStatus] = useState({
        class: "",
        text: ""
    })

    // console.log(userFriends)

    return (
        <div className='friend-main-container box-shadow'>
            <div className="search-form">
                <input type="text" placeholder="Enter username or email" style={{ textAlign: "center" }} onChange={e => { Handler.loadUser(e.target.value, setSearchUser); setSentStatus({ class: "", text: "" }) }} />
                <div className="search-result">
                    {searchUser.length === 0
                        ? <p>User not found</p>
                        : <div>
                            <Link to={`/profile/${searchUser[0].account_id}`}>
                                {searchUser[0].account_name}
                            </Link>
                            <button className='search-add-icon' onClick={() => Handler.sendFriendRequest(searchUser[0].account_id, setSentStatus)}>
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </button>

                            <p className={sentStatus.class}>{sentStatus.text}</p>
                        </div>
                    }
                </div>
                <h1>Friends</h1>
                {userFriends.map((usr, i) => (
                    <div key={i}>
                        {usr.friendship_status === 1 ?
                            <div className="friend-container" key={i} >
                                <img src={usr.user2_image_render} />
                                <Link to={`profile/${Handler.correctId(usr.user1_id, usr.user2_id)}`}>
                                    {Handler.correctName(usr.user1_name, usr.user2_name)}
                                </Link>
                                <button className="friend-remove-button" onClick={() => Handler.deleteFriend(usr.user1_id, usr.user2_id)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                            : ""}
                    </div>
                ))}
                <h1>Friend Requests</h1>
                {userFriends.map((usr, i) => (
                    <div key={i}>
                        {usr.friendship_status === 0 ?
                            <div className="friend-container" >
                                <img src={usr.user2_image_render} />
                                <Link to={`profile/${Handler.correctId(usr.user1_id, usr.user2_id)}`}>
                                    {Handler.correctName(usr.user1_name, usr.user2_name)}
                                </Link>
                                {usr.user1_id !== user.account_id ?
                                    <span>
                                        <button className="friend-remove-button" onClick={() => Handler.deleteFriend(usr.user1_id, usr.user2_id)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                        <button className="friend-accept-button" onClick={() => Handler.acceptFriend(usr.user1_id, usr.user2_id)}>
                                            <i className="fas fa-check"></i>
                                        </button>
                                    </span>
                                    : <span>
                                        <button className="friend-remove-button" onClick={() => Handler.deleteFriend(usr.user1_id, usr.user2_id)}>
                                            <i className="icon fas fa-trash"></i>
                                        </button>
                                        <p className='friend-pending' style={{ marginRight: "15px" }}>pending</p>
                                    </span>}
                            </div>
                            : ""}
                    </div>
                ))}
            </div>

        </div >
    )
}

export default Friends
