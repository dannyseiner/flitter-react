import React from 'react'

const ChatContact = ({ username, userimage, badge, lastmesasge = "last message" }) => {
    if (badge === undefined) badge = 0
    return (
        <div className="contact">
            <div className={userimage}></div>
            {parseInt(badge) !== 0 ? <div className="badge">{badge}</div> : ''}
            <div className="name">
                {username}
            </div>
            <div className="message">
                {lastmesasge}
            </div>
        </div>
    )
}

export default ChatContact
