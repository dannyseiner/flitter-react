import React from 'react'
import { Link } from 'react-router-dom'

const ChatContact = ({ user }) => {
    if (user.badge === undefined) user.badge = 0
    return (
        <div className="contact">
            <img className="pic" src={user.image} alt="profile-image" />
            {parseInt(user.badge) !== 0 ? <div className="badge">{user.badge}</div> : ''}
            <div className="name">
                {/* <Link to={`profile/${user.id}`}>{user.username}</Link> */}
                {user.username}
            </div>
            <div className="message">
                Online
            </div>
        </div>
    )
}

export default ChatContact
