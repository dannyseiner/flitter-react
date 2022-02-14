import React from 'react'
import config from "../config"


const Message = ({ data, index }) => {

    const removeMessage = () => { }

    const user = JSON.parse(sessionStorage.getItem("user"))
    return (
        <div>
            {index % 5 === 0 ? <div className="time">
                {new Date(data.sent).toLocaleDateString("en-US", config.format_options)}
            </div> : ""}

            <div className={`message tooltip ${user.account_id === data.from_id ? "from" : ""}`}>
                {data.message}
                <div className="tooltiptext" >{new Date(data.sent).toLocaleDateString("en-US", config.format_options)}</div>
            </div>
        </div>
    )
}

export default Message