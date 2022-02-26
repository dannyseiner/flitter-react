import React, { useState, useEffect } from 'react'
import config from "../config"
import { Link } from "react-router-dom"
import axios from "axios"

const Message = ({ data, index }) => {
    const user = JSON.parse(sessionStorage.getItem("user"))
    let message = data.message

    const removeMessage = () => { }

    const getPost = () => {
        axios.get(`${config.restapi}/post/${message}`)
            .then(response => {
                setNewMesssage(
                    <div className={`message tooltip ${user.account_id === data.from_id ? "from" : ""}`} style={{ padding: 30, cursor: "pointer" }}>
                        <Link to={`/post/${response.data[0].post_id}`}>{response.data[0].post_title}</Link>
                    </div>
                )
            })
    }

    const [newMessage, setNewMesssage] = useState(
        <div className={`message tooltip ${user.account_id === data.from_id ? "from" : ""}`}>
            {data.message}
            <div className="tooltiptext" >{new Date(data.created).toLocaleDateString("en-US", config.format_options)}</div>
        </div>
    )

    const postMessage = () => {
        if (message.includes("<SHAREPOST/")) {
            message = message.replace("<SHAREPOST/", "")
            message = message.replace(">", "")
            getPost()
        }
    }
    useEffect(() => {
        postMessage()
    }, [])


    return (
        <div>
            {index % 5 === 0 ? <div className="time">
                {new Date(data.created).toLocaleDateString("en-US", config.format_options)}
            </div> : ""}

            {newMessage}
        </div>
    )
}

export default Message