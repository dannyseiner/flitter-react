import React from 'react'
import { Link } from 'react-router-dom'
import config from '../config'
import axios from 'axios'
const Notification = ({ notification }) => {
    const user = JSON.parse(sessionStorage.getItem('user'))

    const delete_notification = () => {
        axios.post(`${config.restapi}/deleteNotification`, {
            accountId: user.account_id,
            notificationId: notification.not_id
        })
    }



    return (
        <div className="notification-body">
            <span className="notification-created">
                {new Date(notification.not_created).toLocaleDateString("en-US", config.format_options)}
            </span>
            <Link to={`/${notification.not_link}`} className="notification-link">
                {notification.not_header}
            </Link>
            <button className="remove-notification" onClick={() => delete_notification()}>
                <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
        </div>
    )
}

export default Notification
