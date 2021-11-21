import React, { useState } from 'react'
import Handler from '../Controllers/FriendsHandler'
const Friends = () => {

    const [searchUser, setSearchUser] = useState([])
    console.log(searchUser)
    return (
        <div className='home-container box-shadow'>
            <p>Add friend</p>
            <input type="text" onChange={e => Handler.loadUser(e.target.value, setSearchUser)} />

            {searchUser.length == 0
                ? <div><p>User not found</p></div>
                : <div>{searchUser[0].account_name}</div>}
        </div>
    )
}

export default Friends
