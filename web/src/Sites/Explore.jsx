import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserBlock from '../Components/UserBlock'
import axios from 'axios'
import config from "../config"

const Explore = () => {

    const [users, setUsers] = useState([])
    const user = JSON.parse(sessionStorage.getItem("user"))

    useEffect(() => {
        fetch_data()
    }, [])

    const fetch_data = () => {
        axios.get(`${config.restapi}/notfriends/${user.account_id}`)
            .then(response => setUsers(response.data))
    }

    const render_users = users.map(user => (
        <UserBlock user={user} key={user.account_id} />
    ))

    return <div className="home-container">
        <h1>Explore</h1>
        <div className="timeline">
            {users.length === 0 ? <div>
                <h1>You dont have any posts to show</h1>
            </div> : render_users}

        </div>
    </div>
};

export default Explore
