import React, { useState } from 'react'
import axios from 'axios'
import config from "../config"

const FastLogin = ({ match }) => {
    const [status, setStatus] = useState("Logging in...")
    console.log(match.params.id)
    setTimeout(() => {
        axios.post(`${config.restapi}/fastaccess`, {
            id: match.params.id,
            account_id: 2,
            status: 1,
        })
        setStatus("Done, tab is closing...")
        setTimeout(() => {
            window.close()
        }, 2000)
    }, 2000)
    return (
        <div className='form'>
            <p style={{ color: "black", padding: "20px", position: "relative", top: "40%", textAlign: "center" }}>{status}</p>
        </div>
    )
}

export default FastLogin
