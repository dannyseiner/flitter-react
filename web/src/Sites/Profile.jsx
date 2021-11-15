import React, { useState, useEffect } from 'react'
import ProfileHandler from '../Controllers/PrivateProfileHandler'

const Profile = () => {
    const user = JSON.parse(sessionStorage.getItem("user"))
    const [profile, setProfile] = useState({
        data: []
    })
    useEffect(() => {
        ProfileHandler.getUserData(user.account_id, setProfile)
    }, [])

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
        <div className="container">
            Main profile
            {JSON.stringify(profile)}
        </div>

    )
}

export default Profile
