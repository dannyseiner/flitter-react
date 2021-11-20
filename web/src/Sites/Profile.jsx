import React, { useState, useEffect } from 'react'
import ProfileHandler from '../Controllers/PrivateProfileHandler'

const Profile = () => {
    const user = JSON.parse(sessionStorage.getItem("user"))
    const [profile, setProfile] = useState({
        data: [{}]
    })

    useEffect(() => {
        ProfileHandler.getUserData(user.account_id, setProfile)
    }, [])


    console.log(profile)
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
            <h1>Main profile {profile.data[0].account_name}</h1>
            <p>{status.message}</p>
            <img src={profile.data[0].decoded_image} />
            {JSON.stringify(profile)}
        </div>
    )
}

export default Profile
