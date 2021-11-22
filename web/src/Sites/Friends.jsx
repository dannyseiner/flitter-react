import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Handler from '../Controllers/FriendsHandler'
const Friends = () => {

    useEffect(() => {
        Handler.getUserFriends(setUserFriends)
    }, []);


    const [searchUser, setSearchUser] = useState([])
    const [userFriends, setUserFriends] = useState([])
    const [sentStatus, setSentStatus] = useState({
        class: "",
        text: ""
    })

    console.log(userFriends)

    return (
        <div className='home-container box-shadow'>
            <div className="search-form">
                <input type="text" placeholder="Enter username or email" onChange={e => { Handler.loadUser(e.target.value, setSearchUser); setSentStatus({ class: "", text: "" }) }} />
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
                {userFriends.map((user, i) => (
                    <p key={user.id_friendship}>{user.account_name} - {user.friendship_status}</p>
                ))}
            </div>

        </div >
    )
}

export default Friends
