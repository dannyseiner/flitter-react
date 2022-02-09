import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
import Notification from './Notification'
const StickyFooter = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))

    const [notifications, setNotifications] = useState([])
    const [notificationMenu, setNotificationMenu] = useState({ display: "none" })

    useEffect(() => {
        getNotifications()
    }, []);



    const getNotifications = () => {
        axios.post(`${config.restapi}/userNotifications`, {
            accountId: user.account_id
        }).then(
            response => setNotifications(response.data)
        )
    }



    return (
        <div>
            <div className="notifications" style={notificationMenu}>
                <div className="nf-content">
                    <button className="close-button" onClick={() => setNotificationMenu({ display: "none" })}>X</button>
                    <div style={{ marginTop: "40px" }}></div>
                    {notifications.map(not => (
                        <Notification onClick={() => getNotifications()} key={not.not_id} notification={not} />

                    ))}
                </div>
            </div>
            <div className='sticky-footer'>
                <div className="sf-content">
                    <img className="st-image" src={user.profile_image_render} />
                    <div className="st-greendot blink"></div>
                    <Link to={`/profile/${user.account_id}`} onClick={() => setNotificationMenu({ display: "none" })} className="st-nickname">{user.account_name}</Link>
                    <div className="sf-notification-icon" style={{ cursor: "pointer" }}>
                        <i className="fas fa-bell"></i>
                        <div className="st-notification-count"
                            onClick={() => setNotificationMenu({ display: "block" })}
                            style={notifications.length === 0 ? { display: "none" } : { display: "inline-block" }}>
                            {notifications.length}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default StickyFooter
