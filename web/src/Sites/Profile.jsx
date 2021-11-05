import React from 'react'

const Profile = () => {

    const user = JSON.parse(sessionStorage.getItem("user"))
    console.log(user)
    return (
        <div>
            <h3>profile info:</h3>
            <ul>
                <li>{user.account_name}</li>
                <li>{user.account_email}</li>
            </ul>
        </div>
    )
}

export default Profile
