import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Home = () => {

    useEffect(() => {
        axios.get("http://localhost:3001/posts").then(json => { setPosts(json.data); console.log(json) })
    }, [])

    const [posts, setPosts] = useState([])
    const now = new Date()
    const format_options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <ul className="timeline">
            {posts.map(post => (
                <li className="timeline-event" key={post.post_id}>
                    <label className="timeline-event-icon"></label>
                    <div className="timeline-event-copy">
                        <p className="timeline-event-thumbnail">{new Date(post.post_created).toLocaleDateString("en-US", format_options)}</p>
                        <Link to={`post/${post.post_id}`}><h3>{post.post_title}</h3></Link>
                        <h4>{post.account_name}</h4>
                        <p>{post.post_content}</p>
                    </div>
                </li>
            ))}

        </ul>
    )
}

export default Home
