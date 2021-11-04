import React from 'react'

const Profile = () => {

    const user_profile = JSON.parse(sessionStorage.getItem("user"))

    return (
        <div>
            <h1>Profile {user_profile.account_name}</h1>
        </div>
    )
}

export default Profile
