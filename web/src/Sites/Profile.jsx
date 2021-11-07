import React, { useState, useEffect } from 'react'
import axios from 'axios'
import url from '../config'
const Profile = () => {

    const user = JSON.parse(sessionStorage.getItem("user"))
    const [status, setStatus] = useState(
        user.account_role === 2 ?
            {
                display: "block",
                message: "admin"
            }
            :
            {
                display: "none",
                message: ""
            }
    );


    return (
        <div className="box-shadow profile-container">
            <div className="alert-status" style={{ display: status.display }}>{status.message}</div>
            <h3>profile info:</h3>
            <p>{user.account_name}</p>
            <p>{user.account_email}</p>
        </div >
    )
}

export default Profile
